import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Image from "next/image"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Raffily - The Raffle Platform for Customer Retention",
  description: "Run high-impact giveaways that increase loyalty, skyrocket engagement, and help convert your audience.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        {/* Header */}
        <header className="bg-[#0a1638] text-white">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image src="/raffily-logo.png" alt="Raffily" width={120} height={40} />
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="#" className="text-sm font-medium hover:text-[#00e1c0]">
                Features
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-[#00e1c0]">
                Pricing
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-[#00e1c0]">
                About
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-[#00e1c0]">
                Blog
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-[#00e1c0]">
                Resources
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="#" className="text-sm font-medium hover:text-[#00e1c0]">
                Sign In
              </Link>
              <Link
                href="#"
                className="bg-[#00e1c0] hover:bg-[#00c5a8] text-[#0a1638] px-4 py-2 rounded-md text-sm font-bold"
              >
                Get Started
              </Link>
            </div>
          </div>
        </header>

        {children}

        {/* Footer */}
        <footer className="bg-[#0a1638] text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <Image src="/raffily-logo.png" alt="Raffily" width={120} height={40} className="mb-4" />
                <p className="text-sm text-white/70">
                  The raffle platform that helps businesses increase customer engagement and retention.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-sm text-white/70 hover:text-white">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-white/70 hover:text-white">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-white/70 hover:text-white">
                      Integrations
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-sm text-white/70 hover:text-white">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-white/70 hover:text-white">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-white/70 hover:text-white">
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-sm text-white/70 hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-white/70 hover:text-white">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-white/70 hover:text-white">
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/50">
              <p>© {new Date().getFullYear()} Raffily. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
