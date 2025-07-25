'use client';

import { useSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Image from 'next/image'; // Import Next.js Image component
// Import Lucide icons to match the AboutPage
import { User, Mail, CalendarDays, Briefcase, Pencil, LogOut } from "lucide-react";


const ProfilePage = () => {
  const { data: session, status } = useSession();

  // --- DO NOT CHANGE ANYTHING - LOGIC KEPT AS IS ---
  if (status === 'loading') {
    return (
      // Loading state adopted from JobsPage, with AboutPage background
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <p className="text-lg text-gray-600 animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!session) {
    redirect('/login');
    return null;
  }

  const user = session.user!;
  // --- END DO NOT CHANGE ANYTHING ---


  return (
    // Overall Page Wrapper - Same background as AboutPage, no blobs
    <div className="min-h-screen py-16 px-6
                    bg-gradient-to-br from-gray-50 via-white to-gray-100">

      <div className="max-w-3xl mx-auto">
        {/* Main Profile Card - Matched to AboutPage's section/card style */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100
                        overflow-hidden transform transition-all duration-200 hover:scale-[1.01] hover:shadow-xl"> {/* Matched AboutPage card hover */}

          <div className="p-8 sm:p-10 relative">

            {/* Avatar + Name Section - Simplified avatar, matching typography */}
            <div className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-8">
              <Image
                src={user.image ?? '/default-logo.png'} // Kept original path
                alt="Profile Avatar"
                width={120} // Appropriate size for w-32 (128px)
                height={120} // Appropriate size for h-32 (128px)
                className="rounded-full border-4 border-white shadow-lg object-cover flex-shrink-0" // Simplified ring
              />
              <div className="mt-6 sm:mt-0 text-center sm:text-left flex-grow">
                <h1 className="text-3xl font-extrabold text-gray-900 leading-tight"> {/* text-gray-900 matches AboutPage headings */}
                  {user.name ?? 'Anonymous User'}
                </h1>
                <p className="text-gray-600 text-base mt-1"> {/* Removed font-mono */}
                  {user.email ?? 'No email provided'}
                </p>
                {/* User Role Display - Simple badge matching AboutPage general text style */}
                <span className={`inline-flex items-center mt-3 px-3 py-1 rounded-full text-sm font-semibold
                                  ${user.role === 'employer' ? 'bg-indigo-100 text-indigo-700' : 'bg-green-100 text-green-700'}`}>
                  <Briefcase className="w-4 h-4 mr-1" /> {/* Lucide icon */}
                  {user.role === 'employer' ? 'Employer Account' : 'Job Seeker Account'}
                </span>
              </div>
            </div>

            {/* Section Divider - Simple border like AboutPage */}
            <div className="my-10 border-t border-gray-200" />

            {/* Info Section - Detail cards matching AboutPage's feature cards */}
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              {/* Role Detail Card */}
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-sm
                              hover:shadow-lg hover:scale-[1.02] transition-all duration-200"> {/* Matched AboutPage hover */}
                <p className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" /> {/* Lucide icon */}
                    Role
                </p>
                <p className="text-xl font-semibold text-gray-800">
                  {user.role === 'employer' ? 'Employer' : 'Job Seeker'}
                </p>
              </div>

              {/* Joined Date Detail Card */}
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-sm
                              hover:shadow-lg hover:scale-[1.02] transition-all duration-200"> {/* Matched AboutPage hover */}
                <p className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-blue-600" /> {/* Lucide icon */}
                    Joined On
                </p>
                <p className="text-xl font-semibold text-gray-800">
                  {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>

            {/* Action Buttons - Matched to AboutPage's button styles */}
            <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-end">
              <button
                onClick={() => alert('Edit Profile Coming Soon!')}
                className="inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg transition"
              >
                <Pencil className="w-5 h-5 mr-2" /> {/* Lucide icon */}
                Edit Profile
              </button>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
              >
                <LogOut className="w-5 h-5 mr-2" /> {/* Lucide icon */}
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;