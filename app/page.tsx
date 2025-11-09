"use client"

import { useState, useEffect } from "react"
import SimpleLoginSwitch from "@/components/simple-login-switch"
import Dashboard from "@/components/dashboard"
import JobApplicationFlow from "@/components/job-application-flow"
import InterviewSimulator from "@/components/interview-simulator"
import DynamicInterviewPage from "@/components/dynamic-interview-page"
import ProfileAnalytics from "@/components/profile-analytics"
import BottomNavigation from "@/components/bottom-navigation"
import EmployerDashboard from "@/components/employer-dashboard"
import JobsManagement from "@/components/jobs-management"
import CandidatePipeline from "@/components/candidate-pipeline"
import AIInsights from "@/components/ai-insights"
import ProfileAvatar from "@/components/profile-avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import type { JobApplication } from "@/data/job-applications"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [userRole, setUserRole] = useState<string | null>(null)
  const [selectedJobForInterview, setSelectedJobForInterview] = useState<JobApplication | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role) {
      setIsLoggedIn(true)
      setUserRole(role)
    }
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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
    // Close mobile menu when navigating
    setIsMobileMenuOpen(false)
  }

  if (!isLoggedIn) {
    return <SimpleLoginSwitch onLogin={handleLogin} />
  }

  const renderPage = () => {
    if (userRole === "employer") {
      switch (currentPage) {
        case "dashboard":
          return <EmployerDashboard onNavigate={handleNavigate} />
        case "jobs":
          return <JobsManagement onNavigate={handleNavigate} />
        case "candidates":
          return <CandidatePipeline onNavigate={handleNavigate} />
        case "insights":
          return <AIInsights />
        default:
          return <EmployerDashboard onNavigate={handleNavigate} />
      }
    }

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

  // Employer navigation items
  const employerNavItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "jobs", label: "Jobs" },
    { id: "candidates", label: "Candidates" },
    { id: "insights", label: "Insights" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <header className={`sticky top-0 z-40 border-gray-200 bg-white/80 backdrop-blur-md transition-all duration-300 ${scrolled ? 'border-b shadow-sm' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage("dashboard")}
            className="hover:opacity-80 transition-opacity cursor-pointer"
          >
            <img src="/logo.png" alt="Niyog Logo" className="h-18 w-22 ml-12 py-4" />
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {userRole === "employer" && (
              <div className="flex gap-2">
                {employerNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === item.id ? "text-[#1a4b8c]" : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
            {/* <ProfileAvatar /> */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#ff6b35] to-[#2ec4b6] text-white font-medium transition-all hover:opacity-90"
            >
              Logout
            </button>
          </div>
          
          {/* Mobile Navigation - Hamburger Menu */}
          {userRole === "employer" && (
            <div className="md:hidden flex items-center gap-2">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white p-0">
                  <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="border-b border-gray-200 p-4">
                      <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                    </div>
                    
                    {/* Mobile Menu Items */}
                    <div className="flex-1 overflow-y-auto p-4">
                      <nav className="space-y-2">
                        {employerNavItems.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => {
                              setCurrentPage(item.id)
                              setIsMobileMenuOpen(false)
                            }}
                            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                              currentPage === item.id 
                                ? "bg-[#1a4b8c]/10 text-[#1a4b8c]" 
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </nav>
                    </div>
                    
                    {/* Mobile Menu Footer */}
                    <div className="border-t border-gray-200 p-4">
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsMobileMenuOpen(false)
                        }}
                        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#ff6b35] to-[#2ec4b6] text-white font-medium transition-all hover:opacity-90"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
          
          {/* Show logout button for job seekers on mobile */}
          {userRole === "jobseeker" && (
            <div className="md:hidden">
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-lg bg-gradient-to-r from-[#ff6b35] to-[#2ec4b6] text-white text-sm font-medium transition-all hover:opacity-90"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="pb-32">{renderPage()}</main>

      {userRole === "jobseeker" && <BottomNavigation currentPage={currentPage} onPageChange={setCurrentPage} />}
    </div>
  )
}