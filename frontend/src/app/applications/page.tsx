'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type ApplicationStatus = 'Pending' | 'Interview' | 'Rejected' | 'Accepted' | 'Withdrawn';

type Application = {
  id: string;
  jobTitle: string;
  companyName: string;
  status: ApplicationStatus;
  applicationDate: string;
  jobId: string;
};

const dummyApplications: Application[] = [
  {
    id: 'app1',
    jobTitle: 'Frontend Developer',
    companyName: 'InnovateX Solutions',
    status: 'Interview',
    applicationDate: '2025-07-15',
    jobId: 'job123',
  },
  {
    id: 'app2',
    jobTitle: 'Backend Engineer (Node.js)',
    companyName: 'DataGrid Technologies',
    status: 'Pending',
    applicationDate: '2025-07-20',
    jobId: 'job124',
  },
  {
    id: 'app3',
    jobTitle: 'UX/UI Designer',
    companyName: 'Creative Spark Studios',
    status: 'Rejected',
    applicationDate: '2025-07-10',
    jobId: 'job125',
  },
  {
    id: 'app4',
    jobTitle: 'Senior Full Stack Developer',
    companyName: 'Quantum Innovations Inc.',
    status: 'Accepted',
    applicationDate: '2025-07-01',
    jobId: 'job126',
  },
  {
    id: 'app5',
    jobTitle: 'Mobile App Developer (React Native)',
    companyName: 'Appify Global',
    status: 'Pending',
    applicationDate: '2025-07-22',
    jobId: 'job127',
  },
  {
    id: 'app6',
    jobTitle: 'DevOps Engineer',
    companyName: 'CloudNet Systems',
    status: 'Withdrawn',
    applicationDate: '2025-07-05',
    jobId: 'job128',
  },
];

// Status badges with lighter theme
const getStatusBadgeClasses = (status: ApplicationStatus) => {
  const baseClasses =
    'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold';

  switch (status) {
    case 'Pending':
      return `${baseClasses} bg-yellow-100 text-yellow-700 border-yellow-300`;
    case 'Interview':
      return `${baseClasses} bg-blue-100 text-blue-700 border-blue-300`;
    case 'Rejected':
      return `${baseClasses} bg-red-100 text-red-700 border-red-300`;
    case 'Accepted':
      return `${baseClasses} bg-green-100 text-green-700 border-green-300`;
    case 'Withdrawn':
      return `${baseClasses} bg-gray-100 text-gray-700 border-gray-300`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-700 border-gray-300`;
  }
};

const getButtonClasses = (
  variant: 'default' | 'outline' | 'destructive',
  fullWidth: boolean = false
) => {
  const baseClasses = `px-4 py-2 rounded-md font-medium transition-colors ${
    fullWidth ? 'w-full' : ''
  }`;
  switch (variant) {
    case 'default':
      return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700`;
    case 'outline':
      return `${baseClasses} border border-blue-600 text-blue-600 hover:bg-blue-50`;
    case 'destructive':
      return `${baseClasses} bg-red-600 text-white hover:bg-red-700`;
    default:
      return `${baseClasses} bg-gray-600 text-white hover:bg-gray-700`;
  }
};

export default function ApplicationsPageDesign() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not jobseeker
  useEffect(() => {
    if (status === 'authenticated' && session.user.role !== 'jobseeker') {
      router.push('/'); // redirect to homepage or a 403 page
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </main>
    );
  }

  // If unauthenticated or wrong role
  if (!session || session.user.role !== 'jobseeker') {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-medium">You are not authorized to view this page.</p>
      </main>
    );
  }

  const applicationsToDisplay = dummyApplications;

  return (
    <main className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#424B54]">
          My Applications
        </h1>

        {applicationsToDisplay.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center max-w-2xl mx-auto shadow-sm">
            <p className="text-xl text-gray-600 mb-6">
              You haven&apos;t applied for any jobs yet. Start exploring opportunities!
            </p>
            <Link href="/jobs" className={getButtonClasses('default', true)}>
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applicationsToDisplay.map((app) => (
              <div
                key={app.id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-semibold text-[#424B54] leading-tight">
                    {app.jobTitle}
                  </h2>
                  <span className={getStatusBadgeClasses(app.status)}>
                    {app.status}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-2">{app.companyName}</p>
                <p className="text-gray-400 text-xs mb-4">
                  Applied on:{' '}
                  {new Date(app.applicationDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>

                <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                  <Link
                    href={`/jobs/${app.jobId}`}
                    className={getButtonClasses('outline', true)}
                  >
                    View Job Details
                  </Link>
                  {app.status === 'Pending' && (
                    <button className={getButtonClasses('destructive', true)}>
                      Withdraw Application
                    </button>
                  )}
                  {app.status === 'Interview' && (
                    <button className={getButtonClasses('default', true)}>
                      Schedule Interview
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
