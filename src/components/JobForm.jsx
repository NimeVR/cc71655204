"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function JobForm({ initialData }) {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salaryRange: "",
    jobType: "Full-time",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title,
        company: initialData.company,
        location: initialData.location,
        salaryRange: initialData.salaryRange,
        jobType: initialData.jobType,
        description: initialData.description,
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.title || !form.company) {
      alert("Job Title and Company Name are required")
      return
    }

    setIsSubmitting(true)

    try {
      const savedJobs = localStorage.getItem("jobs")
      const jobs = savedJobs ? JSON.parse(savedJobs) : []

      if (initialData) {
        // Update existing job
        const updatedJobs = jobs.map((job) => (job._id === initialData._id ? { ...job, ...form } : job))
        localStorage.setItem("jobs", JSON.stringify(updatedJobs))
      } else {
        // Add new job
        const newJob = {
          _id: Date.now().toString(),
          ...form,
          createdAt: new Date().toISOString(),
        }
        jobs.push(newJob)
        localStorage.setItem("jobs", JSON.stringify(jobs))
      }

      navigate("/view-jobs")
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Failed to submit form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/view-jobs")}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Jobs
        </button>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">{initialData ? "Edit Job Post" : "Create New Job Post"}</h2>

      <form onSubmit={handleSubmit} className="space-y-6 text-black-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Job Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. Senior Software Engineer"
              value={form.title}
              onChange={handleChange}
              required
             className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-gray-900 bg-white"
             />
          </div>
          <div className="space-y-2">
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Company Name *
            </label>
            <input
              id="company"
              name="company"
              type="text"
              placeholder="e.g. Tech Corp Inc."
              value={form.company}
              onChange={handleChange}
              required
             className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-gray-900 bg-white"
             />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="e.g. New York, NY"
              value={form.location}
              onChange={handleChange}
             className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-gray-900 bg-white"
             />
          </div>
          <div className="space-y-2">
            <label htmlFor="salaryRange" className="block text-sm font-medium text-gray-700">
              Salary Range
            </label>
            <input
              id="salaryRange"
              name="salaryRange"
              type="text"
              placeholder="e.g. $80,000 - $120,000"
              value={form.salaryRange}
              onChange={handleChange}
             className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-gray-900 bg-white"
             />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
            Job Type
          </label>
          <select
            id="jobType"
            name="jobType"
            value={form.jobType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-gray-900 bg-white"
            >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe the role, responsibilities, requirements, and benefits..."
            value={form.description}
            onChange={handleChange}
            rows={6}
           className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-gray-900 bg-white"
           />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center shadow-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h2m0-4h9m0 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 002 2z"
              />
            </svg>
            {isSubmitting ? "Saving..." : initialData ? "Update Job Post" : "Create Job Post"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/view-jobs")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors shadow-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default JobForm
