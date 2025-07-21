'use client'

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Header from '../components/Header';

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#FFFFFF] text-[#424B54] min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#424B54] mb-6 tracking-tight">
          Discover Your Next Opportunity
        </h1>
        <p className="text-base md:text-lg text-[#646B75] max-w-xl mx-auto mb-10">
          HireLink is where talent meets opportunity. Find jobs, connect with forward-thinking companies, and take control of your career path.
        </p>

        <button
          className="bg-[#E1CE7A] text-[#424B54] font-medium px-6 py-3 rounded-lg shadow-sm hover:bg-[#EBCFB2] transition"
          onClick={() => setIsOpen(true)}
        >
          Learn More
        </button>

        {/* Dialog Component */}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
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
      </main>
    </div>
  );
}
