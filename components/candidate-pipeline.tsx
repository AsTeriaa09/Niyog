"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Calendar, Filter, Search, Star } from "lucide-react"

interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  role: string
  stage: "applied" | "screened" | "shortlisted" | "interview" | "offer" | "hired"
  match: number
  rating: number
  skills: string[]
  experience: string
  appliedDate: string
  lastActivity: string
  imageUrl?: string
}

interface CandidatePipelineProps {
  onNavigate?: (page: string) => void
}

export default function CandidatePipeline({ onNavigate }: CandidatePipelineProps) {
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: "1",
      name: "Sarah Chen",
      email: "sarah.chen@email.com",
      phone: "+1 (555) 123-4567",
      role: "Senior Frontend Developer",
      stage: "interview",
      match: 95,
      rating: 5.0,
      skills: ["React", "TypeScript", "Node.js", "CSS"],
      experience: "5 years React development",
      appliedDate: "2 days ago",
      lastActivity: "Completed coding challenge",
    },
    {
      id: "2",
      name: "Alex Rodriguez",
      email: "alex.r@email.com",
      phone: "+1 (555) 987-6543",
      role: "Senior Frontend Developer",
      stage: "shortlisted",
      match: 92,
      rating: 4.5,
      skills: ["Vue.js", "Python", "AWS", "Docker"],
      experience: "6 years full-stack experience",
      appliedDate: "4 days ago",
      lastActivity: "Portfolio reviewed",
    },
    {
      id: "3",
      name: "Maria Gonzalez",
      email: "maria.g@email.com",
      phone: "+1 (555) 456-7890",
      role: "Senior Frontend Developer",
      stage: "screened",
      match: 88,
      rating: 4.3,
      skills: ["Angular", "Java", "Kubernetes"],
      experience: "4 years Angular expert",
      appliedDate: "1 week ago",
      lastActivity: "Initial screening completed",
    },
    {
      id: "4",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 321-9876",
      role: "Senior Frontend Developer",
      stage: "offer",
      match: 96,
      rating: 4.8,
      skills: ["React", "TypeScript", "GraphQL", "AWS"],
      experience: "7 years React specialist",
      appliedDate: "5 days ago",
      lastActivity: "Offer extended",
    },
    {
      id: "5",
      name: "Emma Watson",
      email: "emma.w@email.com",
      phone: "+1 (555) 654-3210",
      role: "Senior Frontend Developer",
      stage: "applied",
      match: 75,
      rating: 3.8,
      skills: ["React", "JavaScript", "CSS"],
      experience: "2 years React",
      appliedDate: "Just now",
      lastActivity: "Application submitted",
    },
  ])

  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)
  const [filterStage, setFilterStage] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showTopMatches, setShowTopMatches] = useState(true)

  const stages = ["applied", "screened", "shortlisted", "interview", "offer", "hired"]
  const stageColors = {
    applied: "bg-blue-100 text-blue-800",
    screened: "bg-green-100 text-green-800",
    shortlisted: "bg-purple-100 text-purple-800",
    interview: "bg-amber-100 text-amber-800",
    offer: "bg-rose-100 text-rose-800",
    hired: "bg-emerald-100 text-emerald-800",
  }

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = !filterStage || candidate.stage === filterStage
    return matchesSearch && matchesFilter
  })

  const topMatches = candidates.sort((a, b) => b.match - a.match).slice(0, 3)

  const candidatesByStage = stages.map((stage) => ({
    stage,
    count: candidates.filter((c) => c.stage === stage).length,
  }))

  const handleScheduleInterview = (candidateId: string) => {
    alert(`Scheduling interview for candidate ${candidateId}`)
  }

  const handleMoveStage = (candidateId: string, newStage: string) => {
    setCandidates(
      candidates.map((c) =>
        c.id === candidateId ? { ...c, stage: newStage as any, lastActivity: `Moved to ${newStage}` } : c,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Candidate Pipeline</h1>
            <p className="text-sm text-slate-600 mt-1">Track and manage your candidates</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={showTopMatches ? "default" : "outline"}
              onClick={() => setShowTopMatches(!showTopMatches)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Star className="w-4 h-4 mr-2" />
              Top Matches
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Pipeline Summary */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {candidatesByStage.map((item, idx) => (
            <motion.div
              key={item.stage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setFilterStage(filterStage === item.stage ? null : item.stage)}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                filterStage === item.stage
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <p className="text-xs text-slate-600 capitalize mb-1">{item.stage}</p>
              <p className="text-2xl font-bold text-slate-900">{item.count}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Pipeline */}
          <div className="lg:col-span-2">
            {/* Search and Filter */}
            <div className="flex gap-3 mb-6">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setFilterStage(null)}
                className={filterStage ? "border-blue-500 text-blue-600" : ""}
              >
                <Filter className="w-4 h-4" />
              </Button>
            </div>

            {/* Candidates List */}
            <div className="space-y-3">
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate, idx) => (
                  <motion.div
                    key={candidate.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setSelectedCandidate(selectedCandidate === candidate.id ? null : candidate.id)}
                    className="bg-white rounded-lg border border-slate-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    {/* Candidate Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-slate-900">{candidate.name}</h3>
                          <Badge className={stageColors[candidate.stage]}>{candidate.stage}</Badge>
                          <Badge className="bg-emerald-100 text-emerald-800">{candidate.match}%</Badge>
                        </div>
                        <p className="text-sm text-slate-600">{candidate.role}</p>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(candidate.rating) ? "fill-amber-400 text-amber-400" : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Candidate Info */}
                    <div className="text-xs text-slate-600 mb-3">
                      <p>{candidate.experience}</p>
                      <p className="mt-1">Applied {candidate.appliedDate}</p>
                      <p className="text-slate-500 mt-1">Last: {candidate.lastActivity}</p>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {candidate.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{candidate.skills.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Expanded Details */}
                    {selectedCandidate === candidate.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-t border-slate-200 pt-4 mt-4 space-y-4"
                      >
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-slate-600">Email</p>
                            <p className="font-medium text-slate-900">{candidate.email}</p>
                          </div>
                          <div>
                            <p className="text-slate-600">Phone</p>
                            <p className="font-medium text-slate-900">{candidate.phone}</p>
                          </div>
                        </div>

                        {/* Stage Actions */}
                        <div>
                          <p className="text-sm text-slate-600 mb-2">Move to stage:</p>
                          <div className="flex flex-wrap gap-2">
                            {stages.map((stage) => (
                              <Button
                                key={stage}
                                size="sm"
                                variant={candidate.stage === stage ? "default" : "outline"}
                                onClick={() => handleMoveStage(candidate.id, stage)}
                                className="capitalize text-xs"
                              >
                                {stage}
                              </Button>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 gap-2"
                            onClick={() => handleScheduleInterview(candidate.id)}
                          >
                            <Calendar className="w-4 h-4" />
                            Schedule Interview
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 gap-2 bg-transparent">
                            <MessageSquare className="w-4 h-4" />
                            Message
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
                  <p className="text-slate-600">No candidates found</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Top Matches */}
          {showTopMatches && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Top Matches</h2>

              {topMatches.map((candidate, idx) => (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-slate-900">{candidate.name}</h3>
                    <Badge className="bg-emerald-500">{candidate.match}%</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{candidate.role}</p>
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(candidate.rating) ? "fill-amber-400 text-amber-400" : "text-slate-300"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-slate-600 ml-auto">{candidate.rating}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {candidate.skills.slice(0, 2).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Button
                      size="sm"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-xs"
                      onClick={() => handleScheduleInterview(candidate.id)}
                    >
                      Schedule Interview
                    </Button>
                    <Button size="sm" variant="outline" className="w-full text-xs bg-transparent">
                      View Profile
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
