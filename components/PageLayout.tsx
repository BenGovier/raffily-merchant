import type React from "react"
import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#1E0B36] to-[#4B1248]">
      <MainNav />
      <div className="flex-grow container mx-auto px-4 py-12 mt-20">{children}</div>
      <Footer />
    </main>
  )
}
