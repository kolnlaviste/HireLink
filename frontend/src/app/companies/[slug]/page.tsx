// app/companies/[slug]/page.tsx

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { companies } from '@/lib/companies';
import { jobs } from '@/lib/jobs';
import Link from 'next/link';
import { BuildingOffice2Icon, MapPinIcon } from '@heroicons/react/24/outline'; // Imported for UI enhancement

export default async function CompanyDetailsPage({ params }: { params: { slug: string } }) {
  const company = companies.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, '-') === params.slug
  );

  if (!company) return notFound();

  // Get all jobs belonging to this company (logic remains unchanged)
  const getJobs = (companyName: string) => {
    return jobs.filter((job) => job.company === companyName);
  };

  const companyJobs = getJobs(company.name);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"> {/* Increased max-width, improved padding */}
      {/* Company Header - Elevated Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-gray-100 flex items-center gap-6">
        <div className="w-24 h-24 flex-shrink-0 relative rounded-lg overflow-hidden bg-white border border-gray-100 shadow-sm"> {/* Larger, styled logo container */}
          <Image
            src={company.logo}
            alt={company.name}
            fill
            sizes="96px" // Optimize image loading for this size
            className="object-contain p-2" // Padding inside logo container
          />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-2"> {/* Larger, bolder title */}
            {company.name}
          </h1>
          <p className="text-lg text-gray-700 flex items-center gap-2"> {/* Improved text style, added icon for industry */}
            <BuildingOffice2Icon className="w-6 h-6 text-gray-500" />
            {company.industry || 'Industry not specified'}
          </p>
          {company.location && ( // Show location if available, with icon
            <p className="text-base text-gray-600 mt-1 flex items-center gap-2">
              <MapPinIcon className="w-5 h-5 text-gray-500" />
              {company.location}
            </p>
          )}
        </div>
      </div>

      {/* About Section - Separate Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">About {company.name}</h2> {/* Larger, bolder heading */}
        <p className="text-gray-700 leading-relaxed text-lg"> {/* Improved text style, larger */}
          {company.description || 'No description available for this company.'}
        </p>
      </div>

      {/* Open Positions Section - Separate Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Open Positions at {company.name}</h2> {/* Larger, bolder heading */}
        {companyJobs.length === 0 ? (
          <div className="mt-8 p-6 bg-gray-50 rounded-xl text-center text-gray-600 border border-gray-200 shadow-sm">
            <p className="text-xl font-medium mb-2">No open positions found.</p>
            <p>Check back soon for new opportunities!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"> {/* Adjusted grid, larger gap */}
            {companyJobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="block p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 ease-in-out" // Modern card styling with hover effects
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{job.title}</h3> {/* Larger, bolder title */}
                <p className="text-base text-gray-700 flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5 text-gray-500" /> {/* Location icon */}
                  {job.location}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}