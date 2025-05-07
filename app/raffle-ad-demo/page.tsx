"use client"

import { useState } from "react"
import { RaffleAd } from "@/components/RaffleAd"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RaffleAdDemo() {
  const [adData, setAdData] = useState({
    prizeName: "iPhone 15 Pro",
    logoUrl: "/placeholder.svg",
    prizeImageUrl: "/placeholder.svg",
    tagline: "Don't miss your chance—enter now!",
    ctaText: "Enter Raffle",
    brandColors: {
      primary: "#00B8A9",
      secondary: "#05668D",
      accent: "#F8D210",
    },
  })

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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Raffle Ad Generator</h1>

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
          </CardContent>
        </Card>

        {/* Preview */}
        <div className="scale-50 origin-top-left">
          <RaffleAd {...adData} />
        </div>
      </div>
    </div>
  )
}
