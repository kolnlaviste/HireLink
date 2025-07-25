'use client';

import Image from 'next/image';

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          About <span className="text-blue-600">HireLink</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Bridging the gap between talented professionals and forward-thinking companies
          with a modern, efficient, and seamless job marketplace.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center md:text-left">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              At HireLink, our mission is to simplify the hiring process for both job seekers
              and employers. We believe finding the right fit should be efficient, transparent,
              and empowering — helping people land meaningful work while enabling companies to
              grow with the right talent.
            </p>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              We envision a future where professionals connect with opportunities that truly
              align with their goals, and companies build teams driven by passion and innovation.
            </p>
          </div>
          <div className="relative w-full h-64 md:h-80">
            <Image
              src="/images/teamwork.png"
              alt="Mission illustration"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose HireLink?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'For Job Seekers',
                desc: 'Browse tailored opportunities, filter by location, and apply seamlessly to positions that match your goals.',
                icon: '💼',
              },
              {
                title: 'For Employers',
                desc: 'Post job openings in minutes, manage applicants, and discover top talent ready to make an impact.',
                icon: '🏢',
              },
              {
                title: 'Seamless Experience',
                desc: 'Enjoy a modern interface with real-time updates and intuitive navigation for stress-free hiring.',
                icon: '⚡',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-gray-50 border rounded-xl p-6 text-center hover:shadow-md transition"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { name: 'Integrity', desc: 'We prioritize transparency and trust in everything we do.' },
            { name: 'Innovation', desc: 'We constantly improve and adopt new technologies to serve better.' },
            { name: 'Community', desc: 'We foster meaningful relationships between talent and companies.' },
            { name: 'Excellence', desc: 'We strive to deliver top-tier experiences for users and employers alike.' },
          ].map((value) => (
            <div
              key={value.name}
              className="p-6 bg-white border rounded-lg hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.name}</h3>
              <p className="text-gray-600 text-sm">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section (Optional) */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Meet the Team</h2>
          <div className="grid gap-10 md:grid-cols-3">
            {[
              { name: 'Koln Laviste', role: 'Founder & Lead Developer', img: '/profile1.jpg' },
              { name: 'Jane Smith', role: 'UI/UX Designer', img: '/profile2.jpg' },
              { name: 'John Doe', role: 'Backend Engineer', img: '/profile3.jpg' },
            ].map((member) => (
              <div key={member.name} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
                <Image
                  src={member.img}
                  alt={member.name}
                  width={80}
                  height={80}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Find Your Next Opportunity?
        </h2>
        <p className="text-gray-600 mb-8">
          Explore hundreds of opportunities or post a job today to connect with top talent.
        </p>
        <div className="space-x-4">
          <a
            href="/jobs"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
          >
            Browse Jobs
          </a>
          <a
            href="/post-job"
            className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg transition"
          >
            Post a Job
          </a>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
