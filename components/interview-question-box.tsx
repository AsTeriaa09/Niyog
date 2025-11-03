"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import InterviewTextMode from "./interview-text-mode"
import InterviewVoiceMode from "./interview-voice-mode"
import InterviewVideoMode from "./interview-video-mode"

interface InterviewQuestionBoxProps {
  question: {
    id: number
    text: string
    category: string
  }
  questionNumber: number
  totalQuestions: number
  mode: "text" | "voice" | "video"
  onSubmit: (score: number) => void
}

export default function InterviewQuestionBox({
  question,
  questionNumber,
  totalQuestions,
  mode,
  onSubmit,
}: InterviewQuestionBoxProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (score: number) => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    onSubmit(score)
    setIsSubmitting(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="gradient-card rounded-3xl p-8"
    >
      {/* Question Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="inline-block px-4 py-2 bg-blue-100 text-[#1a4b8c] font-bold rounded-full text-sm uppercase">
            {question.category}
          </span>
          <span className="text-sm text-gray-600 font-semibold">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-1 mb-6">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%` }}
            transition={{ duration: 0.6 }}
            className="h-full gradient-button rounded-full"
          />
        </div>

        {/* Question Text */}
        <h2 className="text-2xl font-bold text-[#1e293b] leading-relaxed">{question.text}</h2>
      </div>

      {/* Mode-Specific Content */}
      <div className="mb-8">
        {mode === "text" && <InterviewTextMode onSubmit={handleSubmit} isSubmitting={isSubmitting} />}
        {mode === "voice" && <InterviewVoiceMode onSubmit={handleSubmit} isSubmitting={isSubmitting} />}
        {mode === "video" && <InterviewVideoMode onSubmit={handleSubmit} isSubmitting={isSubmitting} />}
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSubmitting}
          className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Previous
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSubmitting}
          onClick={() => handleSubmit(20)}
          className="flex-1 py-3 gradient-button text-white font-semibold rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Answer"}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSubmitting}
          className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Skip
        </motion.button>
      </div>
    </motion.div>
  )
}
