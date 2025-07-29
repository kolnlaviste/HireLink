'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Clock, CheckCircle, XCircle, Briefcase, CalendarDays, ArrowRight, Home, Ban } from 'lucide-react';


type ApplicationStatus = 'Pending' | 'Interview' | 'Rejected' | 'Accepted' | 'Withdrawn';


type Application = {
  id: string;
  jobTitle: string;
  companyName: string;
  status: ApplicationStatus;
  applicationDate: string;
  jobId: string;
};

const getStatusBadge = (status: ApplicationStatus) => {
  let classes = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold gap-1';
  let icon = null;

  switch (status) {
    case 'Pending':
      classes += ' bg-yellow-100 text-yellow-700';
      icon = <Clock className="w-3 h-3" />;
      break;
    case 'Interview':
      classes += ' bg-blue-100 text-blue-700';
      icon = <Briefcase className="w-3 h-3" />; // Using Briefcase for interview, could be Phone if preferred
      break;
    case 'Rejected':
      classes += ' bg-red-100 text-red-700';
      icon = <XCircle className="w-3 h-3" />;
      break;
    case 'Accepted':
      classes += ' bg-green-100 text-green-700';
      icon = <CheckCircle className="w-3 h-3" />;
      break;
    case 'Withdrawn':
      classes += ' bg-gray-100 text-gray-700';
      icon = <Ban className="w-3 h-3" />; // Using Ban for withdrawn
      break;
    default:
      classes += ' bg-gray-100 text-gray-700';
      icon = <Clock className="w-3 h-3" />; // Default icon
  }
  return (
    <span className={classes}>
      {icon} {status}
    </span>
  );
};

export default function ApplicationsPageDesign() {
  const { data: session, status: sessionStatus } = useSession(); // Renamed status to sessionStatus to avoid conflict
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true); // Added loading state for data fetch
  const [error, setError] = useState<string | null>(null); // Added error state for data fetch

  // Role protection
  useEffect(() => {
    if (sessionStatus === 'authenticated' && session?.user.role !== 'jobseeker') {
      router.push('/');
    }
  }, [sessionStatus, session, router]);

  useEffect(() => {
    // Fetch applications from API
    const fetchApplications = async () => {
      if (sessionStatus === 'loading' || session?.user.role !== 'jobseeker') {
        // Do not fetch if session is still loading or user is not a jobseeker
        return;
      }

      try {
        const res = await fetch('/api/applications');
        if (!res.ok) {
          throw new Error('Failed to fetch applications');
        }
        const data: Application[] = await res.json();
        setApplications(data);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError('Failed to load applications. Please try again.');
      } finally {
        setLoading(false); // Set loading to false after fetch attempt
      }
    };

    // Only fetch if authenticated and user is a jobseeker
    if (sessionStatus === 'authenticated' && session?.user.role === 'jobseeker') {
      fetchApplications();
    }
  }, [sessionStatus, session]); // Add session to dependency array

  // Loading state (matched to ProfilePage's loading style)
  if (sessionStatus === 'loading' || loading) { // Check both session loading and data loading
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <p className="text-lg text-gray-600 animate-pulse">Loading applications...</p>
      </main>
    );
  }

  // Unauthorized/Error state
  if (!session || session.user.role !== 'jobseeker' || error) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 text-center">
        {error ? (
          <p className="text-lg text-red-600 font-medium mb-4">{error}</p>
        ) : (
          <p className="text-lg text-red-600 font-medium mb-4">
            <Ban className="w-8 h-8 text-red-500 mb-2 mx-auto" />
            You are not authorized to view this page.
          </p>
        )}
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
        >
          <Home className="w-5 h-5 mr-2" /> Go to Homepage
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-gray-900">
          My Applications
        </h1>

        {applications.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center max-w-2xl mx-auto shadow-md hover:shadow-lg transform hover:scale-[1.01] transition-all duration-200">
            <p className="text-xl text-gray-700 mb-6">
              You haven&apos;t applied for any jobs yet. Start exploring opportunities!
            </p>
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition"
            >
              <Briefcase className="w-5 h-5 mr-2" /> Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => (
              <Link
                key={app.id}
                href={`/jobs/${app.jobId}`}
                className="group bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transform hover:scale-[1.01] transition-all duration-200 block relative overflow-hidden"
              >
                {/* Subtle background accent on hover, matching AboutPage vibe */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition duration-200 pr-2">
                      {app.jobTitle}
                    </h2>
                    {getStatusBadge(app.status)}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{app.companyName}</p>
                  <p className="flex items-center text-gray-500 text-sm gap-2">
                    <CalendarDays className="w-4 h-4 text-gray-400" />
                    Applied on {new Date(app.applicationDate).toLocaleDateString()}
                  </p>

                  {/* Optional: A "View Details" text link if the whole card isn't a link */}
                  <div className="mt-4 pt-4 border-t border-gray-100 text-right">
                    <span className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200">
                      View Job Details <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}