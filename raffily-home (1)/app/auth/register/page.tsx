"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FaGoogle } from "react-icons/fa"
import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"

export default function Register() {
  const { register, googleSignIn, isLoading, error } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await register(email, password, name, company)
  }

  return (
    <>
      <MainNav />
      <div className="min-h-screen pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-[#1E0B36]">Create your account</h1>
                <p className="text-gray-600 mt-2">Start creating raffles for your business</p>
              </div>

              {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <Input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Enter your company name"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                    className="w-full"
                  />
                  <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters long</p>
                </div>

                <div className="flex items-start">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-[#00B8A9] focus:ring-[#00B8A9] border-gray-300 rounded mt-1"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the{" "}
                    <Link href="/terms" className="text-[#00B8A9] hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-[#00B8A9] hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-4 flex items-center justify-center gap-2"
                  onClick={googleSignIn}
                  disabled={isLoading}
                >
                  <FaGoogle className="h-4 w-4" />
                  Google
                </Button>
              </div>

              <p className="text-center mt-8 text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-[#00B8A9] hover:underline font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

