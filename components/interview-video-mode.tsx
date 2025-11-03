"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface InterviewVideoModeProps {
  onSubmit: (score: number) => void
  isSubmitting: boolean
}

export default function InterviewVideoMode({ onSubmit, isSubmitting }: InterviewVideoModeProps) {
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

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="bg-black rounded-2xl overflow-hidden relative aspect-video flex items-center justify-center">
        {/* Video Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
              <span className="text-5xl">👤</span>
            </div>
            <p className="text-white text-sm font-semibold">Camera Feed (Simulated)</p>
          </div>
        </div>

        {/* Recording Indicator */}
        {isRecording && (
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            className="absolute top-4 right-4 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full z-10"
          >
            <div className="w-2 h-2 rounded-full bg-white" />
            REC {formatTime(recordingTime)}
          </motion.div>
        )}
      </div>

      {/* Video Controls */}
      <div className="flex gap-3 justify-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsRecording(!isRecording)}
          className={`w-16 h-16 rounded-full flex items-center justify-center font-semibold text-2xl transition-all ${
            isRecording
              ? "bg-red-500 text-white shadow-lg shadow-red-500/50"
              : "bg-[#1a4b8c] text-white hover:shadow-lg"
          }`}
        >
          {isRecording ? "⏹" : "⏺"}
        </motion.button>
      </div>

      {/* Recording Status */}
      {isRecording && (
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          className="text-center text-red-500 font-semibold text-sm"
        >
          ● Recording...
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          Retake
        </motion.button>
        {recordingTime > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
            onClick={() => onSubmit(30)}
            className="py-2 gradient-button text-white font-semibold rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 text-sm"
          >
            Submit
          </motion.button>
        )}
      </div>

      <p className="text-xs text-gray-600 text-center">
        Video interview mode is currently in simulation. In production, this would use your camera and microphone.
      </p>
    </motion.div>
  )
}
