"use client"

import { useState } from "react"
import Image from "next/image"
import PageLayout from "@/components/PageLayout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Repeat, TrendingUp, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function CustomerRetentionPage() {
  const [industry, setIndustry] = useState("saas")
  const [churnRate, setChurnRate] = useState(5)
  const [customerValue, setCustomerValue] = useState(500)
  const [activeTab, setActiveTab] = useState("goal")

  // Calculate potential savings
  const annualLoss = (churnRate / 100) * customerValue * 12 * 100 // Assuming 100 customers
  const potentialSavings = annualLoss * 0.5 // Assuming 50% reduction in churn

  const industryStrategies = {
    saas: {
      title: "SaaS Retention Strategy",
      description:
        "Reward users who stay on an annual plan with exclusive raffle entries for premium features or account upgrades.",
      impact: "Typical Impact: 40% reduction in annual plan cancellations",
    },
    retail: {
      title: "Retail Retention Strategy",
      description:
        "Create a loyalty raffle where customers earn entries based on purchase frequency, with higher-value prizes for long-term customers.",
      impact: "Typical Impact: 35% increase in repeat purchase rate",
    },
    finance: {
      title: "Financial Services Retention Strategy",
      description:
        "Offer special raffles to customers who maintain minimum balances or keep accounts active for milestone periods (1yr, 3yr, 5yr).",
      impact: "Typical Impact: 28% reduction in account closures",
    },
    hospitality: {
      title: "Hospitality Retention Strategy",
      description:
        "Create seasonal raffles that reward repeat visits and incentivize booking directly rather than through third-party platforms.",
      impact: "Typical Impact: 45% increase in direct bookings from existing customers",
    },
  }

  return (
    <PageLayout>
      {/* Hero Section with Retention Calculator */}
      <section className="bg-gradient-to-r from-teal-50 to-blue-50 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Boost Customer Retention & Reduce Churn with Engaging Raffles
              </h1>
              <p className="text-lg mb-8 text-gray-700">
                Struggling to keep customers engaged? See how incentivized raffles help businesses increase retention by
                50% and reduce churn effortlessly.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#00B8A9] hover:bg-[#00a599] text-white rounded-full px-8 py-6 text-lg" asChild>
                  <Link href="/contact">Fix Your Retention Now</Link>
                </Button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Retention Value Calculator</h3>
              <p className="text-gray-600 mb-6">
                See how much revenue you could recover by reducing customer churn with Raffily.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Customer Churn Rate (%)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={churnRate}
                    onChange={(e) => setChurnRate(Number.parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>1%</span>
                    <span className="font-medium">{churnRate}%</span>
                    <span>20%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Average Customer Lifetime Value (£)
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    step="100"
                    value={customerValue}
                    onChange={(e) => setCustomerValue(Number.parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>£100</span>
                    <span className="font-medium">£{customerValue}</span>
                    <span>£2,000</span>
                  </div>
                </div>

                <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                  <p className="text-gray-700 mb-2">With your current churn rate, you're losing approximately:</p>
                  <p className="text-3xl font-bold text-red-600 mb-2">£{annualLoss.toLocaleString()}</p>
                  <p className="text-gray-700 mb-4">in potential revenue per year (based on 100 customers)</p>

                  <div className="bg-white p-3 rounded-lg border border-green-200">
                    <p className="text-gray-700">By running retention raffles with Raffily, you could recover up to:</p>
                    <p className="text-3xl font-bold text-green-600">£{potentialSavings.toLocaleString()}</p>
                    <p className="text-gray-600 text-sm">Based on average 50% churn reduction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Retention Raffles Work Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Why Incentivized Raffles Keep Customers Coming Back
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-[#00B8A9] p-3 rounded-full text-white">
                    <Repeat size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Incentivize Renewals</h3>
                    <p className="text-gray-700">
                      Customers who enter raffles are <span className="font-bold">2x more likely to renew</span> their
                      subscription or service.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#00B8A9] p-3 rounded-full text-white">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Reward Loyalty</h3>
                    <p className="text-gray-700">
                      Exclusive raffles encourage repeat purchases & referrals, creating a{" "}
                      <span className="font-bold">virtuous cycle of engagement</span>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#00B8A9] p-3 rounded-full text-white">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Increase Engagement</h3>
                    <p className="text-gray-700">
                      Brands using retention raffles see a{" "}
                      <span className="font-bold">30% longer customer lifecycle</span> and higher lifetime value.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Raffily Retention Impact</h3>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Businesses using Raffily:</span>
                  <span className="text-2xl font-bold text-[#00B8A9]">1,000+</span>
                </div>

                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div className="bg-[#00B8A9] h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Average churn reduction:</span>
                  <span className="text-2xl font-bold text-[#00B8A9]">50%</span>
                </div>

                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div className="bg-[#00B8A9] h-2 rounded-full" style={{ width: "50%" }}></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Customer lifetime increase:</span>
                  <span className="text-2xl font-bold text-[#00B8A9]">30%</span>
                </div>

                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div className="bg-[#00B8A9] h-2 rounded-full" style={{ width: "30%" }}></div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-700 text-center">Active retention raffles right now:</p>
                  <p className="text-3xl font-bold text-center text-[#00B8A9]">247</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Use Case Selector */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900">
            Find Your Perfect Retention Strategy
          </h2>
          <p className="text-lg text-center mb-12 text-gray-700 max-w-3xl mx-auto">
            Select your industry to see a tailored retention strategy using Raffily's raffle platform.
          </p>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button
                variant={industry === "saas" ? "default" : "outline"}
                className={industry === "saas" ? "bg-[#00B8A9] hover:bg-[#00a599]" : "hover:bg-gray-100"}
                onClick={() => setIndustry("saas")}
              >
                SaaS & Subscription
              </Button>
              <Button
                variant={industry === "retail" ? "default" : "outline"}
                className={industry === "retail" ? "bg-[#00B8A9] hover:bg-[#00a599]" : "hover:bg-gray-100"}
                onClick={() => setIndustry("retail")}
              >
                Retail & E-commerce
              </Button>
              <Button
                variant={industry === "finance" ? "default" : "outline"}
                className={industry === "finance" ? "bg-[#00B8A9] hover:bg-[#00a599]" : "hover:bg-gray-100"}
                onClick={() => setIndustry("finance")}
              >
                Financial Services
              </Button>
              <Button
                variant={industry === "hospitality" ? "default" : "outline"}
                className={industry === "hospitality" ? "bg-[#00B8A9] hover:bg-[#00a599]" : "hover:bg-gray-100"}
                onClick={() => setIndustry("hospitality")}
              >
                Hospitality & Travel
              </Button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{industryStrategies[industry].title}</h3>
              <p className="text-gray-700 mb-6">{industryStrategies[industry].description}</p>

              <div className="bg-teal-50 p-4 rounded-lg mb-6">
                <p className="font-medium text-gray-800">{industryStrategies[industry].impact}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#00B8A9] hover:bg-[#00a599] text-white rounded-full" asChild>
                  <Link href="/contact">Start Your First Retention Raffle</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Raffily Boosts Retention */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900">
            How to Launch a Retention-Boosting Raffle in 3 Simple Steps
          </h2>
          <p className="text-lg text-center mb-12 text-gray-700 max-w-3xl mx-auto">
            Follow these steps to create your first retention raffle and start reducing churn immediately.
          </p>

          <Tabs defaultValue="goal" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 max-w-2xl mx-auto mb-8">
              <TabsTrigger value="goal" className="text-base py-3">
                1. Choose Your Goal
              </TabsTrigger>
              <TabsTrigger value="create" className="text-base py-3">
                2. Create Campaign
              </TabsTrigger>
              <TabsTrigger value="launch" className="text-base py-3">
                3. Launch & Track
              </TabsTrigger>
            </TabsList>

            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <TabsContent value="goal" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Choose Your Retention Goal 🎯</h3>
                    <p className="text-gray-700 mb-6">
                      Start by selecting what you want to achieve with your retention raffle:
                    </p>

                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#00B8A9] mt-1 flex-shrink-0" size={20} />
                        <div>
                          <span className="font-medium text-gray-900">Lower churn rate</span>
                          <p className="text-gray-600">
                            Ideal for subscription businesses looking to reduce cancellations
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#00B8A9] mt-1 flex-shrink-0" size={20} />
                        <div>
                          <span className="font-medium text-gray-900">Encourage loyalty</span>
                          <p className="text-gray-600">
                            Perfect for retail businesses wanting to increase repeat purchases
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#00B8A9] mt-1 flex-shrink-0" size={20} />
                        <div>
                          <span className="font-medium text-gray-900">Reward referrals</span>
                          <p className="text-gray-600">
                            Great for growing your customer base through existing customers
                          </p>
                        </div>
                      </li>
                    </ul>

                    <Button
                      className="mt-8 bg-[#00B8A9] hover:bg-[#00a599] text-white"
                      onClick={() => setActiveTab("create")}
                    >
                      Next: Create Your Campaign <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </div>

                  <div className="rounded-lg overflow-hidden shadow-md">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20-%202025-03-10T135850.330-m7BIUuYnpjJFOJuW2EcfGYmJ6NDxnw.png"
                      alt="Choose your retention goal"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="create" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Create a Raffle Campaign ✏️</h3>
                    <p className="text-gray-700 mb-6">Design your retention raffle with these key elements:</p>

                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#00B8A9] mt-1 flex-shrink-0" size={20} />
                        <div>
                          <span className="font-medium text-gray-900">Select prizes that resonate</span>
                          <p className="text-gray-600">
                            Choose prizes that align with your customers' interests and your brand
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#00B8A9] mt-1 flex-shrink-0" size={20} />
                        <div>
                          <span className="font-medium text-gray-900">Customize branding</span>
                          <p className="text-gray-600">
                            Ensure your raffle reflects your brand identity for a cohesive experience
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#00B8A9] mt-1 flex-shrink-0" size={20} />
                        <div>
                          <span className="font-medium text-gray-900">Target the right customers</span>
                          <p className="text-gray-600">
                            Focus on at-risk customers or those approaching renewal decisions
                          </p>
                        </div>
                      </li>
                    </ul>

                    <Button
                      className="mt-8 bg-[#00B8A9] hover:bg-[#00a599] text-white"
                      onClick={() => setActiveTab("launch")}
                    >
                      Next: Launch & Track <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </div>

                  <div className="rounded-lg overflow-hidden shadow-md">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20-%202025-03-10T135758.997-UMa6aM5uWOuQfsOuE2tA0bDAkF1eLW.png"
                      alt="Create your raffle campaign"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="launch" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Launch & Track Results 📊</h3>
                    <p className="text-gray-700 mb-6">
                      Monitor your raffle's performance and measure its impact on retention:
                    </p>

                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#00B8A9] mt-1 flex-shrink-0" size={20} />
                        <div>
                          <span className="font-medium text-gray-900">Real-time analytics</span>
                          <p className="text-gray-600">Track participation rates, entries, and engagement metrics</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#00B8A9] mt-1 flex-shrink-0" size={20} />
                        <div>
                          <span className="font-medium text-gray-900">Retention impact</span>
                          <p className="text-gray-600">Measure changes in churn rate and customer lifetime value</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="text-[#00B8A9] mt-1 flex-shrink-0" size={20} />
                        <div>
                          <span className="font-medium text-gray-900">Optimize future campaigns</span>
                          <p className="text-gray-600">Use insights to refine your retention strategy over time</p>
                        </div>
                      </li>
                    </ul>

                    <Button className="mt-8 bg-[#00B8A9] hover:bg-[#00a599] text-white" asChild>
                      <Link href="/contact">Get Demo</Link>
                    </Button>
                  </div>

                  <div className="rounded-lg overflow-hidden shadow-md">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20-%202025-03-10T135916.925-AeLHfWUkwDLzCobRwEhmijRP9kGz6R.png"
                      alt="Launch and track your raffle results"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-teal-50 to-blue-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Join 1,000+ Businesses Keeping More Customers with Raffily
          </h2>

          <div className="bg-white p-6 rounded-xl shadow-md inline-block mb-8">
            <div className="flex items-center">
              <div className="flex text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="ml-3 font-medium text-gray-800">
                "Raffily helped us slash churn by 30% in just two months!"
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-[#00B8A9] hover:bg-[#00a599] text-white rounded-full px-8 py-6 text-lg" asChild>
              <Link href="/contact">Get a Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

