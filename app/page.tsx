"use client"

import { useState, useEffect } from "react"
import LandingPage from "@/components/landing-page"
import Dashboard from "@/components/dashboard"
import JobApplicationFlow from "@/components/job-application-flow"
import InterviewSimulator from "@/components/interview-simulator"
import DynamicInterviewPage from "@/components/dynamic-interview-page"
import ProfileAnalytics from "@/components/profile-analytics"
import BottomNavigation from "@/components/bottom-navigation"
import type { JobApplication } from "@/data/job-applications"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [userRole, setUserRole] = useState<string | null>(null)
  const [selectedJobForInterview, setSelectedJobForInterview] = useState<JobApplication | null>(null)

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role) {
      setIsLoggedIn(true)
      setUserRole(role)
    }
  }, [])

  const handleLogin = (role: string) => {
    setUserRole(role)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserRole(null)
    localStorage.removeItem("userRole")
    localStorage.removeItem("userName")
    setCurrentPage("dashboard")
  }

  const handleNavigate = (page: string, jobData?: JobApplication) => {
    if (jobData) {
      setSelectedJobForInterview(jobData)
    }
    setCurrentPage(page)
  }

  if (!isLoggedIn) {
    return <LandingPage onLogin={handleLogin} />
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onNavigate={handleNavigate} />
      case "apply":
        return <JobApplicationFlow onNavigate={handleNavigate} />
      case "interview":
        return selectedJobForInterview ? (
          <DynamicInterviewPage job={selectedJobForInterview} onBack={() => setCurrentPage("dashboard")} />
        ) : (
          <InterviewSimulator />
        )
      case "profile":
        return <ProfileAnalytics />
      default:
        return <Dashboard onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage("dashboard")}
            className="text-2xl font-bold bg-gradient-to-r from-[#1a4b8c] to-[#2ec4b6] bg-clip-text text-transparent hover:opacity-80 transition-opacity cursor-pointer"
          >
            Niyog
          </button>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">{localStorage.getItem("userName")}</div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="pb-32">{renderPage()}</main>

      {userRole === "jobseeker" && <BottomNavigation currentPage={currentPage} onPageChange={setCurrentPage} />}
    </div>
  )
}
