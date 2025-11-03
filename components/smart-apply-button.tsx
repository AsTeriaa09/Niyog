"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface SmartApplyButtonProps {
  jobId: number
  onApply: (jobId: number) => void
  hasApplied: boolean
}

export default function SmartApplyButton({ jobId, onApply, hasApplied }: SmartApplyButtonProps) {
  const [isApplying, setIsApplying] = useState(false)

  const handleClick = () => {
    if (!hasApplied && !isApplying) {
      setIsApplying(true)
      onApply(jobId)
      setTimeout(() => {
        setIsApplying(false)
      }, 2000)
    }
  }

  return (
    <AnimatePresence mode="wait">
      {hasApplied ? (
        <motion.div
          key="applied"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[var(--success-mint)] to-[var(--electric-teal)] text-white font-semibold text-center flex items-center justify-center gap-2 shadow-lg"
        >
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </motion.svg>
          Application Sent
        </motion.div>
      ) : isApplying ? (
        <motion.div
          key="applying"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[var(--sunset-coral)] to-[var(--electric-teal)] text-white font-semibold text-center flex items-center justify-center gap-3"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, linear: true }}
            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
          />
          Applying...
        </motion.div>
      ) : (
        <motion.button
          key="apply"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleClick}
          className="w-full py-3 px-4 rounded-lg gradient-button text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
        >
          Apply Now
        </motion.button>
      )}
    </AnimatePresence>
  )
}
