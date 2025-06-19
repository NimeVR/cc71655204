"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import JobForm from "./JobForm"

function EditJob() {
  const { id } = useParams()
  const [job, setJob] = useState(null)

  useEffect(() => {
    const savedJobs = localStorage.getItem("jobs")
    if (savedJobs) {
      const jobs = JSON.parse(savedJobs)
      const foundJob = jobs.find((j) => j._id === id)
      if (foundJob) {
        setJob(foundJob)
      }
    }
  }, [id])

  if (!job) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Job not found</h1>
          <p className="text-gray-600">The job you're trying to edit doesn't exist.</p>
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
