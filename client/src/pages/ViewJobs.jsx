"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import JobCard from "../components/JobCard"

function ViewJobs() {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  useEffect(() => {
    const savedJobs = localStorage.getItem("jobs")
    if (savedJobs) {
      const jobsData = JSON.parse(savedJobs)
      setJobs(jobsData)
      setFilteredJobs(jobsData)
    }
  }, [])

  useEffect(() => {
    let filtered = jobs

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by job type
    if (filterType !== "all") {
      filtered = filtered.filter((job) => job.jobType === filterType)
    }

    setFilteredJobs(filtered)
  }, [jobs, searchTerm, filterType])

  const handleDelete = (id) => {
    const updatedJobs = jobs.filter((job) => job._id !== id)
    setJobs(updatedJobs)
    localStorage.setItem("jobs", JSON.stringify(updatedJobs))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Job Posts</h1>
          <p className="text-gray-600 mt-1">Manage your job postings ({filteredJobs.length} jobs)</p>
        </div>
        <Link
          to="/add-job"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center shadow-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Job
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search jobs by title, company, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-gray-900 bg-white"
                    />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full sm:w-48 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white text-gray-900"
          >
          <option value="all">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {jobs.length === 0 ? "No job posts added yet" : "No jobs match your search"}
          </h3>
          <p className="text-gray-600 mb-6">
            {jobs.length === 0
              ? 'Click "Add Job" to create your first job posting.'
              : "Try adjusting your search terms or filters."}
          </p>
          {jobs.length === 0 && (
            <Link
              to="/add-job"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
            >
              Create Your First Job Post
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewJobs
