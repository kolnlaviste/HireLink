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
        setJob(found);

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
      <main className="max-w-5xl mx-auto px-4 py-10 text-center">
        <p className="text-gray-600">Loading job details...</p>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-semibold text-red-500">Job not found</h1>
        <p className="mt-2 text-gray-600">
          The job you’re looking for doesn’t exist or has been removed.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#424B54]">{job.title}</h1>
        <p className="text-[#424B54] mt-1">
          <span>
            <Link href={`/companies/${getSlug(job.company)}`} className="hover:text-blue-700">
              {job.company}
            </Link>
          </span>{' '}
          • {job.location}
        </p>
      </div>

      <p className="mt-2 text-[#424B54]">
        <strong>Type:</strong> {job.type} • <strong>Salary:</strong> {job.salary}
      </p>

      <div className="flex flex-wrap gap-2 mt-2">
        {job.tags?.map((tag: string) => (
          <span
            key={tag}
            className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium"
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
                    ? 'text-[#424B54] border-blue-600'
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
          href={`mailto:careers@elinnov.com?subject=Application – ${encodeURIComponent(job.title)}`}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md inline-block"
        >
          Apply Now
        </a>
      </div>

      {/* Related Jobs */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-[#424B54] mb-4">Related Jobs</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {relatedJobs.map((related) => (
            <Link
              key={related.id}
              href={`/jobs/${related.id}`}
              className="block p-4 border border-blue-600 rounded-md hover:shadow-sm transition"
            >
              <h3 className="font-semibold text-[#424B54] text-lg">{related.title}</h3>
              <p className="text-sm text-[#666] mt-1">
                {related.company} • {related.location}
              </p>
              <p className="text-sm text-[#666] mt-1">
                {related.type} • {related.salary}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {related.tags?.slice(0, 3).map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs"
                  >
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
