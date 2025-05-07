"use client"

import { useRef, useEffect, useState } from "react"
import { toPng } from "html-to-image"

interface SVGRaffleAdProps {
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
  svgTemplate: string // The SVG template string
  onRender?: (dataUrl: string) => void
}

export function SVGRaffleAd({
  prizeName = "PHONE",
  logoUrl = "/placeholder.svg?height=100&width=200",
  prizeImageUrl = "/placeholder.svg?height=300&width=300",
  tagline = "Don't miss your chance—enter now!",
  ctaText = "Enter Raffle",
  brandColors = {
    primary: "#00B8A9",
    secondary: "#05668D",
    accent: "#F8D210",
  },
  svgTemplate,
  onRender,
}: SVGRaffleAdProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [processedSvg, setProcessedSvg] = useState<string>("")

  // Process the SVG template to replace placeholders
  useEffect(() => {
    if (!svgTemplate) return

    let modifiedSvg = svgTemplate

    // Replace logo placeholder
    modifiedSvg = modifiedSvg.replace(
      /<image[^>]*id="logoPlaceholder"[^>]*xlinkHref="[^"]*"[^>]*>/g,
      `<image id="logoPlaceholder" xlinkHref="${logoUrl}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />`,
    )

    // Replace prize image placeholder
    modifiedSvg = modifiedSvg.replace(
      /<image[^>]*id="prizeImagePlaceholder"[^>]*xlinkHref="[^"]*"[^>]*>/g,
      `<image id="prizeImagePlaceholder" xlinkHref="${prizeImageUrl}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />`,
    )

    // Replace headline text
    modifiedSvg = modifiedSvg.replace(
      /<text[^>]*id="headlineText"[^>]*>.*?<\/text>/g,
      `<text id="headlineText" x="50%" y="25%" textAnchor="middle" dominantBaseline="middle" fontFamily="Poppins, sans-serif" fontWeight="bold" fontSize="60" fill="white">WIN A ${prizeName}!</text>`,
    )

    // Replace subheadline text
    modifiedSvg = modifiedSvg.replace(
      /<text[^>]*id="subheadlineText"[^>]*>.*?<\/text>/g,
      `<text id="subheadlineText" x="50%" y="35%" textAnchor="middle" dominantBaseline="middle" fontFamily="Montserrat, sans-serif" fontSize="30" fill="white">${tagline}</text>`,
    )

    // Replace CTA button background
    modifiedSvg = modifiedSvg.replace(
      /<rect[^>]*id="ctaButtonBg"[^>]*fill="[^"]*"[^>]*>/g,
      `<rect id="ctaButtonBg" x="35%" y="75%" width="30%" height="10%" rx="25" fill="${brandColors.accent}" />`,
    )

    // Replace CTA button text
    modifiedSvg = modifiedSvg.replace(
      /<text[^>]*id="ctaButtonText"[^>]*>.*?<\/text>/g,
      `<text id="ctaButtonText" x="50%" y="80%" textAnchor="middle" dominantBaseline="middle" fontFamily="Poppins, sans-serif" fontWeight="bold" fontSize="30" fill="black">${ctaText}</text>`,
    )

    // Replace background colors
    modifiedSvg = modifiedSvg.replace(
      /<rect[^>]*id="backgroundRect"[^>]*fill="[^"]*"[^>]*>/g,
      `<rect id="backgroundRect" width="100%" height="100%" fill="url(#brandGradient)" />`,
    )

    // Add gradient definition if it doesn't exist
    if (!modifiedSvg.includes("<defs>")) {
      modifiedSvg = modifiedSvg.replace(
        /<svg[^>]*>/,
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080">
          <defs>
            <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="${brandColors.primary}" />
              <stop offset="100%" stopColor="${brandColors.secondary}" />
            </linearGradient>
          </defs>`,
      )
    } else {
      // Update existing gradient
      modifiedSvg = modifiedSvg.replace(
        /<linearGradient[^>]*id="brandGradient"[^>]*>.*?<\/linearGradient>/gs,
        `<linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="${brandColors.primary}" />
          <stop offset="100%" stopColor="${brandColors.secondary}" />
        </linearGradient>`,
      )
    }

    // Color confetti/celebratory elements with brand colors
    modifiedSvg = modifiedSvg.replace(
      /<(circle|rect|path|polygon)[^>]*class="confetti"[^>]*fill="[^"]*"[^>]*>/g,
      (match) => {
        const randomColor = [brandColors.primary, brandColors.secondary, brandColors.accent][
          Math.floor(Math.random() * 3)
        ]
        return match.replace(/fill="[^"]*"/, `fill="${randomColor}"`)
      },
    )

    setProcessedSvg(modifiedSvg)
  }, [svgTemplate, prizeName, logoUrl, prizeImageUrl, tagline, ctaText, brandColors])

  // Generate image when SVG is processed
  useEffect(() => {
    if (containerRef.current && processedSvg && onRender) {
      setTimeout(() => {
        toPng(containerRef.current!, { quality: 0.95 })
          .then((dataUrl) => {
            onRender(dataUrl)
          })
          .catch((err) => {
            console.error("Error generating image:", err)
          })
      }, 500) // Give time for images to load
    }
  }, [processedSvg, onRender])

  const handleDownload = async () => {
    if (!containerRef.current) return

    try {
      const dataUrl = await toPng(containerRef.current, { quality: 0.95 })

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
      <div ref={containerRef} className="w-[1080px] h-[1080px]" dangerouslySetInnerHTML={{ __html: processedSvg }} />

      <button onClick={handleDownload} className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
        Download Ad
      </button>
    </div>
  )
}
