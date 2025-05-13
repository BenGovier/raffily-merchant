"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { darken, lighten, getContrastRatio, getBestFontPair, getBestTemplate } from "@/utils/design-system"

interface TwitterAdProps {
  prizeName: string
  brandingData: {
    colors: string[]
    fonts: string[]
    logo?: string
  }
  templateId?: string
  onRender?: (element: HTMLDivElement) => void
}

export default function TwitterAd({ prizeName, brandingData, templateId = "auto", onRender }: TwitterAdProps) {
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

  // Determine text color based on contrast
  const darkTextContrast = getContrastRatio(primaryColor, "#000000")
  const lightTextContrast = getContrastRatio(primaryColor, "#FFFFFF")
  const textColor = lightTextContrast > darkTextContrast ? "#FFFFFF" : "#000000"

  // Get font pair
  const fontPair = getBestFontPair(brandingData.fonts)

  // Get template
  const template = templateId === "auto" ? getBestTemplate(brandingData) : getBestTemplate({ colors: [primaryColor] })

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
  }[template.style.elements.heading.size]

  const headingWeight = {
    normal: "font-normal",
    bold: "font-bold",
    black: "font-black",
  }[template.style.elements.heading.weight]

  const spacing = {
    compact: "p-10",
    balanced: "p-14",
    airy: "p-20",
  }[template.style.spacing]

  // Generate background pattern or gradient
  const backgroundStyle =
    template.style.layout === "minimal"
      ? { backgroundColor: primaryColor }
      : template.style.layout === "split"
        ? {
            background: `linear-gradient(90deg, ${primaryColor} 0%, ${primaryColor} 50%, ${secondaryColor} 50%, ${secondaryColor} 100%)`,
          }
        : template.style.layout === "asymmetric"
          ? {
              background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
              backgroundSize: "100% 100%",
            }
          : {
              backgroundColor: primaryColor,
              backgroundImage: `radial-gradient(circle at 25% 25%, ${lighten(primaryColor, 0.1)} 0%, transparent 50%)`,
            }

  return (
    <div ref={adRef} className="relative w-[1600px] h-[900px] overflow-hidden" style={backgroundStyle}>
      {/* Background pattern or elements */}
      {template.style.layout === "modern" && (
        <div className="absolute inset-0">
          <div
            className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20"
            style={{ backgroundColor: accentColor, filter: "blur(80px)" }}
          ></div>
          <div
            className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-20"
            style={{ backgroundColor: secondaryColor, filter: "blur(80px)" }}
          ></div>
        </div>
      )}

      <div className={`absolute inset-0 ${spacing} flex`}>
        {template.style.layout === "split" ? (
          <>
            {/* Left side */}
            <div className="w-1/2 flex flex-col justify-center pr-10">
              {template.style.elements.logo.position === "top" && brandingData.logo && (
                <div className={`${logoSize} w-auto mb-8 relative`}>
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
                className={`${headingSize} ${headingWeight} mb-6`}
                style={{ color: textColor, fontFamily: fontPair.heading }}
              >
                WIN
              </div>
              <div className="text-4xl font-bold mb-8" style={{ color: textColor, fontFamily: fontPair.heading }}>
                {prizeName}
              </div>

              {/* CTA */}
              {template.style.elements.cta.style === "button" && (
                <div
                  className="mt-8 px-10 py-4 rounded-full text-xl font-medium inline-block"
                  style={{
                    backgroundColor: textColor === "#FFFFFF" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
                    color: textColor,
                    fontFamily: fontPair.body,
                    border: `2px solid ${textColor}`,
                  }}
                >
                  Enter Raffle
                </div>
              )}

              {template.style.elements.cta.style === "underlined" && (
                <div
                  className="mt-8 text-xl font-medium border-b-2 inline-block"
                  style={{
                    color: textColor,
                    fontFamily: fontPair.body,
                    borderColor: textColor,
                  }}
                >
                  Enter Raffle
                </div>
              )}

              {template.style.elements.cta.style === "text" && (
                <div
                  className="mt-8 text-xl font-medium"
                  style={{
                    color: textColor,
                    fontFamily: fontPair.body,
                  }}
                >
                  Enter Raffle →
                </div>
              )}
            </div>

            {/* Right side */}
            <div className="w-1/2 flex flex-col justify-center items-center">
              <div className="text-2xl mb-6" style={{ color: textColor, fontFamily: fontPair.body }}>
                Enter now for your chance to win!
              </div>

              {template.style.elements.logo.position === "bottom" && brandingData.logo && (
                <div className={`${logoSize} w-auto mt-8 relative`}>
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
              <div className="flex items-center mb-8">
                {brandingData.logo && (
                  <div className={`${logoSize} w-auto mr-5 relative`}>
                    <Image
                      src={brandingData.logo || "/placeholder.svg"}
                      alt="Brand logo"
                      width={80}
                      height={80}
                      className="object-contain h-full w-auto"
                    />
                  </div>
                )}
                <div className="text-2xl font-bold" style={{ color: textColor, fontFamily: fontPair.heading }}>
                  GIVEAWAY
                </div>
              </div>
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col justify-center">
              <div
                className={`${headingSize} ${headingWeight} mb-6`}
                style={{ color: textColor, fontFamily: fontPair.heading }}
              >
                WIN
              </div>
              <div className="text-4xl font-bold mb-8" style={{ color: textColor, fontFamily: fontPair.heading }}>
                {prizeName}
              </div>
              <div className="text-2xl mb-8" style={{ color: textColor, fontFamily: fontPair.body }}>
                Enter now for your chance to win!
              </div>

              {/* CTA */}
              {template.style.elements.cta.style === "button" && (
                <div
                  className="mt-6 px-10 py-4 rounded-full text-xl font-medium inline-block"
                  style={{
                    backgroundColor: textColor === "#FFFFFF" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
                    color: textColor,
                    fontFamily: fontPair.body,
                    border: `2px solid ${textColor}`,
                  }}
                >
                  Enter Raffle
                </div>
              )}

              {template.style.elements.cta.style === "underlined" && (
                <div
                  className="mt-6 text-xl font-medium border-b-2 inline-block"
                  style={{
                    color: textColor,
                    fontFamily: fontPair.body,
                    borderColor: textColor,
                  }}
                >
                  Enter Raffle
                </div>
              )}

              {template.style.elements.cta.style === "text" && (
                <div
                  className="mt-6 text-xl font-medium"
                  style={{
                    color: textColor,
                    fontFamily: fontPair.body,
                  }}
                >
                  Enter Raffle →
                </div>
              )}
            </div>

            {/* Logo placement - corner */}
            {template.style.elements.logo.position === "corner" && (
              <div className="absolute top-10 right-10">
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
              className="text-base text-center mt-auto"
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

