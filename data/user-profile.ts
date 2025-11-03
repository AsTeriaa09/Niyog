export const userProfile = {
  id: "user_001",
  name: "Alex Johnson",
  email: "alex@example.com",
  phone: "+1 (555) 123-4567",
  title: "Full Stack Developer",
  experience: "5 years",
  totalApplications: 6,
  totalInterviews: 2,
  successRate: 33,
  skills: [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "AWS", level: 75 },
    { name: "Design Systems", level: 88 },
    { name: "SQL", level: 82 },
  ],
  recentActivity: {
    thisWeek: 2,
    thisMonth: 4,
    allTime: 6,
  },
}

export type UserProfile = typeof userProfile
