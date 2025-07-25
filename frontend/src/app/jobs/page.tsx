'use client';

import React, { useState, useEffect, useMemo } from 'react'; // Added useMemo
import Link from 'next/link';
import Image from 'next/image';
import { Disclosure, Transition } from '@headlessui/react'; // Added Transition import
import { FunnelIcon } from '@heroicons/react/20/solid';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'; // Imported new icons
import { companies } from '@/lib/companies';

// Define a type for your job objects for better type safety
// Assuming 'id' is a string or number, and 'type' has specific values
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote' | string; // 'string' for any unhandled types
  // Add other job properties as needed if they affect rendering
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]); // Use Job type for better type inference
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  // Fetch jobs from API (static + dynamic)
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/jobs');
        if (!res.ok) throw new Error('Failed to fetch jobs');
        const data: Job[] = await res.json(); // Type the incoming data
        setJobs(data);
      } catch (err) {
        console.error('Failed to fetch jobs:', err); // Log the actual error for debugging
        setError('Unable to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Get company logo helper - Wrapped in useMemo for slight optimization
  const getCompanyLogo = useMemo(() => {
    return (companyName: string) => {
      const company = companies.find((c) => c.name === companyName);
      return company?.logo ?? '/default-logo.png';
    };
  }, [companies]); // companies should ideally be stable or a dependency if it changes

  // Filter jobs - Wrapped in useMemo for performance (prevents re-filtering on unrelated state changes)
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase());
      const matchesLocation = locationFilter ? job.location === locationFilter : true;
      const matchesType = typeFilter ? job.type === typeFilter : true;
      return matchesSearch && matchesLocation && matchesType;
    });
  }, [jobs, search, locationFilter, typeFilter]); // Dependencies for memoization

  // Get unique locations - Wrapped in useMemo for performance
  const allLocations = useMemo(() => Array.from(new Set(jobs.map((j) => j.location))), [jobs]);
  // Get unique types - Wrapped in useMemo for performance
  const allTypes = useMemo(() => Array.from(new Set(jobs.map((j) => j.type))), [jobs]);

  // Handler to clear all filters
  const handleClearFilters = () => {
    setSearch('');
    setLocationFilter('');
    setTypeFilter('');
  };

  // --- Render ---
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]"> {/* Use min-h for consistent loading state height */}
        <p className="text-lg text-gray-600 animate-pulse">Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-lg text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"> {/* Increased max-width, improved padding */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-12 tracking-tight"> {/* Larger, bolder, tighter tracking */}
        Discover Your Next Role
      </h1>

      {/* Search & Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 md:flex md:items-center md:justify-between gap-4"> {/* Modern card, flex on md */}
        <div className="flex-1 mb-4 md:mb-0">
          <label htmlFor="job-search" className="sr-only">Search jobs</label>
          <input
            id="job-search"
            type="text"
            placeholder="Search by job title, company, or keywords..."
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg placeholder-gray-500 transition duration-200 ease-in-out" // Larger, rounded, better focus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Disclosure as="div" className="relative flex-shrink-0">
          {({ open }) => (
            <>
              <Disclosure.Button className="w-full md:w-auto h-full flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out"> {/* Brighter button, rounded, better hover/focus */}
                <FunnelIcon className="w-5 h-5" />
                <span>Filters</span>
                <ChevronDownIcon className={`w-5 h-5 transform ${open ? 'rotate-180' : ''} transition-transform duration-200`} /> {/* Add chevron icon */}
              </Disclosure.Button>

              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
              >
                <Disclosure.Panel className="absolute z-20 mt-3 right-0 w-72 bg-white border border-gray-200 rounded-xl shadow-xl p-5 space-y-5 transform origin-top-right"> {/* Elevated shadow, rounded */}
                  {/* Location Filter */}
                  <div>
                    <label htmlFor="location-filter" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <select
                      id="location-filter"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out" // Better border, background, focus
                    >
                      <option value="">All Locations</option>
                      {allLocations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Type Filter */}
                  <div>
                    <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                    <select
                      id="type-filter"
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out" // Better border, background, focus
                    >
                      <option value="">All Job Types</option>
                      {allTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Clear Filters Button */}
                  {(search || locationFilter || typeFilter) && (
                    <button
                      onClick={handleClearFilters}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition duration-200 ease-in-out mt-4"
                    >
                      <XMarkIcon className="w-4 h-4" />
                      Clear Filters
                    </button>
                  )}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>

      {/* Job Listings */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"> {/* Adjusted grid, larger gap */}
          {filteredJobs.map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="group relative block border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden" // Card-like, subtle hover effect
            >
              {/* Optional: subtle background pattern or gradient for modern touch */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              <div className="flex items-start gap-4 mb-4 relative z-10"> {/* z-10 for content over pattern */}
                <div className="w-12 h-12 flex-shrink-0 relative rounded-md overflow-hidden bg-white border border-gray-100 shadow-sm"> {/* Larger, slight shadow for logo */}
                  <Image
                    src={getCompanyLogo(job.company)}
                    alt={`${job.company} logo`}
                    fill
                    sizes="48px" // Optimize image loading for a fixed size
                    className="object-contain p-1" // Add padding to logo inside its container
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition duration-200 leading-tight"> {/* Larger title, blue on hover */}
                    {job.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">{job.company}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700 mb-4 relative z-10">
                <span className="flex items-center gap-1">
                  {/* Location Icon (Heroicons outline for consistency) */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400">
                    <path fillRule="evenodd" d="M9.696 1.64A.75.75 0 0110 1.5h.304a.75.75 0 01.696.14l7.25 6.5A.75.75 0 0118 9v4.102a2.25 2.25 0 01-1.95 2.296l-3.35.342a2.25 2.25 0 01-2.028-.088l-4.145-1.722a.75.75 0 00-.573-.021L3.75 13.91V8.625a.75.75 0 01.25-.563l7.25-6.5zm-3.696 9.75a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3a.75.75 0 00-.75-.75z" clipRule="evenodd" />
                  </svg>
                  {job.location}
                </span>
                {/* Optional: Add a separator */}
                <span className="text-gray-300">•</span>
                <span className="text-gray-500 text-xs">Posted 2 days ago</span> {/* Example dynamic content, adjust as needed */}
              </div>

              {/* Job Type Badge - more prominent, slightly updated color variants */}
              <div
                className={`relative z-10 inline-flex items-center text-xs font-semibold px-4 py-1.5 rounded-full ${
                  job.type === 'Full-time'
                    ? 'bg-emerald-100 text-emerald-800' // Fresher green
                    : job.type === 'Part-time'
                    ? 'bg-amber-100 text-amber-800' // Fresher yellow
                    : job.type === 'Contract'
                    ? 'bg-blue-100 text-blue-800'
                    : job.type === 'Internship'
                    ? 'bg-purple-100 text-purple-800'
                    : job.type === 'Remote'
                    ? 'bg-rose-100 text-rose-800' // Fresher pink
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                 {job.type}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-10 p-8 bg-gray-50 rounded-lg text-center text-gray-600 border border-gray-200 shadow-sm">
          <p className="text-lg font-medium mb-2">No jobs found.</p>
          <p>Try adjusting your search or filters.</p>
        </div>
      )}
    </main>
  );
}