"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import JobForm from "./JobForm"
import { jobAPI } from "../services/api"

function EditJob() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchJob()
  }, [id])

  const fetchJob = async () => {
    try {
      setLoading(true)
      const response = await jobAPI.getJobById(id)
      setJob(response.data)
      setError(null)
    } catch (err) {
      console.error("Error fetching job:", err)
      setError("Job not found or failed to load.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Job not found</h1>
          <p className="text-gray-600">The job you're trying to edit doesn't exist or failed to load.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Job Post</h1>
        <p className="text-gray-600 mt-2">Update the job posting details</p>
      </div>
      <JobForm initialData={job} />
    </div>
  )
}

export default EditJob
