"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Features",
    href: "#features",
    submenu: [
      { title: "Engagement Boost", href: "/features/engagement-boost" },
      { title: "Customer Retention", href: "/features/customer-retention" },
      { title: "Data Driven", href: "/features/data-driven" },
      { title: "Automated Winner", href: "/features/automated-winner" },
      { title: "Social Sharing", href: "/features/social-sharing" },
      { title: "Compliance", href: "/features/compliance" },
      { title: "Email Engagement", href: "/features/email-engagement" },
      { title: "Customization", href: "/features/customization" },
    ],
  },
  {
    title: "Tools",
    href: "#tools",
    submenu: [
      { title: "Data Analytics", href: "/data-analytics" },
      { title: "Email Open Rate Tool", href: "/email-open-rate-tool" },
    ],
  },
  {
    title: "Sectors",
    href: "#sectors",
    submenu: [
      { title: "Retail", href: "/sectors/retail" },
      { title: "E-commerce", href: "/sectors/e-commerce" },
      { title: "Non-Profit", href: "/sectors/non-profit" },
      { title: "Hospitality", href: "/features/hospitality" },
      { title: "Leisure", href: "/features/leisure" },
      { title: "Financial Services", href: "/features/financial-services" },
      { title: "Education", href: "/features/education" },
    ],
  },
  { title: "Global", href: "/global" },
  { title: "Pricing", href: "/pricing" },
  { title: "Company", href: "/company" },
  { title: "Blog", href: "/blog" },
  {
    title: "Resources",
    href: "/resources",
    submenu: [
      { title: "Email Templates", href: "/resources#email-templates" },
      { title: "Social Media Adverts", href: "/resources#social-media-adverts" },
      { title: "Animated Banners", href: "/resources#animated-banners" },
    ],
  },
]

export default function MainNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    setActiveSubmenu(null)
  }

  const toggleSubmenu = (title: string) => {
    setActiveSubmenu(activeSubmenu === title ? null : title)
  }

  return (
    <header
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled ? "py-2 bg-primary/95 backdrop-blur-md" : "py-4 bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="relative w-48 h-12">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%2817%29-8FXlfWhC6BCHx9WltpCUOQSS9PsfGl.png"
              alt="Raffily Logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {menuItems.map((item) => (
            <div key={item.title} className="relative group">
              <Link
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-white hover:text-accent transition-colors flex items-center"
              >
                {item.title}
                {item.submenu && <ChevronDown className="ml-1 h-4 w-4" />}
              </Link>
              {item.submenu && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.title}
                        href={subitem.href}
                        className="block px-4 py-2 text-sm text-primary hover:bg-secondary hover:text-primary flex items-center"
                        role="menuitem"
                      >
                        {subitem.title}
                        <ChevronRight className="ml-auto h-4 w-4" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop CTA Buttons - Updated styling */}
        <div className="hidden lg:flex items-center space-x-2">
          <Link href="/request-demo">
            <Button
              variant="outline"
              className="transition-all text-sm font-medium border-white hover:bg-white hover:text-[#0A1F44] text-[#0A1F44]"
            >
              Watch Demo
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white transition-all text-sm font-medium">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-white" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-primary absolute top-full left-0 right-0 shadow-lg"
          >
            <nav className="container mx-auto px-4 py-4">
              {menuItems.map((item) => (
                <div key={item.title} className="mb-2">
                  {item.submenu ? (
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className="w-full text-left px-3 py-2 text-sm font-medium text-white hover:text-accent transition-colors flex items-center justify-between"
                    >
                      {item.title}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${activeSubmenu === item.title ? "rotate-180" : ""}`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-3 py-2 text-sm font-medium text-white hover:text-accent transition-colors"
                      onClick={toggleMobileMenu}
                    >
                      {item.title}
                    </Link>
                  )}
                  {item.submenu && activeSubmenu === item.title && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="ml-4 mt-2 space-y-2"
                    >
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.title}
                          href={subitem.href}
                          className="block px-3 py-2 text-sm text-white hover:text-accent transition-colors"
                          onClick={toggleMobileMenu}
                        >
                          {subitem.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
              <div className="mt-4 space-y-2">
                <Link href="/request-demo" onClick={toggleMobileMenu}>
                  <Button
                    variant="outline"
                    className="w-full text-[#0A1F44] border-white hover:bg-white hover:text-[#0A1F44] transition-all text-sm font-medium"
                  >
                    Watch Demo
                  </Button>
                </Link>
                <Link href="/auth/register" onClick={toggleMobileMenu}>
                  <Button className="w-full bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white transition-all text-sm font-medium">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

