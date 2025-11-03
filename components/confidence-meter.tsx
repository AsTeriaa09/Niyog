"use client"

import { motion } from "framer-motion"

interface ConfidenceMeterProps {
  score: number
  size?: "sm" | "md" | "lg"
  animated?: boolean
}

export default function ConfidenceMeter({ score, size = "md", animated = true }: ConfidenceMeterProps) {
  const sizeMap = {
    sm: { diameter: 48, radius: 20, strokeWidth: 2 },
    md: { diameter: 64, radius: 28, strokeWidth: 3 },
    lg: { diameter: 96, radius: 42, strokeWidth: 4 },
  }

  const config = sizeMap[size]
  const circumference = 2 * Math.PI * config.radius
  const strokeDashoffset = circumference * (1 - score / 100)

  // Color based on score
  const getColor = () => {
    if (score >= 85) return "var(--success-mint)"
    if (score >= 70) return "var(--electric-teal)"
    return "var(--sunset-coral)"
  }

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: config.diameter, height: config.diameter }}
    >
      <svg className="transform -rotate-90" width={config.diameter} height={config.diameter}>
        {/* Background circle */}
        <circle
          cx={config.diameter / 2}
          cy={config.diameter / 2}
          r={config.radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={config.strokeWidth}
        />

        {/* Animated progress circle */}
        {animated ? (
          <motion.circle
            cx={config.diameter / 2}
            cy={config.diameter / 2}
            r={config.radius}
            fill="none"
            stroke={getColor()}
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }}
          />
        ) : (
          <circle
            cx={config.diameter / 2}
            cy={config.diameter / 2}
            r={config.radius}
            fill="none"
            stroke={getColor()}
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        )}
      </svg>

      {/* Center text */}
      <div className="absolute flex flex-col items-center justify-center">
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className={`font-bold ${size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-lg"}`}
          style={{ color: getColor() }}
        >
          {score}%
        </motion.span>
        {size === "lg" && <span className="text-xs text-gray-600 mt-1">Match</span>}
      </div>
    </div>
  )
}
