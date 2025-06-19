import JobForm from "../components/JobForm"

function AddJob() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Job Post</h1>
        <p className="text-gray-600 mt-2">Create a new job posting to attract top talent</p>
      </div>
      <JobForm />
    </div>
  )
}

export default AddJob
