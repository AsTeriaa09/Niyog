"use client"

import { motion } from "framer-motion"

interface Skill {
  skill: string
  score: number
}

interface SkillRadarProps {
  skills: Skill[]
}

export default function SkillRadar({ skills }: SkillRadarProps) {
  const maxScore = 100

  // Calculate points for polygon
  const pointsArray = skills.map((skill, idx) => {
    const angle = (idx / skills.length) * Math.PI * 2 - Math.PI / 2
    const distance = 120 * (skill.score / 100)
    const x = 150 + Math.cos(angle) * distance
    const y = 150 + Math.sin(angle) * distance
    return `${x},${y}`
  })

  const polygonPoints = pointsArray.join(" ")

  return (
    <div className="w-full">
      <div className="relative w-full flex items-center justify-center aspect-square max-w-sm mx-auto">
        <svg viewBox="0 0 300 300" className="w-full h-full">
          {/* Background concentric circles */}
          {[1, 2, 3, 4, 5].map((circle) => (
            <g key={`bg-${circle}`}>
              <circle cx="150" cy="150" r={24 * circle} fill="none" stroke="#E5E7EB" strokeWidth="1" opacity={0.5} />
              <text x="160" y={150 - 24 * circle} fontSize="10" fill="#999999" textAnchor="start">
                {circle * 20}%
              </text>
            </g>
          ))}

          {/* Skill axis lines */}
          {skills.map((_, idx) => {
            const angle = (idx / skills.length) * Math.PI * 2 - Math.PI / 2
            const x = 150 + Math.cos(angle) * 120
            const y = 150 + Math.sin(angle) * 120
            return <line key={`axis-${idx}`} x1="150" y1="150" x2={x} y2={y} stroke="#E5E7EB" strokeWidth="1" />
          })}

          {/* Animated skill polygon */}
          <motion.polygon
            points={polygonPoints}
            fill="url(#radarGradient)"
            fillOpacity="0.25"
            stroke="url(#radarGradient)"
            strokeWidth="2.5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1.5 }}
          />

          {/* Skill data points */}
          {skills.map((skill, idx) => {
            const angle = (idx / skills.length) * Math.PI * 2 - Math.PI / 2
            const distance = 120 * (skill.score / 100)
            const x = 150 + Math.cos(angle) * distance
            const y = 150 + Math.sin(angle) * distance

            return (
              <g key={`point-${idx}`}>
                <motion.circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill="white"
                  stroke="url(#radarGradient)"
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                />
                <motion.circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill="none"
                  stroke="url(#radarGradient)"
                  strokeWidth="1"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{
                    delay: 0.5 + idx * 0.1,
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              </g>
            )
          })}

          {/* Skill labels */}
          {skills.map((skill, idx) => {
            const angle = (idx / skills.length) * Math.PI * 2 - Math.PI / 2
            const x = 150 + Math.cos(angle) * 155
            const y = 150 + Math.sin(angle) * 155

            return (
              <motion.g
                key={`label-${idx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + idx * 0.05 }}
              >
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="var(--charcoal-night)"
                >
                  {skill.skill}
                </text>
                <text
                  x={x}
                  y={y + 14}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill="var(--ocean-blue)"
                >
                  {skill.score}%
                </text>
              </motion.g>
            )
          })}

          <defs>
            <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--ocean-blue)" />
              <stop offset="50%" stopColor="var(--electric-teal)" />
              <stop offset="100%" stopColor="var(--sunset-coral)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Skill bars */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        {skills.map((skill, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + idx * 0.08 }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-[var(--charcoal-night)]">{skill.skill}</span>
              <motion.span
                className="text-sm font-bold text-[var(--ocean-blue)]"
                animate={{ color: ["var(--ocean-blue)", "var(--electric-teal)", "var(--ocean-blue)"] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, delay: idx * 0.1 }}
              >
                {skill.score}%
              </motion.span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.score}%` }}
                transition={{ delay: 0.3 + idx * 0.1, duration: 1 }}
                className="h-full gradient-button rounded-full"
              ></motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
