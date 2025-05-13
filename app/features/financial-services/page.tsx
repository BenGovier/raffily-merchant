"use client"

import { useEffect } from "react"
import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DollarSign, Users, TrendingUp, BarChart2, ShieldCheck, FileText } from "lucide-react"
import { motion } from "framer-motion"

export default function FinancialServicesFeaturePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <MainNav />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/finance.jpg-llLmVCZ2GQMz1IrZLur91lUahd7m3Q.jpeg"
            alt="Financial Services Engagement"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F44]/90 to-[#0A1F44]/70" />
        </div>
        <div className="container relative z-10 mx-auto px-4 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              How Financial Services Can Increase Engagement & Sales with Raffles
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Struggling with low app adoption and customer engagement? Raffily helps financial institutions create
              exciting raffles that boost email opens, increase product adoption, and gather valuable customer insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white text-lg px-6 py-3">
                Get a Free Consultation
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#0A1F44] text-lg px-6 py-3"
              >
                See It in Action
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Financial Services Needs Raffily */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#0A1F44] mb-8">Why Financial Services Needs Raffily</h2>
            <p className="text-xl text-gray-600 mb-12">
              Did you know that <span className="font-bold text-[#00B8A9]">78% of banking customers</span> never engage
              with financial emails? But when institutions include a raffle, engagement increases by{" "}
              <span className="font-bold text-[#00B8A9]">up to 200%</span>.
            </p>

            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-[#0A1F44] mb-4 text-left">The Financial Services Challenge</h3>
                  <ul className="space-y-4 text-left">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-3 mt-0.5">
                        ✕
                      </div>
                      <span className="text-gray-700">Low mobile app adoption rates</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-3 mt-0.5">
                        ✕
                      </div>
                      <span className="text-gray-700">Poor email open rates (industry average: 21%)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-3 mt-0.5">
                        ✕
                      </div>
                      <span className="text-gray-700">Difficulty collecting customer financial preferences</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-3 mt-0.5">
                        ✕
                      </div>
                      <span className="text-gray-700">Strict compliance requirements limiting marketing options</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#0A1F44] mb-4 text-left">The Raffily Solution</h3>
                  <ul className="space-y-4 text-left">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 mt-0.5">
                        ✓
                      </div>
                      <span className="text-gray-700">Boost app downloads with exciting prize incentives</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 mt-0.5">
                        ✓
                      </div>
                      <span className="text-gray-700">Increase email open rates to 40%+ with raffle announcements</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 mt-0.5">
                        ✓
                      </div>
                      <span className="text-gray-700">Gather financial preferences through custom entry questions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 mt-0.5">
                        ✓
                      </div>
                      <span className="text-gray-700">100% compliant raffle structure that meets regulations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#0A1F44] mb-4">Key Benefits for Financial Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Raffily helps financial institutions engage customers, drive product adoption, and gather valuable
              insights—all while maintaining strict compliance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00B8A9]/10 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-[#00B8A9]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A1F44] mb-3">Increase Customer Engagement</h3>
              <p className="text-gray-600">
                Boost email open rates by up to 200% and drive higher app usage with exciting raffle incentives.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00B8A9]/10 flex items-center justify-center">
                <BarChart2 className="w-8 h-8 text-[#00B8A9]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A1F44] mb-3">Drive Higher Conversions</h3>
              <p className="text-gray-600">
                Turn passive users into active customers with raffles that incentivize product adoption and usage.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00B8A9]/10 flex items-center justify-center">
                <FileText className="w-8 h-8 text-[#00B8A9]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A1F44] mb-3">Collect Valuable Insights</h3>
              <p className="text-gray-600">
                Gather financial preferences and needs through custom questions during the raffle entry process.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00B8A9]/10 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-[#00B8A9]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A1F44] mb-3">100% Compliant & Secure</h3>
              <p className="text-gray-600">
                Meet all regulatory requirements with our fully compliant raffle structure and secure data handling.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#0A1F44] mb-4">Real Success Story</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how a regional banking group transformed their customer engagement with Raffily.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12">
                <h3 className="text-2xl font-bold text-[#0A1F44] mb-4">Regional Banking Group</h3>
                <p className="text-gray-600 mb-6">
                  A regional banking group was struggling with low adoption rates for their new mobile banking app and
                  wanted to increase customer engagement.
                </p>
                <p className="text-gray-600 mb-6">
                  They implemented Raffily's financial services-optimized raffle platform to incentivize app downloads
                  and gather customer feedback.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-[#00B8A9]/10 flex items-center justify-center mr-4">
                      <DollarSign className="w-6 h-6 text-[#00B8A9]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Prize Offered</p>
                      <p className="font-semibold text-[#0A1F44]">$500 Cash Deposit to Winner's Account</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-[#00B8A9]/10 flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-[#00B8A9]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Target Audience</p>
                      <p className="font-semibold text-[#0A1F44]">Existing Customers Without Mobile App</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0A1F44] p-8 md:p-12 text-white">
                <h3 className="text-2xl font-bold mb-8">Results After 30 Days</h3>

                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Email Open Rate</span>
                      <span className="text-[#00B8A9] font-bold">+190%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-[#00B8A9] h-2 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Mobile App Adoption</span>
                      <span className="text-[#00B8A9] font-bold">+75%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-[#00B8A9] h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Customer Engagement</span>
                      <span className="text-[#00B8A9] font-bold">+45%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-[#00B8A9] h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Customer Data Collected</span>
                      <span className="text-[#00B8A9] font-bold">12,500+</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-[#00B8A9] h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto bg-[#0A1F44] rounded-xl shadow-lg p-8 md:p-12 text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>

            <p className="text-xl md:text-2xl text-white italic mb-8">
              "Raffily transformed our approach to digital banking adoption. The raffle campaign not only drove app
              downloads but gave us invaluable insights into our customers' financial preferences. Our marketing team
              now has data they never had access to before."
            </p>

            <div>
              <p className="font-bold text-white">Michael Thompson</p>
              <p className="text-white/70">Chief Digital Officer, Regional Banking Group</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0A1F44]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Grow Your Financial Business?</h2>
            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto">
              Join the growing number of financial institutions using Raffily to boost engagement, increase product
              adoption, and gather valuable customer insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white text-lg px-8 py-6">
                Book a Free Demo
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#0A1F44] text-lg px-8 py-6"
              >
                Try Raffily Free for 14 Days
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
