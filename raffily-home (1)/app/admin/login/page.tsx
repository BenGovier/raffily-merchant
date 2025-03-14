"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Original admin credentials
      if (email === "ben@raffily.com" && password === "password") {
        // In a real app, you'd set a secure session token here
        localStorage.setItem("adminLoggedIn", "true")
        localStorage.setItem(
          "adminUser",
          JSON.stringify({
            name: "Ben Admin",
            email: "ben@raffily.com",
            role: "admin",
          }),
        )

        // Add a small delay to ensure localStorage is set before navigation
        await new Promise((resolve) => setTimeout(resolve, 100))

        router.push("/admin/dashboard")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred during login")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1F44] to-[#1E3A8A] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Image src="/placeholder.svg?height=60&width=60" alt="Raffily Logo" width={60} height={60} />
        </div>
        <h1 className="text-2xl font-bold text-[#0A1F44] mb-6 text-center">Admin Login</h1>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
        </form>
      </div>
    </div>
  )
}

