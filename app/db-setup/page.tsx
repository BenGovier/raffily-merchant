"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function DatabaseSetupPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [collections, setCollections] = useState<string[]>([])

  const initializeDatabase = async () => {
    try {
      setStatus("loading")
      setMessage("Initializing database...")

      const response = await fetch("/api/db-setup")
      const data = await response.json()

      if (data.status === "success") {
        setStatus("success")
        setMessage(data.message)
        fetchCollections()
      } else {
        setStatus("error")
        setMessage(data.message || "Failed to initialize database")
      }
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "An unexpected error occurred")
    }
  }

  const fetchCollections = async () => {
    try {
      const response = await fetch("/api/db-collections")
      const data = await response.json()

      if (data.status === "success") {
        setCollections(data.collections || [])
      }
    } catch (error) {
      console.error("Error fetching collections:", error)
    }
  }

  useEffect(() => {
    fetchCollections()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Database Setup</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Initialize Database</CardTitle>
          <CardDescription>Create all required collections and indexes for the Raffily application</CardDescription>
        </CardHeader>
        <CardContent>
          {status === "success" && (
            <Alert className="mb-4 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Success</AlertTitle>
              <AlertDescription className="text-green-700">{message}</AlertDescription>
            </Alert>
          )}

          {status === "error" && (
            <Alert className="mb-4 bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800">Error</AlertTitle>
              <AlertDescription className="text-red-700">{message}</AlertDescription>
            </Alert>
          )}

          <p className="mb-4">This will set up the following collections in your MongoDB database:</p>

          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>
              <strong>users</strong> - For merchant and admin accounts
            </li>
            <li>
              <strong>raffles</strong> - For raffle campaigns
            </li>
            <li>
              <strong>entries</strong> - For raffle participants
            </li>
            <li>
              <strong>credits</strong> - For SMS credit tracking
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button onClick={initializeDatabase} disabled={status === "loading"} className="w-full sm:w-auto">
            {status === "loading" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Initializing...
              </>
            ) : (
              "Initialize Database"
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Database Structure</CardTitle>
          <CardDescription>Collections in your MongoDB database</CardDescription>
        </CardHeader>
        <CardContent>
          {collections.length > 0 ? (
            <ul className="list-disc pl-6 space-y-1">
              {collections.map((collection) => (
                <li key={collection}>{collection}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No collections found</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

