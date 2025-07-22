// app/jobs/page.tsx

import React from 'react';
import Link from 'next/link';
import { jobs } from '@/lib/jobs';



export default function JobsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6 text-[#424B54]">Job Openings</h1>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="block border rounded-md p-4 hover:bg-[#EBcfB2] transition"
          >
            <h2 className="text-xl font-medium text-[#424B54]">{job.title}</h2>
            <p className="text-sm text-[#C5BAAF]">{job.company} • {job.location}</p>
            <span className="inline-block mt-2 text-xs font-semibold bg-[#E1CE7A] text-[#424B54] px-2 py-1 rounded">
              {job.type}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
