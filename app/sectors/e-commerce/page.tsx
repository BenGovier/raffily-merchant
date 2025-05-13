"use client"

import { useEffect } from "react"
import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Users, TrendingUp, ShieldCheck, FileText } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function ECommerceSectorPage() {
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
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ecommerce.jpg-Itsy4IVjfRoLIzWr5bLi5dyMbtB45b.jpeg"
            alt="E-commerce Engagement"
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
              How E-commerce Can Reduce Cart Abandonment & Boost Sales
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Struggling with high cart abandonment and low customer loyalty? Raffily helps e-commerce businesses create
              exciting raffles that boost conversions, increase repeat purchases, and gather valuable customer insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white text-lg px-6 py-3">
                <Link href="/auth/register">Get a Free Consultation</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white text-[#0A1F44] bg-white hover:bg-white hover:text-[#0A1F44] text-lg px-6 py-3"
              >
                <Link href="/auth/register">See It in Action</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why E-commerce Needs Raffily */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#0A1F44] mb-8">Why E-commerce Needs Raffily</h2>
            <p className="text-xl text-gray-600 mb-12">
              Did you know that <span className="font-bold text-[#00B8A9]">70% of online shopping carts</span> are
              abandoned before checkout? But when e-commerce sites implement raffles, conversion rates increase by{" "}
              <span className="font-bold text-[#00B8A9]">up to 35%</span>.
            </p>

            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-[#0A1F44] mb-4 text-left">The E-commerce Challenge</h3>
                  <ul className="space-y-4 text-left">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-3 mt-0.5">
                        ✕
                      </div>
                      <span className="text-gray-700">High cart abandonment rates (70% industry average)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-3 mt-0.5">
                        ✕
                      </div>
                      <span className="text-gray-700">Low customer lifetime value and repeat purchases</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-3 mt-0.5">
                        ✕
                      </div>
                      <span className="text-gray-700">Difficulty standing out in a crowded marketplace</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-3 mt-0.5">
                        ✕
                      </div>
                      <span className="text-gray-700">Limited customer data for personalization</span>
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
                      <span className="text-gray-700">Reduce cart abandonment with exciting raffle incentives</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 mt-0.5">
                        ✓
                      </div>
                      <span className="text-gray-700">Increase customer lifetime value through repeat engagement</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 mt-0.5">
                        ✓
                      </div>
                      <span className="text-gray-700">Differentiate your brand with unique raffle experiences</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 mt-0.5">
                        ✓
                      </div>
                      <span className="text-gray-700">Gather rich customer data for personalized marketing</span>
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
            <h2 className="text-3xl md:text-5xl font-bold text-[#0A1F44] mb-4">Key Benefits for E-commerce</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Raffily helps e-commerce businesses boost conversions, increase customer loyalty, and gather valuable
              shopping insights—all through engaging raffle campaigns.
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
                <ShoppingCart className="w-8 h-8 text-[#00B8A9]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A1F44] mb-3">Reduce Cart Abandonment</h3>
              <p className="text-gray-600">
                Incentivize customers to complete their purchases with exciting raffle opportunities.
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
              <h3 className="text-xl font-bold text-[#0A1F44] mb-3">Increase Customer Lifetime Value</h3>
              <p className="text-gray-600">
                Build long-term relationships that drive repeat purchases and higher customer value.
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
                Collect valuable data on shopping preferences to personalize marketing and product offerings.
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
              <h3 className="text-xl font-bold text-[#0A1F44] mb-3">Stand Out From Competitors</h3>
              <p className="text-gray-600">
                Differentiate your e-commerce store with unique raffle experiences that competitors don't offer.
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
              See how TrendyWear Online transformed their e-commerce performance with Raffily.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12">
                <h3 className="text-2xl font-bold text-[#0A1F44] mb-4">TrendyWear Online</h3>
                <p className="text-gray-600 mb-6">
                  TrendyWear Online was struggling with low email engagement, high cart abandonment, and poor customer
                  retention in a competitive online fashion market.
                </p>
                <p className="text-gray-600 mb-6">
                  They implemented Raffily's e-commerce-optimized raffle platform to create exciting email campaigns and
                  incentive programs.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-[#00B8A9]/10 flex items-center justify-center mr-4">
                      <ShoppingCart className="w-6 h-6 text-[#00B8A9]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Prize Offered</p>
                      <p className="font-semibold text-[#0A1F44]">Year of Free Clothing (One Item Per Month)</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-[#00B8A9]/10 flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-[#00B8A9]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Campaign Strategy</p>
                      <p className="font-semibold text-[#0A1F44]">Entry With Purchase + Free Entry Option</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0A1F44] p-8 md:p-12 text-white">
                <h3 className="text-2xl font-bold mb-8">Results After Campaign</h3>

                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Email Open Rate</span>
                      <span className="text-[#00B8A9] font-bold">+200%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-[#00B8A9] h-2 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Cart Completion Rate</span>
                      <span className="text-[#00B8A9] font-bold">+35%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-[#00B8A9] h-2 rounded-full" style={{ width: "35%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Customer Lifetime Value</span>
                      <span className="text-[#00B8A9] font-bold">+40%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-[#00B8A9] h-2 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Customer Data Points</span>
                      <span className="text-[#00B8A9] font-bold">15,000+</span>
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
              "Raffily has revolutionized our approach to customer engagement. We've seen a significant boost in email
              opens, sales conversions, and customer loyalty. The data we've collected has transformed our marketing
              strategy and helped us create more personalized shopping experiences."
            </p>

            <div>
              <p className="font-bold text-white">Emily Chen</p>
              <p className="text-white/70">E-commerce Director, TrendyWear Online</p>
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
              Ready to Transform Your E-commerce Business?
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto">
              Join the growing number of e-commerce businesses using Raffily to reduce cart abandonment, increase
              customer loyalty, and gather valuable shopping insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white text-lg px-8 py-6">
                <Link href="/auth/register">Book a Free Demo</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white text-[#0A1F44] bg-white hover:bg-white hover:text-[#0A1F44] text-lg px-8 py-6"
              >
                <Link href="/auth/register">Try Raffily Free for 14 Days</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
