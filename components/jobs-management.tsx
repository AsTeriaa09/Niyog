"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Edit2, Trash2, Plus, Search, Filter } from "lucide-react"

interface JobListing {
  id: string
  title: string
  department: string
  location: string
  type: "Full-time" | "Contract" | "Part-time"
  applications: number
  status: "open" | "closed" | "urgent"
  salary: string
  applications_detail: {
    applied: number
    screened: number
    interview: number
  }
}

interface JobsManagementProps {
  onNavigate?: (page: string) => void
}

export default function JobsManagement({ onNavigate }: JobsManagementProps) {
  const [jobs, setJobs] = useState<JobListing[]>([
    {
      id: "1",
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      applications: 45,
      status: "open",
      salary: "$120-150K",
      applications_detail: { applied: 45, screened: 28, interview: 5 },
    },
    {
      id: "2",
      title: "Product Manager",
      department: "Product",
      location: "New York, NY",
      type: "Full-time",
      applications: 28,
      status: "open",
      salary: "$100-130K",
      applications_detail: { applied: 28, screened: 15, interview: 3 },
    },
    {
      id: "3",
      title: "UX Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      applications: 18,
      status: "urgent",
      salary: "$90-120K",
      applications_detail: { applied: 18, screened: 12, interview: 2 },
    },
    {
      id: "4",
      title: "Backend Engineer (Contract)",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Contract",
      applications: 12,
      status: "closed",
      salary: "$150-180K",
      applications_detail: { applied: 12, screened: 8, interview: 1 },
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [expandedJob, setExpandedJob] = useState<string | null>(null)
  const [showJobForm, setShowJobForm] = useState(false)

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = !filterStatus || job.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const statusColors = {
    open: "bg-emerald-100 text-emerald-800",
    closed: "bg-slate-100 text-slate-800",
    urgent: "bg-red-100 text-red-800",
  }

  const handleDeleteJob = (jobId: string) => {
    setJobs(jobs.filter((job) => job.id !== jobId))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Manage Jobs</h1>
            <p className="text-sm text-slate-600 mt-1">Create and manage your job postings</p>
          </div>
          <Button onClick={() => setShowJobForm(!showJobForm)} className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus className="w-4 h-4" />
            Post New Job
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            {["open", "closed", "urgent"].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                onClick={() => setFilterStatus(filterStatus === status ? null : status)}
                className="capitalize"
              >
                <Filter className="w-4 h-4 mr-2" />
                {status}
              </Button>
            ))}
          </div>
        </div>

        {/* New Job Form */}
        {showJobForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg border border-slate-200 p-6 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6">Create New Job Posting</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Job Title"
                className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select Department</option>
                <option>Engineering</option>
                <option>Product</option>
                <option>Design</option>
                <option>Marketing</option>
              </select>
              <input
                type="text"
                placeholder="Location"
                className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Full-time</option>
                <option>Contract</option>
                <option>Part-time</option>
              </select>
              <input
                type="text"
                placeholder="Salary Range"
                className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Required Skills"
                className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <textarea
              placeholder="Job Description"
              rows={6}
              className="w-full mt-4 px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <div className="flex gap-3 mt-6">
              <Button className="bg-blue-600 hover:bg-blue-700">Publish Job</Button>
              <Button variant="outline" onClick={() => setShowJobForm(false)}>
                Cancel
              </Button>
            </div>
          </motion.div>
        )}

        {/* Jobs List */}
        <div className="space-y-3">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Job Header */}
                <div
                  className="p-6 cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                        <Badge className={statusColors[job.status]}>{job.status}</Badge>
                      </div>
                      <div className="flex gap-4 text-sm text-slate-600">
                        <span>{job.department}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                        <span>•</span>
                        <span className="font-semibold text-slate-900">{job.applications} applications</span>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform ${
                        expandedJob === job.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Job Details */}
                {expandedJob === job.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-slate-200 bg-slate-50 p-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Salary Range</p>
                        <p className="font-semibold text-slate-900">{job.salary}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Job Type</p>
                        <p className="font-semibold text-slate-900">{job.type}</p>
                      </div>
                    </div>

                    {/* Application Pipeline */}
                    <div className="mb-6">
                      <p className="text-sm text-slate-600 mb-3">Application Pipeline</p>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white rounded-lg p-3 border border-slate-200">
                          <p className="text-xs text-slate-600">Applied</p>
                          <p className="text-2xl font-bold text-blue-600">{job.applications_detail.applied}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-slate-200">
                          <p className="text-xs text-slate-600">Screened</p>
                          <p className="text-2xl font-bold text-green-600">{job.applications_detail.screened}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-slate-200">
                          <p className="text-xs text-slate-600">Interview</p>
                          <p className="text-2xl font-bold text-amber-600">{job.applications_detail.interview}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button variant="outline" className="gap-2 bg-transparent">
                        <Edit2 className="w-4 h-4" />
                        Edit Job
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleDeleteJob(job.id)}
                        className="gap-2 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700 ml-auto">View Applicants</Button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-4">No jobs found</p>
              <Button onClick={() => setShowJobForm(true)} className="bg-blue-600 hover:bg-blue-700">
                Create First Job
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
