'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition, Menu } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const userName = session?.user?.name || session?.user?.email;

  return (
    <header className="bg-white border-b border-[#E0E0E0]">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center gap-4">
          <Link href="/">
            <span className="text-2xl font-bold text-[#424B54]">HireLink</span>
          </Link>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-x-10">
          <Link href="/jobs" className="text-sm font-medium text-[#424B54] hover:text-[#E1CE7A]">Jobs</Link>
          <Link href="/companies" className="text-sm font-medium text-[#424B54] hover:text-[#E1CE7A]">Companies</Link>
          <Link href="#" className="text-sm font-medium text-[#424B54] hover:text-[#E1CE7A]">About</Link>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-x-4">
          {status === 'loading' ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : session ? (
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center items-center gap-1 text-sm font-medium text-[#424B54] hover:text-[#E1CE7A] transition">
                  Hi, {userName}
                  <ChevronDownIcon className="w-4 h-4" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => signOut()}
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                        >
                          Sign Out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <>
              <button
                onClick={() => signIn()}
                className="text-sm font-medium text-[#424B54] hover:text-[#E1CE7A] transition"
              >
                Login
              </button>
              <Link
                href="#"
                className="text-sm font-medium rounded-md bg-[#E1CE7A] text-[#424B54] px-4 py-2 hover:bg-[#ebcfb2] transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <div className="lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-[#424B54] hover:text-[#E1CE7A]"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <Transition show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="lg:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-10 bg-black bg-opacity-25" />
          </Transition.Child>

          <Dialog.Panel className="fixed inset-y-0 right-0 z-20 w-3/4 max-w-sm bg-white shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xl font-bold text-[#424B54]">HireLink</span>
              <button
                type="button"
                className="text-[#424B54] hover:text-[#E1CE7A]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <Link href="/jobs" className="block text-base font-medium text-[#424B54] hover:text-[#E1CE7A]">
                Jobs
              </Link>
              <Link href="/companies" className="block text-base font-medium text-[#424B54] hover:text-[#E1CE7A]">
                Companies
              </Link>
              <Link href="#" className="block text-base font-medium text-[#424B54] hover:text-[#E1CE7A]">
                About
              </Link>

              <div className="pt-4 border-t border-gray-200 mt-4">
                {status === 'loading' ? (
                  <p className="text-sm text-gray-500">Loading...</p>
                ) : session ? (
                  <>
                    <span className="block text-sm font-medium text-[#424B54]">Hi, {userName}</span>
                    <button
                      onClick={() => signOut()}
                      className="mt-2 block w-full text-center text-sm font-medium bg-red-500 text-white rounded-md py-2 hover:bg-red-600"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => signIn()}
                      className="block w-full text-center text-sm font-medium text-[#424B54] hover:text-[#E1CE7A]"
                    >
                      Login
                    </button>
                    <Link
                      href="#"
                      className="mt-2 block w-full text-center text-sm font-medium bg-[#E1CE7A] text-[#424B54] rounded-md py-2 hover:bg-[#ebcfb2]"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </header>
  );
};

export default Header;
