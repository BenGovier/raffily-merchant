"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, X, MessageSquare, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm Raffily Assistant. How can I help you with your raffles today?",
    sender: "bot",
    timestamp: new Date(),
  },
]

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "I can help you set up a new raffle campaign.",
        "Would you like to see your recent raffle statistics?",
        "I can show you how to customize your raffle entry forms.",
        "Need help with winner selection? I can guide you through the process.",
        "Let me know if you need assistance with promoting your raffles on social media.",
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const botMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {isOpen && (
        <Card
          className={cn(
            "mb-2 w-80 sm:w-96 overflow-hidden transition-all duration-300 ease-in-out shadow-lg border border-gray-200",
            isMinimized ? "h-14" : "h-[450px]",
          )}
        >
          {/* Chat header */}
          <div className="bg-[#FF5C00] text-white p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageSquare size={20} />
              <h3 className="font-semibold">Raffily Assistant</h3>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-[#FF7D33]"
                onClick={toggleMinimize}
              >
                {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-[#FF7D33]"
                onClick={toggleChat}
              >
                <X size={16} />
              </Button>
            </div>
          </div>

          {/* Chat messages */}
          {!isMinimized && (
            <div className="flex flex-col h-[calc(100%-110px)] overflow-y-auto p-3 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "max-w-[80%] mb-3 p-3 rounded-lg",
                    message.sender === "user"
                      ? "bg-[#FF5C00] text-white self-end rounded-br-none"
                      : "bg-white border border-gray-200 self-start rounded-bl-none",
                  )}
                >
                  <p>{message.content}</p>
                  <p className={cn("text-xs mt-1", message.sender === "user" ? "text-white/70" : "text-gray-500")}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Chat input */}
          {!isMinimized && (
            <div className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon" className="bg-[#FF5C00] hover:bg-[#FF7D33] text-white">
                  <Send size={16} />
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Chat toggle button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="bg-[#FF5C00] hover:bg-[#FF7D33] text-white rounded-full h-14 w-14 shadow-lg"
        >
          <MessageSquare size={24} />
        </Button>
      )}
    </div>
  )
}

