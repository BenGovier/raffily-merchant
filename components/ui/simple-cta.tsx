import type React from "react"
import Link from "next/link"

export default function SimpleCTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-block bg-white hover:bg-gray-100 text-[#0A1F44] font-medium px-8 py-4 rounded-lg text-center"
    >
      {children}
    </Link>
  )
}

