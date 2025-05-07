"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Mic, Camera, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

// Simulated AI-powered search suggestions
const getSearchSuggestions = async (query: string) => {
  // In a real application, this would be an API call to an AI service
  await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate API delay
  return [
    `${query} in customer engagement`,
    `${query} strategies for 2025`,
    `How ${query} impacts marketing`,
    `${query} case studies`,
    `Future of ${query} in raffles`,
  ].filter((suggestion) => suggestion.toLowerCase() !== query.toLowerCase())
}

export default function BlogSearch() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isListening, setIsListening] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 2) {
        const newSuggestions = await getSearchSuggestions(searchQuery)
        setSuggestions(newSuggestions)
      } else {
        setSuggestions([])
      }
    }

    fetchSuggestions()
  }, [searchQuery])

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/blog?search=${encodeURIComponent(query)}`)
    }
  }

  const handleVoiceSearch = () => {
    setIsListening(true)
    // Simulated voice recognition
    setTimeout(() => {
      setSearchQuery("Voice search demo")
      setIsListening(false)
      handleSearch("Voice search demo")
    }, 2000)
  }

  const handleImageSearch = () => {
    setIsCameraActive(true)
    // Simulated image recognition
    setTimeout(() => {
      setSearchQuery("Image search demo")
      setIsCameraActive(false)
      handleSearch("Image search demo")
    }, 2000)
  }

  return (
    <div className="relative w-full md:w-96">
      <div className="relative">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white/10 backdrop-blur-md text-white placeholder:text-white/50 rounded-lg py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#00B8A9] transition-all duration-300"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
          <Button size="sm" variant="ghost" className="text-white/70 hover:text-white" onClick={handleVoiceSearch}>
            <Mic className={`h-4 w-4 ${isListening ? "text-[#00B8A9] animate-pulse" : ""}`} />
          </Button>
          <Button size="sm" variant="ghost" className="text-white/70 hover:text-white" onClick={handleImageSearch}>
            <Camera className={`h-4 w-4 ${isCameraActive ? "text-[#00B8A9] animate-pulse" : ""}`} />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 mt-2 w-full bg-white/10 backdrop-blur-md rounded-lg shadow-lg overflow-hidden"
          >
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-2 hover:bg-white/20 cursor-pointer flex items-center space-x-2"
                onClick={() => handleSearch(suggestion)}
              >
                <Sparkles className="h-4 w-4 text-[#00B8A9]" />
                <span className="text-white">{suggestion}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
