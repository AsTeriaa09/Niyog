"use client"

import { motion } from "framer-motion"

export default function BeatingHeart() {
  const heartVariants = {
    beat: {
      scale: [1, 1.15, 1],
      filter: [
        "drop-shadow(0 0 0px rgba(26, 75, 140, 0.3))",
        "drop-shadow(0 0 15px rgba(26, 75, 140, 0.6))",
        "drop-shadow(0 0 0px rgba(26, 75, 140, 0.3))",
      ],
    },
  }

  const pulseRing = {
    pulse: {
      scale: [1, 1.5, 2],
      opacity: [1, 0.5, 0],
    },
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {/* Main Heart with Pulse */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Outer pulse rings */}
        {[0, 1, 2].map((idx) => (
          <motion.div
            key={idx}
            variants={pulseRing}
            animate="pulse"
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: idx * 0.3,
            }}
            className="absolute inset-0 rounded-full border-2"
            style={{
              borderColor: `var(--ocean-blue)`,
            }}
          />
        ))}

        {/* Beating Heart SVG */}
        <motion.svg
          variants={heartVariants}
          animate="beat"
          transition={{
            duration: 0.8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
          viewBox="0 0 100 100"
          className="w-24 h-24 relative z-10"
          fill="var(--sunset-coral)"
        >
          <path d="M50,85 C20,65 5,50 5,35 C5,20 15,10 25,10 C35,10 45,20 50,28 C55,20 65,10 75,10 C85,10 95,20 95,35 C95,50 80,65 50,85 Z" />
        </motion.svg>
      </div>

      {/* Status Text */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[var(--charcoal-night)]">Active Applications</h2>
        <p className="text-sm text-gray-600 mt-2">Your applications are being processed</p>
      </div>

      {/* Heartbeat Indicator */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[var(--sunset-coral)] pulse-heart"></div>
        <span className="text-sm font-medium text-gray-700">Live Monitoring</span>
      </div>
    </div>
  )
}
