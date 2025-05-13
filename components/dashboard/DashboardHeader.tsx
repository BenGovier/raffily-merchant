"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Bell, LogOut, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function DashboardHeader() {
  const { user, logout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New ticket sold!", time: "2 minutes ago" },
    { id: 2, message: "Raffle ending soon", time: "1 hour ago" },
  ])

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20-%202025-02-28T144519.340-ekdWW2jBp04gUM8lYXnet21xvZyUxS.png"
              alt="Raffily"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="text-xl font-bold text-[#00B8A9] hidden md:inline-block">Raffily</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              className="text-gray-500 hover:text-gray-700 relative"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full w-2 h-2"></span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Notifications</p>
                </div>
                {notifications.map((notification) => (
                  <div key={notification.id} className="px-4 py-3 hover:bg-gray-50">
                    <p className="text-sm text-gray-800">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button className="flex items-center space-x-2 focus:outline-none" onClick={toggleDropdown}>
              {user?.companyLogo ? (
                <Image
                  src={user.companyLogo || "/placeholder.svg"}
                  alt="Company Logo"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-[#00B8A9] rounded-full flex items-center justify-center text-white font-medium">
                  {user?.firstName ? user.firstName.charAt(0) : ""}
                </div>
              )}
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {user?.firstName} {user?.lastName}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </p>
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

