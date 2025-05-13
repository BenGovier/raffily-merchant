"use client"

import { useState, useEffect } from "react"
import { SVGRaffleAd } from "@/components/SVGRaffleAd"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

// This is a placeholder - we'll load the actual SVG template from the file
const DEFAULT_SVG_TEMPLATE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080">
  <defs>
    <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#00B8A9" />
      <stop offset="100%" stopColor="#05668D" />
    </linearGradient>
  </defs>
  <rect id="backgroundRect" width="100%" height="100%" fill="url(#brandGradient)" />
  <image id="logoPlaceholder" x="440" y="50" width="200" height="100" xlinkHref="/placeholder.svg" />
  <text id="headlineText" x="50%" y="25%" textAnchor="middle" dominantBaseline="middle" fontFamily="Poppins, sans-serif" fontWeight="bold" fontSize="60" fill="white">WIN A PHONE!</text>
  <text id="subheadlineText" x="50%" y="35%" textAnchor="middle" dominantBaseline="middle" fontFamily="Montserrat, sans-serif" fontSize="30" fill="white">Don't miss your chance—enter now!</text>
  <image id="prizeImagePlaceholder" x="390" y="400" width="300" height="300" xlinkHref="/placeholder.svg" />
  <rect id="ctaButtonBg" x="35%" y="75%" width="30%" height="10%" rx="25" fill="#F8D210" />
  <text id="ctaButtonText" x="50%" y="80%" textAnchor="middle" dominantBaseline="middle" fontFamily="Poppins, sans-serif" fontWeight="bold" fontSize="30" fill="black">Enter Raffle</text>
  <circle class="confetti" cx="200" cy="200" r="15" fill="#F8D210" />
  <circle class="confetti" cx="800" cy="300" r="20" fill="#00B8A9" />
  <rect class="confetti" x="300" y="700" width="30" height="15" fill="#05668D" transform="rotate(30, 300, 700)" />
  <polygon class="confetti" points="900,600 930,600 915,630" fill="#F8D210" />
</svg>`

export default function SVGRaffleAdDemo() {
  const [svgTemplate, setSvgTemplate] = useState(DEFAULT_SVG_TEMPLATE)
  const [adData, setAdData] = useState({
    prizeName: "PHONE",
    logoUrl: "/placeholder.svg?height=100&width=200",
    prizeImageUrl: "/placeholder.svg?height=300&width=300",
    tagline: "Don't miss your chance—enter now!",
    ctaText: "Enter Raffle",
    brandColors: {
      primary: "#00B8A9",
      secondary: "#05668D",
      accent: "#F8D210",
    },
  })
  const [previewUrl, setPreviewUrl] = useState("")

  // Load the SVG template from the file
  useEffect(() => {
    fetch("/Vtl0t.svg")
      .then((response) => response.text())
      .then((svg) => {
        setSvgTemplate(svg)
      })
      .catch((error) => {
        console.error("Error loading SVG template:", error)
      })
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setAdData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleColorChange = (colorType: "primary" | "secondary" | "accent", value: string) => {
    setAdData((prev) => ({
      ...prev,
      brandColors: {
        ...prev.brandColors,
        [colorType]: value,
      },
    }))
  }

  const handleRender = (dataUrl: string) => {
    setPreviewUrl(dataUrl)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">SVG Raffle Ad Generator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Ad Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prizeName">Prize Name</Label>
              <Input
                id="prizeName"
                value={adData.prizeName}
                onChange={(e) => handleInputChange("prizeName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logoUrl">Logo URL</Label>
              <Input
                id="logoUrl"
                value={adData.logoUrl}
                onChange={(e) => handleInputChange("logoUrl", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prizeImageUrl">Prize Image URL</Label>
              <Input
                id="prizeImageUrl"
                value={adData.prizeImageUrl}
                onChange={(e) => handleInputChange("prizeImageUrl", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={adData.tagline}
                onChange={(e) => handleInputChange("tagline", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ctaText">CTA Text</Label>
              <Input
                id="ctaText"
                value={adData.ctaText}
                onChange={(e) => handleInputChange("ctaText", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <Input
                  id="primaryColor"
                  type="color"
                  value={adData.brandColors.primary}
                  onChange={(e) => handleColorChange("primary", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <Input
                  id="secondaryColor"
                  type="color"
                  value={adData.brandColors.secondary}
                  onChange={(e) => handleColorChange("secondary", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accentColor">Accent Color</Label>
                <Input
                  id="accentColor"
                  type="color"
                  value={adData.brandColors.accent}
                  onChange={(e) => handleColorChange("accent", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="svgTemplate">SVG Template (Advanced)</Label>
              <Textarea
                id="svgTemplate"
                value={svgTemplate}
                onChange={(e) => setSvgTemplate(e.target.value)}
                className="h-40 font-mono text-xs"
              />
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <div className="flex flex-col items-center">
          <div className="scale-50 origin-top-left">
            <SVGRaffleAd {...adData} svgTemplate={svgTemplate} onRender={handleRender} />
          </div>

          {previewUrl && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Preview:</h3>
              <img
                src={previewUrl || "/placeholder.svg"}
                alt="Raffle Ad Preview"
                className="max-w-full border rounded shadow-md"
                style={{ maxHeight: "400px" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

