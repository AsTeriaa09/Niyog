"use client"

import { motion } from "framer-motion"
import SkillRadar from "./skill-radar"
import PulseGraph from "./pulse-graph"
import GrowthTimeline from "./growth-timeline"

const mockProfileData = {
  name: "Alex Johnson",
  skills: [
    { skill: "React", score: 90 },
    { skill: "TypeScript", score: 85 },
    { skill: "Node.js", score: 78 },
    { skill: "System Design", score: 72 },
    { skill: "Leadership", score: 88 },
  ],
  applicationStatus: [
    { week: 1, value: 60 },
    { week: 2, value: 70 },
    { week: 3, value: 75 },
    { week: 4, value: 82 },
    { week: 5, value: 87 },
    { week: 6, value: 92 },
  ],
  growthTimeline: [
    { month: "Oct", apps: 2, interviews: 0 },
    { month: "Nov", apps: 5, interviews: 1 },
    { month: "Dec", apps: 8, interviews: 2 },
    { month: "Jan", apps: 12, interviews: 4 },
    { month: "Feb", apps: 15, interviews: 5 },
  ],
}

export default function ProfileAnalytics() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-4xl font-bold mb-2 text-[var(--charcoal-night)]">Your Analytics</h1>
        <p className="text-lg text-gray-600">Data-driven insights about your job search journey</p>
      </motion.div>

      {/* Skill Radar and Application Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Skill Radar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="gradient-card rounded-2xl p-8 lg:col-span-2"
        >
          <h2 className="text-xl font-bold text-[var(--charcoal-night)] mb-6">Skill Strength Analysis</h2>
          <SkillRadar skills={mockProfileData.skills} />
        </motion.div>

        {/* Application Health Pulse Graph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="gradient-card rounded-2xl p-6"
        >
          <h2 className="text-lg font-bold text-[var(--charcoal-night)] mb-6">Application Health</h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <PulseGraph data={mockProfileData.applicationStatus} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 p-4 bg-gradient-to-r from-[var(--success-mint)]/20 to-[var(--electric-teal)]/20 rounded-lg text-center border border-[var(--success-mint)]/30"
          >
            <p className="text-sm font-semibold text-[var(--success-mint)]">📈 Steady Growth Trend</p>
            <p className="text-xs text-gray-600 mt-1">+32% week-over-week improvement</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Growth Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="gradient-card rounded-2xl p-8"
      >
        <h2 className="text-xl font-bold text-[var(--charcoal-night)] mb-6">Your Job Search Journey</h2>
        <GrowthTimeline data={mockProfileData.growthTimeline} />
      </motion.div>
    </div>
  )
}
