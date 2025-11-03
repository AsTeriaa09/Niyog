export const interviewSessions = [
  {
    id: 1,
    jobTitle: "Senior Frontend Engineer",
    company: "TechCorp",
    date: "2024-10-29",
    duration: 45,
    questions: [
      {
        id: 1,
        category: "Behavioral",
        question: "Tell us about your experience with React and state management?",
        timeLimit: 120,
      },
      {
        id: 2,
        category: "Technical",
        question: "Design a scalable architecture for a real-time chat application.",
        timeLimit: 180,
      },
      {
        id: 3,
        category: "Growth",
        question: "What areas are you looking to grow in over the next 2 years?",
        timeLimit: 120,
      },
    ],
  },
]

export type InterviewSession = (typeof interviewSessions)[0]
