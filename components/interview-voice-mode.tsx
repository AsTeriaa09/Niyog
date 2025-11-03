"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface InterviewVoiceModeProps {
  onSubmit: (score: number) => void
  isSubmitting: boolean
}

export default function InterviewVoiceMode({ onSubmit, isSubmitting }: InterviewVoiceModeProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStartStop = () => {
    setIsRecording(!isRecording)
  }

  const handleReset = () => {
    setIsRecording(false)
    setRecordingTime(0)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 text-center border-2 border-blue-200">
        {/* Waveform Visualization */}
        <div className="mb-6 flex items-center justify-center gap-1 h-16">
          {isRecording ? (
            Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: [20, 60, 20] }}
                transition={{
                  duration: 0.6,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.05,
                }}
                className="w-1 bg-gradient-to-t from-[#1a4b8c] to-[#2ec4b6] rounded-full"
              />
            ))
          ) : (
            <div className="w-full h-12 rounded-lg bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm font-semibold">Click record to start</span>
            </div>
          )}
        </div>

        {/* Timer */}
        <motion.div
          animate={{ scale: isRecording ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 1, repeat: isRecording ? Number.POSITIVE_INFINITY : 0 }}
          className="text-4xl font-bold text-[#1a4b8c] font-mono mb-6"
        >
          {formatTime(recordingTime)}
        </motion.div>

        {/* Record Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStartStop}
          className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto font-semibold text-2xl transition-all ${
            isRecording
              ? "bg-red-500 text-white shadow-lg shadow-red-500/50"
              : "bg-[#1a4b8c] text-white hover:shadow-lg"
          }`}
        >
          {isRecording ? "⏸" : "🎤"}
        </motion.button>

        {/* Recording Status */}
        {isRecording && (
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            className="mt-4 text-red-500 font-semibold text-sm"
          >
            ● Recording...
          </motion.div>
        )}
      </div>

      {/* Playback and Control Buttons */}
      <div className="space-y-3">
        {recordingTime > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors text-sm"
          >
            ▶ Playback Recording ({formatTime(recordingTime)})
          </motion.button>
        )}

        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Clear
          </motion.button>
          {recordingTime > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
              onClick={() => onSubmit(25)}
              className="py-2 gradient-button text-white font-semibold rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 text-sm"
            >
              Submit
            </motion.button>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-600 text-center">
        Recommended: 1-2 minutes. Try to be clear and concise in your response.
      </p>
    </motion.div>
  )
}
