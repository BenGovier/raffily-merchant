"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  name: string
  company: string
  createdAt: Date
}

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string, company: string) => Promise<void>
  logout: () => void
  googleSignIn: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  })
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user")
    if (user) {
      setAuthState({
        user: JSON.parse(user),
        isLoading: false,
        error: null,
      })
    } else {
      setAuthState({
        user: null,
        isLoading: false,
        error: null,
      })
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setAuthState({ ...authState, isLoading: true, error: null })

      // In a real app, you would make an API call to authenticate
      // For demo purposes, we'll simulate a successful login
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if email and password match (demo only)
      // Add ben@raffily.com as a valid merchant login
      if (
        (email === "demo@example.com" && password === "password") ||
        (email === "ben@raffily.com" && password === "password")
      ) {
        const user: User = {
          id: "1",
          email,
          name: email === "ben@raffily.com" ? "Ben Raffily" : "Demo User",
          company: email === "ben@raffily.com" ? "Raffily" : "Demo Company",
          createdAt: new Date(),
        }

        localStorage.setItem("user", JSON.stringify(user))
        setAuthState({
          user,
          isLoading: false,
          error: null,
        })
        router.push("/dashboard")
      } else {
        setAuthState({
          ...authState,
          isLoading: false,
          error: "Invalid email or password",
        })
      }
    } catch (error) {
      setAuthState({
        ...authState,
        isLoading: false,
        error: "An error occurred during login",
      })
    }
  }

  const register = async (email: string, password: string, name: string, company: string) => {
    try {
      setAuthState({ ...authState, isLoading: true, error: null })

      // In a real app, you would make an API call to register
      // For demo purposes, we'll simulate a successful registration
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user: User = {
        id: Math.random().toString(36).substring(2, 9),
        email,
        name,
        company,
        createdAt: new Date(),
      }

      localStorage.setItem("user", JSON.stringify(user))
      setAuthState({
        user,
        isLoading: false,
        error: null,
      })
      router.push("/dashboard")
    } catch (error) {
      setAuthState({
        ...authState,
        isLoading: false,
        error: "An error occurred during registration",
      })
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    setAuthState({
      user: null,
      isLoading: false,
      error: null,
    })
    router.push("/")
  }

  const googleSignIn = async () => {
    try {
      setAuthState({ ...authState, isLoading: true, error: null })

      // In a real app, you would integrate with Google OAuth
      // For demo purposes, we'll simulate a successful login
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user: User = {
        id: Math.random().toString(36).substring(2, 9),
        email: "google@example.com",
        name: "Google User",
        company: "Google Company",
        createdAt: new Date(),
      }

      localStorage.setItem("user", JSON.stringify(user))
      setAuthState({
        user,
        isLoading: false,
        error: null,
      })
      router.push("/dashboard")
    } catch (error) {
      setAuthState({
        ...authState,
        isLoading: false,
        error: "An error occurred during Google sign-in",
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        googleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

