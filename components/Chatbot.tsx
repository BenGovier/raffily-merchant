"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send } from "lucide-react"

const API_KEY = "sk_XQT0EsTb8d9ccd835DgpSStW3mOwdh4aHFhS3BS6XhNDUrw0"
const BASE_URL = "https://app.dumplingai.com"
const AGENT_ID = "agent_123456" // Replace this with your actual agent ID

interface Message {
  role: "user" | "ai"
  content: string
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [threadId, setThreadId] = useState<string | null>(null)

  const sendMessage = async () => {
    if (!input.trim()) return

    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setInput("")

    try {
      const response = await fetch(`${BASE_URL}/api/v1/agents/generate-completion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: input }],
          agentId: AGENT_ID,
          parseJson: false,
          threadId: threadId,
        }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      setThreadId(data.threadId)
      setMessages([...newMessages, { role: "ai", content: data.text }])
    } catch (error) {
      console.error("Error:", error)
      setMessages([...newMessages, { role: "ai", content: "An error occurred while processing your request." }])
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button onClick={() => setIsOpen(true)} className="rounded-full w-12 h-12 bg-[#FF4D8D] hover:bg-[#FF6B9D]">
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div className="bg-[#FF4D8D] text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">Raffily AI Assistant</h3>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              &times;
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-2 rounded-lg ${
                    message.role === "user" ? "bg-[#FF4D8D] text-white" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                sendMessage()
              }}
              className="flex space-x-2"
            >
              <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button type="submit" size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
