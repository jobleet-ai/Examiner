import React, { useCallback, useEffect, useRef, useState } from "react";

// --- SVG Icons for better UX ---
const SearchIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Spinner = () => (
  <svg className="animate-spin w-4 h-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const CloseIcon = () => (
  <svg className="w-4 h-4 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
// --- Helper: Highlight matching text ---
const HighlightText = ({ text = "", highlight = "" }) => {
  highlight = escapeRegex(highlight);
  if (!highlight.trim()) return <span>{text}</span>;
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="font-bold text-indigo-600">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

// --- API Logic ---
const fetchLocations = async (query, searchType) => {
  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  
  // Naukri API specific headers
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  // Using a fixed callback name for easier parsing
  const callbackName = "_callback_123"; 
  let url = '';
  if (searchType === "city") {
    url = `https://taxonomy-suggest.naukri.com/suggest/taxonomyCommonSuggester?limit=8&appId=109&astype=city,locality,state,groupLocation&resultField=id,type,name,parentOneName&query=b&category=location&c_query=null&p_query=null&sourceId=4001&vertical=&astext=${encodeURIComponent(query)}&callback=${callbackName}`;
  } else if (searchType === "country") {
    url = `https://taxonomy-suggest.naukri.com/suggest/taxonomyCommonSuggester?limit=8&appId=109&astype=country&resultField=id,type,name,parentOneName&query=b&category=location&c_query=null&p_query=null&sourceId=4001&vertical=&astext=${encodeURIComponent(query)}&callback=${callbackName}`;
  } else if(searchType === "location") {
    url = `https://taxonomy-suggest.naukri.com/suggest/taxonomyCommonSuggester?limit=8&appId=109&astype=country,city,locality,state,groupLocation&resultField=id,type,name,parentOneName&query=b&category=location&c_query=null&p_query=null&sourceId=4001&vertical=&astext=${encodeURIComponent(query)}&callback=${callbackName}`;
  }
 

  try {
    const response = await fetch(url, requestOptions);
    const text = await response.text();
    //console.log('response123', text)
    // Parse the "JSONP-like" string manually
    // Expected format: _callback_123({...})
    const start = text.indexOf('(');
    const end = text.lastIndexOf(')');
    
    if (start === -1 || end === -1) return [];
    
    const jsonString = text.substring(start + 1, end);
    const data = JSON.parse(jsonString);
    
    return normalizeSuggestionResponse(data);
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

function normalizeSuggestionResponse(payload) {
  if (!payload || typeof payload !== "object") return [];
  const list = payload.resultList || payload.titles || [];
  if (!Array.isArray(list.title)) return [];

  const ll= list.title.map((item) => ({
    id: Array.isArray(item.id) ? item.id[0] : item.id,
    name: Array.isArray(item.name) ? item.name[0] : item.name || "",
    type: item.type || "unknown",
    parent: Array.isArray(item.parentOneName) ? item.parentOneName[0] : (item.parentOneName || null),
  }));
  return ll;
}

// --- Main Component ---
export default function LocationAutocomplete({
  onSelect = () => {},
  placeholder = "Search for a city or locality...",
  debounceMs = 300,
  inputCSS = "",
  fieldValue = "",
  searchType = "city",
  disabled = false,
}) {
  const [value, setValue] = useState(fieldValue);
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  
  const containerRef = useRef(null);
  const debounceRef = useRef(null);

  // Sync external value
  useEffect(() => {
    setValue(fieldValue);
  }, [fieldValue]);

  // Handle fetching
  const handleSearch = useCallback(async (q) => {
    if (!q || q.length < 1) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    setLoading(true);
    const results = await fetchLocations(q, searchType);

    setSuggestions(results);
    setLoading(false);
    setOpen(results.length > 0);
    setHighlightIndex(-1);
  }, []);

  // Debounce logic
  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (value && value !== fieldValue) { 
       // Only search if user typed (value differs from what was passed in/selected)
       // Note: You might want to adjust this condition based on how you want re-opening to work
       debounceRef.current = setTimeout(() => handleSearch(value), debounceMs);
    } else {
       setOpen(false);
    }
    return () => clearTimeout(debounceRef.current);
  }, [value, debounceMs, handleSearch, fieldValue]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelection = (item) => {
    // Format the display value (e.g., "Whitefield, Bangalore")
    const displayValue = item.name + (item.parent ? `, ${item.parent}` : "");
    setValue(displayValue);
    setOpen(false);

    onSelect(item); // Return full object to parent
    console.log('item::', item);
  };

  const handleClear = () => {
    setValue("");
    setSuggestions([]);
    setOpen(false);
    onSelect(null);
  };

  const onKeyDown = (e) => {
    if (!open && suggestions.length > 0 && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && suggestions[highlightIndex]) {
        handleSelection(suggestions[highlightIndex]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-lg font-sans">
      {/* Input Container */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon />
        </div>

        <input
          type="text"
          className={`
            block w-full pl-10 pr-10 py-2.5 
            text-gray-900 bg-white border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
            placeholder-gray-400 transition-all duration-200 ease-in-out shadow-sm
            ${inputCSS}
          `}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (e.target.value === "") handleClear();
          }}
          onFocus={() => { if(suggestions.length > 0) setOpen(true) }}
          onKeyDown={onKeyDown}
          disabled={disabled}
          onBlur={(e) => {onSelect(e.target.value)}}
        />

        {/* Right Actions (Loading or Clear) */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {loading ? (
            <Spinner />
          ) : value ? (
            <button onClick={handleClear} className="focus:outline-none p-1 rounded-full hover:bg-gray-100 transition">
              <CloseIcon />
            </button>
          ) : null}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden max-h-80 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          {suggestions.length === 0 ? (
             <div className="p-4 text-sm text-gray-500 text-center">No locations found</div>
          ) : (
            <ul className="py-1 text-sm text-gray-700">
              {suggestions.map((item, idx) => {
                const isActive = idx === highlightIndex;
                return (
                  <li
                    key={`${item.id}-${idx}`}
                    className={`
                      relative cursor-pointer select-none py-3 pl-3 pr-4 flex items-start gap-3 transition-colors duration-150
                      ${isActive ? "bg-indigo-50" : "hover:bg-gray-50"}
                    `}
                    onClick={() => handleSelection(item)}
                    onMouseEnter={() => setHighlightIndex(idx)}
                  >
                    <div className="mt-0.5 shrink-0">
                        <LocationIcon />
                    </div>
                    
                    <div className="flex flex-col">
                      <span className={`block truncate ${isActive ? 'text-indigo-900' : 'text-gray-900'}`}>
                         <HighlightText text={item.name} highlight={value} />
                      </span>
                      {item.parent && (
                        <span className="block text-xs text-gray-400 truncate mt-0.5">
                          {item.parent} • <span className="capitalize">{item.type}</span>
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}