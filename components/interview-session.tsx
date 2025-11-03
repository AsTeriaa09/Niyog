"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import InterviewHeader from "./interview-header"
import InterviewQuestionBox from "./interview-question-box"
import InterviewModeSelector from "./interview-mode-selector"
import InterviewFeedback from "./interview-feedback"

interface Question {
  id: number
  text: string
  category: "Behavioral" | "Technical" | "Growth"
}

const mockQuestions: Question[] = [
  {
    id: 1,
    text: "Tell me about a time you faced a technical challenge and how you overcame it.",
    category: "Behavioral",
  },
  {
    id: 2,
    text: "Describe your experience with the most complex project you've worked on.",
    category: "Technical",
  },
  {
    id: 3,
    text: "How do you stay updated with new technologies in your field?",
    category: "Growth",
  },
  {
    id: 4,
    text: "Tell us about a time you had to collaborate with a difficult team member.",
    category: "Behavioral",
  },
  {
    id: 5,
    text: "What areas are you looking to grow in over the next 2 years?",
    category: "Growth",
  },
]

type Mode = "text" | "voice" | "video"

interface FeedbackData {
  strengths: string[]
  improvements: string[]
  score: number
}

export default function InterviewSession() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [mode, setMode] = useState<Mode>("text")
  const [confidenceScore, setConfidenceScore] = useState(0)
  const [completedQuestions, setCompletedQuestions] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackData | null>(null)
  const [sessionComplete, setSessionComplete] = useState(false)

  const currentQuestion = mockQuestions[currentQuestionIdx]
  const isLastQuestion = currentQuestionIdx === mockQuestions.length - 1

  const handleSubmitAnswer = (answerScore: number) => {
    const newScore = Math.min(100, confidenceScore + answerScore)
    setConfidenceScore(newScore)
    setCompletedQuestions(completedQuestions + 1)

    // Simulate feedback
    const feedbackOptions: FeedbackData[] = [
      {
        strengths: ["Clear problem explanation", "Good technical depth", "Structured approach"],
        improvements: ["Could provide more metrics", "Add STAR method structure"],
        score: newScore,
      },
      {
        strengths: ["Great communication", "Specific examples provided"],
        improvements: ["Could go deeper into technical details"],
        score: newScore,
      },
      {
        strengths: ["Shows growth mindset", "Excellent learning attitude"],
        improvements: ["Could mention more concrete tools/resources"],
        score: newScore,
      },
    ]

    setFeedback(feedbackOptions[currentQuestionIdx % feedbackOptions.length])
    setShowFeedback(true)

    setTimeout(() => {
      if (isLastQuestion) {
        setSessionComplete(true)
      } else {
        setCurrentQuestionIdx(currentQuestionIdx + 1)
        setShowFeedback(false)
      }
    }, 2500)
  }

  const handleReset = () => {
    setCurrentQuestionIdx(0)
    setMode("text")
    setConfidenceScore(0)
    setCompletedQuestions(0)
    setShowFeedback(false)
    setFeedback(null)
    setSessionComplete(false)
  }

  if (sessionComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="gradient-card rounded-3xl p-12 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1 }}
              className="text-7xl mb-6"
            >
              🎉
            </motion.div>
            <h1 className="text-4xl font-bold text-[#1a4b8c] mb-3">Interview Complete!</h1>
            <p className="text-xl text-gray-600 mb-8">Great job! Here's your performance summary.</p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-100 rounded-xl p-6">
                <p className="text-gray-600 text-sm mb-2">Overall Score</p>
                <p className="text-4xl font-bold text-[#1a4b8c]">{confidenceScore}%</p>
              </div>
              <div className="bg-green-100 rounded-xl p-6">
                <p className="text-gray-600 text-sm mb-2">Questions Completed</p>
                <p className="text-4xl font-bold text-green-600">{completedQuestions}/5</p>
              </div>
              <div className="bg-teal-100 rounded-xl p-6">
                <p className="text-gray-600 text-sm mb-2">Estimated Time</p>
                <p className="text-4xl font-bold text-[#2ec4b6]">25 min</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="px-8 py-3 gradient-button text-white rounded-lg font-semibold shadow-lg mb-4"
            >
              Start New Interview
            </motion.button>
            <p className="text-sm text-gray-500 mt-4">
              Practice regularly to improve your interview skills and confidence.
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-8">
      <InterviewHeader
        company="TechCorp"
        jobTitle="Senior Frontend Engineer"
        estimatedTime={25}
        questionsCompleted={completedQuestions}
        totalQuestions={mockQuestions.length}
        confidenceScore={confidenceScore}
      />

      <div className="max-w-6xl mx-auto mt-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <InterviewModeSelector currentMode={mode} onModeChange={setMode} />

            <div className="mt-6">
              <AnimatePresence mode="wait">
                {showFeedback && feedback ? (
                  <InterviewFeedback key="feedback" feedback={feedback} questionNumber={currentQuestionIdx + 1} />
                ) : (
                  <InterviewQuestionBox
                    key={`question-${currentQuestionIdx}`}
                    question={currentQuestion}
                    questionNumber={currentQuestionIdx + 1}
                    totalQuestions={mockQuestions.length}
                    mode={mode}
                    onSubmit={handleSubmitAnswer}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Sidebar - Stats */}
          <div className="space-y-6">
            {/* Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="gradient-card rounded-2xl p-6"
            >
              <h3 className="font-bold text-[#1e293b] mb-4">Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Questions Completed</span>
                    <span className="text-sm font-bold text-[#1a4b8c]">
                      {completedQuestions}/{mockQuestions.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(completedQuestions / mockQuestions.length) * 100}%`,
                      }}
                      transition={{ duration: 0.5 }}
                      className="h-full gradient-button rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Confidence</span>
                    <span className="text-sm font-bold text-[#1a4b8c]">{confidenceScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${confidenceScore}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-[#1a4b8c] to-[#2ec4b6] rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Current Mode */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="gradient-card rounded-2xl p-6"
            >
              <h3 className="font-bold text-[#1e293b] mb-4">Current Mode</h3>
              <div className="capitalize text-lg font-semibold text-[#1a4b8c] bg-blue-100 px-4 py-2 rounded-lg text-center">
                {mode === "text" && "Text Input"}
                {mode === "voice" && "Voice Recording"}
                {mode === "video" && "Video Interview"}
              </div>
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-amber-50 rounded-2xl p-6 border-l-4 border-[#f59e0b]"
            >
              <h3 className="font-bold text-[#1e293b] mb-3">Interview Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Use STAR method for stories</li>
                <li>✓ Be specific with examples</li>
                <li>✓ Show your thought process</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
