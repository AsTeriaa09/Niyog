"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import QuickStats from "./quick-stats"
import { jobApplications } from "@/data/job-applications"
import ApplicationDetail from "./application-detail"
import ApplicationPipelineCard from "./application-pipeline-card"

interface DashboardProps {
  onNavigate?: (page: string) => void
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [selectedApp, setSelectedApp] = useState<(typeof jobApplications)[0] | null>(null)
  const [applications] = useState(jobApplications)

  const recentApps = applications.slice(0, 6)
  const statusCounts = {
    applied: applications.filter((a) => a.status === "applied").length,
    interview: applications.filter((a) => a.status === "interview").length,
    shortlisted: applications.filter((a) => a.status === "shortlisted").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  }

  const handlePrepareInterview = () => {
    setSelectedApp(null)
    if (onNavigate) {
      onNavigate("interview")
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#1e293b] mb-2">Applications Dashboard</h1>
        <p className="text-gray-600">Track your job applications through each stage of the hiring process</p>
      </motion.div>

      {/* Applications Pipeline - Professional Layout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-4 mb-12"
      >
        {recentApps.map((app, idx) => (
          <ApplicationPipelineCard key={app.id} application={app} onClick={() => setSelectedApp(app)} />
        ))}
      </motion.div>

      {/* Application Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {[
          { label: "Applied", count: statusCounts.applied, color: "from-[#1a4b8c] to-[#2ec4b6]" },
          {
            label: "Viewed",
            count: applications.filter((a) => a.timeline.some((t) => t.status === "viewed" && t.completed)).length,
            color: "from-[#ff6b35] to-[#ffa500]",
          },
          { label: "Shortlisted", count: statusCounts.shortlisted, color: "from-[#10b981] to-[#34d399]" },
          { label: "Interviews", count: statusCounts.interview, color: "from-[#8b5cf6] to-[#a78bfa]" },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + idx * 0.05 }}
            className="text-center p-4 rounded-lg bg-white border border-gray-200"
          >
            <div className={`text-2xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-2`}>
              {stat.count}
            </div>
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Stats */}
      <div className="mb-8">
        <QuickStats applications={applications} />
      </div>

      {selectedApp && (
        <ApplicationDetail
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
          onPrepareInterview={handlePrepareInterview}
        />
      )}
    </div>
  )
}
