"use client"

import { motion } from "framer-motion"

interface PipelineStageProps {
  stage: string
  isCompleted: boolean
  isCurrent: boolean
  isUpcoming: boolean
  index: number
  totalStages: number
}

export default function PipelineStage({
  stage,
  isCompleted,
  isCurrent,
  isUpcoming,
  index,
  totalStages,
}: PipelineStageProps) {
  return (
    <div className="flex items-center flex-1">
      {/* Stage Circle */}
      <div className="flex flex-col items-center flex-shrink-0">
        {isCurrent ? (
          // Current stage - Blue border with pulse animation
          <motion.div
            className="stage-pulse w-10 h-10 rounded-full border-3 border-[#1a4b8c] bg-white flex items-center justify-center font-bold text-[#1a4b8c]"
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
          >
            ●
          </motion.div>
        ) : isCompleted ? (
          // Completed stage - Green with checkmark
          <motion.div
            className="w-10 h-10 rounded-full bg-[#10b981] flex items-center justify-center text-white font-bold text-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            ✓
          </motion.div>
        ) : (
          // Upcoming stage - Light gray
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
            ○
          </div>
        )}

        {/* Stage Label */}
        <motion.span
          className="text-xs font-medium text-gray-600 mt-2 text-center"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 + 0.2 }}
        >
          {stage}
        </motion.span>
      </div>

      {/* Connector Line - Only render if not the last stage */}
      {index < totalStages - 1 && (
        <div className="flex-1 h-1 mx-3 relative bg-gray-200">
          {isCompleted ? (
            // Flowing gradient for completed connections
            <motion.div
              className="flow-gradient h-full"
              style={{
                background: "linear-gradient(90deg, #10b981 0%, #10b981 50%, transparent 100%)",
              }}
              animate={{
                backgroundPosition: ["0% center", "200% center"],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          ) : (
            <div className="h-full bg-gray-200" />
          )}
        </div>
      )}
    </div>
  )
}
