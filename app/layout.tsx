import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-poppins",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "Niyog - AI-Powered Job Platform",
  description: "Candidate-first platform with real-time status tracking, interview prep, and growth feedback",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${inter.variable} ${spaceGrotesk.variable} font-inter antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}