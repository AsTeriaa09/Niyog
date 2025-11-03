"use client"

import { motion } from "framer-motion"

interface InterviewModeSelectorProps {
  currentMode: "text" | "voice" | "video"
  onModeChange: (mode: "text" | "voice" | "video") => void
}

export default function InterviewModeSelector({ currentMode, onModeChange }: InterviewModeSelectorProps) {
  const modes = [
    { id: "text", label: "Text", icon: "📝" },
    { id: "voice", label: "Voice", icon: "🎤" },
    { id: "video", label: "Video", icon: "📹", disabled: true },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
      {modes.map((mode) => (
        <motion.button
          key={mode.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => !mode.disabled && onModeChange(mode.id as "text" | "voice" | "video")}
          disabled={mode.disabled}
          className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all ${
            currentMode === mode.id
              ? "gradient-button text-white shadow-lg"
              : "bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400"
          } ${mode.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <span>{mode.icon}</span>
          {mode.label}
          {mode.disabled && <span className="text-xs ml-2">(Coming Soon)</span>}
        </motion.button>
      ))}
    </motion.div>
  )
}
