'use client';

import { useParams } from 'next/navigation';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { jobs } from '@/lib/jobs';
import Link from 'next/link'; // Required for linking related jobs

const tabs = ['Overview', 'Company', 'How to Apply'];

const JobDetailsPage = () => {
  const params = useParams();
  const jobId = params?.id;
  const job = jobs.find((job) => String(job.id) === jobId);

  if (!job) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-semibold text-red-500">Job not found</h1>
        <p className="mt-2 text-gray-600">The job you’re looking for doesn’t exist or has been removed.</p>
      </main>
    );
  }

  const relatedJobs = jobs.filter((j) => j.id !== job.id).slice(0, 3); // Show 3 other jobs

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#424B54]">{job.title}</h1>
        <p className="text-[#424B54] mt-1">
          {job.company} • {job.location}
        </p>
      </div>

      <p className="mt-2 text-[#424B54]">
        <strong>Type:</strong> {job.type} • <strong>Salary:</strong> {job.salary}
      </p>

      <div className="flex flex-wrap gap-2 mt-2">
        {job.tags?.map((tag: string) => (
          <span
            key={tag}
            className="bg-[#E1CE7A] text-[#424B54] px-3 py-1 rounded-full text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-2 border-b border-[#E0E0E0] mb-4 mt-6">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                classNames(
                  'px-4 py-2 text-sm font-medium border-b-2 transition',
                  selected
                    ? 'text-[#424B54] border-[#E1CE7A]'
                    : 'text-[#888] border-transparent hover:text-[#424B54]'
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <p className="text-[#424B54] whitespace-pre-line">{job.description}</p>
          </Tab.Panel>
          <Tab.Panel>
            <p className="text-[#424B54] whitespace-pre-line">{job.about}</p>
          </Tab.Panel>
          <Tab.Panel>
            <p className="text-[#424B54] whitespace-pre-line">{job.apply}</p>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <div className="mt-6">
        <a
          href={`mailto:careers@elinnov.com?subject=Application – ${encodeURIComponent(
            job.title
          )}`}
          className="bg-[#E1CE7A] hover:bg-[#ebcfb2] text-[#424B54] font-medium px-6 py-3 rounded-md inline-block"
        >
          Apply Now
        </a>
      </div>

      {/* Related Jobs Section */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-[#424B54] mb-4">Related Jobs</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {relatedJobs.map((related) => (
            <Link
              key={related.id}
              href={`/jobs/${related.id}`}
              className="block p-4 border border-[#E1CE7A] rounded-md hover:shadow-sm transition"
            >
              <h3 className="font-semibold text-[#424B54] text-lg">{related.title}</h3>
              <p className="text-sm text-[#666] mt-1">{related.company} • {related.location}</p>
              <p className="text-sm text-[#666] mt-1">{related.type} • {related.salary}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {related.tags.slice(0, 3).map((tag: string) => (
                  <span key={tag} className="bg-[#E1CE7A] text-[#424B54] px-2 py-0.5 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default JobDetailsPage;
