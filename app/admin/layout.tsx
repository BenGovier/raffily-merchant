"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { LayoutDashboard, LogOut, Mail, Menu, MessageSquare, Settings, Store, Ticket, Trophy, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Merchants",
    href: "/admin/merchants",
    icon: <Store className="h-5 w-5" />,
  },
  {
    title: "Raffles",
    href: "/admin/raffles",
    icon: <Ticket className="h-5 w-5" />,
  },
  {
    title: "Winners",
    href: "/admin/winners",
    icon: <Trophy className="h-5 w-5" />,
  },
  {
    title: "Support",
    href: "/admin/support",
    icon: <MessageSquare className="h-5 w-5" />,
  },
]

const marketingNavItems: NavItem[] = [
  {
    title: "Marketing",
    href: "/admin/marketing",
    icon: <Mail className="h-5 w-5" />,
  },
  {
    title: "Blog",
    href: "/admin/blogs",
    icon: <MessageSquare className="h-5 w-5" />,
  },
]

const settingsNavItems: NavItem[] = [
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const isLoginPage = pathname === "/admin/login"

  // Function to get cookie value
  const getCookie = (name: string) => {
    if (typeof document === "undefined") return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(";").shift()
    return null
  }

  useEffect(() => {
    // Check if admin is logged in using cookies
    const adminLoggedIn = getCookie("adminLoggedIn") === "true"
    setIsAuthenticated(adminLoggedIn)

    // If not authenticated and not on login page, redirect to login
    if (!adminLoggedIn && !isLoginPage) {
      router.push("/admin/login")
      return
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [router, pathname, isLoginPage])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleLogout = () => {
    // Clear cookies
    document.cookie = "adminLoggedIn=; path=/; max-age=0"
    document.cookie = "adminUser=; path=/; max-age=0"
    router.push("/admin/login")
  }

  // For login page, just render the children without the admin layout
  if (isLoginPage) {
    return <>{children}</>
  }

  // For unauthenticated users on non-login pages, show a message
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="mb-4">You need to be logged in to access this page.</p>
          <Button onClick={() => router.push("/admin/login")}>Go to Login</Button>
        </div>
      </div>
    )
  }

  // For authenticated users, show the full admin layout
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:h-screen`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link href="/admin/dashboard" className="flex items-center">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Raffily Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <span className="text-xl font-bold">Raffily Admin</span>
            </Link>
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <nav className="space-y-6">
              <div>
                <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Main</h3>
                <div className="mt-2 space-y-1">
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                        pathname === item.href ? "bg-[#00B8A9]/10 text-[#00B8A9]" : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {item.icon}
                      <span className="ml-3">{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Marketing</h3>
                <div className="mt-2 space-y-1">
                  {marketingNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                        pathname === item.href ? "bg-[#00B8A9]/10 text-[#00B8A9]" : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {item.icon}
                      <span className="ml-3">{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Settings</h3>
                <div className="mt-2 space-y-1">
                  {settingsNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                        pathname === item.href ? "bg-[#00B8A9]/10 text-[#00B8A9]" : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {item.icon}
                      <span className="ml-3">{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
          <div className="p-4 border-t">
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-4">
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <div className="flex-1 flex justify-end items-center">
              <div className="ml-4 flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">A</span>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-gray-100">{children}</main>
      </div>
    </div>
  )
}
