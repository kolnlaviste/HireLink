'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Loading...</p>;
  if (!session) redirect('/login');

  const user = session.user!;

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div>
          <p className="text-sm text-gray-600">Name:</p>
          <p className="text-lg font-semibold">{user.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Email:</p>
          <p className="text-lg font-semibold">{user.email}</p>
        </div>
        {user.image && (
          <div>
            <p className="text-sm text-gray-600">Profile Picture:</p>
            <img
              src={user.image}
              alt="Profile"
              className="mt-2 w-20 h-20 rounded-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
