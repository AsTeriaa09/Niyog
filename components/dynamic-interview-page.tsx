"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { JobApplication } from "@/data/job-applications"
import InterviewHeader from "./interview-header"
import InterviewQuestionBox from "./interview-question-box"
import InterviewModeSelector from "./interview-mode-selector"
import InterviewFeedback from "./interview-feedback"

interface Question {
  id: number
  text: string
  category: "Behavioral" | "Technical" | "Growth"
}

interface DynamicInterviewPageProps {
  job: JobApplication
  onBack: () => void
}

const generateQuestionsForRole = (role: string): Question[] => {
  const questionSets: Record<string, Question[]> = {
    Frontend: [
      {
        id: 1,
        text: "Tell me about a time you optimized a React component's performance. What was the challenge?",
        category: "Technical",
      },
      {
        id: 2,
        text: "Describe your experience with state management solutions like Redux or Context API.",
        category: "Technical",
      },
      {
        id: 3,
        text: "How do you approach responsive design and cross-browser compatibility?",
        category: "Technical",
      },
      {
        id: 4,
        text: "Tell me about a difficult bug you had to debug in the frontend. How did you solve it?",
        category: "Behavioral",
      },
      {
        id: 5,
        text: "What's your approach to keeping up with frontend frameworks and tools?",
        category: "Growth",
      },
    ],
    "Full Stack": [
      {
        id: 1,
        text: "Describe your experience with both frontend and backend technologies.",
        category: "Technical",
      },
      {
        id: 2,
        text: "Tell me about an end-to-end project you built from scratch.",
        category: "Behavioral",
      },
      {
        id: 3,
        text: "How do you ensure database queries are optimized and performant?",
        category: "Technical",
      },
      {
        id: 4,
        text: "Describe a time when you had to troubleshoot a production issue.",
        category: "Behavioral",
      },
      {
        id: 5,
        text: "What new technologies are you interested in learning?",
        category: "Growth",
      },
    ],
    Design: [
      {
        id: 1,
        text: "Walk me through your design process from concept to final implementation.",
        category: "Behavioral",
      },
      {
        id: 2,
        text: "Tell me about a design challenge you faced and how you overcame it.",
        category: "Technical",
      },
      {
        id: 3,
        text: "How do you gather user feedback and incorporate it into your designs?",
        category: "Behavioral",
      },
      {
        id: 4,
        text: "Describe your experience with design systems and component libraries.",
        category: "Technical",
      },
      {
        id: 5,
        text: "How do you stay current with design trends and tools?",
        category: "Growth",
      },
    ],
    DevOps: [
      {
        id: 1,
        text: "Describe your experience with CI/CD pipelines and deployment automation.",
        category: "Technical",
      },
      {
        id: 2,
        text: "Tell me about your experience with cloud platforms like AWS or GCP.",
        category: "Technical",
      },
      {
        id: 3,
        text: "How have you approached infrastructure scaling and load balancing?",
        category: "Behavioral",
      },
      {
        id: 4,
        text: "Tell me about a critical infrastructure issue you resolved.",
        category: "Behavioral",
      },
      {
        id: 5,
        text: "What DevOps tools and practices are you eager to learn?",
        category: "Growth",
      },
    ],
    Data: [
      {
        id: 1,
        text: "Describe a machine learning project where you built an end-to-end model.",
        category: "Technical",
      },
      {
        id: 2,
        text: "Tell me about your experience with data visualization and analysis.",
        category: "Technical",
      },
      {
        id: 3,
        text: "How do you approach feature engineering and model selection?",
        category: "Behavioral",
      },
      {
        id: 4,
        text: "Tell me about a time when your model didn't perform as expected.",
        category: "Behavioral",
      },
      {
        id: 5,
        text: "What emerging techniques in AI/ML are you interested in?",
        category: "Growth",
      },
    ],
    Backend: [
      {
        id: 1,
        text: "Describe your experience designing scalable backend systems.",
        category: "Technical",
      },
      {
        id: 2,
        text: "Tell me about your experience with database design and optimization.",
        category: "Technical",
      },
      {
        id: 3,
        text: "How do you approach API design and documentation?",
        category: "Behavioral",
      },
      {
        id: 4,
        text: "Tell me about a complex backend problem you solved.",
        category: "Behavioral",
      },
      {
        id: 5,
        text: "What backend technologies are you exploring next?",
        category: "Growth",
      },
    ],
  }

  return questionSets[role] || questionSets["Backend"]
}

type Mode = "text" | "voice" | "video"

interface FeedbackData {
  strengths: string[]
  improvements: string[]
  score: number
}

export default function DynamicInterviewPage({ job, onBack }: DynamicInterviewPageProps) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [mode, setMode] = useState<Mode>("text")
  const [confidenceScore, setConfidenceScore] = useState(0)
  const [completedQuestions, setCompletedQuestions] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackData | null>(null)
  const [sessionComplete, setSessionComplete] = useState(false)

  const questions = generateQuestionsForRole(job.role)
  const currentQuestion = questions[currentQuestionIdx]
  const isLastQuestion = currentQuestionIdx === questions.length - 1

  const handleSubmitAnswer = (answerScore: number) => {
    const newScore = Math.min(100, confidenceScore + answerScore)
    setConfidenceScore(newScore)
    setCompletedQuestions(completedQuestions + 1)

    const feedbackOptions: FeedbackData[] = [
      {
        strengths: ["Clear explanation", "Good technical depth", "Structured approach"],
        improvements: ["Add more specific metrics", "Use STAR method"],
        score: newScore,
      },
      {
        strengths: ["Great communication", "Specific examples"],
        improvements: ["Go deeper into technical details"],
        score: newScore,
      },
      {
        strengths: ["Shows growth mindset", "Excellent attitude"],
        improvements: ["Mention concrete tools/resources"],
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
            <p className="text-xl text-gray-600 mb-2">Great job on your {job.jobTitle} interview practice!</p>
            <p className="text-lg text-gray-500 mb-8">at {job.company}</p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-100 rounded-xl p-6">
                <p className="text-gray-600 text-sm mb-2">Overall Score</p>
                <p className="text-4xl font-bold text-[#1a4b8c]">{confidenceScore}%</p>
              </div>
              <div className="bg-green-100 rounded-xl p-6">
                <p className="text-gray-600 text-sm mb-2">Questions Completed</p>
                <p className="text-4xl font-bold text-green-600">
                  {completedQuestions}/{questions.length}
                </p>
              </div>
              <div className="bg-teal-100 rounded-xl p-6">
                <p className="text-gray-600 text-sm mb-2">Estimated Time</p>
                <p className="text-4xl font-bold text-[#2ec4b6]">~25 min</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="px-8 py-3 gradient-button text-white rounded-lg font-semibold shadow-lg"
              >
                Practice Again
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="px-8 py-3 border-2 border-[#1a4b8c] text-[#1a4b8c] rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Back to Dashboard
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-8">
      <InterviewHeader
        company={job.company}
        jobTitle={job.jobTitle}
        estimatedTime={25}
        questionsCompleted={completedQuestions}
        totalQuestions={questions.length}
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
                    totalQuestions={questions.length}
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
                      {completedQuestions}/{questions.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(completedQuestions / questions.length) * 100}%`,
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

            {/* Job Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="gradient-card rounded-2xl p-6"
            >
              <h3 className="font-bold text-[#1e293b] mb-3">Position</h3>
              <p className="text-sm font-semibold text-[#1a4b8c] mb-1">{job.jobTitle}</p>
              <p className="text-xs text-gray-600 mb-4">{job.company}</p>
              <div className="space-y-2 text-xs text-gray-700">
                <p>
                  <span className="font-semibold">Match:</span> {job.matchScore}%
                </p>
                <p>
                  <span className="font-semibold">Salary:</span> {job.salary}
                </p>
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
                <li>✓ Use STAR method</li>
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
