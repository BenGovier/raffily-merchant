"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function DbTestPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState<string>("")
  const [error, setError] = useState<string>("")

  const testConnection = async () => {
    setStatus("loading")
    setMessage("Testing connection to MongoDB...")
    setError("")

    try {
      const response = await fetch("/api/db-test")
      const data = await response.json()

      if (data.status === "connected") {
        setStatus("success")
        setMessage(data.message)
      } else {
        setStatus("error")
        setMessage(data.message)
        setError(data.error || "Unknown error")
      }
    } catch (err) {
      setStatus("error")
      setMessage("Failed to test connection")
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>MongoDB Connection Test</CardTitle>
          <CardDescription>Test the connection to your MongoDB Atlas database</CardDescription>
        </CardHeader>
        <CardContent>
          {status === "idle" && <p className="text-gray-500">Click the button below to test the connection</p>}
          {status === "loading" && (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
              <p>{message}</p>
            </div>
          )}
          {status === "success" && (
            <div className="bg-green-50 p-4 rounded-md border border-green-200">
              <p className="text-green-700 font-medium">✅ {message}</p>
            </div>
          )}
          {status === "error" && (
            <div className="bg-red-50 p-4 rounded-md border border-red-200">
              <p className="text-red-700 font-medium">❌ {message}</p>
              {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={testConnection} disabled={status === "loading"} className="w-full">
            {status === "loading" ? "Testing..." : "Test Connection"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

