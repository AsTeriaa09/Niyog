"use client"

import { motion } from "framer-motion"

interface GrowthPlantProps {
  growth: number
  maxGrowth?: number
}

export default function GrowthPlant({ growth, maxGrowth = 100 }: GrowthPlantProps) {
  const growthPercentage = (growth / maxGrowth) * 100

  const plantStages = [
    { min: 0, max: 25, plant: "🌱" },
    { min: 25, max: 50, plant: "🌿" },
    { min: 50, max: 75, plant: "🌾" },
    { min: 75, max: 100, plant: "🌳" },
  ]

  const currentPlant = plantStages.find((stage) => growthPercentage >= stage.min && growthPercentage <= stage.max)

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Plant Visualization with Stems */}
      <div className="h-48 flex items-end justify-center gap-3 bg-gradient-to-b from-green-50 via-green-50/50 to-transparent rounded-2xl p-8 w-full">
        {[...Array(4)].map((_, idx) => {
          const stageMin = idx * 25
          const stageMax = (idx + 1) * 25
          const isActive = growthPercentage > stageMin

          return (
            <motion.div key={idx} className="flex flex-col items-center gap-2">
              {/* Stem segments */}
              <motion.div
                className="w-1 bg-gradient-to-t from-[var(--success-mint)] to-green-300 rounded-full"
                animate={{
                  height: isActive ? `${(stageMax / 100) * 120}px` : 0,
                  opacity: isActive ? 1 : 0.2,
                }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
              />
              {/* Leaf */}
              {isActive && (
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                  className="text-2xl"
                >
                  🍃
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Current Plant and Stats */}
      <div className="text-center">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          className="text-6xl mb-3"
        >
          {currentPlant?.plant || "🌱"}
        </motion.div>
        <div className="text-sm text-gray-600">
          <motion.span
            className="text-3xl font-bold text-[var(--success-mint)] block mb-1"
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            {growth}%
          </motion.span>
          <span>Confidence Growth</span>
        </div>
      </div>

      {/* Progress Milestones */}
      <div className="w-full grid grid-cols-4 gap-2">
        {plantStages.map((stage, idx) => (
          <motion.div
            key={idx}
            className={`p-2 rounded-lg text-center text-xs font-semibold transition-all ${
              growthPercentage >= stage.min
                ? "bg-[var(--success-mint)]/20 text-[var(--success-mint)]"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {stage.plant}
            <div className="text-xs mt-1">{stage.max}%</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
