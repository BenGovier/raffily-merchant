"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { LayoutDashboard, BarChart3, Ticket, Settings, ChevronRight, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "My Raffles",
    href: "/dashboard/raffles",
    icon: Ticket,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  return (
    <>
      {/* Mobile sidebar toggle */}
      <button
        className="fixed bottom-4 right-4 z-40 md:hidden bg-[#00B8A9] text-white p-3 rounded-full shadow-lg"
        onClick={toggleSidebar}
      >
        {collapsed ? <Menu size={24} /> : <X size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white border-r border-gray-200 transition-all duration-300 z-30",
          collapsed ? "hidden md:block md:w-20" : "fixed inset-y-0 left-0 w-64 md:relative md:w-64",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200">
            <Link href="/dashboard" className="flex items-center justify-center md:justify-start">
              {collapsed ? (
                <div className="w-10 h-10 bg-[#00B8A9] rounded-md flex items-center justify-center text-white font-bold">
                  R
                </div>
              ) : (
                <div className="text-xl font-bold text-[#1E0B36]">Raffily Merchant</div>
              )}
            </Link>
          </div>

          {/* User info */}
          {!collapsed && (
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#00B8A9] rounded-full flex items-center justify-center text-white font-bold">
                  {user?.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.company}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md transition-colors",
                  pathname === item.href ? "bg-[#00B8A9]/10 text-[#00B8A9]" : "text-gray-700 hover:bg-gray-100",
                  collapsed && "justify-center",
                )}
              >
                <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-3")} />
                {!collapsed && (
                  <>
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </>
                )}
              </Link>
            ))}
          </nav>

          {/* Collapse button (desktop only) */}
          <button
            className="hidden md:flex items-center justify-center p-4 border-t border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            onClick={toggleSidebar}
          >
            <ChevronRight className={cn("h-5 w-5 transition-transform", collapsed ? "" : "rotate-180")} />
            {!collapsed && <span className="ml-2">Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  )
}

