"use client"

import { useState, useEffect } from "react"

export default function ProfileAvatar() {
  const [userInitial, setUserInitial] = useState("U")
  const [userName, setUserName] = useState("User")

  useEffect(() => {
    const name = localStorage.getItem("userName") || "User"
    setUserName(name)
    setUserInitial(name.charAt(0).toUpperCase())
  }, [])

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1a4b8c] to-[#2ec4b6] flex items-center justify-center text-white font-semibold">
        {userInitial}
      </div>
      <span className="text-sm font-medium text-gray-700">{userName}</span>
    </div>
  )
}