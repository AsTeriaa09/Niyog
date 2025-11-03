"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface FlipCardProps {
  front: {
    title: string
    subtitle?: string
  }
  back: {
    description: string
  }
  index: number
}

export default function FlipCard({ front, back, index }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => setIsFlipped(!isFlipped)}
      className="h-full cursor-pointer"
      style={{ perspective: 1000 }}
    >
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <motion.div
          className="absolute inset-0 gradient-card rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-4xl mb-3">🎯</div>
          <h3 className="text-lg font-bold text-[var(--charcoal-night)] mb-2">{front.title}</h3>
          {front.subtitle && <p className="text-sm text-gray-600">{front.subtitle}</p>}
          <p className="text-xs text-gray-500 mt-4">Click to flip</p>
        </motion.div>

        {/* Back */}
        <motion.div
          className="absolute inset-0 gradient-card rounded-2xl p-6 flex items-center justify-center shadow-lg bg-[var(--electric-teal)]/10"
          style={{ backfaceVisibility: "hidden", rotateY: 180 }}
        >
          <div className="text-center">
            <p className="text-sm text-[var(--charcoal-night)] leading-relaxed">{back.description}</p>
            <p className="text-xs text-gray-500 mt-4">Click to flip</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
