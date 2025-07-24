// app/companies/[slug]/page.tsx

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { companies } from '@/lib/companies';
import { jobs } from '@/lib/jobs';
import Link from 'next/link';

export default async function CompanyDetailsPage({ params }: { params: { slug: string } }) {
  const company = companies.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, '-') === params.slug
  );

  if (!company) return notFound();

  // Get all jobs belonging to this company
  const getJobs = (companyName: string) => {
    return jobs.filter((job) => job.company === companyName);
  };

  const companyJobs = getJobs(company.name);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Company Header */}
      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 relative">
          <Image
            src={company.logo}
            alt={company.name}
            fill
            className="object-contain rounded"
          />
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">{company.name}</h1>
          <p className="text-gray-600">{company.industry || 'Industry not specified'}</p>
        </div>
      </div>

      {/* About Section */}
      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-medium text-gray-800">About</h2>
        <p className="text-gray-700">
          {company.description || 'No description available for this company.'}
        </p>
      </div>

      {/* Jobs Section */}
      <div>
        <h2 className="text-xl font-medium text-gray-800 mb-4">Open Positions</h2>
        {companyJobs.length === 0 ? (
          <p className="text-gray-600">No open positions for this company.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyJobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="border rounded-lg p-4 hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.location}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
