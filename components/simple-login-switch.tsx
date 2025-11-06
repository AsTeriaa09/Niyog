"use client"

import { useState } from "react"
import JobSeekerLogin from "./job-seeker-login"
import EmployerLogin from "./employer-login"

export default function SimpleLoginSwitch({ onLogin }: { onLogin: (role: string) => void }) {
  const [view, setView] = useState<"jobseeker" | "employer">("jobseeker")

  if (view === "jobseeker") {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <JobSeekerLogin 
            onSuccess={() => onLogin("jobseeker")} 
            onSwitchToEmployer={() => setView("employer")} 
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <EmployerLogin 
          onSuccess={() => onLogin("employer")} 
          onSwitchToJobSeeker={() => setView("jobseeker")} 
        />
      </div>
    </div>
  )
}