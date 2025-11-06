"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import ProfileAvatar from "@/components/profile-avatar"

export default function JobSeekerLogin({ onSuccess, onSwitchToEmployer }: { onSuccess: () => void, onSwitchToEmployer?: () => void }) {
  const [formData, setFormData] = useState({ email: "alex@example.com", password: "password123" })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      localStorage.setItem("userRole", "jobseeker")
      localStorage.setItem("userName", "Alex Johnson")
      onSuccess()
    }, 800)
  }

  const handleSwitch = () => {
    if (onSwitchToEmployer) {
      onSwitchToEmployer()
    } else {
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="backdrop-blur-md bg-white/10 rounded-3xl border border-white/20 p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <ProfileAvatar />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/70">Job Seeker Login</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:border-[#ff6b35] focus:outline-none focus:ring-2 focus:ring-[#ff6b35]/50 transition-all"
                placeholder="your@email.com"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:border-[#ff6b35] focus:outline-none focus:ring-2 focus:ring-[#ff6b35]/50 transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* Demo Credentials */}
            <div className="bg-white/10 rounded-lg p-3 text-xs text-white/70 border border-white/20">
              <p className="font-semibold mb-1">Demo Credentials:</p>
              <p>Email: alex@example.com</p>
              <p>Password: password123</p>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl gradient-button text-white font-semibold disabled:opacity-50 transition-all"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                  Logging in...
                </span>
              ) : (
                "Login as Job Seeker"
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-b from-[#1a4b8c] to-[#2ec4b6] text-white/70">or</span>
            </div>
          </div>

          {/* Login as Employer */}
          <motion.button
            type="button"
            onClick={handleSwitch}
            whileHover={{ scale: 1.02 }}
            className="w-full py-3 rounded-xl border-2 border-white/30 text-white font-semibold hover:border-white/50 transition-all"
          >
            Login as Employer Instead
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}