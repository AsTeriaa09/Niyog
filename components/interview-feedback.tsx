"use client"

import { motion } from "framer-motion"

interface FeedbackData {
  strengths: string[]
  improvements: string[]
  score: number
}

interface InterviewFeedbackProps {
  feedback: FeedbackData
  questionNumber: number
}

export default function InterviewFeedback({ feedback, questionNumber }: InterviewFeedbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="gradient-card rounded-3xl p-8"
    >
      <div className="text-center mb-8">
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6 }} className="text-5xl mb-4">
          ✓
        </motion.div>
        <h2 className="text-2xl font-bold text-[#1a4b8c] mb-1">Great answer!</h2>
        <p className="text-gray-600">Here's your feedback for Question {questionNumber}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Strengths */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-green-50 rounded-xl p-6 border-l-4 border-[#10b981]"
        >
          <h3 className="font-bold text-[#1e293b] mb-4 flex items-center gap-2">
            <span className="text-xl">✓</span>
            Strengths
          </h3>
          <ul className="space-y-2">
            {feedback.strengths.map((strength, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="text-sm text-gray-700 flex items-start gap-2"
              >
                <span className="text-[#10b981] mt-1">•</span>
                {strength}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Improvements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-amber-50 rounded-xl p-6 border-l-4 border-[#f59e0b]"
        >
          <h3 className="font-bold text-[#1e293b] mb-4 flex items-center gap-2">
            <span className="text-xl">💡</span>
            Areas to Improve
          </h3>
          <ul className="space-y-2">
            {feedback.improvements.map((improvement, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="text-sm text-gray-700 flex items-start gap-2"
              >
                <span className="text-[#f59e0b] mt-1">•</span>
                {improvement}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Confidence Score */}
      <div className="bg-blue-50 rounded-xl p-6 text-center border-2 border-blue-200">
        <p className="text-gray-600 text-sm mb-2">Your Confidence Score for this answer</p>
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-[#1a4b8c]"
        >
          {feedback.score}%
        </motion.div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${feedback.score}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-full gradient-button rounded-full"
          />
        </div>
      </div>

      <p className="text-center text-gray-600 text-sm mt-6">Moving to next question...</p>
    </motion.div>
  )
}
