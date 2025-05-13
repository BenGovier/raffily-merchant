"use client"

import { useState, useEffect } from "react"
import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"
import Image from "next/image"
import Link from "next/link"
import { TrendingUp, Clock, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EngagementBoostPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // State for Engagement Calculator
  const [emailOpenRate, setEmailOpenRate] = useState(20)
  const [socialReach, setSocialReach] = useState(5000)
  const [websiteVisits, setWebsiteVisits] = useState(10000)
  const [calculatedResults, setCalculatedResults] = useState({
    emailOpenRateIncrease: 0,
    socialReachIncrease: 0,
    websiteVisitsIncrease: 0,
    customerInteractions: 0,
  })

  // State for Use Case Generator
  const [industry, setIndustry] = useState("retail")
  const [goal, setGoal] = useState("traffic")
  const [generatedUseCase, setGeneratedUseCase] = useState<any>(null)

  // Calculate engagement metrics
  useEffect(() => {
    setCalculatedResults({
      emailOpenRateIncrease: emailOpenRate * 0.4, // 40% increase
      socialReachIncrease: socialReach * 0.75, // 75% increase
      websiteVisitsIncrease: websiteVisits * 0.3, // 30% increase
      customerInteractions: emailOpenRate * 0.4 * 0.2 + socialReach * 0.75 * 0.05 + websiteVisits * 0.3 * 0.02,
    })
  }, [emailOpenRate, socialReach, websiteVisits])

  // Generate use case based on industry and goal
  useEffect(() => {
    const useCases = {
      retail: {
        traffic: {
          title: "Fashion Retailer Boosts Store Traffic",
          description:
            "A fashion retailer ran a raffle for a $500 shopping spree, requiring in-store entry. They promoted it through email and social media.",
          results: [
            "45% increase in store visits",
            "2,500+ new email subscribers",
            "32% of participants made a purchase during their visit",
          ],
        },
        loyalty: {
          title: "Boutique Increases Customer Retention",
          description:
            "A boutique created a loyalty raffle where customers earned entries for every purchase. The prize was exclusive early access to new collections.",
          results: [
            "60% increase in repeat purchases",
            "Average order value increased by 28%",
            "Customer retention improved by 35%",
          ],
        },
        app: {
          title: "Retail Chain Drives App Downloads",
          description:
            "A retail chain offered raffle entries for app downloads and in-app purchases. The prize was a year of free products.",
          results: ["10,000+ new app downloads", "App engagement increased by 75%", "In-app purchases grew by 40%"],
        },
      },
      finance: {
        traffic: {
          title: "Bank Increases Branch Visits",
          description:
            "A regional bank ran a raffle for a $1,000 cash prize, with entries available at local branches. They promoted it through email and direct mail.",
          results: [
            "38% increase in branch visits",
            "1,800+ financial consultations booked",
            "42% of visitors opened new accounts",
          ],
        },
        loyalty: {
          title: "Credit Union Boosts Member Engagement",
          description:
            "A credit union created a raffle for members who used their mobile banking app. The prize was a luxury vacation package.",
          results: [
            "65% increase in mobile app usage",
            "Digital transaction volume grew by 45%",
            "Member satisfaction scores improved by 28%",
          ],
        },
        app: {
          title: "Financial Services Firm Drives App Adoption",
          description:
            "A financial services firm offered raffle entries for app downloads and completing financial health checks. The prize was investment credits.",
          results: [
            "15,000+ new app downloads",
            "8,500+ completed financial health checks",
            "Investment portfolio growth of 22% among participants",
          ],
        },
      },
      hospitality: {
        traffic: {
          title: "Restaurant Chain Increases Reservations",
          description:
            "A restaurant chain ran a raffle for a year of free dining, with entries available through their reservation system. They promoted it through email and social media.",
          results: [
            "52% increase in online reservations",
            "3,200+ new loyalty program members",
            "Average party size increased by 15%",
          ],
        },
        loyalty: {
          title: "Hotel Boosts Guest Retention",
          description:
            "A hotel created a loyalty raffle where guests earned entries for each stay. The prize was a luxury weekend package.",
          results: [
            "45% increase in repeat bookings",
            "Average stay duration increased by 20%",
            "Guest satisfaction scores improved by 32%",
          ],
        },
        app: {
          title: "Travel Company Drives App Downloads",
          description:
            "A travel company offered raffle entries for app downloads and bookings. The prize was a dream vacation package.",
          results: [
            "20,000+ new app downloads",
            "App bookings increased by 85%",
            "User-generated content grew by 120%",
          ],
        },
      },
    }

    setGeneratedUseCase(useCases[industry][goal])
  }, [industry, goal])

  // Live counter animation
  const [counter, setCounter] = useState({
    businesses: 1000,
    raffles: 5000,
    engagement: 40,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => ({
        businesses: prev.businesses + Math.floor(Math.random() * 3),
        raffles: prev.raffles + Math.floor(Math.random() * 10),
        engagement: 40 + Math.floor(Math.random() * 5),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <MainNav />

      {/* Hero Section with Calculator */}
      <section className="relative min-h-[80vh] flex items-center pt-20">
        <div className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%2847%29.jpg-YVJLa2IaYn0rsi0x1ITQha3ovtoLDv.jpeg"
            alt="Customer Engagement"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F44]/90 to-[#0A1F44]/70" />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Boost Customer Engagement with Raffily</h1>
              <p className="text-xl text-white/90 mb-4">
                Want to grab attention with minimal friction? Raffily helps you elevate customer engagement—no complex
                integrations required.
              </p>
              <p className="text-lg text-white/80 mb-8">
                <strong>Curious about how much Raffily can increase your engagement?</strong> Try our free Engagement
                Impact Calculator below!
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Button asChild className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white">
                  <Link href="/auth/register">Start Free Trial</Link>
                </Button>
                <Button
                  variant="outline"
                  className="bg-white text-[#0A1F44] border-white hover:bg-white/90 hover:text-[#0A1F44]"
                  onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Try the Engagement Calculator
                </Button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              id="calculator"
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Engagement Impact Calculator</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-white mb-2">Current Email Open Rate (%)</label>
                  <Slider
                    value={[emailOpenRate]}
                    onValueChange={(value) => setEmailOpenRate(value[0])}
                    min={5}
                    max={50}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-white/80 text-sm">
                    <span>5%</span>
                    <span>{emailOpenRate}%</span>
                    <span>50%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-white mb-2">Monthly Social Media Reach</label>
                  <Slider
                    value={[socialReach]}
                    onValueChange={(value) => setSocialReach(value[0])}
                    min={1000}
                    max={100000}
                    step={1000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-white/80 text-sm">
                    <span>1,000</span>
                    <span>{socialReach.toLocaleString()}</span>
                    <span>100,000</span>
                  </div>
                </div>

                <div>
                  <label className="block text-white mb-2">Monthly Website Visits</label>
                  <Slider
                    value={[websiteVisits]}
                    onValueChange={(value) => setWebsiteVisits(value[0])}
                    min={1000}
                    max={500000}
                    step={1000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-white/80 text-sm">
                    <span>1,000</span>
                    <span>{websiteVisits.toLocaleString()}</span>
                    <span>500,000</span>
                  </div>
                </div>

                <div className="bg-white/20 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-3">Your Potential Results with Raffily</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/80 text-sm">Email Open Rate Increase</p>
                      <p className="text-2xl font-bold text-[#00B8A9]">
                        +{calculatedResults.emailOpenRateIncrease.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-white/80 text-sm">Social Reach Growth</p>
                      <p className="text-2xl font-bold text-[#00B8A9]">
                        +{calculatedResults.socialReachIncrease.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/80 text-sm">Website Traffic Boost</p>
                      <p className="text-2xl font-bold text-[#00B8A9]">
                        +{calculatedResults.websiteVisitsIncrease.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/80 text-sm">New Customer Interactions</p>
                      <p className="text-2xl font-bold text-[#00B8A9]">
                        {Math.round(calculatedResults.customerInteractions).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Raffles Drive Higher Engagement - More Visual Impact */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-[#0A1F44] mb-12">
            See How Raffles Supercharge Customer Engagement
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gray-50 p-8 rounded-xl shadow-md mb-8">
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-10 h-10 text-[#00B8A9] mr-4" />
                  <h3 className="text-2xl font-bold text-[#0A1F44]">Higher Participation Rates</h3>
                </div>
                <div className="flex items-end gap-4">
                  <div className="text-5xl font-bold text-[#00B8A9]">3x</div>
                  <p className="text-gray-600">more sign-ups when using a raffle incentive</p>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl shadow-md mb-8">
                <div className="flex items-center mb-4">
                  <Clock className="w-10 h-10 text-[#00B8A9] mr-4" />
                  <h3 className="text-2xl font-bold text-[#0A1F44]">Increased Interaction Time</h3>
                </div>
                <div className="flex items-end gap-4">
                  <div className="text-5xl font-bold text-[#00B8A9]">42%</div>
                  <p className="text-gray-600">longer engagement with brands running raffles</p>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <Share2 className="w-10 h-10 text-[#00B8A9] mr-4" />
                  <h3 className="text-2xl font-bold text-[#0A1F44]">Broader Audience Reach</h3>
                </div>
                <div className="flex items-end gap-4">
                  <div className="text-5xl font-bold text-[#00B8A9]">4x</div>
                  <p className="text-gray-600">more shares than standard promotions</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0A1F44] p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-6">Live Raffily Stats</h3>

              <div className="space-y-8">
                <div>
                  <p className="text-white/80 mb-2">Businesses Using Raffily</p>
                  <div className="flex items-end gap-2">
                    <div className="text-5xl font-bold text-[#00B8A9]">{counter.businesses.toLocaleString()}+</div>
                    <div className="text-white/60 text-sm pb-2">and growing</div>
                  </div>
                </div>

                <div>
                  <p className="text-white/80 mb-2">Active Raffles Running</p>
                  <div className="flex items-end gap-2">
                    <div className="text-5xl font-bold text-[#00B8A9]">{counter.raffles.toLocaleString()}+</div>
                    <div className="text-white/60 text-sm pb-2">right now</div>
                  </div>
                </div>

                <div>
                  <p className="text-white/80 mb-2">Average Engagement Increase</p>
                  <div className="flex items-end gap-2">
                    <div className="text-5xl font-bold text-[#00B8A9]">+{counter.engagement}%</div>
                    <div className="text-white/60 text-sm pb-2">across all channels</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Use Case Generator */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0A1F44] mb-6">
            Interactive Use Case Generator
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            See how a raffle could work for your specific business needs. Select your industry and goal to generate a
            tailored use case.
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-[#0A1F44] font-medium mb-2">Select Your Industry</label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail & E-commerce</SelectItem>
                      <SelectItem value="finance">Financial Services</SelectItem>
                      <SelectItem value="hospitality">Hospitality & Travel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-[#0A1F44] font-medium mb-2">What's Your Goal?</label>
                  <Select value={goal} onValueChange={setGoal}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="traffic">Increase Website/Store Traffic</SelectItem>
                      <SelectItem value="loyalty">Boost Customer Loyalty</SelectItem>
                      <SelectItem value="app">Drive App Downloads</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {generatedUseCase && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-50 p-6 rounded-lg"
                >
                  <h3 className="text-2xl font-bold text-[#0A1F44] mb-4">{generatedUseCase.title}</h3>
                  <p className="text-gray-600 mb-6">{generatedUseCase.description}</p>

                  <h4 className="font-bold text-[#0A1F44] mb-2">Results:</h4>
                  <ul className="space-y-2 mb-6">
                    {generatedUseCase.results.map((result, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-2 mt-0.5">
                          ✓
                        </div>
                        <span className="text-gray-600">{result}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white">
                    <Link href="/auth/register">Start Your First Raffle Today</Link>
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How Raffily Boosts Engagement - More Actionable */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0A1F44] mb-6">
            How to Launch a High-Engagement Raffle in 3 Easy Steps
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Creating and launching your first raffle is simple with Raffily's intuitive platform.
          </p>

          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="goal" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="goal">1. Choose Your Goal</TabsTrigger>
                <TabsTrigger value="customize">2. Customize Your Raffle</TabsTrigger>
                <TabsTrigger value="launch">3. Launch & Track</TabsTrigger>
              </TabsList>

              <TabsContent value="goal" className="bg-white rounded-xl shadow-lg p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-[#0A1F44] mb-4">Choose Your Goal 🎯</h3>
                    <p className="text-gray-600 mb-6">
                      Start by selecting what you want to achieve with your raffle campaign:
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-3 mt-0.5">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#0A1F44] mb-1">Lead Generation</h4>
                          <p className="text-gray-600">Collect new customer information and grow your database</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-3 mt-0.5">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#0A1F44] mb-1">Email Growth</h4>
                          <p className="text-gray-600">Expand your email list with engaged subscribers</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-3 mt-0.5">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#0A1F44] mb-1">Social Engagement</h4>
                          <p className="text-gray-600">Boost your social media presence and following</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="relative h-[300px] rounded-xl overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20-%202025-03-10T135850.330-m7BIUuYnpjJFOJuW2EcfGYmJ6NDxnw.png"
                      alt="Goal Selection"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="customize" className="bg-white rounded-xl shadow-lg p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative h-[300px] rounded-xl overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20-%202025-03-10T135758.997-UMa6aM5uWOuQfsOuE2tA0bDAkF1eLW.png"
                      alt="Raffle Customization"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#0A1F44] mb-4">Customize Your Raffle ✏️</h3>
                    <p className="text-gray-600 mb-6">Make your raffle unique and aligned with your brand:</p>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-3 mt-0.5">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#0A1F44] mb-1">Upload Branding</h4>
                          <p className="text-gray-600">Add your logo, colors, and brand elements</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-3 mt-0.5">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#0A1F44] mb-1">Choose a Prize</h4>
                          <p className="text-gray-600">Select an appealing prize that resonates with your audience</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-3 mt-0.5">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#0A1F44] mb-1">Add Custom Questions</h4>
                          <p className="text-gray-600">Gather valuable insights with tailored entry questions</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="launch" className="bg-white rounded-xl shadow-lg p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-[#0A1F44] mb-4">Launch & Track Performance 📈</h3>
                    <p className="text-gray-600 mb-6">Go live with your raffle and monitor results in real-time:</p>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-3 mt-0.5">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#0A1F44] mb-1">Publish Your Raffle</h4>
                          <p className="text-gray-600">Launch your raffle with a single click</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-3 mt-0.5">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#0A1F44] mb-1">Monitor Performance</h4>
                          <p className="text-gray-600">Track entries, engagement, and data collection in real-time</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-3 mt-0.5">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#0A1F44] mb-1">Optimize Future Campaigns</h4>
                          <p className="text-gray-600">Use insights to improve your next raffle's performance</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="relative h-[300px] rounded-xl overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20-%202025-03-10T135916.925-AeLHfWUkwDLzCobRwEhmijRP9kGz6R.png"
                      alt="Analytics Dashboard"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 text-center">
              <Button asChild className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white">
                <Link href="/auth/register">Try Raffily's Instant Raffle Creator</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA with Trust & Urgency */}
      <section className="py-20 bg-[#0A1F44]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Join 1,000+ Businesses Driving More Engagement with Raffily
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto">
            Don't miss out on the engagement boost your business needs. Start your free trial today and see the results
            for yourself.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button
              className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white text-lg px-8 py-6"
              onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
            >
              Try the Engagement Calculator
            </Button>
            <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white text-lg px-8 py-6" asChild>
              <Link href="/auth/register">Start Your Free Trial</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
