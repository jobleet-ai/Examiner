import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Search, Briefcase, MapPin, Clock, CheckCircle, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

// SEO Component for managing meta tags
const SEOHead = ({ title, description, keywords, canonicalUrl, structuredData }) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:url', canonicalUrl, true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Structured Data (JSON-LD)
    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, canonicalUrl, structuredData]);

  return null;
};

// --- Constants ---
const ALL_FILTER_VALUE = 'All';

const experienceLevels = [
  { label: 'Any Experience', value: '' },
  { label: 'Junior (0-2 yrs)', value: 'Junior' },
  { label: 'Mid-Level (3-5 yrs)', value: 'Mid-Level' },
  { label: 'Senior (5+ yrs)', value: 'Senior' },
  { label: '10+ years', value: '10+ years' },
  { label: 'Internship', value: 'Internship' }
];

const allLocationTypes = ['Remote', 'Hybrid', 'Onsite'];

const salaryOptions = [
  { label: 'Any Salary', value: '' },
  { label: '$50,000+', value: 50000 },
  { label: '$75,000+', value: 75000 },
  { label: '$100,000+', value: 100000 },
  { label: '$150,000+', value: 150000 },
];

const allSponsorships = [
  { label: 'Yes', value: 'true' },
  { label: 'No', value: 'false' },
];

const jobTypeOptions = [
  { label: 'Any Type', value: '' },
  { label: 'Full-time', value: 'Full-time' },
  { label: 'Part-time', value: 'Part-time' },
  { label: 'Contract', value: 'Contract' },
  { label: 'Freelance', value: 'Freelance' },
];

// Simplified LocationAutocomplete for demo
const LocationAutocomplete = ({ inputCSS, fieldValue, onSelect, placeholder }) => {
  const [value, setValue] = useState(fieldValue || '');
  
  return (
    <input
      type="text"
      className={inputCSS}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onSelect({ type: 'city', name: e.target.value });
      }}
      placeholder={placeholder}
    />
  );
};

const FilterPanel = ({ filters, setFilters, isSearching }) => {
  const resetAdvancedFilters = useCallback(() => {
    setFilters(f => ({
      keyword: f.keyword,
      location: f.location,
      experience: f.experience,
      workSetting: ALL_FILTER_VALUE,
      jobType: '',
      minSalary: '',
      sponsorship: ALL_FILTER_VALUE,
    }));
  }, [setFilters]);

  const handleFilterChange = (name, value) => {
    setFilters(f => ({ ...f, [name]: value }));
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-8 border border-indigo-200">
      <h2 className="text-xl font-bold text-indigo-700 mb-4 flex items-center justify-between">
        <Filter className="w-5 h-5 mr-2" />
        Advanced Filters
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="location-type-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Work Setting
          </label>
          <select
            id="location-type-filter"
            value={filters.workSetting}
            onChange={(e) => handleFilterChange('workSetting', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white text-sm"
            disabled={isSearching}
          >
            <option value={ALL_FILTER_VALUE}>Any Setting</option>
            {allLocationTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="job-type-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Job Type
          </label>
          <select
            id="job-type-filter"
            value={filters.jobType}
            onChange={(e) => handleFilterChange('jobType', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white text-sm"
            disabled={isSearching}
          >
            {jobTypeOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="min-salary-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Min. Salary
          </label>
          <select
            id="min-salary-filter"
            value={filters.minSalary}
            onChange={(e) => handleFilterChange('minSalary', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white text-sm"
            disabled={isSearching}
          >
            {salaryOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="sponsorship-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Visa Sponsorship
          </label>
          <select
            id="sponsorship-filter"
            value={filters.sponsorship}
            onChange={(e) => handleFilterChange('sponsorship', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white text-sm"
            disabled={isSearching}
          >
            <option value={ALL_FILTER_VALUE}>All</option>
            {allSponsorships.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-6 border-t pt-4 flex justify-between items-center">
        <button
          onClick={resetAdvancedFilters}
          className="text-sm font-semibold text-red-600 hover:text-red-800 transition flex items-center p-1 hover:bg-red-50 rounded-lg disabled:opacity-50"
          disabled={isSearching}
        >
          <X className="w-4 h-4 mr-1" /> Clear Advanced Filters
        </button>
      </div>
    </div>
  );
};

// Simplified JobCard for demo
const JobCard = ({ job }) => {
  return (
    <article 
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200"
      itemScope 
      itemType="https://schema.org/JobPosting"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-2" itemProp="title">
        {job.title}
      </h3>
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
        <span itemProp="hiringOrganization" itemScope itemType="https://schema.org/Organization">
          <span itemProp="name">{job.company}</span>
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span itemProp="jobLocation" itemScope itemType="https://schema.org/Place">
            <span itemProp="address">{job.location}</span>
          </span>
        </span>
      </div>
      <p className="text-gray-700 mb-4" itemProp="description">
        {job.description}
      </p>
      <meta itemProp="employmentType" content={job.type} />
      <meta itemProp="datePosted" content={job.datePosted} />
    </article>
  );
};

// Main Component
const SEOJobSearch = () => {
  const [filters, setFilters] = useState({
    keyword: '',
    location: { type: '', name: '' },
    experience: '',
    workSetting: ALL_FILTER_VALUE,
    jobType: '',
    minSalary: '',
    sponsorship: ALL_FILTER_VALUE,
  });

  const [jobs, setJobs] = useState([
    {
      _id: '1',
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      description: 'Build scalable applications with modern technologies',
      type: 'Full-time',
      datePosted: '2025-12-15'
    },
    {
      _id: '2',
      title: 'Product Manager',
      company: 'Innovation Inc',
      location: 'Remote',
      description: 'Lead product strategy and development',
      type: 'Full-time',
      datePosted: '2025-12-18'
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(2);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const observerTarget = useRef(null);

  // Generate dynamic SEO metadata based on search filters
  const generateSEOMetadata = useMemo(() => {
    const baseTitle = 'Job Search - Find Your Dream Career';
    const baseDescription = 'Search thousands of job opportunities across all industries. Find jobs that match your skills, experience, and career goals.';
    
    let title = baseTitle;
    let description = baseDescription;
    let keywords = 'job search, careers, employment, job listings, job opportunities';

    // Customize based on active filters
    if (filters.keyword) {
      title = `${filters.keyword} Jobs - ${baseTitle}`;
      description = `Find ${filters.keyword} jobs. ${baseDescription}`;
      keywords = `${filters.keyword}, ${keywords}`;
    }

    if (filters.location?.name) {
      title = filters.keyword 
        ? `${filters.keyword} Jobs in ${filters.location.name}` 
        : `Jobs in ${filters.location.name}`;
      description = `Search for jobs in ${filters.location.name}. ${description}`;
      keywords = `${keywords}, ${filters.location.name} jobs`;
    }

    if (filters.experience) {
      keywords = `${keywords}, ${filters.experience} level jobs`;
    }

    // Generate structured data (JSON-LD) for JobPosting schema
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": title,
      "description": description,
      "url": window.location.href,
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": jobs.map((job, index) => ({
          "@type": "JobPosting",
          "position": index + 1,
          "title": job.title,
          "description": job.description,
          "datePosted": job.datePosted,
          "employmentType": job.type,
          "hiringOrganization": {
            "@type": "Organization",
            "name": job.company
          },
          "jobLocation": {
            "@type": "Place",
            "address": job.location
          }
        }))
      }
    };

    return {
      title,
      description,
      keywords,
      canonicalUrl: window.location.origin + window.location.pathname,
      structuredData
    };
  }, [filters, jobs]);

  const handleSearchClick = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      {/* SEO Meta Tags */}
      <SEOHead {...generateSEOMetadata} />

      {/* Semantic HTML5 Structure */}
      <header className="sr-only">
        <h1>Job Search Portal - Find Your Next Career Opportunity</h1>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" role="main">
        {/* Search Section with proper semantic markup */}
        <section aria-label="Job search filters" className="bg-white rounded-2xl shadow-xl mb-10 overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white/20 backdrop-blur rounded-md">
                <Search className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Find Your Next Role</h2>
                <p className="text-sm text-white/90">Discover opportunities that match your skills and aspirations</p>
              </div>
            </div>
          </div>

          <div className="p-5">
            <div role="search">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-4 md:items-end">
                
                {/* Keyword Search */}
                <div className="md:col-span-4">
                  <label htmlFor="job-keyword" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title or Keywords
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
                    <input
                      id="job-keyword"
                      type="text"
                      name="keyword"
                      placeholder="e.g., Software Engineer, Product Manager..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-700 shadow-sm hover:border-indigo-300"
                      value={filters.keyword}
                      onChange={(e) => setFilters(f => ({ ...f, keyword: e.target.value }))}
                      onKeyDown={handleKeyDown}
                      disabled={isLoading}
                      aria-label="Search for jobs by keyword or title"
                    />
                  </div>
                </div>

                {/* Location Search */}
                <div className="md:col-span-3">
                  <label htmlFor="job-location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <div className="relative" onKeyUp={handleKeyDown}>
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
                    <LocationAutocomplete
                      inputCSS="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-700 shadow-sm hover:border-indigo-300"
                      fieldValue={filters.location?.name}
                      onSelect={(loc) => setFilters(f => ({ ...f, location: loc }))}
                      placeholder="Search for a location"
                    />
                  </div>
                </div>

                {/* Experience Filter */}
                <div className="md:col-span-2">
                  <label htmlFor="experience-level" className="block text-sm font-medium text-gray-700 mb-1">
                    Experience Level
                  </label>
                  <select
                    id="experience-level"
                    name="experience"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-700 bg-white shadow-sm hover:border-indigo-300 cursor-pointer"
                    value={filters.experience}
                    onChange={(e) => setFilters(f => ({ ...f, experience: e.target.value }))}
                    disabled={isLoading}
                    aria-label="Filter by experience level"
                  >
                    {experienceLevels.map(exp => (
                      <option key={exp.value} value={exp.value}>{exp.label}</option>
                    ))}
                  </select>
                </div>
                
                {/* Search Button */}
                <div className="md:col-span-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex items-center justify-center px-6 py-3 font-semibold text-base rounded-xl transition-all duration-300 shadow-lg transform hover:scale-[1.01] active:scale-[0.99]
                      ${isLoading 
                        ? 'bg-gray-300 cursor-not-allowed text-gray-600'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-indigo-500/50'
                      }
                    `}
                    aria-label={isLoading ? 'Searching for jobs' : 'Search for jobs'}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" aria-hidden="true" />
                        Search Jobs
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                className="flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800 transition-all duration-200 group"
                disabled={isLoading}
                aria-expanded={isAdvancedOpen}
                aria-controls="advanced-filters"
              >
                <div className="p-1.5 bg-indigo-100 rounded-md group-hover:bg-indigo-200 transition-colors">
                  <Filter className="w-4 h-4" aria-hidden="true" />
                </div>
                <span>Advanced Filters</span>
                {isAdvancedOpen ? (
                  <ChevronUp className="w-4 h-4 ml-1 transition-transform" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-4 h-4 ml-1 transition-transform" aria-hidden="true" />
                )}
              </button>

              {isAdvancedOpen && (
                <div id="advanced-filters" className="mt-3 animate-slideDown">
                  <FilterPanel
                    filters={filters}
                    setFilters={setFilters}
                    isSearching={isLoading}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section aria-label="Job search results">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-md">
                <Briefcase className="w-6 h-6 text-indigo-600" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {totalResults > 0 ? `${totalResults} Jobs Found` : 'Job Listings'}
                </h2>
                <p className="text-sm text-gray-600">
                  {jobs.length > 0 ? `Showing ${jobs.length} of ${totalResults} results` : 'Search for jobs to get started'}
                </p>
              </div>
            </div>

            {jobs.length > 0 && (
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <time dateTime={new Date().toISOString()}>Updated just now</time>
              </div>
            )}
          </div>

          {/* Job Listings with proper semantic markup */}
          <div className="space-y-5" role="list">
            {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <div 
                  key={job._id}
                  className="animate-fadeIn"
                  style={{ animationDelay: `${index * 50}ms` }}
                  role="listitem"
                >
                  <JobCard job={job} />
                </div>
              ))
            ) : (
              !isLoading && (
                <div className="text-center py-20 bg-white rounded-2xl shadow-lg" role="status">
                  <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <Search className="w-10 h-10 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">No Jobs Found</h3>
                    <p className="text-gray-600 mb-6">
                      We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms.
                    </p>
                    <button
                      onClick={() => {
                        setFilters({
                          keyword: '',
                          location: {type:'', name:''},
                          experience: '',
                          jobType: '',
                          workSetting: ALL_FILTER_VALUE,
                          minSalary: '',
                          sponsorship: ALL_FILTER_VALUE
                        });
                        handleSearchClick();
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              )
            )}

            {hasMore && jobs.length > 0 && (
              <div ref={observerTarget} className="text-center py-8" role="status" aria-live="polite">
                {isLoading ? (
                  <div className="flex flex-col items-center gap-3">
                    <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-indigo-600 font-semibold">Loading more opportunities...</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-gray-500">
                    <ChevronDown className="w-5 h-5 animate-bounce" aria-hidden="true" />
                    <span className="font-medium">Scroll for more jobs</span>
                  </div>
                )}
              </div>
            )}

            {!hasMore && jobs.length > 0 && (
              <div className="text-center py-10" role="status">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600" aria-hidden="true" />
                  <span className="text-green-800 font-medium">You've viewed all available jobs</span>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 1000px; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.3s ease-out forwards; }
        .animate-slideDown { animation: slideDown 0.3s ease-out forwards; }
        
        /* Screen reader only class for accessibility */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `}</style>
    </div>
  );
};

export default SEOJobSearch;