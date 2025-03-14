"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function EmailStrategies() {
  const [activeTab, setActiveTab] = useState("subject-lines")

  const strategies = [
    {
      id: "subject-lines",
      title: "Compelling Subject Lines",
      description:
        "Emails with prize-based subject lines see higher open rates. Create urgency and excitement to stand out in crowded inboxes.",
      tips: [
        "Include the prize value in the subject line",
        "Create urgency with time-limited language",
        "Keep it short and direct (40-50 characters)",
        "Use emojis strategically to catch attention",
      ],
      examples: [
        "Win a $500 Gift Card - 24 Hours Left!",
        "Your chance to win AirPods ends tonight",
        "Quick question = chance to win 🎁",
      ],
    },
    {
      id: "multi-email",
      title: "Multi-Email Campaigns",
      description:
        "Reminder emails increase raffle participation by 20-30%. Create a sequence that builds excitement and drives action.",
      tips: [
        "Send an announcement email introducing the raffle",
        "Follow up with a reminder 2-3 days before closing",
        'Send a final "last chance" email on closing day',
        "Vary your messaging across the sequence",
      ],
      examples: [
        "Email 1: Introducing our Summer Giveaway",
        "Email 2: 3 days left to enter our giveaway",
        "Email 3: Last chance - giveaway closes tonight!",
      ],
    },
    {
      id: "winner-announcements",
      title: "Winner Announcements",
      description:
        "Share results to build credibility & excitement for future raffles. These emails often have the highest open rates in the sequence.",
      tips: [
        "Announce winners within 48 hours of drawing",
        "Include photos of winners when possible",
        "Highlight the total number of participants",
        "Tease the next raffle opportunity",
      ],
      examples: [
        "Meet our lucky iPad winner!",
        "The results are in - see who won",
        "Congratulations to our 5 gift card winners",
      ],
    },
    {
      id: "segmentation",
      title: "Segmentation & Personalization",
      description:
        "Use raffle data to send targeted, high-converting emails. Personalized emails deliver 6x higher transaction rates.",
      tips: [
        "Segment based on previous raffle participation",
        "Personalize subject lines with first names",
        "Target inactive subscribers with higher-value prizes",
        "Use insights from raffle questions to customize offers",
      ],
      examples: [
        "Based on your interests: Win tickets to [event]",
        "James, we picked this prize just for you",
        "Special offer for our most loyal raffle participants",
      ],
    },
  ]

  return (
    <Tabs defaultValue="subject-lines" className="w-full max-w-4xl mx-auto" onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-2 md:grid-cols-4 bg-white/10 p-1 rounded-lg mb-8">
        {strategies.map((strategy) => (
          <TabsTrigger
            key={strategy.id}
            value={strategy.id}
            className={`data-[state=active]:bg-accent data-[state=active]:text-white text-white/70 py-2`}
          >
            {strategy.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {strategies.map((strategy) => (
        <TabsContent key={strategy.id} value={strategy.id} className="bg-white/10 rounded-xl p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">{strategy.title}</h3>
              <p className="text-white/80 mb-6">{strategy.description}</p>

              <h4 className="text-lg font-semibold text-white mb-3">Best Practices:</h4>
              <ul className="space-y-2 mb-6">
                {strategy.tips.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/80">{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Example Subject Lines:</h4>
              <div className="space-y-3 mb-6">
                {strategy.examples.map((example, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="bg-white/5 p-3 rounded-lg"
                  >
                    <p className="text-white font-medium">{example}</p>
                  </motion.div>
                ))}
              </div>

              <div className="bg-white/5 rounded-lg p-4 mt-6">
                <div className="relative h-40 w-full">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Email example screenshot"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-sm text-white/60 text-center mt-2">Example email template</p>
              </div>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

