"use client"

import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function QuickStats({ applications }: { applications: any[] }) {
  const stats = [
    {
      label: "Total Applications",
      value: applications.length,
      icon: "📊",
      color: "bg-blue-50",
    },
    {
      label: "Active Interviews",
      value: applications.filter((a) => a.status === "interview").length,
      icon: "🎯",
      color: "bg-teal-50",
    },
    {
      label: "Shortlisted",
      value: applications.filter((a) => a.status === "shortlisted").length,
      icon: "⭐",
      color: "bg-green-50",
    },
    {
      label: "Avg Match Score",
      value: `${Math.round(applications.reduce((sum, a) => sum + a.matchScore, 0) / applications.length)}%`,
      icon: "📈",
      color: "bg-orange-50",
    },
  ]

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
      <h2 className="text-lg font-bold text-[var(--charcoal-night)] mb-4">Quick Stats</h2>
      {stats.map((stat, idx) => (
        <motion.div key={idx} variants={itemVariants} className={`${stat.color} rounded-lg p-4 border border-gray-200`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
              <div className="text-2xl font-bold text-[var(--charcoal-night)]">{stat.value}</div>
            </div>
            <div className="text-2xl">{stat.icon}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
