'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface Props {
  session: any;
}

export default function HomeClient({ session }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Please log in to access the homepage.</p>
      </div>
    );
  }

  return (
    <div
      className="relative h-screen w-full bg-[url('/images/bg.jpg')] bg-cover bg-center bg-no-repeat"
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Hero content */}
      <main className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          We are offering <span className="text-blue-400">1,000</span> job vacancies today!
        </h1>
        <p className="text-base md:text-lg max-w-xl mb-8">
          Find your dream job with us. We connect you with top companies and help you take the next step in your career.
        </p>

        {/* Search bar */}
        <div className="flex flex-nowrap mt-4 justify-center px-4 gap-0 w-full max-w-full">
          <input
            type="text"
            placeholder="Search for jobs, companies, or skills"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="placeholder-gray-400 px-3 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800 text-sm 
                      w-[45%] sm:w-[300px] min-w-[120px]"
          />
          <input
            type="text"
            placeholder="City, State, or Zip"
            className="placeholder-gray-400 px-3 py-2 border border-l border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800 text-sm 
                      w-[35%] sm:w-[200px] min-w-[100px]"
          />
          <button
            className="px-3 py-2 rounded-r-md bg-blue-600 text-white hover:bg-blue-700 transition text-sm w-[20%] sm:w-auto min-w-[80px] flex-shrink-0"
            onClick={() => setIsOpen(true)}
          >
            Find Jobs
          </button>
        </div>


      </main>

      {/* Dialog component */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-semibold text-[#424B54]">
                    About HireLink
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-[#646B75] leading-relaxed">
                      HireLink is your job discovery partner. Seamlessly browse opportunities or post your openings. We’ve crafted a clean, simple experience that puts users first.
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="rounded-md bg-[#424B54] text-white px-4 py-2 text-sm hover:bg-[#2E3640] transition"
                      onClick={() => setIsOpen(false)}
                    >
                      Got it!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
