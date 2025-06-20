const API_BASE_URL = "http://localhost:5000/api"

// API service functions
export const jobAPI = {
  // Get all jobs with optional search and filters
  getAllJobs: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const url = queryString ? `${API_BASE_URL}/jobs?${queryString}` : `${API_BASE_URL}/jobs`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Failed to fetch jobs")
    }
    return response.json()
  },

  // Get single job by ID
  getJobById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`)
    if (!response.ok) {
      throw new Error("Failed to fetch job")
    }
    return response.json()
  },

  // Create new job
  createJob: async (jobData) => {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    })
    if (!response.ok) {
      throw new Error("Failed to create job")
    }
    return response.json()
  },

  // Update job
  updateJob: async (id, jobData) => {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    })
    if (!response.ok) {
      throw new Error("Failed to update job")
    }
    return response.json()
  },

  // Delete job
  deleteJob: async (id) => {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Failed to delete job")
    }
    return response.json()
  },

  // Health check
  healthCheck: async () => {
    const response = await fetch(`${API_BASE_URL}/health`)
    if (!response.ok) {
      throw new Error("Server is not responding")
    }
    return response.json()
  },
}
