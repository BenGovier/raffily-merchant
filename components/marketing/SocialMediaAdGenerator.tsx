"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Loader2, Search, Upload } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { toPng } from "html-to-image"

// Animation types
type AnimationType = "none" | "fade" | "zoom" | "bounce" | "slide" | "glitter"

// Platform aspect ratios
type AspectRatio = "square" | "landscape" | "portrait" | "story"

// Unsplash image type
type UnsplashImage = {
  id: string
  urls: {
    regular: string
    small: string
    thumb: string
  }
  user: {
    name: string
    username: string
  }
  alt_description: string
}

export default function SocialMediaAdGenerator() {
  const { user } = useAuth()
  const [prizeName, setPrizeName] = useState("")
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [unsplashImage, setUnsplashImage] = useState<UnsplashImage | null>(null)
  const [isLoadingUnsplash, setIsLoadingUnsplash] = useState(false)
  const [unsplashQuery, setUnsplashQuery] = useState("colorful background")
  const [showUnsplashSearch, setShowUnsplashSearch] = useState(false)
  const [unsplashResults, setUnsplashResults] = useState<UnsplashImage[]>([])
  const [activeTab, setActiveTab] = useState("instagram")
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("square")
  const [isAnimated, setIsAnimated] = useState(false)
  const [animation, setAnimation] = useState<AnimationType>("fade")
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationInterval, setAnimationInterval] = useState<NodeJS.Timeout | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  // Unsplash API credentials
  const UNSPLASH_ACCESS_KEY = "U83GOeRBJkI08D4FhKShZyxh3b_siNhiW7Nj0hq8p-c"

  // Get available aspect ratios for the current platform
  const getAvailableAspectRatios = () => {
    switch (activeTab) {
      case "instagram":
        return [
          { value: "square", label: "Square (1:1)" },
          { value: "portrait", label: "Portrait (4:5)" },
          { value: "story", label: "Story (9:16)" },
        ]
      case "facebook":
        return [
          { value: "landscape", label: "Landscape (16:9)" },
          { value: "square", label: "Square (1:1)" },
          { value: "story", label: "Story (9:16)" },
        ]
      case "twitter":
        return [
          { value: "landscape", label: "Landscape (16:9)" },
          { value: "square", label: "Square (1:1)" },
        ]
      default:
        return [{ value: "square", label: "Square (1:1)" }]
    }
  }

  // Set default aspect ratio when platform changes
  useEffect(() => {
    const ratios = getAvailableAspectRatios()
    setAspectRatio(ratios[0].value as AspectRatio)
  }, [activeTab])

  // Handle animation preview
  useEffect(() => {
    // Clear any existing animation interval
    if (animationInterval) {
      clearInterval(animationInterval)
      setAnimationInterval(null)
    }

    // If animation is enabled, start the animation loop
    if (isAnimated) {
      // Start with animation off
      setIsAnimating(false)

      // Wait a moment before starting the animation
      const timeout = setTimeout(() => {
        // Create an interval that toggles the animation state
        const interval = setInterval(() => {
          setIsAnimating((prev) => !prev)
        }, 3000) // Toggle every 3 seconds

        setAnimationInterval(interval)
        setIsAnimating(true) // Start the first animation
      }, 500)

      return () => {
        clearTimeout(timeout)
        if (animationInterval) clearInterval(animationInterval)
      }
    } else {
      // If animation is disabled, make sure animation is off
      setIsAnimating(false)
    }
  }, [isAnimated, animation])

  // Clean up animation interval on unmount
  useEffect(() => {
    return () => {
      if (animationInterval) clearInterval(animationInterval)
    }
  }, [animationInterval])

  // Search for images from Unsplash
  const searchUnsplashImages = async () => {
    if (!unsplashQuery.trim()) return

    setIsLoadingUnsplash(true)
    try {
      const orientation =
        aspectRatio === "landscape"
          ? "landscape"
          : aspectRatio === "portrait" || aspectRatio === "story"
            ? "portrait"
            : "squarish"

      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(unsplashQuery)}&orientation=${orientation}&per_page=9&client_id=${UNSPLASH_ACCESS_KEY}`,
      )

      if (!response.ok) {
        throw new Error("Failed to fetch images from Unsplash")
      }

      const data = await response.json()
      setUnsplashResults(data.results)
    } catch (error) {
      console.error("Error searching Unsplash images:", error)
    } finally {
      setIsLoadingUnsplash(false)
    }
  }

  const handleBackgroundImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setBackgroundImage(event.target?.result as string)
        // Clear Unsplash image when user uploads their own
        setUnsplashImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const selectUnsplashImage = (image: UnsplashImage) => {
    setUnsplashImage(image)
    setBackgroundImage(null)
    setShowUnsplashSearch(false)
  }

  const handleDownload = async () => {
    if (!previewRef.current) return

    try {
      // Temporarily disable animation for the screenshot
      const wasAnimating = isAnimating
      setIsAnimating(false)

      // Wait for the DOM to update
      await new Promise((resolve) => setTimeout(resolve, 100))

      const dataUrl = await toPng(previewRef.current, { quality: 0.95 })

      // Restore animation state
      setIsAnimating(wasAnimating)

      // Create download link
      const link = document.createElement("a")
      link.download = `raffle-ad-${prizeName.toLowerCase().replace(/\s+/g, "-")}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error("Error generating image:", err)
    }
  }

  // Get dimensions and text positioning based on platform and aspect ratio
  const getConfig = () => {
    // Base configurations
    const configs = {
      instagram: {
        square: { width: 1080, height: 1080, winTextTop: "25%", prizeNameTop: "45%" },
        portrait: { width: 1080, height: 1350, winTextTop: "20%", prizeNameTop: "35%" },
        story: { width: 1080, height: 1920, winTextTop: "30%", prizeNameTop: "45%" },
      },
      facebook: {
        square: { width: 1080, height: 1080, winTextTop: "25%", prizeNameTop: "45%" },
        landscape: { width: 1200, height: 630, winTextTop: "20%", prizeNameTop: "40%" },
        story: { width: 1080, height: 1920, winTextTop: "30%", prizeNameTop: "45%" },
      },
      twitter: {
        square: { width: 1080, height: 1080, winTextTop: "25%", prizeNameTop: "45%" },
        landscape: { width: 1200, height: 675, winTextTop: "20%", prizeNameTop: "40%" },
      },
    }

    // Get config for current platform and aspect ratio
    const platformConfig = configs[activeTab as keyof typeof configs] || configs.instagram
    const config = platformConfig[aspectRatio as keyof typeof platformConfig] || platformConfig.square

    // Add text sizes based on aspect ratio
    if (aspectRatio === "square") {
      return {
        ...config,
        winTextSize: "text-7xl md:text-8xl",
        prizeNameSize: "text-4xl md:text-5xl",
      }
    } else if (aspectRatio === "landscape") {
      return {
        ...config,
        winTextSize: "text-6xl md:text-7xl",
        prizeNameSize: "text-3xl md:text-4xl",
      }
    } else if (aspectRatio === "portrait") {
      return {
        ...config,
        winTextSize: "text-7xl md:text-8xl",
        prizeNameSize: "text-4xl md:text-5xl",
      }
    } else if (aspectRatio === "story") {
      return {
        ...config,
        winTextSize: "text-8xl md:text-9xl",
        prizeNameSize: "text-5xl md:text-6xl",
      }
    }

    // Default
    return {
      ...config,
      winTextSize: "text-7xl md:text-8xl",
      prizeNameSize: "text-4xl md:text-5xl",
    }
  }

  const config = getConfig()

  // Get animation classes
  const getAnimationClasses = () => {
    if (!isAnimating || !isAnimated) return ""

    switch (animation) {
      case "fade":
        return "animate-fade-in"
      case "zoom":
        return "animate-zoom-in"
      case "bounce":
        return "animate-bounce"
      case "slide":
        return "animate-slide-in"
      case "glitter":
        return "animate-pulse"
      default:
        return ""
    }
  }

  // Calculate max height for preview container
  const getMaxPreviewHeight = () => {
    if (aspectRatio === "story") {
      return "max-h-[500px]" // Limit story format height
    }
    return ""
  }

  // Calculate scale factor for preview
  const getScaleFactor = () => {
    if (aspectRatio === "story") {
      return "scale-[0.5] origin-top" // Scale down story format
    }
    return ""
  }

  // Get background image URL
  const getBackgroundImageUrl = () => {
    if (backgroundImage) {
      return backgroundImage
    } else if (unsplashImage) {
      return unsplashImage.urls.regular
    }
    return null
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Settings panel - Left side */}
        <div className="lg:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Ad Settings</CardTitle>
              <CardDescription>Customize your raffle advertisement</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Content section */}
              <div>
                <h3 className="text-lg font-medium mb-4">Content</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="prize-name" className="text-sm font-medium text-gray-700 mb-1 block">
                      Prize Name
                    </Label>
                    <Input
                      id="prize-name"
                      value={prizeName}
                      onChange={(e) => setPrizeName(e.target.value)}
                      placeholder="Enter your raffle prize name"
                      className="mt-1 border-2 border-gray-300 bg-white shadow-sm focus:border-[#00B8A9] focus:ring-[#00B8A9] text-base placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <Label>Background Image</Label>
                    <div className="mt-2 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Button
                            variant="outline"
                            className="w-full h-auto py-3 flex flex-col items-center justify-center gap-2 border-2 border-gray-300 hover:border-[#00B8A9] hover:bg-gray-50"
                            onClick={() => document.getElementById("file-upload")?.click()}
                          >
                            <Upload className="h-5 w-5" />
                            <span className="font-medium">Upload Image</span>
                          </Button>
                          <Input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleBackgroundImageUpload}
                            className="hidden"
                          />
                        </div>
                        <div>
                          <Button
                            variant="outline"
                            className="w-full h-auto py-3 flex flex-col items-center justify-center gap-2 border-2 border-gray-300 hover:border-[#00B8A9] hover:bg-gray-50"
                            onClick={() => setShowUnsplashSearch(true)}
                          >
                            <Search className="h-5 w-5" />
                            <span className="font-medium">Unsplash</span>
                          </Button>
                        </div>
                      </div>

                      {backgroundImage && (
                        <div className="relative rounded-md overflow-hidden h-20">
                          <img
                            src={backgroundImage || "/placeholder.svg"}
                            alt="Uploaded background"
                            className="w-full h-full object-cover"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 h-6 w-6 p-0"
                            onClick={() => setBackgroundImage(null)}
                          >
                            ✕
                          </Button>
                        </div>
                      )}

                      {unsplashImage && (
                        <div className="relative rounded-md overflow-hidden h-20">
                          <img
                            src={unsplashImage.urls.small || "/placeholder.svg"}
                            alt={unsplashImage.alt_description || "Unsplash background"}
                            className="w-full h-full object-cover"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 h-6 w-6 p-0"
                            onClick={() => setUnsplashImage(null)}
                          >
                            ✕
                          </Button>
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-1">
                            <p className="text-xs text-white">
                              Photo by{" "}
                              <a
                                href={`https://unsplash.com/@${unsplashImage.user.username}?utm_source=raffily&utm_medium=referral`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                              >
                                {unsplashImage.user.name}
                              </a>{" "}
                              on{" "}
                              <a
                                href="https://unsplash.com/?utm_source=raffily&utm_medium=referral"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                              >
                                Unsplash
                              </a>
                            </p>
                          </div>
                        </div>
                      )}

                      {!backgroundImage && !unsplashImage && (
                        <div className="rounded-md border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500">
                          No background image selected. Your ad will use a default gradient background.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Unsplash search modal */}
                  {showUnsplashSearch && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-xl">
                        <div className="p-4 border-b flex justify-between items-center">
                          <h3 className="text-lg font-medium">Search Unsplash Images</h3>
                          <Button variant="ghost" size="sm" onClick={() => setShowUnsplashSearch(false)}>
                            ✕
                          </Button>
                        </div>

                        <div className="p-4 border-b">
                          <div className="flex gap-2">
                            <Input
                              value={unsplashQuery}
                              onChange={(e) => setUnsplashQuery(e.target.value)}
                              placeholder="Search for images..."
                              onKeyDown={(e) => e.key === "Enter" && searchUnsplashImages()}
                              className="border-2 border-gray-300 bg-white shadow-sm focus:border-[#00B8A9] focus:ring-[#00B8A9] text-base placeholder:text-gray-400"
                            />
                            <Button
                              onClick={searchUnsplashImages}
                              disabled={isLoadingUnsplash}
                              className="bg-[#2D2A4A] hover:bg-[#3D3A5A] text-white font-medium px-6 py-2 shadow-sm"
                            >
                              {isLoadingUnsplash ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
                            </Button>
                          </div>
                        </div>

                        <div className="flex-grow overflow-y-auto p-4">
                          {isLoadingUnsplash ? (
                            <div className="flex items-center justify-center h-40">
                              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                            </div>
                          ) : unsplashResults.length > 0 ? (
                            <div className="grid grid-cols-3 gap-3">
                              {unsplashResults.map((image) => (
                                <div
                                  key={image.id}
                                  className="aspect-square rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                                  onClick={() => selectUnsplashImage(image)}
                                >
                                  <img
                                    src={image.urls.small || "/placeholder.svg"}
                                    alt={image.alt_description || "Unsplash image"}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center text-gray-500 py-10">
                              {unsplashQuery
                                ? "No images found. Try a different search term."
                                : "Search for images to use as your background."}
                            </div>
                          )}
                        </div>

                        <div className="p-4 border-t text-xs text-gray-500">
                          Images provided by{" "}
                          <a
                            href="https://unsplash.com/?utm_source=raffily&utm_medium=referral"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            Unsplash
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Format section */}
              <div>
                <h3 className="text-lg font-medium mb-4">Format</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-1 block">Platform</Label>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-1">
                      <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1">
                        <TabsTrigger
                          value="instagram"
                          className="data-[state=active]:bg-white data-[state=active]:text-[#2D2A4A] data-[state=active]:shadow-sm font-medium"
                        >
                          Instagram
                        </TabsTrigger>
                        <TabsTrigger
                          value="facebook"
                          className="data-[state=active]:bg-white data-[state=active]:text-[#2D2A4A] data-[state=active]:shadow-sm font-medium"
                        >
                          Facebook
                        </TabsTrigger>
                        <TabsTrigger
                          value="twitter"
                          className="data-[state=active]:bg-white data-[state=active]:text-[#2D2A4A] data-[state=active]:shadow-sm font-medium"
                        >
                          Twitter
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <div>
                    <Label htmlFor="aspect-ratio" className="text-sm font-medium text-gray-700 mb-1 block">
                      Aspect Ratio
                    </Label>
                    <Select
                      value={aspectRatio}
                      onValueChange={(value) => setAspectRatio(value as AspectRatio)}
                      className="mt-1"
                    >
                      <SelectTrigger
                        id="aspect-ratio"
                        className="border-2 border-gray-300 bg-white focus:border-[#00B8A9] focus:ring-[#00B8A9]"
                      >
                        <SelectValue placeholder="Select aspect ratio" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableAspectRatios().map((ratio) => (
                          <SelectItem key={ratio.value} value={ratio.value}>
                            {ratio.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1">
                      {aspectRatio === "square" && "Perfect for Instagram feed and Facebook posts"}
                      {aspectRatio === "landscape" && "Ideal for Facebook and Twitter feeds"}
                      {aspectRatio === "portrait" && "Great for Instagram feed"}
                      {aspectRatio === "story" && "Optimized for Instagram and Facebook stories"}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md border-2 border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="animated-toggle" className="font-medium text-gray-700">
                          Animated Ad
                        </Label>
                        <p className="text-xs text-gray-500">Add animation effects</p>
                      </div>
                      <Switch
                        id="animated-toggle"
                        checked={isAnimated}
                        onCheckedChange={setIsAnimated}
                        className="data-[state=checked]:bg-[#2D2A4A]"
                      />
                    </div>

                    {isAnimated && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <Label htmlFor="animation-style" className="text-sm font-medium text-gray-700 mb-1 block">
                          Animation Style
                        </Label>
                        <Select
                          value={animation}
                          onValueChange={(value) => setAnimation(value as AnimationType)}
                          className="mt-1"
                        >
                          <SelectTrigger
                            id="animation-style"
                            className="border-2 border-gray-300 bg-white focus:border-[#00B8A9] focus:ring-[#00B8A9]"
                          >
                            <SelectValue placeholder="Select animation style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fade">Fade In</SelectItem>
                            <SelectItem value="zoom">Zoom In</SelectItem>
                            <SelectItem value="bounce">Bounce</SelectItem>
                            <SelectItem value="slide">Slide In</SelectItem>
                            <SelectItem value="glitter">Glitter</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between border-t pt-4">
              <div className="text-sm text-gray-500">
                {config.width} × {config.height} pixels
              </div>
              <Button
                onClick={handleDownload}
                className="bg-[#2D2A4A] hover:bg-[#3D3A5A] text-white font-medium px-6 py-2 shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Preview panel - Right side */}
        <div className="lg:col-span-7">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Ad Preview</CardTitle>
              <CardDescription>
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} •{" "}
                {aspectRatio.charAt(0).toUpperCase() + aspectRatio.slice(1)}
                {isAnimated && ` • ${animation.charAt(0).toUpperCase() + animation.slice(1)} Animation`}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <div
                className={`bg-white rounded-lg overflow-hidden ${getMaxPreviewHeight()} flex-grow flex items-center justify-center`}
              >
                <div
                  className={`relative ${getScaleFactor()}`}
                  style={{
                    width: aspectRatio === "story" ? "auto" : "100%",
                    maxWidth: "100%",
                  }}
                >
                  <div
                    ref={previewRef}
                    className="relative overflow-hidden"
                    style={{
                      width: "100%",
                      height: 0,
                      paddingBottom: `${(config.height / config.width) * 100}%`,
                      backgroundImage: getBackgroundImageUrl()
                        ? `url(${getBackgroundImageUrl()})`
                        : "linear-gradient(135deg, #2D2A4A 0%, #4A3F73 100%)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* Semi-transparent overlay to ensure text readability */}
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                    {/* WIN!! Text */}
                    <div className="absolute w-full text-center" style={{ top: config.winTextTop }}>
                      <h1
                        className={`text-white font-bold ${config.winTextSize} ${getAnimationClasses()}`}
                        style={{
                          textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                          animationDelay: "0.2s",
                          animationDuration: "1s",
                          animationFillMode: "both",
                        }}
                      >
                        WIN!!
                      </h1>
                    </div>

                    {/* Prize Name */}
                    <div className="absolute w-full text-center" style={{ top: config.prizeNameTop }}>
                      <h2
                        className={`text-white font-semibold ${config.prizeNameSize} ${getAnimationClasses()}`}
                        style={{
                          textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                          animationDelay: "0.5s",
                          animationDuration: "1s",
                          animationFillMode: "both",
                        }}
                      >
                        {prizeName}
                      </h2>
                    </div>

                    {/* Company Logo */}
                    <div className="absolute bottom-4 right-4 flex items-center">
                      <p className="text-white text-sm mr-2">{user?.company || "Your Company"}</p>
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        {user?.companyLogo ? (
                          <img
                            src={user.companyLogo || "/placeholder.svg"}
                            alt={user?.company || "Company logo"}
                            className="w-10 h-10 object-contain"
                          />
                        ) : (
                          <span className="text-[#2D2A4A] font-bold text-xl">{user?.company?.charAt(0) || "C"}</span>
                        )}
                      </div>
                    </div>

                    {/* Powered by Raffily */}
                    <div className="absolute bottom-2 left-2">
                      <p className="text-white text-xs opacity-70">Powered by Raffily</p>
                    </div>
                  </div>
                </div>
              </div>

              {isAnimated && (
                <div className="mt-4 p-2 bg-gray-100 rounded-md text-sm text-gray-600">
                  <p className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    Animation preview is playing above. The downloaded image will be static.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
