"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// Define user type
export type User = {
  id: string
  email: string
  name: string
  role: string
  createdAt: string
  company?: string
  country?: string
}

// Define auth context type
type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  register: (
    name: string,
    email: string,
    password: string,
    companyName: string,
    country: string,
  ) => Promise<{ success: boolean; message: string }>
  logout: () => void
  isDemoAccount: () => boolean
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to get user from session
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.user) {
            setUser(data.user)
          }
        }
      } catch (error) {
        console.error("Auth check error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      console.log("Login response:", data)

      if (response.ok && data.success) {
        setUser(data.user)
        return { success: true, message: "Login successful" }
      } else {
        return { success: false, message: data.message || "Login failed" }
      }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "An error occurred during login" }
    } finally {
      setIsLoading(false)
    }
  }

  // Register function
  const register = async (name: string, email: string, password: string, companyName: string, country: string) => {
    try {
      setIsLoading(true)

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, companyName, country }),
      })

      const data = await response.json()
      console.log("Register response:", data)

      if (response.ok && data.success) {
        setUser(data.user)
        return { success: true, message: "Registration successful" }
      } else {
        return { success: false, message: data.message || "Registration failed" }
      }
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, message: "An error occurred during registration" }
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (response.ok) {
        setUser(null)
        router.push("/auth/login")
      } else {
        console.error("Logout failed:", await response.json())
      }
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // Check if current user is a demo account
  const isDemoAccount = () => {
    if (!user) return false

    const demoEmails = ["demo@example.com", "ben@raffily.com"]
    if (demoEmails.includes(user.email.toLowerCase())) return true

    // Check if ID contains 'demo'
    if (user.id && user.id.toLowerCase().includes("demo")) return true

    return false
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, isDemoAccount }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
