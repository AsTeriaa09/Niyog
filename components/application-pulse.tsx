"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const statusConfig = {
  applied: { color: "#1A4B8C", label: "Applied" },
  viewed: { color: "#F59E0B", label: "Viewed" },
  shortlisted: { color: "#10B981", label: "Shortlisted" },
  interview: { color: "#2EC4B6", label: "Interview" },
  rejected: { color: "#EF4444", label: "Rejected" },
}

export default function ApplicationPulse({ status }: { status: keyof typeof statusConfig }) {
  const config = statusConfig[status]
  const [isAnimating, setIsAnimating] = useState(true)

  const getAnimationVariant = () => {
    switch (status) {
      case "applied":
        return {
          scale: [1, 1.1, 1],
          opacity: [0.6, 1, 0.6],
        }
      case "viewed":
        return {
          scale: [1, 1.15, 1],
          opacity: [0.5, 1, 0.5],
        }
      case "shortlisted":
        return {
          scale: [1, 1.2, 1],
          opacity: [0.4, 1, 0.4],
        }
      case "interview":
        return {
          scale: [1, 1.25, 0.95, 1.1, 1],
          opacity: [0.7, 1, 0.8, 1, 0.7],
        }
      case "rejected":
        return {
          opacity: [1, 0.3, 0],
          scale: [1, 1, 0.8],
        }
      default:
        return {}
    }
  }

  return (
    <div className="relative w-6 h-6">
      {/* Outer glow */}
      <motion.div
        animate={getAnimationVariant()}
        transition={{ duration: 1.5, repeat: status !== "rejected" ? Number.POSITIVE_INFINITY : 1 }}
        className="absolute inset-0 rounded-full border-2"
        style={{ borderColor: config.color }}
      />

      {/* Inner dot */}
      <motion.div
        animate={getAnimationVariant()}
        transition={{ duration: 1.5, repeat: status !== "rejected" ? Number.POSITIVE_INFINITY : 1 }}
        className="absolute inset-1 rounded-full"
        style={{ backgroundColor: config.color }}
      />

      {/* Ripple effect for active statuses */}
      {(status === "interview" || status === "shortlisted") && (
        <motion.div
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="absolute inset-0 rounded-full border border-current"
          style={{ borderColor: config.color }}
        />
      )}
    </div>
  )
}
