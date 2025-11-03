"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import ConfidenceMeter from "./confidence-meter"
import ApplyFormModal from "./apply-form-modal"

interface JobApplicationFlowProps {
  onNavigate?: (page: string) => void
}

const mockJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: "$120k - $160k",
    matchScore: 94,
    description: "Build scalable web applications with modern React patterns",
    tags: ["React", "TypeScript", "Node.js"],
    benefits: ["Remote", "Health Insurance", "Stock Options"],
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "Remote",
    salary: "$100k - $140k",
    matchScore: 88,
    description: "Work on our AI-powered platform across the stack",
    tags: ["Next.js", "Python", "AWS"],
    benefits: ["Fully Remote", "Flexible Hours", "Learning Budget"],
  },
  {
    id: 3,
    title: "Product Manager",
    company: "InnovateLabs",
    location: "New York, NY",
    salary: "$130k - $180k",
    matchScore: 85,
    description: "Lead product strategy and vision for our flagship product",
    tags: ["Product Strategy", "Data Analysis", "Leadership"],
    benefits: ["HQ in Manhattan", "Relocation Package", "Equity"],
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudBase",
    location: "Seattle, WA",
    salary: "$110k - $150k",
    matchScore: 82,
    description: "Manage cloud infrastructure and deployment pipelines",
    tags: ["Kubernetes", "AWS", "CI/CD"],
    benefits: ["Hybrid", "Professional Development", "401k"],
  },
]

export default function JobApplicationFlow({ onNavigate }: JobApplicationFlowProps) {
  const [jobs] = useState(mockJobs)
  const [hasApplied, setHasApplied] = useState<Set<number>>(new Set())
  const [selectedJobForApply, setSelectedJobForApply] = useState<{ id: number; title: string; company: string } | null>(
    null,
  )

  const handleApplyClick = (job: (typeof mockJobs)[0]) => {
    setSelectedJobForApply({ id: job.id, title: job.title, company: job.company })
  }

  const handleApplicationSubmitted = (jobId: number) => {
    setHasApplied(new Set(hasApplied).add(jobId))
    setSelectedJobForApply(null)
  }

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-4xl font-bold mb-2 text-[#1e293b]">Find Your Next Opportunity</h1>
        <p className="text-lg text-gray-600">Smart job matches tailored to your profile with one-tap application</p>
      </motion.div>

      {/* Job Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {jobs.map((job, idx) => (
          <motion.div key={job.id} variants={itemVariants} className="h-full">
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="gradient-card rounded-2xl p-6 h-full flex flex-col shadow-md hover:shadow-2xl transition-shadow"
            >
              {/* Header with match score */}
              <div className="flex items-start justify-between mb-4 gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#1e293b] mb-1">{job.title}</h3>
                  <p className="text-gray-600 font-medium">{job.company}</p>
                </div>
                <ConfidenceMeter score={job.matchScore} size="md" />
              </div>

              {/* Job Details */}
              <div className="space-y-3 mb-4 flex-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>📍</span>
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>💰</span>
                  <span className="font-semibold text-[#1e293b]">{job.salary}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">{job.description}</p>

              {/* Tags */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, tagIdx) => (
                    <motion.span
                      key={tagIdx}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 + tagIdx * 0.05 }}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-[#1a4b8c]/10 text-[#1a4b8c]"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-gray-700 mb-2">Benefits</h4>
                <div className="flex flex-wrap gap-2">
                  {job.benefits.map((benefit, benIdx) => (
                    <span key={benIdx} className="px-2 py-1 rounded text-xs bg-[#10b981]/10 text-[#10b981]">
                      ✓ {benefit}
                    </span>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleApplyClick(job)}
                disabled={hasApplied.has(job.id)}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                  hasApplied.has(job.id)
                    ? "bg-[#10b981]/20 text-[#10b981]"
                    : "gradient-button text-white shadow-lg hover:shadow-xl"
                }`}
              >
                {hasApplied.has(job.id) ? "✓ Application Sent" : "Apply Now"}
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 gradient-card rounded-2xl p-6 text-center"
      >
        <p className="text-gray-600">
          <span className="font-bold text-[#1e293b]">{jobs.length}</span> opportunities matched to your profile
          {hasApplied.size > 0 && (
            <span className="ml-2">
              • <span className="font-bold text-[#2ec4b6]">{hasApplied.size}</span> applications sent
            </span>
          )}
        </p>
      </motion.div>

      {selectedJobForApply && (
        <ApplyFormModal
          jobTitle={selectedJobForApply.title}
          company={selectedJobForApply.company}
          onClose={() => setSelectedJobForApply(null)}
          onPrepareInterview={
            onNavigate
              ? () => {
                  setSelectedJobForApply(null)
                  onNavigate("interview")
                }
              : undefined
          }
        />
      )}
    </div>
  )
}
