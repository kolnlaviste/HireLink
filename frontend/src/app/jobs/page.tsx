// app/jobs/page.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { jobs } from '@/lib/jobs';
import { companies } from '@/lib/companies';

export default function JobsPage() {
  // Helper function to get logo filename based on company name
  const getCompanyLogo = (companyName: string) => {
    const company = companies.find((c) => c.name === companyName);
    return company?.logo ?? '/logos/default-logo.png'; // make sure default is also in public/logos
  };


  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-8 text-center text-[#424B54]">Job Openings</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="border rounded-lg p-5 bg-white hover:bg-[#F7F4ED] transition shadow-sm"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 relative">
                <Image
                  src={getCompanyLogo(job.company)}
                  alt={`${job.company} logo`}
                  fill
                  className="object-contain rounded"
                />

              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#424B54]">{job.title}</h2>
                <p className="text-sm text-[#C5BAAF]">{job.company}</p>
              </div>
            </div>

            <p className="text-sm text-[#424B54] mb-2">{job.location}</p>
            <span className="inline-block text-xs font-semibold bg-[#E1CE7A] text-[#424B54] px-3 py-1 rounded">
              {job.type}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
