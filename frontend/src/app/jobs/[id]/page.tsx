// app/jobs/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';

const job = {
  title: 'Frontend Developer',
  company: 'Elinnov Technologies',
  location: 'Cebu City, PH',
  description: `Elinnov Technologies is seeking a skilled Frontend Developer to join our growing development team. As a Frontend Developer, you will be responsible for crafting modern, responsive, and accessible web interfaces for a variety of client and in-house projects. You will collaborate with UI/UX designers, backend developers, and product managers to bring digital products to life.

✅ Responsibilities:
Convert design mockups (Figma, Adobe XD) into responsive web pages using React, Next.js, and TailwindCSS

Build reusable components and front-end libraries for future use

Optimize applications for maximum speed and scalability

Collaborate with backend developers to integrate APIs and ensure seamless functionality

Ensure technical feasibility of UI/UX designs

Maintain and improve code quality through code reviews and testing

Stay up to date with emerging frontend technologies and propose improvements

📌 Tech Stack:
React / Next.js

TypeScript / JavaScript (ES6+)

TailwindCSS / SCSS

Git & GitHub

REST APIs & JSON

Vercel / Netlify / CI-CD Pipelines (optional but a plus)

👤 Qualifications:
1–3 years of experience in frontend development

Solid understanding of semantic HTML5, CSS3, and JavaScript

Experience with React or Next.js in production projects

Familiarity with responsive and mobile-first design

Basic understanding of accessibility standards (WCAG, ARIA)

Ability to collaborate effectively in a cross-functional team

Excellent attention to detail and a passion for clean, maintainable code

Bonus: Familiarity with headless CMS, GraphQL, or testing libraries (e.g. Jest, Testing Library)`,
  about: `Elinnov Technologies is a Cebu-based software development firm specializing in innovative digital solutions for businesses across the globe. We combine modern web technologies with scalable architectures to craft intuitive, performant applications.

Our portfolio spans web applications, mobile solutions, and cloud-native systems for industries such as e-commerce, education, and enterprise automation. At Elinnov, we believe in continuous learning, open collaboration, and delivering with excellence.

Why Join Us?

Work with a passionate, tight-knit development team

Competitive compensation and performance bonuses

Learning budget and professional development support

Flexible work hours and a hybrid work environment

Opportunity to contribute to meaningful products that scale

`,
  apply: `Submit your updated resume, GitHub/portfolio link, and a brief cover letter explaining why you're a good fit for the role to:

📧 careers@elinnov.com
📎 Subject line: Application – Frontend Developer – [Your Name]

Applications are reviewed on a rolling basis. Only shortlisted candidates will be contacted for interviews.`,
};

const tabs = ['Overview', 'Company', 'How to Apply'];

const JobDetailsPage = () =>{
  const params = useParams();
  const jobId = params?.id;

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#424B54]">{job.title}</h1>
        <p className="text-[#424B54] mt-1">{job.company} • {job.location}</p>
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-2 border-b border-[#E0E0E0] mb-4">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                classNames(
                  'px-4 py-2 text-sm font-medium border-b-2 transition',
                  selected
                    ? 'text-[#424B54] border-[#E1CE7A]'
                    : 'text-[#888] border-transparent hover:text-[#424B54]'
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <p className="text-[#424B54] whitespace-pre-line">{job.description}</p>
          </Tab.Panel>
          <Tab.Panel>
            <p className="text-[#424B54] whitespace-pre-line">{job.about}</p>
          </Tab.Panel>
          <Tab.Panel>
            <p className="text-[#424B54] whitespace-pre-line">{job.apply}</p>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <div className="mt-6">
        <button className="bg-[#E1CE7A] hover:bg-[#ebcfb2] text-[#424B54] font-medium px-6 py-3 rounded-md">
          Apply Now
        </button>
      </div>
    </main>
  );
}

export default JobDetailsPage;