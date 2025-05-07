"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import {
  LayoutDashboard,
  BarChart3,
  Ticket,
  Settings,
  ChevronRight,
  Menu,
  X,
  AlertCircle,
  Trophy,
  Mail,
  Share2,
  FileText,
  LucideImage,
  ChevronDown,
  MessageSquare,
  HelpCircle,
  Users,
  CreditCard,
} from "lucide-react"
import { cn } from "@/lib/utils"
import NextImage from "next/image"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  subItems?: NavItem[]
}

const sidebarItems: NavItem[] = [
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
    title: "Entries",
    href: "/dashboard/entries",
    icon: Users,
  },
  {
    title: "Winners",
    href: "/dashboard/winners",
    icon: Trophy,
  },
  {
    title: "Marketing",
    href: "/dashboard/marketing",
    icon: Mail,
    subItems: [
      {
        title: "Email Subject Line",
        href: "/dashboard/marketing/email",
        icon: Mail,
      },
      {
        title: "SMS Marketing",
        href: "/dashboard/marketing/sms",
        icon: MessageSquare,
      },
      {
        title: "Adverts",
        href: "/dashboard/marketing/social",
        icon: Share2,
      },
      {
        title: "Content Creation",
        href: "/dashboard/marketing/content",
        icon: FileText,
      },
      {
        title: "Graphics",
        href: "/dashboard/marketing/graphics",
        icon: LucideImage,
      },
    ],
  },
  {
    title: "Support",
    href: "/dashboard/support",
    icon: HelpCircle,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Billing",
    href: "/dashboard/settings/billing",
    icon: CreditCard,
  },
]

export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()
  const { user } = useAuth()
  const isProfileIncomplete = !user?.companyLogo || !user?.company // Add more conditions as needed

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const isActive = (href: string) => {
    if (href === "/dashboard" && pathname === "/dashboard") {
      return true
    }
    return pathname.startsWith(href) && href !== "/dashboard"
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
          "bg-[#0A2540] border-r border-gray-800 transition-all duration-300 z-30",
          collapsed ? "hidden md:block md:w-20" : "fixed inset-y-0 left-0 w-64 md:relative md:w-64",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center px-4 py-3">
            <NextImage
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20-%202025-02-28T144519.340-ekdWW2jBp04gUM8lYXnet21xvZyUxS.png"
              alt="Raffily"
              width={32}
              height={32}
            />
          </div>

          {/* User info */}
          {!collapsed && (
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                {user?.companyLogo ? (
                  <NextImage
                    src={user.companyLogo || "/placeholder.svg"}
                    alt="Company Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-[#00B8A9] rounded-full flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-white">{user?.name || "User"}</p>
                  <p className="text-xs text-white/70">{user?.company || "Company"}</p>
                </div>
              </div>
            </div>
          )}

          {!collapsed && (
            <div className="px-4 py-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Main Navigation</p>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => (
              <div key={item.href}>
                {item.subItems ? (
                  <div className="space-y-1">
                    <button
                      onClick={() => toggleExpand(item.title)}
                      className={cn(
                        "w-full flex items-center px-3 py-2 rounded-md transition-colors",
                        isActive(item.href)
                          ? "bg-[#00B8A9] text-white font-medium"
                          : "text-white/80 hover:bg-[#1A3A5F]",
                        collapsed && "justify-center",
                      )}
                    >
                      <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-3")} />
                      {!collapsed && (
                        <>
                          <span>{item.title}</span>
                          <ChevronDown
                            className={cn(
                              "ml-auto h-4 w-4 transition-transform",
                              expandedItems.includes(item.title) ? "rotate-180" : "",
                            )}
                          />
                        </>
                      )}
                    </button>

                    {!collapsed && expandedItems.includes(item.title) && (
                      <div className="pl-8 space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              "flex items-center px-3 py-2 rounded-md transition-colors text-sm",
                              pathname === subItem.href
                                ? "bg-[#00B8A9]/20 text-white font-medium"
                                : "text-white/70 hover:bg-[#1A3A5F]/50",
                            )}
                          >
                            <subItem.icon className="h-4 w-4 mr-3" />
                            <span>{subItem.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md transition-colors relative",
                      isActive(item.href) ? "bg-[#00B8A9] text-white font-medium" : "text-white/80 hover:bg-[#1A3A5F]",
                      collapsed && "justify-center",
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-3")} />
                    {!collapsed && (
                      <>
                        <span>{item.title}</span>
                        {item.title === "Settings" && isProfileIncomplete && (
                          <AlertCircle className="ml-2 h-4 w-4 text-yellow-300" />
                        )}
                        <ChevronRight className="ml-auto h-4 w-4" />
                      </>
                    )}
                    {collapsed && item.title === "Settings" && isProfileIncomplete && (
                      <AlertCircle className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300" />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Collapse button (desktop only) */}
          <button
            className="hidden md:flex items-center justify-center p-4 border-t border-gray-700 text-white/70 hover:text-white hover:bg-[#1A3A5F]"
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
