"use client"

import { motion, AnimatePresence } from "framer-motion"
import NavIcon from "./nav-icon"
import FloatingActionButton from "./floating-action-button"

const navItems = [
  { 
    id: "dashboard", 
    label: "Dashboard", 
    icon: "📊", // Professional analytics icon
    tooltip: "Application Overview"
  },
  { 
    id: "apply", 
    label: "Jobs", 
    icon: "💼", // Professional briefcase
    tooltip: "Find Opportunities"
  },
  { 
    id: "interview", 
    label: "Coach", 
    icon: "🎯", // Target for focused practice
    tooltip: "AI Interview Coach"
  },
  { 
    id: "profile", 
    label: "Profile", 
    icon: "👤", // Clean person icon
    tooltip: "My Profile & Analytics"
  },
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
      {/* Floating Action Button - Make it more professional */}
      <FloatingActionButton />

      {/* Bottom Navigation Bar */}
      <motion.div
        initial={{ y: 120 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-40 pointer-events-auto"
      >
        {/* Professional curved navigation container */}
        <div className="pointer-events-auto relative h-24 flex items-center justify-center">
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-80 max-w-[calc(100%-2rem)]"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
          >
            {/* Main nav bar with sophisticated design */}
            <div className="relative">
              {/* Subtle professional glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-lg"></div>

              {/* Professional glass container */}
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/50 p-2 flex items-center justify-around">
                {/* Animated background highlight */}
                <motion.div
                  layoutId="navBackground"
                  className="absolute inset-2 rounded-2xl pointer-events-none bg-blue-500/10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />

                {/* Professional nav items */}
                {navItems.map((item) => (
                  <NavIcon
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    tooltip={item.tooltip}
                    isActive={currentPage === item.id}
                    onClick={() => onPageChange(item.id)}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
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