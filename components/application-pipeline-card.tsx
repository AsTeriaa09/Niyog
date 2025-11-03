"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import PipelineStage from "./pipeline-stage"
import type { JobApplication } from "@/data/job-applications"

interface ApplicationPipelineCardProps {
  application: JobApplication
  onClick: () => void
}

export default function ApplicationPipelineCard({ application, onClick }: ApplicationPipelineCardProps) {
  const [displayPercentage, setDisplayPercentage] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const duration = 1500 // 1.5 seconds

      if (elapsed < duration) {
        const progress = elapsed / duration
        setDisplayPercentage(Math.round(progress * application.matchScore))
        animationFrame = requestAnimationFrame(animate)
      } else {
        setDisplayPercentage(application.matchScore)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [application.matchScore])

  // Determine status badge properties
  const getStatusBadge = () => {
    if (application.status === "rejected") {
      return { icon: "🔴", label: "REJECTED", color: "text-red-600", bgGlow: "bg-red-50" }
    }

    const lastCompleted = application.timeline.filter((t) => t.completed).length
    if (lastCompleted >= 4)
      return { icon: "🟣", label: "INTERVIEW", color: "text-purple-600 glow-pulse", bgGlow: "bg-purple-50" }
    if (lastCompleted >= 3)
      return { icon: "🟢", label: "ACTIVE", color: "text-green-600 glow-pulse", bgGlow: "bg-green-50" }
    if (lastCompleted >= 2) return { icon: "🟡", label: "VIEWED", color: "text-amber-600", bgGlow: "bg-amber-50" }
    return { icon: "🔴", label: "STALLED", color: "text-red-600", bgGlow: "bg-red-50" }
  }

  const statusBadge = getStatusBadge()
  const stages = ["Applied", "Viewed", "Shortlisted", "Interview"]

  // Calculate progress percentage
  const completedCount = application.timeline.filter((t) => t.completed).length
  const progressPercentage = (completedCount / application.timeline.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(26, 75, 140, 0.2)" }}
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:shadow-xl transition-shadow"
    >
      {/* Header Row: Company/Role + Status Badge + Match Score */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-[#1e293b]">
            {application.company} - {application.jobTitle}
          </h3>
        </div>

        <div
          className={`flex items-center gap-1 font-bold ${statusBadge.color} px-3 py-1 rounded-full ${statusBadge.bgGlow}`}
        >
          <span className="text-sm">{statusBadge.icon}</span>
          <span className="text-xs font-semibold">{statusBadge.label}</span>
        </div>
      </div>

      <div className="flex flex-col items-center mb-6 py-4">
        <motion.div
          className="text-5xl font-bold text-[#1a4b8c]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {displayPercentage}%
        </motion.div>
        <div className="text-sm font-medium text-gray-600 mt-1">Match</div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between gap-1">
          {stages.map((stage, idx) => {
            const timelineItem = application.timeline[idx]
            const isCompleted = timelineItem?.completed
            const isCurrent = !isCompleted && application.timeline.slice(0, idx).every((t) => t.completed)
            const isUpcoming = !isCompleted && !isCurrent

            return (
              <PipelineStage
                key={stage}
                stage={stage}
                isCompleted={isCompleted}
                isCurrent={isCurrent}
                isUpcoming={isUpcoming}
                index={idx}
                totalStages={stages.length}
              />
            )
          })}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-gray-600">Progress</span>
          <span className="text-xs font-semibold text-[#1a4b8c]">
            {completedCount}/{application.timeline.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="h-full bg-gradient-to-r from-[#ff6b35] to-[#2ec4b6]"
          />
        </div>
      </div>

      {/* Quick Info */}
      <div className="flex justify-between text-sm text-gray-600 pt-3 border-t border-gray-100">
        <span>{application.location}</span>
        <span>{application.salary}</span>
      </div>
    </motion.div>
  )
}
