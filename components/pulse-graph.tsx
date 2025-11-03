"use client"

import { motion } from "framer-motion"

interface ApplicationStatus {
  week: number
  value: number
}

interface PulseGraphProps {
  data: ApplicationStatus[]
}

export default function PulseGraph({ data }: PulseGraphProps) {
  const maxValue = Math.max(...data.map((d) => d.value))
  const minValue = Math.min(...data.map((d) => d.value))

  // Calculate points for the line
  const points = data.map((d, idx) => {
    const x = 40 + (idx / (data.length - 1)) * (100 - 40 - 20)
    const y = 200 - (((d.value - minValue) / (maxValue - minValue)) * 180 + 20)
    return { x, y, idx }
  })

  const pointsString = points.map((p) => `${p.x},${p.y}`).join(" ")
  const polygonPoints = `40,200 ${pointsString} 440,200`

  return (
    <div className="w-full">
      <div className="relative w-full h-48 p-4 bg-gradient-to-br from-[var(--ocean-blue)]/5 via-[var(--electric-teal)]/5 to-[var(--sunset-coral)]/5 rounded-2xl">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-gray-500 py-4">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>

        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute left-10 right-0 border-t border-gray-200/50"
            style={{ top: `${(i / 4) * 100}%` }}
          />
        ))}

        {/* SVG for path - Wrapped polyline in defs to ensure proper rendering */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--ocean-blue)" />
              <stop offset="50%" stopColor="var(--electric-teal)" />
              <stop offset="100%" stopColor="var(--sunset-coral)" />
            </linearGradient>
          </defs>

          {/* Fill area under curve */}
          <motion.polygon
            points={polygonPoints}
            fill="url(#pulseGradient)"
            fillOpacity="0.1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />

          {/* Path line */}
          <motion.polyline
            points={pointsString}
            fill="none"
            stroke="url(#pulseGradient)"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1.5 }}
          />

          {/* Data points */}
          {data.map((d, idx) => {
            const point = points[idx]

            return (
              <g key={idx}>
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r="5"
                  fill="white"
                  stroke="url(#pulseGradient)"
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + idx * 0.08 }}
                  vectorEffect="non-scaling-stroke"
                />
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r="5"
                  fill="none"
                  stroke="url(#pulseGradient)"
                  strokeWidth="1"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{
                    delay: 0.5 + idx * 0.08,
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            )
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[var(--ocean-blue)]"></div>
          <span className="text-xs text-gray-600">Week Start</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[var(--electric-teal)]"></div>
          <span className="text-xs text-gray-600">Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[var(--sunset-coral)]"></div>
          <span className="text-xs text-gray-600">Week End</span>
        </div>
      </div>
    </div>
  )
}
