"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function Home() {
  const [jobs, setJobs] = useState([])
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    companies: 0,
  })

  useEffect(() => {
    // Load jobs from localStorage
    const savedJobs = localStorage.getItem("jobs")
    if (savedJobs) {
      const jobsData = JSON.parse(savedJobs)
      setJobs(jobsData)
      setStats({
        totalJobs: jobsData.length,
        activeJobs: jobsData.length,
        companies: new Set(jobsData.map((job) => job.company)).size,
      })
    }
  }, [])

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Job Post Management</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Streamline your recruitment process with our comprehensive job posting platform
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalJobs}</p>
              <p className="text-xs text-gray-500">Active job postings</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.5"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Companies</p>
              <p className="text-2xl font-bold text-gray-900">{stats.companies}</p>
              <p className="text-xs text-gray-500">Hiring partners</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeJobs}</p>
              <p className="text-xs text-gray-500">New postings</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-3">Our Mission</h2>
        <p className="text-blue-800">
          To connect talented professionals with amazing opportunities by providing an efficient and user-friendly job
          posting management system.
        </p>
      </div>

      {/* Key Features */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-green-900 mb-4">Key Features</h2>
        <ul className="space-y-2 text-green-800">
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            Easy job post creation and management
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            Comprehensive job details tracking
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            User-friendly interface
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            Efficient candidate screening
          </li>
        </ul>
      </div>

      {/* Getting Started */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Getting Started
        </h2>
        <p className="text-purple-800 mb-4">
          Ready to post your first job? Click on "Add Job" in the sidebar to create a new job posting. You can view all
          your posted jobs by clicking "View Jobs" to manage your recruitment pipeline effectively.
        </p>
        <div className="flex gap-4">
          <Link
            to="/add-job"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
          >
            Post Your First Job
          </Link>
          <Link
            to="/view-jobs"
            className="border border-purple-300 text-purple-700 hover:bg-purple-100 px-6 py-3 rounded-lg font-medium transition-colors bg-white shadow-sm"
          >
            View All Jobs
          </Link>
        </div>
      </div>

      {/* Recent Jobs Preview */}
      {jobs.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Recent Job Posts</h2>
          <p className="text-gray-600 mb-4">Your latest job postings</p>
          <div className="space-y-3">
            {jobs.slice(0, 3).map((job) => (
              <div
                key={job._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{job.title}</h4>
                  <p className="text-sm text-gray-600">
                    {job.company} • {job.location}
                  </p>
                </div>
                <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                  {job.jobType}
                </div>
              </div>
            ))}
          </div>
          {jobs.length > 3 && (
            <Link
              to="/view-jobs"
              className="block w-full text-center border border-gray-300 hover:bg-gray-50 px-4 py-3 rounded-lg font-medium transition-colors mt-4 bg-white"
            >
              View All {jobs.length} Jobs
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export default Home
