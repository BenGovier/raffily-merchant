"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function DbTestDetailedPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [details, setDetails] = useState<string>("")
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (log: string) => {
    setLogs((prev) => [...prev, `[${new Date().toISOString()}] ${log}`])
  }

  const testConnection = async () => {
    setStatus("loading")
    setMessage("Testing connection to MongoDB...")
    setError("")
    setDetails("")
    setLogs([])

    addLog("Starting connection test...")

    try {
      addLog("Sending request to API endpoint...")
      const response = await fetch("/api/db-test")
      addLog(`Received response with status: ${response.status}`)

      const data = await response.json()
      addLog("Parsed JSON response")

      if (data.status === "connected") {
        setStatus("success")
        setMessage(data.message)
        addLog("Connection successful!")
      } else {
        setStatus("error")
        setMessage(data.message)
        setError(data.error || "Unknown error")
        setDetails(data.details || "")
        addLog(`Connection failed: ${data.error}`)
        if (data.details) {
          addLog(`Error details: ${data.details}`)
        }
      }
    } catch (err) {
      setStatus("error")
      setMessage("Failed to test connection")
      setError(err instanceof Error ? err.message : String(err))
      addLog(`Request failed with error: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>MongoDB Connection Test (Detailed)</CardTitle>
          <CardDescription>Test the connection to your MongoDB Atlas database with detailed logging</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
              {error && <p className="text-red-500 mt-2">{error}</p>}
              {details && (
                <div className="mt-4">
                  <p className="font-medium">Error Details:</p>
                  <pre className="bg-red-100 p-2 rounded text-xs overflow-auto mt-1 max-h-40">{details}</pre>
                </div>
              )}
            </div>
          )}

          {/* Log display */}
          <div className="mt-6">
            <h3 className="font-medium mb-2">Connection Logs:</h3>
            <div className="bg-gray-100 p-3 rounded-md max-h-60 overflow-y-auto">
              {logs.length === 0 ? (
                <p className="text-gray-500 text-sm">No logs yet. Start the test to see logs.</p>
              ) : (
                <ul className="space-y-1">
                  {logs.map((log, i) => (
                    <li key={i} className="text-xs font-mono">
                      {log}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
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
