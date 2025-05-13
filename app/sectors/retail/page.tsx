"use client"

import { useEffect } from "react"
import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"
import Image from "next/image"
import { ShoppingBag, Users, TrendingUp, FileText } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function RetailSectorPage() {
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
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/retail.jpg-FlIVn8mUgf2eKrUd0sb3J3zqu51T6G.jpeg"
            alt="Retail Engagement"
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
              How Retail Brands Can Boost Sales & Customer Loyalty with Raffles
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Struggling with declining foot traffic and customer retention? Raffily helps retail businesses create
              exciting raffles that drive store visits, increase repeat purchases, and gather valuable customer data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-[#00B8A9] hover:bg-[#00B8A9]/90 transition-colors"
              >
                Get a Free Consultation
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-base font-medium text-[#1E0B36] bg-white hover:bg-gray-100 transition-colors"
              >
                See It in Action
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Retail Needs Raffily */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#0A1F44] mb-8">Why Retail Brands Need Raffily</h2>
            <p className="text-xl text-gray-600 mb-12">
              Did you know that <span className="font-bold text-[#00B8A9]">68% of customers</span> rarely engage with
              retail marketing emails? But when brands include a raffle, engagement increases by{" "}
              <span className="font-bold text-[#00B8A9]">up to 250%</span>.
            </p>

            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-[#0A1F44] mb-4 text-left">The Retail Challenge</h3>
                  <ul className="space-y-4 text-left">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-3 mt-0.5">
                        ✕
                      </div>
                      <span className="text-gray-700">Declining foot traffic in physical stores</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-3 mt-0.5">
                        ✕
                      </div>
                      <span className="text-gray-700">Low email engagement rates (industry average: 18%)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-3 mt-0.5">
                        ✕
                      </div>
                      <span className="text-gray-700">Difficulty collecting customer preferences and data</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-3 mt-0.5">
                        ✕
                      </div>
                      <span className="text-gray-700">Increasing customer acquisition costs</span>
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
                      <span className="text-gray-700">Drive in-store visits with exciting raffle prizes</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 mt-0.5">
                        ✓
                      </div>
                      <span className="text-gray-700">Boost email open rates to 45%+ with raffle announcements</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 mt-0.5">
                        ✓
                      </div>
                      <span className="text-gray-700">Gather customer preferences through custom entry questions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 mt-0.5">
                        ✓
                      </div>
                      <span className="text-gray-700">Acquire new customers at a fraction of the usual cost</span>
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
            <h2 className="text-3xl md:text-5xl font-bold text-[#0A1F44] mb-4">Key Benefits for Retail Brands</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Raffily helps retail businesses drive foot traffic, boost customer loyalty, and gather valuable
              insights—all through engaging raffle campaigns.
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
                <ShoppingBag className="w-8 h-8 text-[#00B8A9]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A1F44] mb-3">Increase Store Traffic</h3>
              <p className="text-gray-600">
                Drive more customers to your physical stores with exciting raffle incentives and in-store entries.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00B8A9]/10 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-[#00B8A9]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A1F44] mb-3">Boost Customer Loyalty</h3>
              <p className="text-gray-600">
                Increase repeat purchases and customer retention with engaging raffle campaigns and personalized offers.
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
              <h3 className="text-xl font-bold text-[#0A1F44] mb-3">Gather Customer Insights</h3>
              <p className="text-gray-600">
                Collect valuable data on customer preferences and shopping habits through custom raffle entry questions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00B8A9]/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-[#00B8A9]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A1F44] mb-3">Acquire New Customers</h3>
              <p className="text-gray-600">
                Attract new shoppers with viral raffle campaigns that encourage social sharing and word-of-mouth
                promotion.
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
              See how a fashion boutique chain transformed their customer engagement with Raffily.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12">
                <h3 className="text-2xl font-bold text-[#0A1F44] mb-4">Fashion Boutique Chain</h3>
                <p className="text-gray-600 mb-6">
                  A mid-sized fashion boutique chain was struggling with declining foot traffic and limited customer
                  data in an increasingly digital retail landscape.
                </p>
                <p className="text-gray-600 mb-6">
                  They implemented Raffily's raffle platform to create exciting in-store events and capture valuable
                  customer insights.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-[#00B8A9]/10 flex items-center justify-center mr-4">
                      <ShoppingBag className="w-6 h-6 text-[#00B8A9]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Raffle Campaign</p>
                      <p className="font-semibold text-[#0A1F44]">"Style Makeover Giveaway"</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-[#00B8A9]/10 flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-[#00B8A9]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Target Audience</p>
                      <p className="font-semibold text-[#0A1F44]">Existing and New Customers</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0A1F44] p-8 md:p-12 text-white">
                <h3 className="text-2xl font-bold mb-8">Results After 3 Months</h3>

                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Foot Traffic Increase</span>
                      <span className="text-[#00B8A9] font-bold">+45%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-[#00B8A9] h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Email Open Rate</span>
                      <span className="text-[#00B8A9] font-bold">+180%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-[#00B8A9] h-2 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Customer Data Collected</span>
                      <span className="text-[#00B8A9] font-bold">10,000+</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-[#00B8A9] h-2 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Return Visit Rate</span>
                      <span className="text-[#00B8A9] font-bold">+60%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-[#00B8A9] h-2 rounded-full" style={{ width: "60%" }}></div>
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
              "Raffily transformed our customer engagement strategy. We've seen unprecedented levels of in-store visits,
              email engagement, and valuable data collection. The insights we've gained have been instrumental in
              tailoring our product offerings and marketing campaigns."
            </p>

            <div>
              <p className="font-bold text-white">Sarah Johnson</p>
              <p className="text-white/70">Head of Marketing, Fashion Boutique Chain</p>
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
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Revolutionize Your Retail Marketing?
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto">
              Join the growing number of retail brands using Raffily to boost foot traffic, increase customer loyalty,
              and gather valuable insights.
            </p>

            <div className="flex justify-center">
              <Link
                href="/auth/register"
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

