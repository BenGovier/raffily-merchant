"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import Image from "next/image"
import {
  darken,
  lighten,
  getContrastRatio,
  getBestFontPair,
  getBestTemplate,
  generateConfettiSVG,
  generateSparklesSVG,
  generateStarburstSVG,
  generatePatternSVG,
  designTemplates,
} from "@/utils/design-system"
import { cn } from "@/lib/utils"

interface InstagramAdProps {
  prizeName: string
  brandingData: {
    colors: string[]
    fonts: string[]
    logo?: string
  }
  templateId?: string
  onRender?: (element: HTMLDivElement) => void
}

export default function InstagramAd({ prizeName, brandingData, templateId = "auto", onRender }: InstagramAdProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (adRef.current && onRender) {
      onRender(adRef.current)
    }
  }, [onRender, prizeName, brandingData, templateId])

  // Get colors
  const primaryColor = brandingData.colors[0] || "#00B8A9"
  const secondaryColor = brandingData.colors[1] || darken(primaryColor, 0.2)
  const accentColor = brandingData.colors[2] || lighten(primaryColor, 0.3)
  const vibrantColors = [
    primaryColor,
    secondaryColor,
    accentColor,
    "#FFD700", // Gold
    "#FF6B6B", // Coral
  ]

  // Determine text color based on contrast
  const darkTextContrast = getContrastRatio(primaryColor, "#000000")
  const lightTextContrast = getContrastRatio(primaryColor, "#FFFFFF")
  const textColor = lightTextContrast > darkTextContrast ? "#FFFFFF" : "#000000"

  // Get font pair
  const fontPair = getBestFontPair(brandingData.fonts)

  // Get template
  const template =
    templateId === "auto"
      ? getBestTemplate(brandingData)
      : designTemplates.find((t) => t.id === templateId) || getBestTemplate(brandingData)

  // Dynamic styles based on template
  const logoSize = {
    small: "h-12",
    medium: "h-16",
    large: "h-20",
  }[template.style.elements.logo.size]

  const headingSize = {
    small: "text-5xl",
    medium: "text-6xl",
    large: "text-7xl",
    xlarge: "text-8xl",
  }[template.style.elements.heading.size]

  const headingWeight = {
    normal: "font-normal",
    bold: "font-bold",
    black: "font-black",
  }[template.style.elements.heading.weight]

  const spacing = {
    compact: "p-8",
    balanced: "p-12",
    airy: "p-16",
  }[template.style.spacing]

  // Generate background style
  let backgroundStyle: React.CSSProperties = { backgroundColor: primaryColor }

  if (template.style.effects.gradient) {
    if (template.style.layout === "celebratory") {
      backgroundStyle = {
        background: `radial-gradient(circle at center, ${lighten(primaryColor, 0.1)} 0%, ${primaryColor} 70%)`,
      }
    } else if (template.style.layout === "energetic") {
      backgroundStyle = {
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
      }
    } else if (template.style.layout === "split") {
      backgroundStyle = {
        background: `linear-gradient(90deg, ${primaryColor} 0%, ${primaryColor} 50%, ${secondaryColor} 50%, ${secondaryColor} 100%)`,
      }
    } else {
      backgroundStyle = {
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
      }
    }
  }

  // Generate SVG effects
  const confettiSvg = template.style.effects.confetti ? generateConfettiSVG(vibrantColors) : ""

  const sparklesSvg = template.style.effects.sparkles ? generateSparklesSVG(textColor) : ""

  const starburstSvg = template.style.effects.starburst ? generateStarburstSVG(accentColor) : ""

  const patternSvg = template.style.effects.pattern ? generatePatternSVG(textColor) : ""

  // CTA button style
  const ctaStyle: React.CSSProperties =
    template.style.elements.cta.style === "vibrant"
      ? {
          backgroundColor: accentColor,
          color:
            getContrastRatio(accentColor, "#FFFFFF") > getContrastRatio(accentColor, "#000000") ? "#FFFFFF" : "#000000",
          fontFamily: fontPair.body,
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
          border: "none",
          transform: "translateY(0)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }
      : template.style.elements.cta.style === "button"
        ? {
            backgroundColor: textColor === "#FFFFFF" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
            color: textColor,
            fontFamily: fontPair.body,
            border: `2px solid ${textColor}`,
          }
        : {
            color: textColor,
            fontFamily: fontPair.body,
            borderColor: textColor,
          }

  // Use the brand's primary color or default to the deep purple from the screenshot
  const bgColor = brandingData.colors?.[0] || "#1E1454"

  return (
    <div className="relative w-[1080px] h-[1080px] flex flex-col p-12" style={{ backgroundColor: bgColor }}>
      {/* Logo */}
      <div className="absolute top-8 right-8 w-32 h-32">
        {brandingData.logo ? (
          <Image src={brandingData.logo || "/placeholder.svg"} alt="Brand logo" fill className="object-contain" />
        ) : (
          <div className="w-full h-full bg-white/10 rounded-lg" />
        )}
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-start justify-center">
        <h1
          className={cn(
            "text-[180px] font-black leading-none tracking-tight text-white mb-4",
            "font-sans", // Using system font for clean, modern look
          )}
        >
          WIN
        </h1>

        <h2 className={cn("text-[80px] font-bold leading-tight text-white/90 mb-8", "font-sans lowercase")}>
          {prizeName}
        </h2>

        <p className={cn("text-[40px] font-medium text-white/80", "font-sans")}>Enter now for your chance to win!</p>
      </div>

      {/* Powered by Raffily */}
      <div className="absolute bottom-8 left-12 text-white/60 text-sm">Powered by Raffily</div>
    </div>
  )
}

