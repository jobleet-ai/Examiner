const ALLOWED_COUNTRIES = [
  "India", 
  "United States", 
  "United Kingdom", 
  "Germany", 
  "Canada", 
  "United Arab Emirates"
];

const PREFERRED_CITIES = {
  "India": ["Bengaluru", "Hyderabad", "Pune", "Noida", "Gurgaon", "New Delhi", "Chennai", "Mumbai", "Kolkata"],
  "United States (USA)": ["San Francisco", "Seattle", "Austin", "New York", "San Jose", "Boston", "Chicago"],
  "United Kingdom (UK)": ["London", "Manchester", "Cambridge", "Reading", "Bristol", "Edinburgh"],
  "Germany": ["Berlin", "Munich", "Frankfurt", "Hamburg", "Stuttgart"],
  "Canada": ["Toronto", "Vancouver", "Waterloo", "Montreal", "Ottawa"],
  "United Arab Emirates": ["Dubai", "Abu Dhabi"]
};


import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MapPin, Globe, Building2, X } from 'lucide-react';
import { getItem, setItem } from '../auth/tokenUtils';

export default function LocationSelector({ curData = {}, onChange, search = false }) {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(curData.locationCountry || '');
  const [selectedCity, setSelectedCity] = useState(curData.locationCity || '');
  const [locationSearch, setLocationSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Refs for positioning and click detection
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const dropdownRef = useRef(null);

  const inputClass = "w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-700 shadow-sm hover:border-indigo-300";

  useEffect(() => {
    const CACHE_KEY = "jobleet_countries_data";
    setLoading(true);
    setSelectedCountry(curData.locationCountry || '');
    setSelectedCity(curData.locationCity || '');

    // 1. Try to load from LocalStorage first
    const cachedData = getItem(CACHE_KEY);
    
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      setCountries(parsedData);
      
      // Initial city population from cache
      if (curData.locationCity && curData.locationCountry) {
        const cObj = parsedData.find(c => c.country === curData.locationCountry);
        setCities(cObj ? cObj.cities : []);
      }
      setLoading(false);
      // You can optionally return here or continue to fetch in background to refresh cache
      return; 
    }

    // 2. If no cache, fetch from API
    fetch("https://countriesnow.space/api/v0.1/countries")
      .then((res) => res.json())
      .then((json) => {
        if (json.data) {
          const filtered = json.data
            .filter((item) => ALLOWED_COUNTRIES.includes(item.country))
            .map((item) => {
              const preferred = PREFERRED_CITIES[item.country] || [];
              const combinedCities = Array.from(new Set([...preferred, ...item.cities]));
              return {
                ...item,
                cities: combinedCities
              };
            });

          // 3. Store processed data in LocalStorage for next time
          setItem(CACHE_KEY, JSON.stringify(filtered));
          
          setCountries(filtered);

          if (curData.locationCity && curData.locationCountry) {
            const cObj = filtered.find(c => c.country === curData.locationCountry);
            setCities(cObj ? cObj.cities : []);
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, [curData.locationCountry, curData.locationCity]);

  // 2. Update Portal coordinates
  const updateCoords = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom, // Fixed positioning uses viewport coordinates
        left: rect.left,
        width: rect.width
      });
    }
  };

  // 3. Handle Outside Clicks & Window Scroll
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isInputClick = wrapperRef.current?.contains(event.target);
      const isDropdownClick = event.target.closest('.suggestions-dropdown');
      if (!isInputClick && !isDropdownClick) {
        setShowSuggestions(false);
      }
    };

    const handleScroll = (event) => {
      const isInsideDropdown = 
        event.target instanceof Element && event.target.closest('.suggestions-dropdown');
      
      if (showSuggestions && !isInsideDropdown) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true); // Capture phase is key
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [showSuggestions]);

  // 4. Keyboard Navigation Logic
  const handleKeyDown = (e) => {

    if (!showSuggestions || suggestions.length === 0) {
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        selectSuggestion(suggestions[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Auto-scroll dropdown when using arrows
  useEffect(() => {
    if (activeIndex !== -1 && dropdownRef.current) {
      const activeItem = dropdownRef.current.children[activeIndex];
      activeItem?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  const handleLocationSearch = (value) => {
    updateInput(value);
    setLocationSearch(value);
    updateCoords();

    if (value.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const results = [];
    const searchLower = value.toLowerCase();

    countries.forEach(country => {
      if (country.country.toLowerCase().includes(searchLower)) {
        results.push({ type: 'country', country: country.country, city: null, display: country.country });
      }
      country.cities.forEach(city => {
        if (city.toLowerCase().includes(searchLower)) {
          results.push({ type: 'city', country: country.country, city: city, display: `${city}, ${country.country}` });
        }
      });
    });

    setSuggestions(results.slice(0, 15));
    setShowSuggestions(results.length > 0);
    setActiveIndex(-1);
  };

const updateInput = (val) => {
    if (onChange) {
      let suggestion;
      if (val === '') {
        // Case 1: Input is empty, clear everything
        suggestion = {
          type: '',
          name: '',
          display: '',
          country: '',
          city: ''
        };
      } else {
        // Case 2: User hit Enter on a typed value that wasn't a suggestion
        const matchedCountry = ALLOWED_COUNTRIES.find(
            c => c.toLowerCase() === val.toLowerCase()
          );
        suggestion = {
          type: matchedCountry ? 'country' : 'city',
          name: matchedCountry ? matchedCountry : val,
          display:  matchedCountry ? matchedCountry : val,
          country: matchedCountry ? matchedCountry : '',
          city: matchedCountry ? '' : val
        };
      }

      // Format to match your standardized onChange
      onChange({
        target: {
          name: 'location',
          value: suggestion
        }
      });
    }
  
};
const handleClearLocation = () => {
  // 1. Clear local input display
  setLocationSearch('');
  
  // 2. Hide suggestions
  setShowSuggestions(false);
  
  // 3. Update parent state with standardized format
  if (onChange) {
    onChange({
      target: {
        name: 'location',
        value: {
          type: '',
          name: '',
          display: '',
          country: '',
          city: ''
        }
      }
    });
  }
  
  // 4. Optional: keep focus on input after clearing
  inputRef.current?.focus();
};

  const selectSuggestion = (suggestion) => {
    setLocationSearch(suggestion.display);
    setShowSuggestions(false);
    setSelectedCountry(suggestion.country);
    setSelectedCity(suggestion.city || "");
    
    if (onChange) {
      onChange({
        target: { 
          name: 'location', 
          value: {
            type: suggestion.type,
            name: suggestion.city || suggestion.country,
            display: suggestion.display,
            country: suggestion.country,
            city: suggestion.city
          } 
        }
      });
    }
  };

  return (
    <div className="w-full relative" ref={wrapperRef}>
      {search ? (
      <div className="relative group">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={20} />
        
        <input
          ref={inputRef}
          type="text"
          value={locationSearch}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            updateCoords();
            if (locationSearch.length >= 2) setShowSuggestions(true);
          }}
          onChange={(e) => handleLocationSearch(e.target.value)}
          placeholder="Search city or country..."
          className={`${inputClass} pl-10 pr-10`}
        />

        {locationSearch && (
          <button
            type="button"
            onClick={handleClearLocation}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all z-20"
          >
            <X size={16} />
          </button>
        )}

          {showSuggestions && suggestions.length > 0 && createPortal(
            <div 
              ref={dropdownRef}
              className="suggestions-dropdown fixed z-[9999] bg-white border border-gray-200 rounded-lg shadow-2xl max-h-60 overflow-y-auto"
              style={{ 
                top: `${coords.top + 4}px`, 
                left: `${coords.left}px`, 
                width: `${coords.width}px` 
              }}
            >
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onMouseDown={(e) => {
                    e.preventDefault(); // Critical: keeps input focused
                    selectSuggestion(suggestion);
                  }}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 border-b border-gray-100 last:border-b-0 transition-colors ${
                    activeIndex === index ? 'bg-indigo-100' : 'hover:bg-indigo-50'
                  }`}
                >
                  {suggestion.type === 'country' ? (
                    <Globe size={18} className="text-blue-600" />
                  ) : (
                    <Building2 size={18} className="text-indigo-600" />
                  )}
                  <div>
                    <div className="font-medium text-gray-800">{suggestion.display}</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                      {suggestion.type}
                    </div>
                  </div>
                </button>
              ))}
            </div>,
            document.body
          )}
        </div>
      ) : (
        /* Dropdown Mode for Forms */
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          

          <div className="flex flex-col w-full">
            <label className="text-sm font-bold text-gray-700 mb-1 ml-1">Country *</label>
            <select
              name="locationCountry"
              value={selectedCountry}
              onChange={(e) => {
                const cName = e.target.value;
                setSelectedCountry(cName);
                const cObj = countries.find(c => c.country === cName);
                setCities(cObj ? cObj.cities : []);
                onChange?.(e);
              }}
      
              className={`${inputClass} w-full shadow-sm`}
            >
              <option value="">Select Country</option>
              {countries.map(c => (
                <option key={c.country} value={c.country}>{c.country}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label className="text-sm font-bold text-gray-700 mb-1 ml-1">City *</label>
            <select
              name="locationCity"
              value={selectedCity}
              disabled={!cities.length}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                onChange?.(e);
              }}
              className={`${inputClass} w-full shadow-sm ${!cities.length ? 'bg-gray-50' : ''}`}
            >
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

        </div>
      </div>
      )}
    </div>
  );
}