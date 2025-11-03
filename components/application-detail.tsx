"use client"

import { motion } from "framer-motion"
import type { JobApplication } from "@/data/job-applications"

interface ApplicationDetailProps {
  application: JobApplication
  onClose: () => void
}

export default function ApplicationDetail({ application, onClose }: ApplicationDetailProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "from-blue-400 to-blue-600"
      case "viewed":
        return "from-yellow-400 to-yellow-600"
      case "shortlisted":
        return "from-green-400 to-green-600"
      case "interview":
        return "from-purple-400 to-purple-600"
      case "decision":
        return "from-pink-400 to-pink-600"
      default:
        return "from-gray-400 to-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "applied":
        return "📝"
      case "viewed":
        return "👁️"
      case "shortlisted":
        return "⭐"
      case "interview":
        return "🎤"
      case "decision":
        return "🎯"
      default:
        return "•"
    }
  }

  const handlePrepareForInterview = () => {
    // Navigate to interview session
    window.location.href = "/interview-session"
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-[#1a4b8c] to-[#2ec4b6] text-white p-8 flex items-start justify-between flex-shrink-0">
          <div>
            <h1 className="text-3xl font-bold mb-2">{application.jobTitle}</h1>
            <p className="text-xl text-white/90">{application.company}</p>
            <p className="text-sm text-white/70 mt-2">{application.location}</p>
          </div>
          <button onClick={onClose} className="text-3xl font-light text-white/80 hover:text-white transition-colors">
            ×
          </button>
        </div>

        {/* Content - scrollable */}
        <div className="overflow-y-auto flex-1 p-8 space-y-8">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-gray-600 text-sm mb-1">Match Score</p>
              <p className="text-3xl font-bold text-[#1a4b8c]">{application.matchScore}%</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-gray-600 text-sm mb-1">Status</p>
              <p className="text-lg font-bold text-green-600 capitalize">{application.status}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <p className="text-gray-600 text-sm mb-1">Applied Date</p>
              <p className="text-lg font-bold text-purple-600">
                {new Date(application.appliedDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Job Details */}
          <div>
            <h2 className="text-xl font-bold text-[#1e293b] mb-4">Job Details</h2>
            <div className="space-y-3">
              <p className="text-gray-700">
                <span className="font-semibold text-[#1a4b8c]">Role:</span> {application.role}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-[#1a4b8c]">Salary Range:</span> {application.salary}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-[#1a4b8c]">Location:</span> {application.location}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-[#1a4b8c]">Description:</span> {application.description}
              </p>
            </div>
          </div>

          {/* Application Timeline */}
          <div>
            <h2 className="text-xl font-bold text-[#1e293b] mb-6">Application Timeline</h2>
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1a4b8c] to-[#2ec4b6]"></div>

              {/* Timeline Items */}
              <div className="space-y-6 pl-24">
                {application.timeline.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative"
                  >
                    {/* Status Circle */}
                    <div
                      className={`absolute -left-20 top-1 w-10 h-10 rounded-full bg-gradient-to-br ${getStatusColor(
                        item.status,
                      )} flex items-center justify-center text-white font-bold shadow-lg`}
                    >
                      {item.completed ? "✓" : getStatusIcon(item.status)}
                    </div>

                    {/* Content Card */}
                    <div
                      className={`p-4 rounded-lg border-2 ${
                        item.completed ? "border-[#10b981] bg-green-50" : "border-gray-300 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-[#1e293b] capitalize">{item.status}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.date
                              ? `${new Date(item.date).toLocaleDateString()} ${new Date(item.date).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )}`
                              : "Pending"}
                          </p>
                        </div>
                        <span
                          className={`text-sm font-semibold px-3 py-1 rounded-full ${
                            item.completed ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {item.completed ? "Completed" : "Pending"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Feedback Section (if rejected) */}
          {application.status === "rejected" && application.feedbackReason && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <h3 className="font-bold text-red-900 mb-2">Feedback</h3>
              <p className="text-red-800">{application.feedbackReason}</p>
              <p className="text-red-700 text-sm mt-3">
                Use this feedback to strengthen your profile and reapply in the future.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            {application.status === "interview" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrepareForInterview}
                className="flex-1 py-3 bg-gradient-to-r from-[#1a4b8c] to-[#2ec4b6] text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
              >
                Prepare for Interview
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
