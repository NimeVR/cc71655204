const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const Job = require("./models/Job")

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/jobpostmanagement", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB")
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error)
    process.exit(1)
  })

// Routes

// GET /api/jobs - Get all jobs with search and filter
app.get("/api/jobs", async (req, res) => {
  try {
    const { search, status, jobType, page = 1, limit = 10 } = req.query

    // Build query object
    const query = {}

    // Add search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ]
    }

    // Add filters
    if (status) {
      query.status = status
    }

    if (jobType) {
      query.jobType = jobType
    }

    // Calculate pagination
    const skip = (Number.parseInt(page) - 1) * Number.parseInt(limit)

    // Execute query with pagination
    const jobs = await Job.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number.parseInt(limit))

    // Get total count for pagination
    const total = await Job.countDocuments(query)

    res.json({
      success: true,
      data: jobs,
      pagination: {
        current: Number.parseInt(page),
        pages: Math.ceil(total / Number.parseInt(limit)),
        total,
      },
    })
  } catch (error) {
    console.error("Error fetching jobs:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching jobs",
      error: error.message,
    })
  }
})

// GET /api/jobs/:id - Get single job
app.get("/api/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      })
    }

    res.json({
      success: true,
      data: job,
    })
  } catch (error) {
    console.error("Error fetching job:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching job",
      error: error.message,
    })
  }
})

// POST /api/jobs - Create new job
app.post("/api/jobs", async (req, res) => {
  try {
    const { title, company, location, salaryRange, jobType, description, status } = req.body

    // Validation
    if (!title || !company || !location || !salaryRange || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: title, company, location, salaryRange, description",
      })
    }

    const job = new Job({
      title,
      company,
      location,
      salaryRange,
      jobType: jobType || "Full-time",
      description,
      status: status || "Active",
    })

    const savedJob = await job.save()

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: savedJob,
    })
  } catch (error) {
    console.error("Error creating job:", error)
    res.status(400).json({
      success: false,
      message: "Error creating job",
      error: error.message,
    })
  }
})

// PUT /api/jobs/:id - Update job
app.put("/api/jobs/:id", async (req, res) => {
  try {
    const { title, company, location, salaryRange, jobType, description, status } = req.body

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      {
        title,
        company,
        location,
        salaryRange,
        jobType,
        description,
        status,
      },
      { new: true, runValidators: true },
    )

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      })
    }

    res.json({
      success: true,
      message: "Job updated successfully",
      data: job,
    })
  } catch (error) {
    console.error("Error updating job:", error)
    res.status(400).json({
      success: false,
      message: "Error updating job",
      error: error.message,
    })
  }
})

// DELETE /api/jobs/:id - Delete job
app.delete("/api/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id)

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      })
    }

    res.json({
      success: true,
      message: "Job deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting job:", error)
    res.status(500).json({
      success: false,
      message: "Error deleting job",
      error: error.message,
    })
  }
})

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running!",
    timestamp: new Date().toISOString(),
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : "Internal server error",
  })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`)
  console.log(`📍 API endpoints available at http://localhost:${PORT}/api`)
})
