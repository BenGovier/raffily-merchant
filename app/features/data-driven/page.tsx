"use client"

import { useState, useEffect } from "react"
import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"
import Image from "next/image"
import Link from "next/link"
import { Database, BarChart2, FileQuestion, ChevronDown, ChevronUp } from "lucide-react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"

export default function DataDrivenPage() {
  // State for the insights estimator
  const [raffleEntries, setRaffleEntries] = useState(5000)
  const [insightsEstimate, setInsightsEstimate] = useState(15000)
  const [selectedIndustry, setSelectedIndustry] = useState("retail")
  const [activeUseCase, setActiveUseCase] = useState("retail")
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null)

  // Calculate insights estimate when raffle entries change
  useEffect(() => {
    setInsightsEstimate(raffleEntries * 3)
  }, [raffleEntries])

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Sample questions by industry
  const industryQuestions = {
    finance: [
      "Have you reviewed your life insurance in the last year?",
      "Which financial goals are most important to you right now?",
      "What factors matter most when choosing a financial provider?",
      "How comfortable are you with digital banking services?",
    ],
    retail: [
      "Which product category are you most interested in?",
      "How often do you shop with us?",
      "What factors influence your purchase decisions the most?",
      "Which brands do you prefer for this product category?",
    ],
    hospitality: [
      "What's your preferred travel destination type?",
      "How often do you travel for leisure per year?",
      "What amenities do you value most when booking accommodation?",
      "How far in advance do you typically plan your trips?",
    ],
    ecommerce: [
      "How did you discover our online store?",
      "What would make your online shopping experience better?",
      "What delivery timeframe is acceptable to you?",
      "What payment methods do you prefer when shopping online?",
    ],
  }

  // Use cases by industry
  const useCases = {
    finance: {
      title: "Insurance Provider",
      challenge: "Identifying when customers' existing policies were due for renewal",
      solution: "Created a 'Protection Priority' raffle with questions about current coverage and renewal dates",
      results: [
        "Captured 2,500+ policy renewal dates",
        "Increased conversion rate by 35%",
        "Reduced customer acquisition costs by 28%",
      ],
      questions: ["When does your current insurance policy renew?", "Which coverage add-on most interests you?"],
    },
    retail: {
      title: "Fashion Retailer",
      challenge: "Understanding seasonal style preferences to optimize inventory",
      solution: "Ran a 'Style Season' raffle with custom questions about upcoming season preferences",
      results: [
        "Identified 3 trending styles to stock more of",
        "Reduced excess inventory by 25%",
        "Increased seasonal sales by 18%",
      ],
      questions: [
        "Which styles are you most excited about for the upcoming season?",
        "What colors do you plan to add to your wardrobe?",
      ],
    },
    hospitality: {
      title: "Boutique Hotel Chain",
      challenge: "Understanding guest preferences to personalize experiences",
      solution: "Launched a 'Dream Stay' raffle with questions about travel preferences and amenities",
      results: [
        "Identified top 5 most-valued amenities",
        "Increased booking conversion by 22%",
        "Boosted guest satisfaction scores by 15%",
      ],
      questions: [
        "What amenities matter most during your stay?",
        "How do you prefer to be contacted about special offers?",
      ],
    },
    ecommerce: {
      title: "Online Marketplace",
      challenge: "High cart abandonment rates and low repeat purchases",
      solution: "Implemented a 'Shopping Spree' raffle with questions about shopping habits and preferences",
      results: [
        "Reduced cart abandonment by 30%",
        "Increased average order value by 15%",
        "Boosted customer retention by 25%",
      ],
      questions: ["What causes you to abandon your shopping cart?", "How often do you shop online for these products?"],
    },
  }

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id)
  }

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#0A1F44] to-[#1E3A8A]">
      <MainNav />

      {/* Hero Section - Full width image with overlay */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%2844%29.jpg-Ij8cG0UhXmwt1lmqkUmL0oMCGg2Hxn.jpeg"
            alt="Data Driven Insights"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F44]/90 to-[#0A1F44]/70" />
        </div>
        <div className="container relative z-10 mx-auto px-4 pt-32 pb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Turn Customer Curiosity into Actionable Data with Raffily
              </h1>
              <p className="text-xl text-white/90 mb-8">
                How many insights are you missing out on? Use Raffily's bespoke questions to collect targeted customer
                data that fuels smarter marketing and product decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/request-demo"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-[#00B8A9] hover:bg-[#00B8A9]/90 transition-colors"
                >
                  Get a Free Consultation
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white bg-white rounded-lg text-base font-medium text-[#0A1F44] hover:bg-white/90 transition-colors"
                >
                  Start Free Trial
                </Link>
              </div>
            </motion.div>

            {/* Interactive Insights Estimator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Insights Estimator</h3>
              <p className="text-white/80 mb-6">
                See how many valuable customer insights you could collect with Raffily's bespoke questions.
              </p>

              <div className="mb-6">
                <label className="block text-white mb-2">Monthly Raffle Entries</label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[raffleEntries]}
                    onValueChange={(value) => setRaffleEntries(value[0])}
                    min={1000}
                    max={50000}
                    step={1000}
                    className="flex-grow"
                  />
                  <span className="text-white font-bold">{raffleEntries.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-white/20 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white">Potential Data Points</span>
                  <span className="text-[#00B8A9] font-bold text-xl">{insightsEstimate.toLocaleString()}+</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-[#00B8A9] h-2 rounded-full"
                    style={{ width: `${Math.min(insightsEstimate / 500, 100)}%` }}
                  ></div>
                </div>
              </div>

              <p className="text-white/80 text-sm mb-4">
                With {raffleEntries.toLocaleString()} raffle entries, you could collect{" "}
                {insightsEstimate.toLocaleString()}+ valuable customer insights to drive your business decisions.
              </p>

              <Link
                href="/request-demo"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-[#00B8A9] hover:bg-[#00B8A9]/90 transition-colors w-full"
              >
                Get a Free Consultation
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How Custom Questions Work */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1F44] mb-4">
              How Custom Questions Unlock Valuable Business Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform casual raffle entries into a goldmine of customer data that drives smarter business decisions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="grid gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-gray-50 p-6 rounded-xl shadow-md"
                >
                  <div className="flex items-start">
                    <FileQuestion className="w-12 h-12 text-[#00B8A9] mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-[#0A1F44] mb-2">Customizable Questions</h3>
                      <p className="text-gray-600">
                        Create tailored questions specific to your business needs. Choose from multiple formats
                        including multiple choice, rating scales, and open text responses.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-gray-50 p-6 rounded-xl shadow-md"
                >
                  <div className="flex items-start">
                    <Database className="w-12 h-12 text-[#00B8A9] mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-[#0A1F44] mb-2">Data Collection</h3>
                      <p className="text-gray-600">
                        Gather valuable customer insights as part of the raffle entry process. Each entry provides you
                        with actionable data points for business decisions.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-gray-50 p-6 rounded-xl shadow-md"
                >
                  <div className="flex items-start">
                    <BarChart2 className="w-12 h-12 text-[#00B8A9] mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-[#0A1F44] mb-2">Instant Analytics</h3>
                      <p className="text-gray-600">
                        Access real-time analytics dashboards showing response patterns and trends. Export data for
                        deeper analysis in your preferred tools.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="order-1 md:order-2 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative h-[500px] rounded-xl overflow-hidden shadow-xl"
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/data%20dashboard%20image%20-guPAJhqHK56FVrRK0TdDyrvGRZC6jI.png"
                  alt="Raffily Data Dashboard"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F44]/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-bold text-lg">Real-time data visualization</p>
                  <p className="text-white/80">See customer insights as they come in</p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-[#1E0B36] bg-white hover:bg-gray-100 transition-colors shadow-md"
            >
              See It in Action
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Use Case Generator */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1F44] mb-4">See How Your Industry Can Benefit</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select your industry to see a real-world example of how businesses like yours use Raffily's custom
              questions to drive growth.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-4 border-b">
                {Object.keys(useCases).map((industry) => (
                  <button
                    key={industry}
                    className={`py-4 px-2 text-center transition-colors ${
                      activeUseCase === industry
                        ? "bg-[#00B8A9] text-white font-bold"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setActiveUseCase(industry)}
                  >
                    {industry.charAt(0).toUpperCase() + industry.slice(1)}
                  </button>
                ))}
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#0A1F44] mb-4">
                  {useCases[activeUseCase as keyof typeof useCases].title}
                </h3>

                <div className="mb-6">
                  <h4 className="font-semibold text-[#0A1F44] mb-2">Challenge:</h4>
                  <p className="text-gray-600">{useCases[activeUseCase as keyof typeof useCases].challenge}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-[#0A1F44] mb-2">Solution:</h4>
                  <p className="text-gray-600">{useCases[activeUseCase as keyof typeof useCases].solution}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-[#0A1F44] mb-2">Sample Questions Used:</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {useCases[activeUseCase as keyof typeof useCases].questions.map((question, index) => (
                        <li key={index}>{question}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[#0A1F44] mb-2">Results:</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {useCases[activeUseCase as keyof typeof useCases].results.map((result, index) => (
                      <div key={index} className="bg-[#00B8A9]/10 p-4 rounded-lg text-center">
                        <p className="text-[#00B8A9] font-bold">{result}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link
                href="/request-demo"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-[#00B8A9] hover:bg-[#00B8A9]/90 transition-colors"
              >
                Get a Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Example Bespoke Questions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1F44] mb-4">
              Get Inspired: Sample Questions for Your Industry
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select your industry to see examples of effective questions that drive engagement and collect valuable
              insights.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="retail" className="w-full" onValueChange={setSelectedIndustry}>
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="finance">Financial Services</TabsTrigger>
                <TabsTrigger value="retail">Retail</TabsTrigger>
                <TabsTrigger value="hospitality">Hospitality</TabsTrigger>
                <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
              </TabsList>

              {Object.keys(industryQuestions).map((industry) => (
                <TabsContent key={industry} value={industry} className="mt-0">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-[#0A1F44] mb-4">
                      {industry.charAt(0).toUpperCase() + industry.slice(1)} Questions
                    </h3>

                    <div className="space-y-4">
                      {industryQuestions[industry as keyof typeof industryQuestions].map((question, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-3">
                              {index + 1}
                            </div>
                            <p className="text-gray-700 font-medium">{question}</p>
                          </div>

                          {/* Example UI for this question type */}
                          {index === 0 && (
                            <div className="mt-4 ml-11">
                              <div className="bg-white border border-gray-200 rounded-lg p-3">
                                {industry === "retail" && (
                                  <div className="space-y-2">
                                    <div className="flex items-center">
                                      <input type="radio" id="clothing" name="category" className="mr-2" />
                                      <label htmlFor="clothing" className="text-gray-700">
                                        Clothing & Accessories
                                      </label>
                                    </div>
                                    <div className="flex items-center">
                                      <input type="radio" id="electronics" name="category" className="mr-2" />
                                      <label htmlFor="electronics" className="text-gray-700">
                                        Electronics
                                      </label>
                                    </div>
                                    <div className="flex items-center">
                                      <input type="radio" id="home" name="category" className="mr-2" />
                                      <label htmlFor="home" className="text-gray-700">
                                        Home & Garden
                                      </label>
                                    </div>
                                  </div>
                                )}

                                {industry === "finance" && (
                                  <div className="space-y-2">
                                    <div className="flex items-center">
                                      <input type="radio" id="yes" name="insurance_review" className="mr-2" />
                                      <label htmlFor="yes" className="text-gray-700">
                                        Yes
                                      </label>
                                    </div>
                                    <div className="flex items-center">
                                      <input type="radio" id="no" name="insurance_review" className="mr-2" />
                                      <label htmlFor="no" className="text-gray-700">
                                        No
                                      </label>
                                    </div>
                                  </div>
                                )}

                                {industry === "hospitality" && (
                                  <div className="space-y-2">
                                    <div className="flex items-center">
                                      <input type="radio" id="beach" name="destination" className="mr-2" />
                                      <label htmlFor="beach" className="text-gray-700">
                                        Beach Resort
                                      </label>
                                    </div>
                                    <div className="flex items-center">
                                      <input type="radio" id="city" name="destination" className="mr-2" />
                                      <label htmlFor="city" className="text-gray-700">
                                        City Break
                                      </label>
                                    </div>
                                    <div className="flex items-center">
                                      <input type="radio" id="mountain" name="destination" className="mr-2" />
                                      <label htmlFor="mountain" className="text-gray-700">
                                        Mountain Retreat
                                      </label>
                                    </div>
                                  </div>
                                )}

                                {industry === "ecommerce" && (
                                  <div className="space-y-2">
                                    <div className="flex items-center">
                                      <input type="radio" id="search" name="discovery" className="mr-2" />
                                      <label htmlFor="search" className="text-gray-700">
                                        Search Engine
                                      </label>
                                    </div>
                                    <div className="flex items-center">
                                      <input type="radio" id="social" name="discovery" className="mr-2" />
                                      <label htmlFor="social" className="text-gray-700">
                                        Social Media
                                      </label>
                                    </div>
                                    <div className="flex items-center">
                                      <input type="radio" id="referral" name="discovery" className="mr-2" />
                                      <label htmlFor="referral" className="text-gray-700">
                                        Friend Referral
                                      </label>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <div className="text-center mt-8">
              <Link
                href="/request-demo"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-[#00B8A9] hover:bg-[#00B8A9]/90 transition-colors"
              >
                Get a Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1F44] mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about collecting valuable data with Raffily.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {[
                {
                  id: "faq1",
                  question: "How many custom questions can I ask per raffle?",
                  answer:
                    "You can ask up to 3 custom questions per raffle. Our research shows this is the optimal number to maximize completion rates while gathering valuable data.",
                },
                {
                  id: "faq2",
                  question: "What types of questions can I create?",
                  answer:
                    "Raffily supports multiple question formats including multiple choice, dropdown selections, rating scales, and short text responses. This flexibility allows you to gather exactly the type of data you need.",
                },
                {
                  id: "faq3",
                  question: "Is the data I collect GDPR compliant?",
                  answer:
                    "Yes, all data collection through Raffily is fully GDPR compliant. We provide transparent data collection notices and ensure proper consent mechanisms are in place for all participants.",
                },
                {
                  id: "faq4",
                  question: "Can I export the data for analysis in other tools?",
                  answer:
                    "Raffily allows you to export all collected data in CSV or Excel format, making it easy to analyze in your preferred business intelligence or analytics tools.",
                },
                {
                  id: "faq5",
                  question: "How do custom questions affect completion rates?",
                  answer:
                    "When implemented correctly, custom questions have minimal impact on completion rates. In fact, many users report that relevant, engaging questions actually increase participant engagement with their raffles.",
                },
              ].map((faq) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <button
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                    onClick={() => toggleAccordion(faq.id)}
                  >
                    <span className="font-semibold text-[#0A1F44]">{faq.question}</span>
                    {activeAccordion === faq.id ? (
                      <ChevronUp className="h-5 w-5 text-[#00B8A9]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#00B8A9]" />
                    )}
                  </button>

                  {activeAccordion === faq.id && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-[#0A1F44]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Turn Customer Data into Revenue-Driving Insights
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join the growing number of businesses using Raffily to collect valuable customer data and drive growth.
            </p>

            {/* Social Proof */}
            <div className="mb-10">
              <div className="flex justify-center mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-xl text-white italic mb-4">
                "Using Raffily's custom questions, we gained insights that increased our sales by 30%!"
              </p>
              <p className="text-white/70">- Marketing Director, Global Retail Brand</p>
            </div>

            {/* Trusted By Logos */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-10">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-white/10 h-12 w-32 rounded-md flex items-center justify-center">
                  <div className="text-white/70 text-xs">TRUSTED BRAND {i}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Link
                href="/request-demo"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-[#00B8A9] hover:bg-[#00B8A9]/90 transition-colors"
              >
                Get a Free Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
