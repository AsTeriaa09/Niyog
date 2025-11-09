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
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [showAIEnhancement, setShowAIEnhancement] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [newJobData, setNewJobData] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time" as "Full-time" | "Contract" | "Part-time",
    salary: "",
    skills: "",
    description: "",
  })

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

  const handleAIEnhancement = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowAIEnhancement(true)
    }, 2000)
  }

  const getAISuggestions = () => {
    const suggestions = []
    
    if (newJobData.title) {
      if (newJobData.title.toLowerCase().includes("developer")) {
        suggestions.push({
          field: "Title",
          current: newJobData.title,
          suggested: newJobData.title.replace(/developer/i, "Engineer"),
          reason: "Engineer typically attracts 23% more qualified candidates than Developer"
        })
      } else if (newJobData.title.toLowerCase().includes("manager")) {
        suggestions.push({
          field: "Title",
          current: newJobData.title,
          suggested: `Senior ${newJobData.title}`,
          reason: "Adding seniority level increases application quality by 34%"
        })
      }
    }

    if (newJobData.location && newJobData.location.toLowerCase() === "remote") {
      suggestions.push({
        field: "Location",
        current: newJobData.location,
        suggested: "Remote (US Timezone)",
        reason: "Specifying timezone reduces unqualified applications by 41%"
      })
    }

    if (newJobData.description && newJobData.description.length < 100) {
      suggestions.push({
        field: "Description",
        current: "Current description is too brief",
        suggested: "Add 3-5 paragraphs covering: role overview, key responsibilities, team culture, growth opportunities",
        reason: "Detailed descriptions receive 67% more applications"
      })
    }

    if (newJobData.salary && !newJobData.salary.includes("K")) {
      suggestions.push({
        field: "Salary",
        current: newJobData.salary,
        suggested: newJobData.salary + "K",
        reason: "Standard formatting improves clarity and professionalism"
      })
    }

    if (suggestions.length === 0) {
      suggestions.push({
        field: "Overall",
        current: "Your job posting looks good!",
        suggested: "Consider adding more details to attract top talent",
        reason: "Comprehensive postings perform 45% better"
      })
    }

    return suggestions
  }

  const handlePublishJob = () => {
    if (!newJobData.title || !newJobData.department) {
      alert("Please fill in at least the job title and department")
      return
    }

    const newJob: JobListing = {
      id: (jobs.length + 1).toString(),
      title: newJobData.title,
      department: newJobData.department,
      location: newJobData.location || "Not specified",
      type: newJobData.type,
      applications: 0,
      status: "open",
      salary: newJobData.salary || "Competitive",
      applications_detail: { applied: 0, screened: 0, interview: 0 },
    }

    setJobs([newJob, ...jobs])
    setShowSuccessMessage(true)
    
    setTimeout(() => {
      setShowSuccessMessage(false)
      setShowJobForm(false)
      setShowAIEnhancement(false)
      setNewJobData({
        title: "",
        department: "",
        location: "",
        type: "Full-time",
        salary: "",
        skills: "",
        description: "",
      })
    }, 3000)
  }

  const applyAISuggestion = (field: string, suggested: string) => {
    if (field === "Title") {
      setNewJobData({ ...newJobData, title: suggested })
    } else if (field === "Location") {
      setNewJobData({ ...newJobData, location: suggested })
    } else if (field === "Salary") {
      setNewJobData({ ...newJobData, salary: suggested })
    }
    setShowAIEnhancement(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Manage Jobs</h1>
            <p className="text-sm text-slate-600 mt-1">Create and manage your job postings</p>
          </div>
          <Button onClick={() => setShowJobForm(!showJobForm)} className="bg-gradient-to-r from-[#1a4b8c] to-[#2ec4b6] hover:bg-blue-700 gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            Post New Job
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-2 sm:gap-4 mb-6">
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
          {/* Desktop Filter Buttons */}
          <div className="hidden sm:flex gap-2">
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
          {/* Mobile Filter Icon */}
          <div className="relative sm:hidden">
            <Button
              variant="outline"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="px-3"
            >
              <Filter className="w-4 h-4" />
            </Button>
            {showFilterMenu && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-lg border border-slate-200 shadow-lg p-2 z-10 min-w-[120px]">
                {["open", "closed", "urgent"].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setFilterStatus(filterStatus === status ? null : status)
                      setShowFilterMenu(false)
                    }}
                    className={`w-full text-left px-3 py-2 rounded capitalize text-sm ${
                      filterStatus === status
                        ? "bg-blue-600 text-white"
                        : "hover:bg-slate-100 text-slate-900"
                    }`}
                  >
                    {status}
                  </button>
                ))}
                {filterStatus && (
                  <button
                    onClick={() => {
                      setFilterStatus(null)
                      setShowFilterMenu(false)
                    }}
                    className="w-full text-left px-3 py-2 rounded text-sm text-slate-600 hover:bg-slate-100 border-t border-slate-200 mt-1"
                  >
                    Clear filter
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* New Job Form */}
        {showJobForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg border border-slate-200 p-6 mb-8"
          >
            {showSuccessMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-green-900">Job Posted Successfully!</p>
                  <p className="text-sm text-green-700">Your job posting is now live and accepting applications.</p>
                </div>
              </motion.div>
            )}

            <h2 className="text-2xl font-bold mb-6">Create New Job Posting</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Job Title"
                value={newJobData.title}
                onChange={(e) => setNewJobData({ ...newJobData, title: e.target.value })}
                className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select 
                value={newJobData.department}
                onChange={(e) => setNewJobData({ ...newJobData, department: e.target.value })}
                className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Department</option>
                <option>Engineering</option>
                <option>Product</option>
                <option>Design</option>
                <option>Marketing</option>
              </select>
              <input
                type="text"
                placeholder="Location"
                value={newJobData.location}
                onChange={(e) => setNewJobData({ ...newJobData, location: e.target.value })}
                className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select 
                value={newJobData.type}
                onChange={(e) => setNewJobData({ ...newJobData, type: e.target.value as "Full-time" | "Contract" | "Part-time" })}
                className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Full-time</option>
                <option>Contract</option>
                <option>Part-time</option>
              </select>
              <input
                type="text"
                placeholder="Salary Range"
                value={newJobData.salary}
                onChange={(e) => setNewJobData({ ...newJobData, salary: e.target.value })}
                className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Required Skills"
                value={newJobData.skills}
                onChange={(e) => setNewJobData({ ...newJobData, skills: e.target.value })}
                className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <textarea
              placeholder="Job Description"
              rows={6}
              value={newJobData.description}
              onChange={(e) => setNewJobData({ ...newJobData, description: e.target.value })}
              className="w-full mt-4 px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            {/* AI Enhancement Section */}
            {showAIEnhancement && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900">AI Enhancement Suggestions</h3>
                </div>

                <div className="space-y-3">
                  {getAISuggestions().map((suggestion, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white p-4 rounded-lg border border-slate-200"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 mb-1">{suggestion.field}</p>
                          <p className="text-sm text-slate-600 mb-2">
                            <span className="font-medium">Current:</span> {suggestion.current}
                          </p>
                          <p className="text-sm text-blue-600 mb-2">
                            <span className="font-medium">Suggested:</span> {suggestion.suggested}
                          </p>
                          <p className="text-xs text-slate-500 italic">{suggestion.reason}</p>
                        </div>
                        {suggestion.field !== "Overall" && suggestion.field !== "Description" && (
                          <Button
                            size="sm"
                            onClick={() => applyAISuggestion(suggestion.field, suggestion.suggested)}
                            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 flex-shrink-0"
                          >
                            Apply
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="flex gap-3 mt-6">
              <Button 
                onClick={handlePublishJob}
                disabled={showSuccessMessage}
                className="bg-gradient-to-r from-[#1a4b8c] to-[#2ec4b6]"
              >
                {showSuccessMessage ? "Published!" : "Publish Job"}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleAIEnhancement}
                disabled={isAnalyzing || showAIEnhancement}
                className="gap-2 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 hover:from-purple-100 hover:to-blue-100"
              >
                {isAnalyzing ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    AI Enhancement
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={() => {
                setShowJobForm(false)
                setShowAIEnhancement(false)
                setNewJobData({
                  title: "",
                  department: "",
                  location: "",
                  type: "Full-time",
                  salary: "",
                  skills: "",
                  description: "",
                })
              }}>
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
                  className="p-4 sm:p-6 cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 break-words">{job.title}</h3>
                        <Badge className={statusColors[job.status]}>{job.status}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-slate-600">
                        <span>{job.department}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="break-all">{job.location}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{job.type}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="font-semibold text-slate-900">{job.applications} applications</span>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${
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
                    className="border-t border-slate-200 bg-slate-50 p-4 sm:p-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
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
                      <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        <div className="bg-white rounded-lg p-2 sm:p-3 border border-slate-200">
                          <p className="text-xs text-slate-600">Applied</p>
                          <p className="text-xl sm:text-2xl font-bold text-blue-600">{job.applications_detail.applied}</p>
                        </div>
                        <div className="bg-white rounded-lg p-2 sm:p-3 border border-slate-200">
                          <p className="text-xs text-slate-600">Screened</p>
                          <p className="text-xl sm:text-2xl font-bold text-green-600">{job.applications_detail.screened}</p>
                        </div>
                        <div className="bg-white rounded-lg p-2 sm:p-3 border border-slate-200">
                          <p className="text-xs text-slate-600">Interview</p>
                          <p className="text-xl sm:text-2xl font-bold text-amber-600">{job.applications_detail.interview}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="outline" className="gap-2 bg-transparent w-full sm:w-auto">
                        <Edit2 className="w-4 h-4" />
                        Edit Job
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleDeleteJob(job.id)}
                        className="gap-2 text-red-600 hover:text-red-700 w-full sm:w-auto"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700 sm:ml-auto w-full sm:w-auto">View Applicants</Button>
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