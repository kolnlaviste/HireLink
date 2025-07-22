// app/companies/[slug]/page.tsx

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { companies } from '@/lib/companies'; // make sure this file is safe to import server-side

export default function CompanyDetailsPage({ params }: { params: { slug: string } }) {
  const company = companies.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, '-') === params.slug
  );

  if (!company) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 relative">
          <Image
            src={`${company.logo}`}
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

      <div className="space-y-4">
        <h2 className="text-xl font-medium text-gray-800">About</h2>
        <p className="text-gray-700">
          {company.description || 'No description available for this company.'}
        </p>
      </div>
    </main>
  );
}
