"use client"

import { useEffect, useState } from "react"
import { DemoExplainer } from "./DemoExplainer"
import { InteractiveDemoModule } from "./InteractiveDemoModule"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Info, X } from "lucide-react"

export function DemoModuleWrapper() {
  const { user } = useAuth()
  const [showDemoModule, setShowDemoModule] = useState(false)
  const [showFullDemo, setShowFullDemo] = useState(false)
  const [isDemoAccount, setIsDemoAccount] = useState(false)

  useEffect(() => {
    // Check if this is a demo account
    if (user?.email === "demo@example.com" || user?.email === "ben@raffily.com" || user?.id?.includes("demo")) {
      setIsDemoAccount(true)

      // Check if the demo module has been shown before
      const hasSeenDemo = localStorage.getItem("hasSeenRaffilyDemo") === "true"
      if (!hasSeenDemo) {
        setShowDemoModule(true)
        // Mark as seen for future visits
        localStorage.setItem("hasSeenRaffilyDemo", "true")
      }
    }
  }, [user])

  const handleOpenFullDemo = () => {
    setShowFullDemo(true)
    setShowDemoModule(false)
  }

  const handleCloseFullDemo = () => {
    setShowFullDemo(false)
  }

  if (!isDemoAccount) return null

  return (
    <>
      {showDemoModule && <DemoExplainer />}

      {showFullDemo ? (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={handleCloseFullDemo}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md z-10"
              aria-label="Close demo"
            >
              <X className="h-5 w-5" />
            </button>
            <InteractiveDemoModule />
          </div>
        </div>
      ) : (
        <div className="fixed bottom-4 left-4 z-40">
          <Button onClick={handleOpenFullDemo} className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 shadow-lg">
            <Info className="mr-2 h-4 w-4" />
            Open Interactive Demo
          </Button>
        </div>
      )}
    </>
  )
}
