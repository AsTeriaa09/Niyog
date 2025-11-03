"use client"

import { useState } from "react"
import JobSeekerLogin from "./job-seeker-login"
import EmployerLogin from "./employer-login"
import { motion } from "framer-motion"

export default function LandingPage({ onLogin }: { onLogin: (role: string) => void }) {
  const [view, setView] = useState<"choice" | "jobseeker" | "employer">("choice")

  if (view === "jobseeker") {
    return <JobSeekerLogin onSuccess={() => onLogin("jobseeker")} />
  }

  if (view === "employer") {
    return <EmployerLogin onSuccess={() => onLogin("employer")} />
  }

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animation-delay-2000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl w-full"
      >
       

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Seeker Card */}
          <motion.button
            onClick={() => setView("jobseeker")}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b35] to-[#2ec4b6] rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/95 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="text-4xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-[#1a4b8c] mb-3">Job Seeker</h2>
              <p className="text-gray-600 mb-6">
                Find your next opportunity with real-time tracking and interview preparation
              </p>
              <div className="space-y-2 mb-6 text-sm text-gray-700">
                <p>✓ Live application tracking</p>
                <p>✓ AI interview simulator</p>
                <p>✓ Growth insights</p>
              </div>
              <div className="py-2 px-4 bg-gradient-button rounded-lg text-white font-semibold text-center">
                Login as Job Seeker
              </div>
            </div>
          </motion.button>

          {/* Employer Card */}
          <motion.button
            onClick={() => setView("employer")}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#2ec4b6] to-[#1a4b8c] rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/95 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="text-4xl mb-4">🏢</div>
              <h2 className="text-2xl font-bold text-[#1a4b8c] mb-3">Employer</h2>
              <p className="text-gray-600 mb-6">
                Discover top talent with blind spot analysis and smart hiring insights
              </p>
              <div className="space-y-2 mb-6 text-sm text-gray-700">
                <p>✓ Find hidden talent</p>
                <p>✓ Smart candidate matching</p>
                <p>✓ Efficient hiring</p>
              </div>
              <div className="py-2 px-4 bg-gradient-button rounded-lg text-white font-semibold text-center">
                Login as Employer
              </div>
            </div>
          </motion.button>
        </div>

        {/* Features Footer */}
        <div className="mt-16 text-center text-white/70 text-sm">
          <p>First platform built for the candidate, not just the company</p>
        </div>
      </motion.div>
    </div>
  )
}
