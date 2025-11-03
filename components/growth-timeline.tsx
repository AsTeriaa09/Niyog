"use client"

import { motion } from "framer-motion"

interface TimelineData {
  month: string
  apps: number
  interviews: number
}

interface GrowthTimelineProps {
  data: TimelineData[]
}

export default function GrowthTimeline({ data }: GrowthTimelineProps) {
  const maxApps = Math.max(...data.map((d) => d.apps))
  const maxInterviews = Math.max(...data.map((d) => d.interviews))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="w-full">
      {/* Timeline bars */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-end justify-between gap-3 h-64 p-6 bg-gradient-to-b from-[var(--ocean-blue)]/5 via-transparent to-transparent rounded-2xl"
      >
        {data.map((item, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="flex-1 flex flex-col gap-2 items-center justify-end group relative"
          >
            {/* Applications bar */}
            <div className="w-full flex flex-col items-center gap-2">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: (item.apps / maxApps) * 180, opacity: 1 }}
                transition={{ delay: idx * 0.1 + 0.3, duration: 0.8, type: "spring" }}
                className="w-1/2 rounded-t-lg bg-gradient-to-t from-[var(--ocean-blue)] to-[var(--electric-teal)] relative group/bar transition-all hover:w-2/3"
              >
                {/* Hover tooltip for apps */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[var(--charcoal-night)] text-white text-xs py-2 px-3 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  <div className="font-semibold">{item.apps} Applications</div>
                </div>
              </motion.div>

              {/* Interviews bar */}
              {item.interviews > 0 && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "75%", opacity: 1 }}
                  transition={{ delay: idx * 0.1 + 0.4, duration: 0.6 }}
                  className="h-6 rounded-full bg-gradient-to-r from-[var(--sunset-coral)] to-[var(--electric-teal)] flex items-center justify-center text-xs font-bold text-white relative group/interview"
                >
                  {item.interviews}
                  {/* Hover tooltip for interviews */}
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[var(--charcoal-night)] text-white text-xs py-2 px-3 rounded-lg opacity-0 group-hover/interview:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    {item.interviews} Interview{item.interviews > 1 ? "s" : ""}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Month label */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 + 0.5 }}
              className="text-xs font-bold text-[var(--charcoal-night)] mt-2"
            >
              {item.month}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 grid grid-cols-2 gap-4"
      >
        <div className="bg-gradient-to-br from-[var(--ocean-blue)]/10 to-[var(--electric-teal)]/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-[var(--ocean-blue)]">{data.reduce((sum, d) => sum + d.apps, 0)}</div>
          <div className="text-xs text-gray-600 mt-1">Total Applications</div>
        </div>
        <div className="bg-gradient-to-br from-[var(--sunset-coral)]/10 to-[var(--electric-teal)]/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-[var(--sunset-coral)]">
            {data.reduce((sum, d) => sum + d.interviews, 0)}
          </div>
          <div className="text-xs text-gray-600 mt-1">Total Interviews</div>
        </div>
      </motion.div>
    </div>
  )
}
