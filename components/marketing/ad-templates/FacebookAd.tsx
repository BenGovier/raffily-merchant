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

interface FacebookAdProps {
  prizeName: string
  brandingData: {
    colors: string[]
    fonts: string[]
    logo?: string
  }
  templateId?: string
  onRender?: (element: HTMLDivElement) => void
}

export default function FacebookAd({ prizeName, brandingData, templateId = "auto", onRender }: FacebookAdProps) {
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
    small: "h-10",
    medium: "h-14",
    large: "h-18",
  }[template.style.elements.logo.size]

  const headingSize = {
    small: "text-4xl",
    medium: "text-5xl",
    large: "text-6xl",
    xlarge: "text-7xl",
  }[template.style.elements.heading.size]

  const headingWeight = {
    normal: "font-normal",
    bold: "font-bold",
    black: "font-black",
  }[template.style.elements.heading.weight]

  const spacing = {
    compact: "p-6",
    balanced: "p-10",
    airy: "p-14",
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

  return (
    <div ref={adRef} className="relative w-[1200px] h-[628px] overflow-hidden" style={backgroundStyle}>
      {/* Background pattern or elements */}
      {template.style.effects.pattern && (
        <div className="absolute inset-0" dangerouslySetInnerHTML={{ __html: patternSvg }} />
      )}

      {/* Starburst effect */}
      {template.style.effects.starburst && (
        <div className="absolute inset-0" dangerouslySetInnerHTML={{ __html: starburstSvg }} />
      )}

      {/* Confetti effect */}
      {template.style.effects.confetti && (
        <div className="absolute inset-0" dangerouslySetInnerHTML={{ __html: confettiSvg }} />
      )}

      <div className={`absolute inset-0 ${spacing} flex`}>
        {template.style.layout === "split" ? (
          <>
            {/* Left side */}
            <div className="w-1/2 flex flex-col justify-center pr-8">
              {template.style.elements.logo.position === "top" && brandingData.logo && (
                <div className={`${logoSize} w-auto mb-6 relative`}>
                  <Image
                    src={brandingData.logo || "/placeholder.svg"}
                    alt="Brand logo"
                    width={80}
                    height={80}
                    className="object-contain h-full w-auto"
                  />
                </div>
              )}

              <div
                className={`${headingSize} ${headingWeight} mb-4 relative`}
                style={{ color: textColor, fontFamily: fontPair.heading }}
              >
                WIN
                {/* Sparkles effect */}
                {template.style.effects.sparkles && (
                  <div className="absolute inset-0 -m-4" dangerouslySetInnerHTML={{ __html: sparklesSvg }} />
                )}
              </div>

              <div className="text-3xl font-bold mb-6" style={{ color: textColor, fontFamily: fontPair.heading }}>
                {prizeName}!
              </div>

              {/* CTA */}
              {template.style.elements.cta.style === "vibrant" && (
                <div className="mt-6 px-8 py-3 rounded-full text-xl font-bold inline-block" style={ctaStyle}>
                  Claim Your Prize
                </div>
              )}

              {template.style.elements.cta.style === "button" && (
                <div className="mt-6 px-8 py-3 rounded-full text-lg font-medium inline-block" style={ctaStyle}>
                  Enter Raffle
                </div>
              )}

              {template.style.elements.cta.style === "underlined" && (
                <div className="mt-6 text-lg font-medium border-b-2 inline-block" style={ctaStyle}>
                  Enter Raffle
                </div>
              )}

              {template.style.elements.cta.style === "text" && (
                <div className="mt-6 text-lg font-medium" style={ctaStyle}>
                  Enter Raffle →
                </div>
              )}
            </div>

            {/* Right side */}
            <div className="w-1/2 flex flex-col justify-center items-center">
              <div className="text-xl mb-4" style={{ color: textColor, fontFamily: fontPair.body }}>
                Don't miss your chance—enter now!
              </div>

              {template.style.elements.logo.position === "bottom" && brandingData.logo && (
                <div className={`${logoSize} w-auto mt-6 relative`}>
                  <Image
                    src={brandingData.logo || "/placeholder.svg"}
                    alt="Brand logo"
                    width={80}
                    height={80}
                    className="object-contain h-full w-auto"
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          // Centered or asymmetric layout
          <div className="w-full flex flex-col">
            {/* Logo placement */}
            {template.style.elements.logo.position === "top" && (
              <div className="flex items-center mb-6">
                {brandingData.logo && (
                  <div className={`${logoSize} w-auto mr-4 relative`}>
                    <Image
                      src={brandingData.logo || "/placeholder.svg"}
                      alt="Brand logo"
                      width={80}
                      height={80}
                      className="object-contain h-full w-auto"
                    />
                  </div>
                )}
                <div className="text-xl font-bold" style={{ color: textColor, fontFamily: fontPair.heading }}>
                  GIVEAWAY
                </div>
              </div>
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col justify-center">
              <div
                className={`${headingSize} ${headingWeight} mb-4 relative`}
                style={{ color: textColor, fontFamily: fontPair.heading }}
              >
                WIN
                {/* Sparkles effect */}
                {template.style.effects.sparkles && (
                  <div className="absolute inset-0 -m-4" dangerouslySetInnerHTML={{ __html: sparklesSvg }} />
                )}
              </div>

              <div className="text-3xl font-bold mb-6" style={{ color: textColor, fontFamily: fontPair.heading }}>
                {prizeName}!
              </div>

              <div className="text-xl mb-6" style={{ color: textColor, fontFamily: fontPair.body }}>
                Don't miss your chance—enter now!
              </div>

              {/* CTA */}
              {template.style.elements.cta.style === "vibrant" && (
                <div className="mt-4 px-8 py-3 rounded-full text-xl font-bold inline-block" style={ctaStyle}>
                  Claim Your Prize
                </div>
              )}

              {template.style.elements.cta.style === "button" && (
                <div className="mt-4 px-8 py-3 rounded-full text-lg font-medium inline-block" style={ctaStyle}>
                  Enter Raffle
                </div>
              )}

              {template.style.elements.cta.style === "underlined" && (
                <div className="mt-4 text-lg font-medium border-b-2 inline-block" style={ctaStyle}>
                  Enter Raffle
                </div>
              )}

              {template.style.elements.cta.style === "text" && (
                <div className="mt-4 text-lg font-medium" style={ctaStyle}>
                  Enter Raffle →
                </div>
              )}
            </div>

            {/* Logo placement - corner */}
            {template.style.elements.logo.position === "corner" && (
              <div className="absolute top-8 right-8">
                {brandingData.logo && (
                  <div className={`${logoSize} w-auto relative`}>
                    <Image
                      src={brandingData.logo || "/placeholder.svg"}
                      alt="Brand logo"
                      width={80}
                      height={80}
                      className="object-contain h-full w-auto"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            <div
              className="text-sm text-center mt-auto"
              style={{ color: textColor, fontFamily: fontPair.body, opacity: 0.8 }}
            >
              Powered by Raffily
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
