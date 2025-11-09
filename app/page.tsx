"use client";

import { useState, useEffect } from "react";
import SimpleLoginSwitch from "@/components/simple-login-switch";
import Dashboard from "@/components/dashboard";
import JobApplicationFlow from "@/components/job-application-flow";
import InterviewSimulator from "@/components/interview-simulator";
import DynamicInterviewPage from "@/components/dynamic-interview-page";
import ProfileAnalytics from "@/components/profile-analytics";
import BottomNavigation from "@/components/bottom-navigation";
import EmployerDashboard from "@/components/employer-dashboard";
import JobsManagement from "@/components/jobs-management";
import CandidatePipeline from "@/components/candidate-pipeline";
import AIInsights from "@/components/ai-insights";
import ProfileAvatar from "@/components/profile-avatar";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import type { JobApplication } from "@/data/job-applications";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [selectedJobForInterview, setSelectedJobForInterview] =
    useState<JobApplication | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role) {
      setIsLoggedIn(true);
      setUserRole(role);
    }

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = (role: string) => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    setCurrentPage("dashboard");
  };

  const handleNavigate = (page: string, jobData?: JobApplication) => {
    if (jobData) {
      setSelectedJobForInterview(jobData);
    }
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  if (!isLoggedIn) {
    return <SimpleLoginSwitch onLogin={handleLogin} />;
  }

  const renderPage = () => {
    if (userRole === "employer") {
      switch (currentPage) {
        case "dashboard":
          return <EmployerDashboard onNavigate={handleNavigate} />;
        case "jobs":
          return <JobsManagement onNavigate={handleNavigate} />;
        case "candidates":
          return <CandidatePipeline onNavigate={handleNavigate} />;
        case "insights":
          return <AIInsights />;
        default:
          return <EmployerDashboard onNavigate={handleNavigate} />;
      }
    }

    switch (currentPage) {
      case "dashboard":
        return <Dashboard onNavigate={handleNavigate} />;
      case "apply":
        return <JobApplicationFlow onNavigate={handleNavigate} />;
      case "interview":
        return selectedJobForInterview ? (
          <DynamicInterviewPage
            job={selectedJobForInterview}
            onBack={() => setCurrentPage("dashboard")}
          />
        ) : (
          <InterviewSimulator />
        );
      case "profile":
        return <ProfileAnalytics />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  const employerNavItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "jobs", label: "Jobs" },
    { id: "candidates", label: "Candidates" },
    { id: "insights", label: "Insights" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header
        className={`sticky top-0 z-40 transition-all duration-500`}
        style={{
          background: scrolled
            ? "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.75) 100%)"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)",
          backdropFilter: "blur(20px) saturate(180%)",
          borderBottom: scrolled
            ? "1px solid rgba(26, 75, 140, 0.1)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 24px rgba(26, 75, 140, 0.08)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage("dashboard")}
            className="hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <img
              src="/logo.png"
              alt="Niyog Logo"
              className="h-18 w-22 ml-12 py-4"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            {userRole === "employer" && (
              <div className="flex gap-2 px-3 py-2 rounded-full">
                {employerNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 relative overflow-hidden ${
                      currentPage === item.id
                        ? "text-[#1a4b8c]"
                        : "text-gray-700 hover:text-[#1a4b8c]"
                    }`}
                    style={{
                      background:
                        currentPage === item.id
                          ? "rgba(26, 75, 140, 0.08)"
                          : "transparent",
                      boxShadow:
                        currentPage === item.id
                          ? "0 2px 8px rgba(26, 75, 140, 0.1)"
                          : "none",
                      transform:
                        currentPage === item.id
                          ? "translateY(-1px)"
                          : "translateY(0)",
                    }}
                    onMouseEnter={(e) => {
                      if (currentPage !== item.id) {
                        e.currentTarget.style.background =
                          "rgba(26, 75, 140, 0.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentPage !== item.id) {
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
            {/* <ProfileAvatar /> */}
            <button
              onClick={handleLogout}
              className="px-6 py-2.5 rounded-full font-medium transition-all duration-300 relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #ff6b35 0%, #2ec4b6 100%)",
                boxShadow: "0 4px 12px rgba(255, 107, 53, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(255, 107, 53, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(255, 107, 53, 0.3)";
              }}
            >
              <span className="relative z-10 text-white">Logout</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff8555] to-[#3ed4c6] opacity-0 transition-opacity duration-300" />
            </button>
          </div>

          {/* Mobile Navigation - Hamburger Menu */}
          {userRole === "employer" && (
            <div className="md:hidden flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
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

      {/* Modern Glass Menu Modal */}
      {isMobileMenuOpen && (
        <>
          {/* Enhanced Backdrop with Gradient */}
          <div
            className="fixed inset-0 z-50 transition-opacity duration-300"
            style={{
              animation: "fadeIn 0.3s ease-out",
              background:
                "linear-gradient(135deg, rgba(26, 75, 140, 0.15) 0%, rgba(46, 196, 182, 0.15) 100%)",
              backdropFilter: "blur(8px)",
            }}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Glass Menu Card with Enhanced Effect */}
          <div
            className="fixed top-4 right-4 w-[calc(100vw-2rem)] max-w-sm z-50 rounded-2xl overflow-hidden"
            style={{
              animation: "slideInRight 0.3s ease-out",
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)",
              backdropFilter: "blur(20px) saturate(180%)",
              boxShadow:
                "0 8px 32px 0 rgba(26, 75, 140, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5) inset",
              border: "1px solid rgba(255, 255, 255, 0.8)",
            }}
          >
            {/* Menu Header */}
            <div
              className="relative px-6 py-5 border-b"
              style={{
                borderColor: "rgba(255, 255, 255, 0.5)",
                background:
                  "linear-gradient(135deg, rgba(26, 75, 140, 0.08) 0%, rgba(46, 196, 182, 0.08) 100%)",
              }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold bg-gradient-to-r from-[#1a4b8c] to-[#2ec4b6] bg-clip-text text-transparent">
                  Menu
                </h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full transition-all"
                  style={{
                    background: "rgba(255, 255, 255, 0.5)",
                    backdropFilter: "blur(10px)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.8)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.5)")
                  }
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
              {employerNavItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3.5 rounded-xl font-medium transition-all duration-200 ${
                    currentPage === item.id
                      ? "bg-gradient-to-r from-[#1a4b8c] to-[#2ec4b6] text-white shadow-lg shadow-[#1a4b8c]/20"
                      : "text-gray-700"
                  }`}
                  style={{
                    animation: `slideInItem 0.3s ease-out ${
                      index * 0.05
                    }s backwards`,
                    ...(currentPage !== item.id && {
                      background: "rgba(255, 255, 255, 0.4)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.6)",
                    }),
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== item.id) {
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.6)";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== item.id) {
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.4)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Menu Footer */}
            <div
              className="p-4 border-t"
              style={{
                borderColor: "rgba(255, 255, 255, 0.5)",
                background:
                  "linear-gradient(135deg, rgba(240, 240, 240, 0.3) 0%, rgba(230, 230, 230, 0.3) 100%)",
              }}
            >
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full px-4 py-3.5 rounded-xl bg-gradient-to-r from-[#ff6b35] to-[#2ec4b6] text-white font-medium transition-all hover:opacity-90 "
              >
                Logout
              </button>
            </div>
          </div>

          {/* CSS Animations */}
          <style jsx>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            @keyframes slideInRight {
              from {
                opacity: 0;
                transform: translateX(100%) scale(0.95);
              }
              to {
                opacity: 1;
                transform: translateX(0) scale(1);
              }
            }

            @keyframes slideInItem {
              from {
                opacity: 0;
                transform: translateX(20px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
          `}</style>
        </>
      )}

      <main className="pb-32">{renderPage()}</main>

      {userRole === "jobseeker" && (
        <BottomNavigation
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
