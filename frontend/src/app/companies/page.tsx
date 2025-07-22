// app/companies/page.tsx

import { companies } from '@/lib/companies';
import Link from 'next/link';

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

export default function CompaniesPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#424B54]">
        Explore Companies
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {companies.map((company) => (
          <Link
            key={company.id}
            href={`/companies/${slugify(company.name)}`}
            className="block border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition hover:border-gray-300"
          >
            <h2 className="text-xl font-semibold text-[#424B54]">{company.name}</h2>
            <p className="text-gray-600 mt-2">{company.description}</p>
            <p className="text-sm text-gray-500 mt-1">• {company.location}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
