"use client"

import { motion, AnimatePresence } from "framer-motion"
import NavIcon from "./nav-icon"
import FloatingActionButton from "./floating-action-button"

const navItems = [
  { id: "dashboard", label: "Pulse", icon: "💓" },
  { id: "apply", label: "Apply", icon: "🎯" },
  { id: "interview", label: "Practice", icon: "🎤" },
  { id: "profile", label: "Insights", icon: "📊" },
]

export default function BottomNavigation({
  currentPage,
  onPageChange,
}: {
  currentPage: string
  onPageChange: (page: string) => void
}) {
  return (
    <>
      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Bottom Navigation Bar */}
      <motion.div
        initial={{ y: 120 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-40 pointer-events-auto"
      >
        {/* Curved navigation container */}
        <div className="pointer-events-auto relative h-24 flex items-center justify-center">
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-80 max-w-[calc(100%-2rem)]"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
          >
            {/* Main nav bar with curved design */}
            <div className="relative">
              {/* Glow background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--ocean-blue)]/5 via-[var(--electric-teal)]/5 to-[var(--sunset-coral)]/5 rounded-3xl blur-xl"></div>

              {/* Nav container */}
              <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-2 flex items-center justify-around">
                {/* Animated background highlight */}
                <motion.div
                  layoutId="navBackground"
                  className="absolute inset-2 rounded-2xl pointer-events-none"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />

                {/* Nav items */}
                {navItems.map((item) => (
                  <NavIcon
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    isActive={currentPage === item.id}
                    onClick={() => onPageChange(item.id)}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Safe area spacer */}
          <div className="h-4"></div>
        </div>
      </motion.div>

      {/* Overlay for when FAB is open */}
      <AnimatePresence>{/* This will be controlled by the FAB component state if needed */}</AnimatePresence>
    </>
  )
}
