"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { jobAPI } from "../services/api"

function Home() {
  const [jobs, setJobs] = useState([])
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    companies: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const response = await jobAPI.getAllJobs()
      const jobsData = response.data || []

      setJobs(jobsData)
      setStats({
        totalJobs: jobsData.length,
        activeJobs: jobsData.filter((job) => job.status === "Active").length,
        companies: new Set(jobsData.map((job) => job.company)).size,
      })
      setError(null)
    } catch (err) {
      console.error("Error fetching jobs:", err)
      setError("Failed to load jobs. Please make sure the server is running on port 5000.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Welcome to Job Post Management</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Streamline your recruitment process with our comprehensive job posting platform
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-lg font-medium text-red-900 mb-2">Connection Error</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <div className="flex gap-4">
            <button
              onClick={fetchJobs}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
            <Link
              to="/add-job"
              className="border border-red-300 text-red-700 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors bg-white"
            >
              Add Job (Offline Mode)
            </Link>
          </div>
        </div>
      </div>
    )
  }

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
              <p className="text-xs text-gray-500">Job postings</p>
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
              <p className="text-sm font-medium text-gray-600">Active Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeJobs}</p>
              <p className="text-xs text-gray-500">Currently hiring</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
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
            <div className="p-3 bg-purple-100 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      </div>


      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-3">Our Mission</h2>
        <p className="text-blue-800">
          To connect talented professionals with amazing opportunities by providing an efficient and user-friendly job
          posting management system with MongoDB integration.
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
            MongoDB database integration
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            Real-time data synchronization
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            Efficient candidate screening
          </li>
        </ul>
      </div>

     
      
      
    </div>
  )
}

export default Home
