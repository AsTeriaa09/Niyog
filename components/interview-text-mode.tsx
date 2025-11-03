"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface InterviewTextModeProps {
  onSubmit: (score: number) => void
  isSubmitting: boolean
}

export default function InterviewTextMode({ onSubmit, isSubmitting }: InterviewTextModeProps) {
  const [text, setText] = useState("")

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="bg-gray-50 rounded-xl border-2 border-gray-200 p-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Your Answer</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your answer here. Be clear, specific, and use examples from your experience..."
          className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:border-[#1a4b8c] focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none font-mono text-sm"
        />
        <div className="mt-3 flex justify-between items-center">
          <span className="text-xs text-gray-600">{text.length} characters</span>
          <span className="text-xs text-gray-600">Minimum 50 characters recommended</span>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSubmitting || text.length < 20}
          onClick={() => onSubmit(15)}
          className="py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm"
        >
          Good
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSubmitting || text.length < 20}
          onClick={() => onSubmit(25)}
          className="py-2 gradient-button text-white font-semibold rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 text-sm"
        >
          Great
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSubmitting || text.length < 20}
          onClick={() => onSubmit(35)}
          className="py-2 bg-[#2ec4b6] text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 text-sm"
        >
          Excellent
        </motion.button>
      </div>
    </motion.div>
  )
}
