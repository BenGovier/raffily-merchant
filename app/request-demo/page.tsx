import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Check, ArrowRight, Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import PageLayout from "@/components/PageLayout"

export const metadata: Metadata = {
  title: "Request a Demo | Raffily",
  description:
    "Schedule a personalized demo to see how Raffily can help your business grow with powerful raffle campaigns.",
}

export default function RequestDemoPage() {
  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(to bottom, #0A2540, #153658)" }}>
      <PageLayout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white">Request a Demo</h1>
            <p className="text-lg font-light text-white/90 mt-4 max-w-2xl mx-auto">
              See how Raffily can transform your marketing strategy with powerful raffle campaigns
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Demo Information */}
            <div className="space-y-10">
              <div className="relative">
                {/* Dashboard image with shadow and rounded corners */}
                <div className="rounded-lg overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20shot%20dashboard-anrXEvg0RLkdTBaFvmjkIhzjSKx7ET.png"
                    alt="Raffily Dashboard Preview"
                    width={800}
                    height={450}
                    className="w-full h-auto"
                    priority
                  />
                </div>

                {/* Call-out bubble - improved positioning and readability */}
                <div className="absolute -top-10 right-0 bg-[#00C2A8] text-white px-5 py-3 rounded-lg shadow-lg z-10 max-w-[250px]">
                  <p className="font-bold text-center">Explore Powerful Dashboard Analytics!</p>
                  {/* Arrow pointing to dashboard */}
                  <div className="absolute w-5 h-5 bg-[#00C2A8] transform rotate-45 left-1/2 -ml-2.5 bottom-[-10px]"></div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white">What you'll discover in your demo:</h3>
                <ul className="space-y-5">
                  <li className="flex items-start leading-relaxed">
                    <Check className="mr-3 h-6 w-6 text-[#00C2A8] flex-shrink-0 mt-0.5" />
                    <span className="text-white text-lg">
                      Complete <strong>platform walkthrough</strong> tailored to your business
                    </span>
                  </li>
                  <li className="flex items-start leading-relaxed">
                    <Check className="mr-3 h-6 w-6 text-[#00C2A8] flex-shrink-0 mt-0.5" />
                    <span className="text-white text-lg">
                      How to create and launch your first <strong>raffle campaign</strong>
                    </span>
                  </li>
                  <li className="flex items-start leading-relaxed">
                    <Check className="mr-3 h-6 w-6 text-[#00C2A8] flex-shrink-0 mt-0.5" />
                    <span className="text-white text-lg">
                      <strong>Analytics and reporting</strong> capabilities
                    </span>
                  </li>
                  <li className="flex items-start leading-relaxed">
                    <Check className="mr-3 h-6 w-6 text-[#00C2A8] flex-shrink-0 mt-0.5" />
                    <span className="text-white text-lg">
                      <strong>Integration options</strong> with your existing tools
                    </span>
                  </li>
                  <li className="flex items-start leading-relaxed">
                    <Check className="mr-3 h-6 w-6 text-[#00C2A8] flex-shrink-0 mt-0.5" />
                    <span className="text-white text-lg">
                      <strong>Compliance and legal</strong> considerations
                    </span>
                  </li>
                </ul>
              </div>

              <div className="p-7 bg-[rgba(10,37,64,0.8)] rounded-xl border border-white/10 shadow-lg">
                <p className="text-white/90 italic text-xl leading-relaxed relative">
                  <span className="absolute -left-4 -top-2 text-3xl text-[#00C2A8]">"</span>
                  Raffily has transformed our customer engagement strategy. We've seen a 40% increase in email open
                  rates and a significant boost in social media followers.
                  <span className="absolute -right-4 -bottom-2 text-3xl text-[#00C2A8]">"</span>
                </p>
                <p className="text-[#00C2A8] font-medium mt-4 text-lg">— Sarah Johnson, Marketing Director</p>
              </div>
            </div>

            {/* Right Column - Demo Request Form */}
            <div>
              <Card className="bg-[rgba(10,37,64,0.9)] border-white/10 rounded-xl shadow-xl">
                <CardContent className="p-8">
                  <div className="space-y-8">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-white">Request Your Demo</h2>
                      <p className="text-white/80 mt-2">Fill out the form below and we'll be in touch shortly</p>
                    </div>

                    <form className="space-y-7">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="fullName" className="text-sm font-medium text-white">
                            Full Name <span className="text-[#00C2A8]">*</span>
                          </label>
                          <Input
                            id="fullName"
                            placeholder="John Smith"
                            required
                            className="bg-[#0A2540]/70 border-white/20 focus:border-[#00C2A8] text-white placeholder:text-white/50 p-6 rounded-md"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-white">
                            Email Address <span className="text-[#00C2A8]">*</span>
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                            className="bg-[#0A2540]/70 border-white/20 focus:border-[#00C2A8] text-white placeholder:text-white/50 p-6 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="company" className="text-sm font-medium text-white">
                            Company Name <span className="text-[#00C2A8]">*</span>
                          </label>
                          <Input
                            id="company"
                            placeholder="Your Company Ltd"
                            required
                            className="bg-[#0A2540]/70 border-white/20 focus:border-[#00C2A8] text-white placeholder:text-white/50 p-6 rounded-md"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium text-white">
                            Phone Number
                          </label>
                          <Input
                            id="phone"
                            placeholder="+44 7123 456789"
                            className="bg-[#0A2540]/70 border-white/20 focus:border-[#00C2A8] text-white placeholder:text-white/50 p-6 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="businessType" className="text-sm font-medium text-white">
                          Business Type <span className="text-[#00C2A8]">*</span>
                        </label>
                        <select
                          id="businessType"
                          className="w-full rounded-md bg-[#0A2540]/70 border border-white/20 focus:border-[#00C2A8] text-white placeholder:text-white/50 p-6 h-[50px]"
                          required
                        >
                          <option value="" disabled selected>
                            Select your business type
                          </option>
                          <option value="retail">Retail</option>
                          <option value="ecommerce">E-commerce</option>
                          <option value="hospitality">Hospitality</option>
                          <option value="financial">Financial Services</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="education">Education</option>
                          <option value="nonprofit">Non-profit</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-white">
                          What are you looking to achieve with Raffily?
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your goals and challenges..."
                          className="bg-[#0A2540]/70 border-white/20 focus:border-[#00C2A8] text-white placeholder:text-white/50 p-4 min-h-[120px] rounded-md"
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start">
                          <input type="checkbox" id="legalSupport" className="mt-1 mr-3 h-4 w-4" />
                          <label htmlFor="legalSupport" className="text-white/90">
                            I need legal support for running raffles in multiple countries
                          </label>
                        </div>
                        <div className="flex items-start">
                          <input type="checkbox" id="globalRaffle" className="mt-1 mr-3 h-4 w-4" />
                          <label htmlFor="globalRaffle" className="text-white/90">
                            I want to start a global raffle
                          </label>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-[#00C2A8] hover:bg-[#00A08A] text-white text-lg p-6 h-auto rounded-lg transition-colors duration-200"
                      >
                        <span>Request Demo</span>
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>

                      <p className="text-sm text-white/60 text-center">
                        By submitting this form, you agree to our{" "}
                        <Link href="/privacy-policy" className="text-[#00C2A8] hover:underline">
                          Privacy Policy
                        </Link>
                      </p>
                    </form>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-[#00C2A8] flex items-center justify-center mr-3">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-white/60">Email Us</p>
                    <p className="text-white font-medium">info@raffily.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-[#00C2A8] flex items-center justify-center mr-3">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-white/60">Call Us</p>
                    <p className="text-white font-medium">+44 (0) 123 456 7890</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  )
}
