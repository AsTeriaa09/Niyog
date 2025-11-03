"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface FABAction {
  id: string
  label: string
  icon: string
}

const actions: FABAction[] = [
  { id: "resume", label: "Update Resume", icon: "📄" },
  { id: "notifications", label: "Notifications", icon: "🔔" },
  { id: "settings", label: "Settings", icon: "⚙️" },
]

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-32 right-6 z-40">
      {/* Action items */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-16 right-0 space-y-3 mb-4"
        >
          {actions.map((action, idx) => (
            <motion.button
              key={action.id}
              initial={{ scale: 0, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0, y: 20, opacity: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 ml-auto mb-2 group"
            >
              <motion.div
                className="hidden group-hover:flex items-center gap-2 bg-[var(--charcoal-night)] text-white text-xs font-semibold px-3 py-2 rounded-lg whitespace-nowrap"
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: 0 }}
              >
                {action.label}
              </motion.div>
              <div className="w-12 h-12 rounded-full gradient-button text-white flex items-center justify-center text-lg shadow-lg hover:shadow-xl transition-shadow">
                {action.icon}
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Main FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full gradient-button text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow relative group"
      >
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }} className="text-2xl">
          +
        </motion.div>

        {/* Pulsing background ring */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute inset-0 rounded-full border-2 border-[var(--sunset-coral)]/30"
        />

        {/* Badge for new items */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--sunset-coral)] text-white text-xs font-bold flex items-center justify-center"
        >
          3
        </motion.div>
      </motion.button>
    </div>
  )
}
