"use client"

import { useRef } from "react"
import Image from "next/image"
import { toPng } from "html-to-image"
import { cn } from "@/lib/utils"

interface RaffleAdProps {
  prizeName: string
  logoUrl?: string
  prizeImageUrl?: string
  tagline?: string
  ctaText?: string
  brandColors?: {
    primary: string
    secondary: string
    accent: string
  }
}

export function RaffleAd({
  prizeName,
  logoUrl = "/placeholder.svg",
  prizeImageUrl = "/placeholder.svg",
  tagline = "Don't miss your chance—enter now!",
  ctaText = "Enter Raffle",
  brandColors = {
    primary: "#00B8A9",
    secondary: "#05668D",
    accent: "#F8D210",
  },
}: RaffleAdProps) {
  const adRef = useRef<HTMLDivElement>(null)

  // Generate confetti pattern
  const generateConfetti = () => {
    const colors = [brandColors.primary, brandColors.secondary, brandColors.accent]
    let confetti = ""

    for (let i = 0; i < 40; i++) {
      const x = Math.random() * 100
      const y = Math.random() * 100
      const size = Math.random() * 10 + 5
      const color = colors[Math.floor(Math.random() * colors.length)]
      const rotation = Math.random() * 360

      if (i % 3 === 0) {
        // Rectangle
        confetti += `<rect x="${x}%" y="${y}%" width="${size}" height="${size / 2}" fill="${color}" transform="rotate(${rotation}, ${x}%, ${y}%)" opacity="${Math.random() * 0.5 + 0.5}" />`
      } else if (i % 3 === 1) {
        // Circle
        confetti += `<circle cx="${x}%" cy="${y}%" r="${size / 2}" fill="${color}" opacity="${Math.random() * 0.5 + 0.5}" />`
      } else {
        // Triangle
        const x1 = x
        const y1 = y
        const x2 = x + size
        const y2 = y
        const x3 = x + size / 2
        const y3 = y + size
        confetti += `<polygon points="${x1}%,${y1}% ${x2}%,${y2}% ${x3}%,${y3}%" fill="${color}" transform="rotate(${rotation}, ${x}%, ${y}%)" opacity="${Math.random() * 0.5 + 0.5}" />`
      }
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">${confetti}</svg>`
  }

  // Generate sparkles pattern
  const generateSparkles = () => {
    let sparkles = ""
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 100
      const y = Math.random() * 100
      const size = Math.random() * 5 + 2
      sparkles += `
        <path d="M${x} ${y - size}L${x} ${y + size}M${x - size} ${y}L${x + size} ${y}" 
              stroke="${brandColors.accent}" 
              strokeWidth="2" 
              opacity="${Math.random() * 0.5 + 0.5}" />
      `
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">${sparkles}</svg>`
  }

  // Generate starburst pattern
  const generateStarburst = () => {
    const cx = 50
    const cy = 50
    const outerRadius = 50
    const innerRadius = 20
    const points = 12

    let path = ""
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius
      const angle = (Math.PI * 2 * i) / (points * 2)
      const x = cx + radius * Math.cos(angle)
      const y = cy + radius * Math.sin(angle)

      if (i === 0) {
        path += `M${x},${y}`
      } else {
        path += `L${x},${y}`
      }
    }
    path += "Z"

    return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d="${path}" fill="${brandColors.accent}" opacity="0.3" />
    </svg>`
  }

  const handleDownload = async () => {
    if (!adRef.current) return

    try {
      const dataUrl = await toPng(adRef.current, { quality: 0.95 })

      // Create download link
      const link = document.createElement("a")
      link.download = `raffle-ad-${prizeName.toLowerCase().replace(/\s+/g, "-")}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error("Error generating image:", err)
    }
  }

  return (
    <div className="relative">
      <div
        ref={adRef}
        className="relative w-[1080px] h-[1080px] overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%)`,
        }}
      >
        {/* Confetti Effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          dangerouslySetInnerHTML={{ __html: generateConfetti() }}
        />

        {/* Starburst Effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          dangerouslySetInnerHTML={{ __html: generateStarburst() }}
        />

        <div className="absolute inset-0 p-16 flex flex-col items-center">
          {/* Logo */}
          <div className="w-48 h-24 relative mb-8">
            <Image
              src={logoUrl || "/placeholder.svg"}
              alt="Brand logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col items-center justify-center max-w-3xl text-center">
            {/* WIN Text with Sparkles */}
            <div className="relative mb-6">
              <div
                className="absolute inset-0 -m-4 pointer-events-none"
                dangerouslySetInnerHTML={{ __html: generateSparkles() }}
              />
              <h1
                className="text-8xl font-black text-white mb-4 relative z-10"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                WIN
              </h1>
            </div>

            {/* Prize Name */}
            <h2 className="text-6xl font-bold text-white mb-8" style={{ fontFamily: "Poppins, sans-serif" }}>
              {prizeName}!
            </h2>

            {/* Prize Image */}
            <div className="w-96 h-96 relative mb-8">
              <Image
                src={prizeImageUrl || "/placeholder.svg"}
                alt={prizeName}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Tagline */}
            <p className="text-2xl text-white mb-12" style={{ fontFamily: "Montserrat, sans-serif" }}>
              {tagline}
            </p>

            {/* CTA Button */}
            <button
              className={cn(
                "px-12 py-6 rounded-full text-2xl font-bold transform transition-transform hover:scale-105",
                "shadow-lg hover:shadow-xl",
              )}
              style={{
                backgroundColor: brandColors.accent,
                color: "#000000",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {ctaText}
            </button>
          </div>

          {/* Footer */}
          <div className="text-white/80 text-sm">Powered by Raffily</div>
        </div>
      </div>

      {/* Download Button */}
      <button onClick={handleDownload} className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
        Download Ad
      </button>
    </div>
  )
}

