// app/companies/page.tsx

import { companies } from '@/lib/companies';
import Link from 'next/link';
import Image from 'next/image'; // Import Image component
import { MapPinIcon } from '@heroicons/react/24/outline'; // Import an icon for location

// Helper function remains the same
function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

// Helper to get company logo, consistent with JobsPage
const getCompanyLogo = (companyName: string) => {
  const company = companies.find((c) => c.name === companyName);
  return company?.logo ?? '/default-logo.png'; // Assuming 'logo' property exists or use a default
};

export default function CompaniesPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"> {/* Increased max-width, improved padding */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-gray-900 tracking-tight"> {/* Larger, bolder, tighter tracking */}
        Our Featured Companies
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"> {/* Adjusted grid, larger gap */}
        {companies.map((company) => (
          <Link
            key={company.id}
            href={`/companies/${slugify(company.name)}`}
            className="group relative block border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden" // Modern card styling with hover effects
          >
            {/* Optional: subtle background pattern or gradient for modern touch on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

            <div className="relative z-10"> {/* Ensure content is above the hover gradient */}
              <div className="flex items-center gap-4 mb-4">
                {/* Company Logo */}
                <div className="w-16 h-16 flex-shrink-0 relative rounded-md overflow-hidden bg-white border border-gray-100 shadow-sm"> {/* Larger, slightly elevated logo container */}
                  <Image
                    src={getCompanyLogo(company.name)}
                    alt={`${company.name} logo`}
                    fill
                    sizes="64px" // Optimize image loading for a fixed size
                    className="object-contain p-1" // Padding inside the logo container
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition duration-200 leading-tight"> {/* Larger title, blue on hover */}
                    {company.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">{company.industry || 'Industry not specified'}</p> {/* Added industry or placeholder */}
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed text-base mb-4 relative z-10"> {/* Improved description styling */}
                {company.description || 'No description available.'}
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-500 relative z-10"> {/* Location with icon */}
                <MapPinIcon className="w-4 h-4 text-gray-400" /> {/* Location icon */}
                <span>{company.location || 'Location not specified'}</span> {/* Added placeholder */}
              </div>
            </div>
          </Link>
        ))}
        {companies.length === 0 && (
          <div className="col-span-full mt-10 p-8 bg-gray-50 rounded-lg text-center text-gray-600 border border-gray-200 shadow-sm">
            <p className="text-lg font-medium mb-2">No companies found.</p>
            <p>Check back later for new additions!</p>
          </div>
        )}
      </div>
    </main>
  );
}