"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ProfileAvatar from "@/components/profile-avatar"
import { useToast } from "@/hooks/use-toast"

interface NavProps {
  onNavigate?: (page: string) => void
}

export default function EmployerDashboard({ onNavigate }: NavProps) {
  const { toast } = useToast()
  const [selectedJob, setSelectedJob] = useState("senior-frontend")

  // Key metrics data
  const metricsData = [
    { label: "Active Jobs", value: 12, icon: "📋", color: "from-[#1a4b8c] to-[#2ec4b6]" },
    { label: "New Apps Today", value: 8, icon: "📥", color: "from-[#ff6b35] to-[#ffa500]" },
    { label: "Interview Scheduled", value: 5, icon: "🗓", color: "from-[#8b5cf6] to-[#a78bfa]" },
    { label: "Hire Rate", value: "68%", icon: "📈", color: "from-[#10b981] to-[#34d399]" },
  ]

  // Pipeline data
  const pipelineData = [
    { stage: "APPLIED", count: 45, color: "#3b82f6" },
    { stage: "SCREENED", count: 28, color: "#10b981" },
    { stage: "SHORTLISTED", count: 12, color: "#8b5cf6" },
    { stage: "INTERVIEW", count: 5, color: "#f59e0b" },
    { stage: "OFFER", count: 2, color: "#ef4444" },
    { stage: "HIRED", count: 1, color: "#06b6d4" },
  ]

  // Top candidates
  const topCandidates = [
    {
      name: "Sarah Chen",
      match: 95,
      rating: 5.0,
      experience: "3 Yrs React",
      education: "MIT",
      skills: ["React", "TypeScript", "Node.js"],
    },
    {
      name: "Alex Rodriguez",
      match: 92,
      rating: 4.5,
      experience: "4 Yrs Vue",
      education: "Stanford",
      skills: ["Vue.js", "Python", "AWS"],
    },
    {
      name: "Maria Gonzalez",
      match: 88,
      rating: 4.3,
      experience: "Open to Relocation",
      education: "Google Exp",
      skills: ["Angular", "Java", "Cloud"],
    },
  ]

  // Active jobs
  const activeJobs = [
    {
      id: "senior-frontend",
      title: "Senior Frontend Developer",
      applications: 45,
      daysPosted: 3,
      matchQuality: 72,
    },
    {
      id: "product-manager",
      title: "Product Manager",
      applications: 28,
      daysPosted: 7,
      matchQuality: 85,
    },
    {
      id: "devops",
      title: "DevOps Engineer",
      applications: 18,
      daysPosted: 5,
      matchQuality: 78,
    },
  ]

  // Hiring insights
  const insights = [
    "Your job description attracts diverse candidates",
    "Consider adding remote work to attract 40% more applicants",
    "Top skill gap: TypeScript (65% of candidates)",
    "Competitive salary range detected",
  ]

  // Recent activity
  const recentActivity = [
    { action: "Sarah Chen applied to Senior Frontend", time: "Just now", status: "apply" },
    { action: "Alex Rodriguez completed skill assessment", time: "5m ago", status: "assessment" },
    { action: "Interview scheduled with Maria Gonzalez", time: "15m ago", status: "schedule" },
    { action: "John Smith withdrew application", time: "1h ago", status: "withdraw" },
  ]

  // Conversion data for chart
  const conversionData = [
    { name: "Applied", value: 45 },
    { name: "Screened", value: 28 },
    { name: "Shortlisted", value: 12 },
    { name: "Interview", value: 5 },
    { name: "Offer", value: 2 },
    { name: "Hired", value: 1 },
  ]

  // Hiring trends
  const hiringTrendsData = [
    { week: "Week 1", applications: 12, interviews: 3, offers: 1 },
    { week: "Week 2", applications: 15, interviews: 4, offers: 1 },
    { week: "Week 3", applications: 18, interviews: 5, offers: 2 },
    { week: "Week 4", applications: 45, interviews: 12, offers: 3 },
  ]

  const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444", "#06b6d4"]

  const handleSchedule = (candidateName: string) => {
    toast({
      title: "Interview Scheduled",
      description: `Interview with ${candidateName} has been scheduled successfully.`,
      className: "bg-gradient-to-r from-[#1a4b8c] to-[#2ec4b6] text-white border-0",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
     

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metricsData.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                  {metric.value}
                </div>
                <span className="text-2xl">{metric.icon}</span>
              </div>
              <p className="text-sm text-gray-600">{metric.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Active Jobs & Pipeline */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Jobs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Active Jobs</h2>
                <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-100">
                  Post New Job
                </Button>
              </div>

              <div className="space-y-4">
                {activeJobs.map((job, idx) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setSelectedJob(job.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedJob === job.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {job.applications} Applications • Posted {job.daysPosted} days ago
                        </p>
                      </div>
                      <Badge variant="secondary" className="whitespace-nowrap bg-gray-100 text-gray-800">
                        {job.matchQuality}% Quality
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#1a4b8c] to-[#2ec4b6] h-full rounded-full"
                        style={{ width: `${job.matchQuality}%` }}
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Candidate Pipeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Candidate Pipeline</h2>

              {/* Pipeline Flow */}
              <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4">
                {pipelineData.map((stage, idx) => (
                  <div key={stage.stage} className="flex items-center flex-shrink-0">
                    <div className="text-center">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg bg-gradient-to-r from-[#1a4b8c] to-[#2ec4b6]"
                      >
                        {stage.count}
                      </div>
                      <p className="text-xs text-gray-600 mt-2 whitespace-nowrap font-semibold">{stage.stage}</p>
                    </div>
                    {idx < pipelineData.length - 1 && (
                      <div className="w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 mx-2"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Conversion Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">2.2%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg Time to Hire</p>
                  <p className="text-2xl font-bold text-gray-900">14 days</p>
                </div>
              </div>
            </motion.div>

            {/* Hiring Trends Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Hiring Trends</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hiringTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="week" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      color: "#1e293b",
                    }}
                  />
                  <Line type="monotone" dataKey="applications" stroke="#1a4b8c" strokeWidth={2} />
                  <Line type="monotone" dataKey="interviews" stroke="#2ec4b6" strokeWidth={2} />
                  <Line type="monotone" dataKey="offers" stroke="#ff6b35" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Right Column - Blind Spot Analysis Matches & Insights */}
          <div className="space-y-8">
            {/* Blind Spot Analysis Matches */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Blind Spot Analysis Matches</h2>

              <div className="space-y-4">
                {topCandidates.map((candidate, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + idx * 0.05 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                      <Badge className="bg-gradient-to-r from-[#1a4b8c] to-[#2ec4b6] text-white">
                        {candidate.match}%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>
                        {"⭐".repeat(Math.floor(candidate.rating))} {candidate.rating}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      {candidate.experience} • {candidate.education}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {candidate.skills.slice(0, 2).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs bg-gray-100 text-gray-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="default" 
                        className="flex-1 bg-gradient-to-r from-[#1a4b8c] to-[#2ec4b6] hover:opacity-90"
                        onClick={() => handleSchedule(candidate.name)}
                      >
                        Schedule
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* AI Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200 p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🤖</span>
                <h2 className="text-lg font-bold text-gray-900">Hiring Insights</h2>
              </div>

              <div className="space-y-3">
                {insights.map((insight, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + idx * 0.05 }}
                    className="flex gap-3 items-start"
                  >
                    <span className="text-blue-600 font-bold mt-0.5">✓</span>
                    <p className="text-sm text-gray-700">{insight}</p>
                  </motion.div>
                ))}
              </div>

              <Button className="w-full mt-4 bg-gradient-to-r from-[#1a4b8c] to-[#2ec4b6] hover:opacity-90">
                View Detailed Analytics
              </Button>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>

              <div className="space-y-3">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1">
                      {activity.status === "apply" && <span className="text-blue-500">📥</span>}
                      {activity.status === "assessment" && <span className="text-green-500">✅</span>}
                      {activity.status === "schedule" && <span className="text-purple-500">📅</span>}
                      {activity.status === "withdraw" && <span className="text-red-500">❌</span>}
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}