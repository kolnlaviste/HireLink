'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Disclosure } from '@headlessui/react';
import { FunnelIcon } from '@heroicons/react/20/solid';
import { companies } from '@/lib/companies';

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
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
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        setError('Unable to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Get company logo helper
  const getCompanyLogo = (companyName: string) => {
    const company = companies.find((c) => c.name === companyName);
    return company?.logo ?? '/default-logo.png';
  };

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = locationFilter ? job.location === locationFilter : true;
    const matchesType = typeFilter ? job.type === typeFilter : true;
    return matchesSearch && matchesLocation && matchesType;
  });

  const allLocations = Array.from(new Set(jobs.map((j) => j.location)));
  const allTypes = Array.from(new Set(jobs.map((j) => j.type)));

  // Render
  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading jobs...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-10">
        Browse Jobs
      </h1>

      {/* Search & Filters */}
      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search jobs..."
          className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Disclosure>
          {() => (
            <div className="relative">
              <Disclosure.Button className="h-full flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition">
                <FunnelIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
              </Disclosure.Button>

              <Disclosure.Panel className="absolute z-10 mt-2 right-0 w-64 bg-white border rounded-md shadow-lg p-4 space-y-4">
                {/* Location Filter */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Location</label>
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/80"
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
                  <label className="block text-sm text-gray-600 mb-1">Job Type</label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/80"
                  >
                    <option value="">All Job Types</option>
                    {allTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="group border rounded-xl p-5 bg-white hover:shadow transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 relative">
                <Image
                  src={getCompanyLogo(job.company)}
                  alt={`${job.company} logo`}
                  fill
                  className="object-contain rounded"
                />
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-800 group-hover:text-black">
                  {job.title}
                </h2>
                <p className="text-sm text-gray-500">{job.company}</p>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-2">{job.location}</div>
            <div
              className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${
                job.type === 'Full-time'
                  ? 'bg-green-100 text-green-800'
                  : job.type === 'Part-time'
                  ? 'bg-yellow-100 text-yellow-800'
                  : job.type === 'Contract'
                  ? 'bg-blue-100 text-blue-800'
                  : job.type === 'Internship'
                  ? 'bg-purple-100 text-purple-800'
                  : job.type === 'Remote'
                  ? 'bg-pink-100 text-pink-800'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {job.type}
            </div>
          </Link>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="mt-10 text-center text-gray-500">No jobs match your filters.</div>
      )}
    </main>
  );
}
