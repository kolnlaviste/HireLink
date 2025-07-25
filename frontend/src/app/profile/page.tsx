'use client';

import { useSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <p className="text-gray-500 animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!session) {
    redirect('/login');
    return null;
  }

  const user = session.user!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 transition hover:shadow-xl">
          {/* Avatar + Name Section */}
          <div className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-6">
            <img
              src={user.image ?? '/default-logo.png'}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-gray-100 shadow-md object-cover transition hover:scale-105"
            />
            <div className="mt-6 sm:mt-0 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-800">
                {user.name ?? 'Anonymous User'}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {user.email ?? 'No email provided'}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 border-t border-gray-200" />

          {/* Info Section */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="text-lg font-medium text-gray-800">
                Member
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Joined</p>
              <p className="text-lg font-medium text-gray-800">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex-1 bg-red-500 text-white px-5 py-3 rounded-lg text-sm font-medium hover:bg-red-600 transition"
            >
              Log Out
            </button>
            <button
              onClick={() => alert('Edit Profile Coming Soon!')}
              className="flex-1 bg-gray-100 text-gray-800 px-5 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
