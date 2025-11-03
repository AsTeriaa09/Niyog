"use client"

import { motion } from "framer-motion"

interface VoiceVisualizationProps {
  isActive?: boolean
}

export default function VoiceVisualization({ isActive = true }: VoiceVisualizationProps) {
  const barVariants = (delay: number) => ({
    animate: isActive
      ? {
          height: ["24px", "48px", "40px", "56px", "36px", "50px", "28px"],
          opacity: [0.6, 1, 0.8, 1, 0.7, 1, 0.6],
        }
      : {
          height: "24px",
          opacity: 0.3,
        },
    transition: {
      duration: 0.8,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
    },
  })

  return (
    <div className="flex items-center justify-center gap-1.5 h-16 bg-gradient-to-r from-[var(--ocean-blue)]/10 via-[var(--electric-teal)]/10 to-[var(--sunset-coral)]/10 rounded-2xl p-6">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          variants={barVariants(i * 0.06)}
          animate="animate"
          className="w-1.5 bg-gradient-to-t from-[var(--sunset-coral)] via-[var(--electric-teal)] to-[var(--ocean-blue)] rounded-full"
          style={{
            boxShadow:
              i % 3 === 0
                ? `0 0 8px rgba(42, 196, 182, 0.4)`
                : i % 3 === 1
                  ? `0 0 8px rgba(26, 75, 140, 0.4)`
                  : `0 0 8px rgba(255, 107, 53, 0.4)`,
          }}
        />
      ))}
    </div>
  )
}
