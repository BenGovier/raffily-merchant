"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`w-full z-50 transition-all duration-300 ${isSticky ? "fixed top-0 bg-white shadow-md py-2" : "py-4"}`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/raffily-logo.png" alt="Raffily Logo" width={40} height={40} />
          <span className="ml-2 text-2xl font-bold text-[#1E0B36]">Raffily</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#how-it-works" className="text-[#1E0B36] hover:text-[#FF4D8D]">
            How It Works
          </Link>
          <Link href="#features" className="text-[#1E0B36] hover:text-[#FF4D8D]">
            Features
          </Link>
          <Link href="#pricing" className="text-[#1E0B36] hover:text-[#FF4D8D]">
            Pricing
          </Link>
          <Link href="#faq" className="text-[#1E0B36] hover:text-[#FF4D8D]">
            FAQs
          </Link>
          <Link href="#contact" className="text-[#1E0B36] hover:text-[#FF4D8D]">
            Contact
          </Link>
        </nav>
        <Button className="bg-[#FF4D8D] hover:bg-[#FF6B9D] text-white">Try Raffily</Button>
      </div>
    </header>
  )
}
