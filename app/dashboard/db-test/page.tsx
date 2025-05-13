"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function DatabaseTestPage() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [connectionTime, setConnectionTime] = useState<number | null>(null)

  const testConnection = async () => {
    setIsConnecting(true)
    setConnectionStatus("idle")
    setErrorMessage("")

    const startTime = performance.now()

    try {
      const response = await fetch("/api/db-test")
      const data = await response.json()

      const endTime = performance.now()
      setConnectionTime(endTime - startTime)

      if (data.success) {
        setConnectionStatus("success")
      } else {
        setConnectionStatus("error")
        setErrorMessage(data.error || "Unknown error occurred")
      }
    } catch (error) {
      setConnectionStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Unknown error occurred")
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Database Connection Test</h1>

        <div className="mb-8">
          <p className="text-gray-600 mb-4">
            This page allows you to test the connection to your MongoDB database. Click the button below to initiate a
            test connection.
          </p>

          <Button onClick={testConnection} disabled={isConnecting} className="bg-[#00B8A9] hover:bg-[#00B8A9]/90">
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing Connection...
              </>
            ) : (
              "Test Database Connection"
            )}
          </Button>
        </div>

        {connectionStatus !== "idle" && (
          <div className={`p-4 rounded-lg ${connectionStatus === "success" ? "bg-green-50" : "bg-red-50"}`}>
            <div className="flex items-center mb-2">
              {connectionStatus === "success" ? (
                <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
              ) : (
                <XCircle className="h-6 w-6 text-red-500 mr-2" />
              )}
              <h3 className="font-medium text-lg">
                {connectionStatus === "success" ? "Connection Successful" : "Connection Failed"}
              </h3>
            </div>

            {connectionStatus === "success" && connectionTime && (
              <p className="text-green-700 ml-8">Connected in {connectionTime.toFixed(2)}ms</p>
            )}

            {connectionStatus === "error" && <p className="text-red-700 ml-8">Error: {errorMessage}</p>}
          </div>
        )}

        <div className="mt-8 border-t pt-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Connection Information</h2>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Database Type</p>
                <p className="text-gray-800">MongoDB</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Connection String</p>
                <p className="text-gray-800">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {process.env.MONGODB_URI ? "******" : "Not configured"}
                  </code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

