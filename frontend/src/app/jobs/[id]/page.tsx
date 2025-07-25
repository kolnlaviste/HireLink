'use client';

import { useParams } from 'next/navigation';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { companies } from '@/lib/companies';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const tabs = ['Overview', 'Company', 'How to Apply'];

const JobDetailsPage = () => {
  const params = useParams();
  const jobId = params?.id; // always string
  const [job, setJob] = useState<any>(null);
  const [relatedJobs, setRelatedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const res = await fetch('/api/jobs');
        const data = await res.json();

        // Normalize ID comparison
        const found = data.find((j: any) => String(j.id) === String(jobId));
        setJob(found); // Keep as is, per instruction not to change logic/types

        const related = data.filter((j: any) => String(j.id) !== String(jobId)).slice(0, 3);
        setRelatedJobs(related);
      } catch (error) {
        console.error('Error fetching job details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [jobId]);

  const getSlug = (companyName: string) => {
    const company = companies.find((c) => c.name === companyName);
    return company ? company.slug : '';
  };

  if (loading) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-10 min-h-[50vh] flex items-center justify-center">
        <p className="text-lg text-gray-600 animate-pulse">Loading job details...</p>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-10 min-h-[50vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Job not found</h1>
        <p className="mt-2 text-gray-700 max-w-md">
          The job you’re looking for doesn’t exist or has been removed. Please try Browse other{' '}
          <Link href="/jobs" className="text-blue-600 hover:underline font-medium">
            available jobs
          </Link>
          .
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Job Header Section - Modernized Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-gray-100">
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-2">
            {job.title}
          </h1>
          <p className="text-lg text-gray-600">
            <span>
              <Link href={`/companies/${getSlug(job.company)}`} className="text-blue-700 hover:text-blue-800 font-semibold transition">
                {job.company}
              </Link>
            </span>{' '}
            <span className="mx-2 text-gray-400">•</span> {job.location}
          </p>
        </div>

        {/* Job Attributes (Type, Salary) */}
        <p className="mt-2 text-gray-700 text-lg">
          <strong className="font-semibold">Type:</strong> {job.type}{' '}
          <span className="mx-1 text-gray-300">•</span>
          <strong className="font-semibold">Salary:</strong> {job.salary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-5">
          {job.tags?.map((tag: string) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium transition hover:bg-blue-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content & Related Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          <Tab.Group>
            {/* Tab List - Modern Segmented Control Look */}
            <Tab.List className="flex space-x-1 p-1 bg-gray-100 rounded-xl mb-6 shadow-sm">
              {tabs.map((tab) => (
                <Tab
                  key={tab}
                  className={({ selected }) =>
                    classNames(
                      'w-full py-3 text-lg font-medium rounded-lg transition-all duration-200 ease-in-out', // Larger text, full width, smooth transition
                      selected
                        ? 'bg-white text-blue-700 shadow-md' // White background, primary blue text, elevated shadow
                        : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800' // Subtle hover for unselected
                    )
                  }
                >
                  {tab}
                </Tab>
              ))}
            </Tab.List>

            {/* Tab Panels - Content as a Card */}
            <Tab.Panels className="mt-6 p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
              <Tab.Panel>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Job Overview</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">{job.description}</p>
              </Tab.Panel>
              <Tab.Panel>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">About {job.company}</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">{job.about}</p>
                {/* Optional: Add a link to the company page here if desired */}
                <p className="mt-6">
                   <Link href={`/companies/${getSlug(job.company)}`} className="inline-flex items-center text-blue-600 hover:underline font-medium">
                     View Company Profile
                   </Link>
                 </p>
              </Tab.Panel>
              <Tab.Panel>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">How to Apply</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">{job.apply}</p>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

          {/* Apply Now Button - More prominent */}
          <div className="mt-8 text-center lg:text-left">
            <a
              href={`mailto:careers@elinnov.com?subject=Application – ${encodeURIComponent(job.title)}`}
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-lg"
            >
              Apply Now
            </a>
          </div>
        </div>

        {/* Related Jobs Sidebar */}
        <section className="lg:col-span-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More Jobs Like This</h2>
          <div className="space-y-4">
            {relatedJobs.length > 0 ? (
              relatedJobs.map((related) => (
                <Link
                  key={related.id}
                  href={`/jobs/${related.id}`}
                  className="block p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-1">{related.title}</h3>
                  <p className="text-sm text-gray-600">
                    {related.company} <span className="mx-1 text-gray-300">•</span> {related.location}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {related.type} <span className="mx-1 text-gray-300">•</span> {related.salary}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {related.tags?.slice(0, 3).map((tag: string) => (
                      <span
                        key={tag}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-5 bg-gray-50 rounded-xl text-center text-gray-600 border border-gray-200">
                <p>No similar jobs found at the moment.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default JobDetailsPage;