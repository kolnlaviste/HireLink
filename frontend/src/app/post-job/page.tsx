'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PostJobPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    tags: '',
    description: '',
    about: '',
    apply: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert tags from comma-separated to array
    const payload = {
      ...form,
      tags: form.tags
        ? form.tags.split(',').map((tag) => tag.trim())
        : []
    };

    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const { job } = await res.json();

      // Redirect to the job details page of the newly created job
      router.push(`/jobs/${job.id}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Post a Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Job Title */}
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />

        {/* Company */}
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />

        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        {/* Job Type */}
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        >
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
          <option>Internship</option>
        </select>

        {/* Salary */}
        <input
          type="text"
          name="salary"
          placeholder="Salary (optional)"
          value={form.salary}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        {/* Tags */}
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        {/* Job Description */}
        <textarea
          name="description"
          placeholder="Job Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          required
          className="w-full p-3 border rounded"
        />

        {/* About Company */}
        <textarea
          name="about"
          placeholder="About the Company"
          value={form.about}
          onChange={handleChange}
          rows={3}
          className="w-full p-3 border rounded"
        />

        {/* How to Apply */}
        <textarea
          name="apply"
          placeholder="How to Apply"
          value={form.apply}
          onChange={handleChange}
          rows={3}
          className="w-full p-3 border rounded"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJobPage;