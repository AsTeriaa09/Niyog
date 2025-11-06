"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Zap, AlertCircle, CheckCircle2, Clock, Users } from "lucide-react"

interface Activity {
  id: string
  timestamp: string
  type: "apply" | "assessment" | "interview" | "offer" | "hire" | "reject"
  candidate: string
  action: string
  details?: string
  role?: string
}

interface Insight {
  id: string
  category: "opportunity" | "warning" | "tip" | "achievement"
  title: string
  description: string
  metric?: string
  actionable: boolean
}

export default function AIInsights() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      timestamp: "2 minutes ago",
      type: "apply",
      candidate: "Sarah Chen",
      action: "Applied for Senior Frontend Developer",
      role: "Senior Frontend Developer",
      details: "95% match score",
    },
    {
      id: "2",
      timestamp: "15 minutes ago",
      type: "assessment",
      candidate: "Alex Rodriguez",
      action: "Completed skill assessment",
      details: "Score: 88/100",
    },
    {
      id: "3",
      timestamp: "1 hour ago",
      type: "interview",
      candidate: "Maria Gonzalez",
      action: "Interview scheduled",
      details: "Friday, 2 PM EST",
    },
    {
      id: "4",
      timestamp: "3 hours ago",
      type: "offer",
      candidate: "John Smith",
      action: "Offer extended",
      details: "$130K - $150K",
    },
    {
      id: "5",
      timestamp: "1 day ago",
      type: "hire",
      candidate: "Emma Wilson",
      action: "Candidate hired",
      details: "Onboarding scheduled",
    },
    {
      id: "6",
      timestamp: "2 days ago",
      type: "reject",
      candidate: "Michael Chen",
      action: "Application rejected",
      details: "Did not match requirements",
    },
  ])

  const [insights, setInsights] = useState<Insight[]>([
    {
      id: "1",
      category: "opportunity",
      title: "High-Quality Candidates Incoming",
      description: "You're receiving 40% more qualified candidates this week. Consider expanding your hiring team.",
      metric: "+40%",
      actionable: true,
    },
    {
      id: "2",
      category: "warning",
      title: "Slow Interview Process",
      description:
        "Your average time-to-interview is 12 days. Industry standard is 5 days. Speed up initial screening.",
      metric: "12 days",
      actionable: true,
    },
    {
      id: "3",
      category: "tip",
      title: "Optimize Job Description",
      description:
        "Adding 'remote work' to your Frontend role could attract 35% more applicants based on market trends.",
      metric: "+35% reach",
      actionable: true,
    },
    {
      id: "4",
      category: "achievement",
      title: "Highest Conversion Rate",
      description: "Your recent UX Designer posting has a 4.2% conversion rate, 60% above your average.",
      metric: "4.2% CVR",
      actionable: false,
    },
    {
      id: "5",
      category: "warning",
      title: "Skill Gap Alert",
      description: "TypeScript proficiency is mentioned by 73% of applicants but only 45% have hands-on experience.",
      metric: "28% gap",
      actionable: true,
    },
    {
      id: "6",
      category: "opportunity",
      title: "Best Time to Post",
      description: "Historically, your positions get 2.5x more applications when posted on Tuesday-Wednesday.",
      metric: "2.5x higher",
      actionable: true,
    },
  ])

  const activityTypeConfig = {
    apply: { icon: Users, color: "bg-blue-100 text-blue-700", label: "Applied" },
    assessment: { icon: CheckCircle2, color: "bg-green-100 text-green-700", label: "Assessment" },
    interview: { icon: Clock, color: "bg-amber-100 text-amber-700", label: "Interview" },
    offer: { icon: TrendingUp, color: "bg-purple-100 text-purple-700", label: "Offer" },
    hire: { icon: Zap, color: "bg-emerald-100 text-emerald-700", label: "Hired" },
    reject: { icon: AlertCircle, color: "bg-red-100 text-red-700", label: "Rejected" },
  }

  const insightCategoryConfig = {
    opportunity: {
      color: "bg-emerald-100 text-emerald-800 border-emerald-300",
      icon: TrendingUp,
      label: "Opportunity",
    },
    warning: {
      color: "bg-amber-100 text-amber-800 border-amber-300",
      icon: AlertCircle,
      label: "Warning",
    },
    tip: {
      color: "bg-blue-100 text-blue-800 border-blue-300",
      icon: Zap,
      label: "Tip",
    },
    achievement: {
      color: "bg-purple-100 text-purple-800 border-purple-300",
      icon: CheckCircle2,
      label: "Achievement",
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
    

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Insights Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">AI Insights</h2>

            <div className="space-y-4">
              {insights.map((insight, idx) => {
                const IconComponent = insightCategoryConfig[insight.category].icon
                const config = insightCategoryConfig[insight.category]

                return (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className={`bg-white rounded-lg border-2 p-6 ${config.color}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 p-3 rounded-lg ${config.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-bold text-slate-900">{insight.title}</h3>
                          {insight.metric && (
                            <Badge className="whitespace-nowrap bg-white text-slate-900 font-bold">
                              {insight.metric}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-700 mb-4">{insight.description}</p>
                        {insight.actionable && (
                          <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                            <Zap className="w-3 h-3" />
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Insights Summary Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-lg border border-slate-200 p-4 text-center"
              >
                <p className="text-2xl font-bold text-slate-900">6</p>
                <p className="text-xs text-slate-600 mt-1">Active Insights</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 }}
                className="bg-white rounded-lg border border-slate-200 p-4 text-center"
              >
                <p className="text-2xl font-bold text-slate-900">3</p>
                <p className="text-xs text-slate-600 mt-1">Actionable Items</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg border border-slate-200 p-4 text-center"
              >
                <p className="text-2xl font-bold text-slate-900">+28%</p>
                <p className="text-xs text-slate-600 mt-1">Efficiency Gain</p>
              </motion.div>
            </div>
          </div>

          {/* Activity Feed Section */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Activity</h2>

            <div className="space-y-3">
              {activities.map((activity, idx) => {
                const config = activityTypeConfig[activity.type]
                const IconComponent = config.icon

                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="bg-white rounded-lg border border-slate-200 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 p-2 rounded-lg ${config.color}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-1">
                          <p className="font-semibold text-slate-900 truncate">{activity.candidate}</p>
                          <Badge variant="secondary" className="text-xs whitespace-nowrap">
                            {config.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-700 mb-1">{activity.action}</p>
                        {activity.details && <p className="text-xs text-slate-600 mb-2">{activity.details}</p>}
                        <p className="text-xs text-slate-500">{activity.timestamp}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* View All Button */}
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Activity
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
