"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Bell, HelpCircle, LogOut, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardHeader() {
  const { user, logout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>

        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700">
            <Bell className="h-5 w-5" />
          </button>

          <button className="text-gray-500 hover:text-gray-700">
            <HelpCircle className="h-5 w-5" />
          </button>

          <div className="relative">
            <button className="flex items-center space-x-2 focus:outline-none" onClick={toggleDropdown}>
              <div className="w-8 h-8 bg-[#00B8A9] rounded-full flex items-center justify-center text-white font-medium">
                {user?.name.charAt(0)}
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">{user?.name}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>

                <Link
                  href="/dashboard/settings/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  onClick={() => setDropdownOpen(false)}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile Settings
                </Link>

                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  onClick={() => {
                    setDropdownOpen(false)
                    logout()
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </button>
              </div>
            )}
          </div>

          <Button className="hidden md:flex bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white" size="sm" asChild>
            <Link href="/dashboard/raffles/new">Create Raffle</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

