"use client"

import { motion } from "framer-motion"

interface InterviewHeaderProps {
  company: string
  jobTitle: string
  estimatedTime: number
  questionsCompleted: number
  totalQuestions: number
  confidenceScore: number
}

export default function InterviewHeader({
  company,
  jobTitle,
  estimatedTime,
  questionsCompleted,
  totalQuestions,
  confidenceScore,
}: InterviewHeaderProps) {
  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1a4b8c] to-[#2ec4b6] flex items-center justify-center text-white text-2xl font-bold">
              T
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1e293b]">{company}</h1>
              <p className="text-gray-600">{jobTitle} Interview Practice</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-600 text-sm">Estimated Time</p>
            <p className="text-2xl font-bold text-[#1a4b8c]">{estimatedTime} mins</p>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-600 mb-2 font-semibold uppercase">Questions</p>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {Array.from({ length: totalQuestions }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${i < questionsCompleted ? "bg-[#10b981]" : "bg-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-[#1a4b8c]">
                {questionsCompleted}/{totalQuestions}
              </span>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-600 mb-2 font-semibold uppercase">Confidence</p>
            <p className="text-xl font-bold text-[#1a4b8c]">{confidenceScore}%</p>
          </div>

          <div>
            <p className="text-xs text-gray-600 mb-2 font-semibold uppercase">Status</p>
            <p className="text-sm font-bold text-[#2ec4b6]">In Progress</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
