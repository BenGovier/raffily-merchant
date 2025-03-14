"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronDown, ChevronUp, Download, MessageCircle } from "lucide-react"
import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"

// Country data for the interactive map
const countryData = [
  {
    code: "GB",
    name: "United Kingdom",
    rules:
      "Free-entry raffles must follow UK Gambling Commission guidelines. Terms & conditions must be clear and accessible. No purchase necessary option must be available.",
    flag: "🇬🇧",
  },
  {
    code: "US",
    name: "United States",
    rules:
      "Raffle laws vary by state. Raffily ensures state-by-state compliance. No payment required means no gambling laws are triggered. Void where prohibited.",
    flag: "🇺🇸",
  },
  {
    code: "EU",
    name: "European Union",
    rules:
      "EU-wide GDPR rules apply for data collection. Raffily handles data privacy compliance automatically. Free-entry contests are generally permitted across the EU.",
    flag: "🇪🇺",
  },
  {
    code: "AU",
    name: "Australia",
    rules:
      "Some states require permits for large-scale raffles. Free-entry contests usually face no restrictions. Raffily handles state-specific compliance.",
    flag: "🇦🇺",
  },
  {
    code: "CA",
    name: "Canada",
    rules:
      "Free-entry raffles are permitted. Skill-testing questions may be required for winners. Quebec has specific regulations that Raffily handles automatically.",
    flag: "🇨🇦",
  },
  {
    code: "JP",
    name: "Japan",
    rules:
      "Free-entry promotions are generally permitted. Raffily ensures compliance with local regulations and data protection laws.",
    flag: "🇯🇵",
  },
]

// FAQ data
const faqData = [
  {
    question: "Do I need a gambling license to run a raffle?",
    answer:
      "No! As long as there is a free-entry option, your raffle is not classified as gambling. Raffily ensures all raffles include this option by default, keeping you compliant with regulations worldwide.",
  },
  {
    question: "What if my business operates in multiple countries?",
    answer:
      "Raffily adapts automatically based on the location of your participants. Our platform detects user location and adjusts entry requirements, terms & conditions, and data handling to comply with local laws.",
  },
  {
    question: "How does Raffily handle data privacy laws (GDPR, CCPA, etc.)?",
    answer:
      "All customer data is encrypted, never sold, and stored according to legal best practices. Raffily is fully compliant with GDPR in Europe, CCPA in California, and other regional data protection regulations.",
  },
  {
    question: "Can I run a global raffle with different prizes for different regions?",
    answer:
      "Yes! Raffily allows you to customize prizes based on participant location. This is especially useful for businesses that need to offer region-specific rewards or have shipping limitations.",
  },
  {
    question: "What languages does Raffily support for global raffles?",
    answer:
      "Raffily supports multiple languages, allowing you to create raffles that automatically display in the participant's preferred language. This helps increase engagement across different regions.",
  },
]

export default function GlobalRafflesPage() {
  const [selectedCountry, setSelectedCountry] = useState(countryData[0])
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleDownloadGuide = () => {
    // Direct link to the PDF file in the public directory
    const guideUrl = "/downloads/raffily-compliance-guide.pdf"

    // Create an anchor element to trigger the download
    const link = document.createElement("a")
    link.href = guideUrl
    link.setAttribute("download", "raffily-compliance-guide.pdf")
    link.setAttribute("target", "_blank")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <MainNav />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center bg-[#0A1F44] overflow-hidden">
          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Run Raffles Anywhere in the World – Hassle-Free & Fully Compliant
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8">
                  Different countries, different rules—but we've got you covered. Raffily makes it easy to run legally
                  compliant, free-entry raffles across the UK, US, Europe, and beyond.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <a
                    href="#country-rules"
                    className="inline-flex items-center justify-center px-6 py-3 border border-white rounded-full text-base font-medium text-white bg-transparent hover:bg-white hover:text-[#0A1F44] transition-colors"
                  >
                    Check Raffle Rules in Your Country
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-full text-base font-medium text-white bg-[#00B8A9] hover:bg-[#00B8A9]/90 transition-colors"
                  >
                    Start a Global Raffle Today
                  </Link>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-[#00B8A9]" />
                      <span className="text-white text-sm">100% Free-Entry Compliance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-[#00B8A9]" />
                      <span className="text-white text-sm">GDPR & Data Protection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-[#00B8A9]" />
                      <span className="text-white text-sm">Country-Specific Legal Guidance</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative h-[400px] w-full"
                >
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/social%202%20%281%29-1JuczKsCZbf0AJ2OwWQ2IoX3GCTAaa.png"
                    alt="Interactive World Map"
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* How Free Raffles Work in Different Countries */}
        <section id="country-rules" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E0B36] mb-4">
                How Free Raffles Work in Different Countries
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Raffle regulations vary worldwide, but Raffily automatically adjusts to keep you compliant. Select a
                country to see its specific rules:
              </p>
            </div>

            {/* Country Selector */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="relative">
                <button
                  onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                  className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-white shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{selectedCountry.flag}</span>
                    <span className="font-medium">{selectedCountry.name}</span>
                  </div>
                  {isCountryDropdownOpen ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>

                {isCountryDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    {countryData.map((country) => (
                      <button
                        key={country.code}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 text-left"
                        onClick={() => {
                          setSelectedCountry(country)
                          setIsCountryDropdownOpen(false)
                        }}
                      >
                        <span className="text-2xl">{country.flag}</span>
                        <span>{country.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Selected Country Rules */}
              <motion.div
                key={selectedCountry.code}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{selectedCountry.flag}</span>
                  <h3 className="text-xl font-semibold">{selectedCountry.name} Raffle Rules</h3>
                </div>
                <p className="text-gray-700">{selectedCountry.rules}</p>
              </motion.div>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={handleDownloadGuide}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-full text-base font-medium text-white bg-[#00B8A9] hover:bg-[#00B8A9]/90 transition-colors gap-2"
              >
                <Download className="h-5 w-5" />
                Download our Raffle Compliance Guide
              </button>
            </div>
          </div>
        </section>

        {/* How Raffily Adapts to Global Raffle Rules */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E0B36] mb-4">
                How Raffily Adapts to Global Raffle Rules
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our platform automatically adjusts to different regulatory environments, so you can focus on engaging
                your audience without legal worries.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#00B8A9]/10 flex items-center justify-center">
                    <Check className="h-6 w-6 text-[#00B8A9]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1E0B36]">100% Free-Entry Compliance</h3>
                </div>
                <p className="text-gray-600">
                  No purchase required means no gambling laws are triggered. Raffily ensures all raffles include free
                  entry options by default, keeping you compliant with regulations worldwide.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#00B8A9]/10 flex items-center justify-center">
                    <Check className="h-6 w-6 text-[#00B8A9]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1E0B36]">Region-Specific Terms & Conditions</h3>
                </div>
                <p className="text-gray-600">
                  Pre-approved templates ensure legal protection in every jurisdiction. Raffily automatically generates
                  compliant terms based on participant location.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#00B8A9]/10 flex items-center justify-center">
                    <Check className="h-6 w-6 text-[#00B8A9]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1E0B36]">State & Country-Specific Rules</h3>
                </div>
                <p className="text-gray-600">
                  Raffily automatically adjusts based on location, handling variations in regulations between states,
                  provinces, and countries without any extra work from you.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#00B8A9]/10 flex items-center justify-center">
                    <Check className="h-6 w-6 text-[#00B8A9]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1E0B36]">Data Privacy & GDPR Protection</h3>
                </div>
                <p className="text-gray-600">
                  Customer data is securely handled per EU & US laws. Raffily ensures compliance with GDPR, CCPA, and
                  other regional data protection regulations.
                </p>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-12">
              <div className="bg-[#1E0B36] text-white p-4">
                <h3 className="text-xl font-semibold text-center">Raffily vs. Manual Raffle Compliance</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-gray-700">Feature</th>
                      <th className="px-6 py-3 text-center text-gray-700">Raffily</th>
                      <th className="px-6 py-3 text-center text-gray-700">Manual Raffles</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-6 py-4 text-gray-700">Legal Compliance Handling</td>
                      <td className="px-6 py-4 text-center">
                        <Check className="h-5 w-5 text-[#00B8A9] mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-red-500">✕</span>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-6 py-4 text-gray-700">Automated Terms & Conditions</td>
                      <td className="px-6 py-4 text-center">
                        <Check className="h-5 w-5 text-[#00B8A9] mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-red-500">✕</span>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-6 py-4 text-gray-700">Country-Specific Adjustments</td>
                      <td className="px-6 py-4 text-center">
                        <Check className="h-5 w-5 text-[#00B8A9] mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-red-500">✕</span>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-6 py-4 text-gray-700">GDPR & Data Privacy Protection</td>
                      <td className="px-6 py-4 text-center">
                        <Check className="h-5 w-5 text-[#00B8A9] mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-red-500">✕</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-[#00B8A9] rounded-full text-base font-medium text-[#0A1F44] bg-white hover:bg-gray-50 transition-colors gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Contact our legal support team
              </Link>
            </div>
          </div>
        </section>

        {/* Business Use Cases */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E0B36] mb-4">
                Business Use Cases: Running Raffles Across Borders
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                See how businesses like yours can successfully run global raffles using Raffily.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">🇬🇧 → 🇺🇸</div>
                  <h3 className="text-xl font-semibold text-[#1E0B36]">Expanding a UK Brand to the US</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-[#1E0B36]">Challenge:</p>
                    <p className="text-gray-600">
                      A UK-based retailer wants to attract US customers but is unsure about compliance.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-[#1E0B36]">Solution:</p>
                    <p className="text-gray-600">
                      Raffily adjusts the raffle structure to follow US sweepstakes rules, handling state-specific
                      requirements automatically.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-[#1E0B36]">Result:</p>
                    <p className="text-gray-600">
                      The brand legally grows its US email list & engagement, with 5,000+ new US-based subscribers in
                      the first month.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">🇪🇺</div>
                  <h3 className="text-xl font-semibold text-[#1E0B36]">
                    A European SaaS Company Running Multi-Country Raffles
                  </h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-[#1E0B36]">Challenge:</p>
                    <p className="text-gray-600">
                      They want to engage users in France, Germany, and Spain with different local regulations.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-[#1E0B36]">Solution:</p>
                    <p className="text-gray-600">
                      Raffily ensures GDPR compliance and localized entry requirements for each country.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-[#1E0B36]">Result:</p>
                    <p className="text-gray-600">
                      The SaaS company collects insights from thousands of users while following EU regulations,
                      increasing user engagement by 40%.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-full text-base font-medium text-white bg-[#00B8A9] hover:bg-[#00B8A9]/90 transition-colors"
              >
                Need to run a raffle across multiple countries? Raffily simplifies the process—Start Today!
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E0B36] mb-4">
                Common Questions About Running Global Raffles
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Get answers to frequently asked questions about running legally compliant raffles worldwide.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              {faqData.map((faq, index) => (
                <div key={index} className="mb-4">
                  <div className="bg-white rounded-lg shadow-sm">
                    <details className="group">
                      <summary
                        className="flex justify-between items-center cursor-pointer p-4"
                        onClick={(e) => {
                          e.preventDefault()
                          setActiveIndex(activeIndex === index ? null : index)
                        }}
                      >
                        <span className="font-semibold text-[#1E0B36]">{faq.question}</span>
                        {activeIndex === index ? (
                          <ChevronUp className="w-5 h-5 text-[#00B8A9]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[#00B8A9]" />
                        )}
                      </summary>
                      <AnimatePresence>
                        {activeIndex === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 border-t">
                              <p className="text-gray-600">{faq.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </details>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-[#00B8A9] rounded-full text-base font-medium text-[#0A1F44] bg-white hover:bg-gray-50 transition-colors"
              >
                Have more questions? Our global compliance team is here to help!
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-[#0A1F44]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Expand Your Brand with Global Raffles—Effortlessly
              </h2>
              <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8">
                Reach new audiences worldwide without worrying about complex regulations. Raffily handles the compliance
                so you can focus on growth.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-white text-sm">100% Free-Entry Compliance</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-white text-sm">GDPR & CCPA Secure</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-white text-sm">Country-Specific Adjustments</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl max-w-2xl mx-auto mb-12">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#00B8A9] fill-[#00B8A9]" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg text-gray-700 italic mb-4">
                  "Raffily made it incredibly simple to run a raffle across multiple countries without worrying about
                  regulations."
                </p>
                <p className="font-semibold text-[#1E0B36]">Marketing Director, Global E-commerce Brand</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#country-rules"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white rounded-full text-base font-medium text-white bg-transparent hover:bg-white hover:text-[#0A1F44] transition-colors"
                >
                  Check Raffle Laws in Your Country
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-full text-base font-medium text-white bg-[#00B8A9] hover:bg-[#00B8A9]/90 transition-colors"
                >
                  Start a Global Raffle Today
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

