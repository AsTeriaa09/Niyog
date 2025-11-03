"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import VoiceVisualization from "./voice-visualization"
import FlipCard from "./flip-card"
import GrowthPlant from "./growth-plant"

interface Question {
  id: number
  text: string
  category: string
  hints: string[]
}

const mockQuestions: Question[] = [
  {
    id: 1,
    text: "Tell us about your most challenging project. How did you overcome it?",
    category: "Behavioral",
    hints: ["Focus on the process", "Highlight your role", "Show learnings"],
  },
  {
    id: 2,
    text: "How do you approach learning new technologies?",
    category: "Growth Mindset",
    hints: ["Talk about resources", "Share examples", "Show consistency"],
  },
  {
    id: 3,
    text: "Describe your experience with team collaboration",
    category: "Teamwork",
    hints: ["Give specific examples", "Show empathy", "Highlight outcomes"],
  },
]

const categoryData = [
  { title: "Behavioral", subtitle: "Real-world experiences", description: "Share specific stories and outcomes" },
  { title: "Technical", subtitle: "Problem solving", description: "Explain your approach and reasoning" },
  { title: "Growth", subtitle: "Continuous learning", description: "Show your passion for improvement" },
]

interface InterviewReport {
  totalScore: number
  questionsAttempted: number
  feedbackItems: string[]
  recommendations: string[]
}

export default function InterviewSimulator() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [confidenceScore, setConfidenceScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [plantGrowth, setPlantGrowth] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [interviewReport, setInterviewReport] = useState<InterviewReport | null>(null)

  const currentQuestion = mockQuestions[currentQuestionIdx]
  const isLastQuestion = currentQuestionIdx === mockQuestions.length - 1

  const handleAnswer = (score: number) => {
    setConfidenceScore((prev) => Math.min(100, prev + score))
    setPlantGrowth((prev) => Math.min(100, prev + 25))
    setShowFeedback(true)
    setIsRecording(false)

    setTimeout(() => {
      if (!isLastQuestion) {
        setCurrentQuestionIdx((prev) => prev + 1)
        setShowFeedback(false)
        setIsRecording(false)
      }
    }, 2000)
  }

  const generateReport = () => {
    const report: InterviewReport = {
      totalScore: confidenceScore,
      questionsAttempted: mockQuestions.length,
      feedbackItems: [
        "Strong communication skills demonstrated",
        "Good use of examples from past experience",
        "Clear explanation of problem-solving approach",
      ],
      recommendations: [
        "Practice more technical depth in next session",
        "Work on conciseness in your answers",
        "Strengthen preparation for behavioral questions",
      ],
    }
    setInterviewReport(report)
  }

  const resetInterview = () => {
    setCurrentQuestionIdx(0)
    setConfidenceScore(0)
    setPlantGrowth(0)
    setShowFeedback(false)
    setIsRecording(false)
    setInterviewReport(null)
  }

  if (interviewReport) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="gradient-card rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1 }} className="text-6xl mb-4">
              🎯
            </motion.div>
            <h1 className="text-4xl font-bold text-[#1a4b8c] mb-2">Interview Complete!</h1>
            <p className="text-gray-600">Here's your performance report</p>
          </div>

          {/* Score Summary */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <p className="text-gray-600 text-sm mb-2">Overall Score</p>
              <p className="text-4xl font-bold text-[#1a4b8c]">{interviewReport.totalScore}%</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <p className="text-gray-600 text-sm mb-2">Questions Answered</p>
              <p className="text-4xl font-bold text-[#10b981]">{interviewReport.questionsAttempted}/3</p>
            </div>
          </div>

          {/* Feedback */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#1e293b] mb-4">What You Did Well</h2>
            <div className="space-y-3">
              {interviewReport.feedbackItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border-l-4 border-[#10b981]"
                >
                  <span className="text-xl">✓</span>
                  <p className="text-gray-700">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#1e293b] mb-4">Areas for Improvement</h2>
            <div className="space-y-3">
              {interviewReport.recommendations.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                  className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border-l-4 border-[#f59e0b]"
                >
                  <span className="text-xl">💡</span>
                  <p className="text-gray-700">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Interview Format Options */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-200">
            <h3 className="font-bold text-[#1a4b8c] mb-3">Interview Format</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p className="font-semibold">This was a Text-based Interview</p>
              <p>Other formats available: Video Interview (coming soon), Phone Interview (coming soon)</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetInterview}
              className="flex-1 py-3 bg-gradient-to-r from-[#1a4b8c] to-[#2ec4b6] text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
            >
              Start New Interview
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Download Report
            </motion.button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-[#1e293b]">Interview Practice</h1>
        <p className="text-lg text-gray-600">AI-powered mock interviews tailored to your target role</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Interview Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Flip Cards */}
          {currentQuestionIdx === 0 && !showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
              {categoryData.map((card, idx) => (
                <FlipCard
                  key={idx}
                  index={idx}
                  front={{ title: card.title, subtitle: card.subtitle }}
                  back={{ description: card.description }}
                />
              ))}
            </motion.div>
          )}

          {/* Question Card */}
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="gradient-card rounded-2xl p-8"
          >
            {isLastQuestion && showFeedback ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 1 }}
                  className="text-6xl mb-4"
                >
                  🎉
                </motion.div>
                <h2 className="text-3xl font-bold text-[#1a4b8c] mb-2">Interview Complete!</h2>
                <p className="text-gray-600 mb-8">Click "Generate Report" to see your performance analysis</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateReport}
                  className="px-8 py-3 gradient-button text-white rounded-lg font-semibold shadow-lg"
                >
                  Generate Report
                </motion.button>
              </motion.div>
            ) : (
              <>
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-[#1a4b8c]">
                      Question {currentQuestionIdx + 1} of {mockQuestions.length}
                    </span>
                    <span className="text-xs text-gray-500">
                      {Math.round(((currentQuestionIdx + 1) / mockQuestions.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((currentQuestionIdx + 1) / mockQuestions.length) * 100}%`,
                      }}
                      transition={{ duration: 0.5 }}
                      className="h-full gradient-button rounded-full"
                    ></motion.div>
                  </div>
                </div>

                {/* Category Badge */}
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-6">
                  <div className="inline-block">
                    <span className="text-xs font-bold text-white bg-[#1a4b8c] px-3 py-1 rounded-full uppercase tracking-wide">
                      {currentQuestion.category}
                    </span>
                  </div>
                </motion.div>

                {/* Question */}
                <h2 className="text-2xl font-bold text-[#1e293b] mb-8">{currentQuestion.text}</h2>

                {/* Voice Visualization */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-8">
                  <VoiceVisualization isActive={isRecording} />
                </motion.div>

                {/* Hints */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-blue-50 rounded-xl p-4 mb-6 border-l-4 border-[#1a4b8c]"
                >
                  <p className="text-xs font-semibold text-[#1a4b8c] mb-3 uppercase tracking-wide">Interview Tips</p>
                  <ul className="space-y-2">
                    {currentQuestion.hints.map((hint, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        className="text-sm text-gray-700 flex items-start gap-2"
                      >
                        <span className="text-[#2ec4b6] mt-1">▸</span>
                        {hint}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Response Buttons */}
                {!showFeedback ? (
                  <div className="space-y-3">
                    <button
                      onClick={() => setIsRecording(!isRecording)}
                      className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
                        isRecording
                          ? "gradient-button text-white shadow-lg scale-105"
                          : "border-2 border-[#1a4b8c] text-[#1a4b8c] hover:bg-blue-50"
                      }`}
                    >
                      {isRecording ? "🎤 Recording... Click to Stop" : "🎤 Start Recording"}
                    </button>
                    <div className="grid grid-cols-3 gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAnswer(15)}
                        className="py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
                      >
                        Good
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAnswer(25)}
                        className="py-3 rounded-lg gradient-button text-white font-semibold"
                      >
                        Great
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAnswer(35)}
                        className="py-3 rounded-lg bg-[#2ec4b6] text-white font-semibold hover:opacity-90"
                      >
                        Excellent
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-6 bg-green-50 rounded-lg border-2 border-[#10b981]"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6 }}
                      className="text-3xl mb-2"
                    >
                      ✓
                    </motion.div>
                    <p className="font-semibold text-[#10b981]">Great answer! Moving to next question...</p>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        </div>

        {/* Right: Growth Stats */}
        <div className="space-y-6">
          {/* Growth Plant */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="gradient-card rounded-2xl p-6 h-fit"
          >
            <h3 className="font-bold text-[#1e293b] mb-6 text-center">Your Growth Journey</h3>
            <GrowthPlant growth={plantGrowth} maxGrowth={100} />
          </motion.div>

          {/* Confidence Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="gradient-card rounded-2xl p-6"
          >
            <h3 className="font-bold text-[#1e293b] mb-4 text-center">Confidence Score</h3>

            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#scoreGradient)"
                  strokeWidth="8"
                  strokeDasharray={283}
                  strokeDashoffset={283 * (1 - confidenceScore / 100)}
                  animate={{
                    strokeDashoffset: 283 * (1 - confidenceScore / 100),
                  }}
                  transition={{ duration: 0.8 }}
                  style={{ transform: "rotate(-90deg)", transformOrigin: "50px 50px" }}
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1a4b8c" />
                    <stop offset="100%" stopColor="#2ec4b6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-[#1a4b8c]">{confidenceScore}%</div>
                </motion.div>
              </div>
            </div>

            <p className="text-xs text-gray-600 text-center">Answer questions to build confidence</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
