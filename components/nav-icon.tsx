"use client"

import { motion } from "framer-motion"

interface NavIconProps {
  icon: string
  label: string
  isActive: boolean
  onClick: () => void
  tooltip?: string
  className?: string
}

export default function NavIcon({ icon, label, isActive, onClick, tooltip, className = "" }: NavIconProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1.5 py-3 px-4 rounded-2xl transition-all duration-300 relative group ${
        isActive ? "text-white" : "text-gray-600 hover:text-[var(--ocean-blue)]"
      } ${className}`}
      title={tooltip} // Using the tooltip prop as the HTML title attribute
    >
      {/* Background for active state */}
      {isActive && (
        <motion.div
          layoutId="activeNav"
          className="absolute inset-0 rounded-2xl gradient-button"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-1">
        {/* Icon container */}
        <motion.div
          animate={{
            y: isActive ? -2 : 0,
            scale: isActive ? 1.2 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="text-xl"
        >
          {icon}
        </motion.div>

        {/* Label */}
        <motion.span
          animate={{
            opacity: isActive ? 1 : 0.7,
            scale: isActive ? 1 : 0.9,
          }}
          className="text-xs font-bold"
        >
          {label}
        </motion.span>

        {/* Active indicator dot */}
        {isActive && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-white"
          />
        )}
      </div>

      {/* Hover glow */}
      {!isActive && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--ocean-blue)]/0 to-[var(--electric-teal)]/0 group-hover:from-[var(--ocean-blue)]/10 group-hover:to-[var(--electric-teal)]/10 transition-all duration-300" />
      )}
    </motion.button>
  )
}
