const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      maxlength: [100, "Job title cannot exceed 100 characters"],
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      maxlength: [100, "Location cannot exceed 100 characters"],
    },
    salaryRange: {
      type: String,
      required: [true, "Salary range is required"],
      trim: true,
    },
    jobType: {
      type: String,
      required: [true, "Job type is required"],
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Freelance"],
      default: "Full-time",
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
      maxlength: [2000, "Job description cannot exceed 2000 characters"],
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Closed"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
)

// Create indexes for better search performance
jobSchema.index({ title: "text", company: "text", location: "text", description: "text" })
jobSchema.index({ status: 1 })
jobSchema.index({ jobType: 1 })
jobSchema.index({ createdAt: -1 })

module.exports = mongoose.model("Job", jobSchema)
