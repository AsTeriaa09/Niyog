"use client"

import { motion } from "framer-motion"

export default function LoadingSkeleton() {
  const shimmer = {
    initial: { opacity: 0.5 },
    animate: { opacity: 1 },
    transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" as const },
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2 mb-8">
        <motion.div
          variants={shimmer}
          initial="initial"
          animate="animate"
          className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-1/3"
        />
        <motion.div
          variants={shimmer}
          initial="initial"
          animate="animate"
          className="h-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-lg w-1/2"
        />
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          variants={shimmer}
          initial="initial"
          animate="animate"
          className="lg:col-span-2 h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-2xl"
        />
        <motion.div
          variants={shimmer}
          initial="initial"
          animate="animate"
          className="h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-2xl"
        />
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            variants={shimmer}
            initial="initial"
            animate="animate"
            className="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-2xl"
          />
        ))}
      </div>
    </div>
  )
}
