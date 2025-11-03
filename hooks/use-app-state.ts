"use client"

import { useState, useCallback, createContext } from "react"

interface AppContextType {
  currentPage: string
  setCurrentPage: (page: string) => void
  appliedJobs: Set<number>
  addAppliedJob: (jobId: number) => void
  interviewProgress: number
  setInterviewProgress: (progress: number) => void
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

export function useAppState() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [appliedJobs, setAppliedJobs] = useState<Set<number>>(new Set())
  const [interviewProgress, setInterviewProgress] = useState(0)

  const addAppliedJob = useCallback((jobId: number) => {
    setAppliedJobs((prev) => new Set(prev).add(jobId))
  }, [])

  return {
    currentPage,
    setCurrentPage,
    appliedJobs,
    addAppliedJob,
    interviewProgress,
    setInterviewProgress,
  }
}
