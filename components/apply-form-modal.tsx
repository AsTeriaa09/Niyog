"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import ApplicationDetail from "./application-detail"
import type { JobApplication } from "@/data/job-applications"

interface ApplyFormModalProps {
  jobTitle: string
  company: string
  onClose: () => void
  onPrepareInterview?: () => void
}

export default function ApplyFormModal({ jobTitle, company, onClose, onPrepareInterview }: ApplyFormModalProps) {
  const [step, setStep] = useState<"form" | "success">("form")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "Siratul Islam",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    resume: "Full_Stack_Developer_Resume.pdf",
    coverLetter: "",
    yearsOfExperience: "5",
    skills: "React, TypeScript, Node.js",
  })

  const [appliedJob, setAppliedJob] = useState<JobApplication | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      const newApplication: JobApplication = {
        id: Math.random(),
        jobTitle,
        company,
        appliedDate: new Date().toISOString().split("T")[0],
        status: "applied",
        timeline: [
          { status: "applied", date: new Date().toISOString().split("T")[0], completed: true },
          { status: "viewed", date: null, completed: false },
          { status: "shortlisted", date: null, completed: false },
          { status: "interview", date: null, completed: false },
          { status: "decision", date: null, completed: false },
        ],
        matchScore: Math.floor(Math.random() * 30) + 70,
        role: "Developer",
        salary: "$80k - $120k",
        location: "Remote",
        description: `Exciting opportunity for ${jobTitle} role at ${company}.`,
      }
      setAppliedJob(newApplication)
      setIsSubmitting(false)
      setStep("success")
    }, 1200)
  }

  if (step === "success" && appliedJob) {
    return <ApplicationDetail application={appliedJob} onClose={onClose} onPrepareInterview={onPrepareInterview} />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#1a4b8c] to-[#2ec4b6] text-white p-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Apply Now</h1>
            <p className="text-white/80 mt-1">
              {jobTitle} at {company}
            </p>
          </div>
          <button onClick={onClose} className="text-3xl font-light text-white/80 hover:text-white transition-colors">
            ×
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-[#1e293b] mb-2">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#1a4b8c] focus:outline-none focus:ring-2 focus:ring-[#1a4b8c]/20 transition-all"
              placeholder="Your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#1e293b] mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#1a4b8c] focus:outline-none focus:ring-2 focus:ring-[#1a4b8c]/20 transition-all"
              placeholder="your@email.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-[#1e293b] mb-2">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#1a4b8c] focus:outline-none focus:ring-2 focus:ring-[#1a4b8c]/20 transition-all"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Years of Experience */}
          <div>
            <label className="block text-sm font-semibold text-[#1e293b] mb-2">Years of Experience *</label>
            <select
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#1a4b8c] focus:outline-none focus:ring-2 focus:ring-[#1a4b8c]/20 transition-all"
            >
              <option value="">Select experience</option>
              <option value="0">Less than 1 year</option>
              <option value="1">1-2 years</option>
              <option value="2">2-3 years</option>
              <option value="3">3-5 years</option>
              <option value="5">5-7 years</option>
              <option value="7">7+ years</option>
            </select>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-semibold text-[#1e293b] mb-2">Skills *</label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#1a4b8c] focus:outline-none focus:ring-2 focus:ring-[#1a4b8c]/20 transition-all resize-none"
              rows={3}
              placeholder="List your key skills (comma-separated)"
            ></textarea>
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-semibold text-[#1e293b] mb-2">Cover Letter (Optional)</label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#1a4b8c] focus:outline-none focus:ring-2 focus:ring-[#1a4b8c]/20 transition-all resize-none"
              rows={4}
              placeholder="Tell us why you're interested in this role..."
            ></textarea>
          </div>

          {/* Resume Info */}
          <div className="bg-blue-50 border-l-4 border-[#1a4b8c] p-4 rounded">
            <p className="text-sm text-[#1a4b8c] font-semibold mb-1">Resume attached:</p>
            <p className="text-sm text-gray-700">{formData.resume}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 bg-gradient-to-r from-[#1a4b8c] to-[#2ec4b6] text-white font-semibold rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                  Submitting...
                </span>
              ) : (
                "Submit Application"
              )}
            </motion.button>
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
