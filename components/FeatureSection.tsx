"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BarChart2, Users, Database, ShieldCheck, Mail, Palette } from "lucide-react"

const features = [
  {
    icon: BarChart2,
    title: "Higher Engagement, More Sales",
    description:
      "Increase engagement by up to 40% with exciting raffle campaigns that keep customers coming back and boost your bottom line.",
    href: "/features/engagement-boost",
    color: "from-[#fd8e8e] to-[#ff7855]",
    stat: "+40%",
    featured: true,
  },
  {
    icon: Users,
    title: "Turn One-Time Customers into Loyal Fans",
    description:
      "Keep customers coming back with interactive raffles that transform casual visitors into repeat buyers and brand advocates.",
    href: "/features/customer-retention",
    color: "from-[#00B8A9] to-[#00B8A9]/80",
    stat: "+60%",
    featured: true,
  },
  {
    icon: Database,
    title: "Gather Customer Insights That Increase Sales",
    description:
      "Use custom questions to understand customer preferences and create marketing campaigns that convert at higher rates.",
    href: "/features/data-driven",
    color: "from-[#1E0B36] to-[#4B1248]",
    stat: "10x",
  },
  {
    icon: ShieldCheck,
    title: "Stress-Free, Fully Compliant Raffles",
    description:
      "We handle all the legal and compliance work, so you can focus on growing your business without worry or risk.",
    href: "/features/compliance",
    color: "from-[#fd8e8e] to-[#ff7855]",
    stat: "100%",
  },
  {
    icon: Mail,
    title: "Boost Email Opens & Clicks with Raffles",
    description:
      "Increase email open rates by 40% with raffle incentives that get customers clicking, reading, and converting.",
    href: "/features/email-engagement",
    color: "from-[#00B8A9] to-[#00B8A9]/80",
    stat: "+40%",
  },
  {
    icon: Palette,
    title: "Branded Raffles That Match Your Business",
    description:
      "Your brand, your raffle. Fully customizable pages ensure every raffle perfectly reflects your business identity.",
    href: "/features/customization",
    color: "from-[#1E0B36] to-[#4B1248]",
    stat: "100%",
  },
]

export default function FeatureSection() {
  // Split features into featured (top row) and regular (bottom rows)
  const featuredFeatures = features.filter((feature) => feature.featured)
  const regularFeatures = features.filter((feature) => !feature.featured)

  return (
    <section className="py-20 bg-white" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E0B36] mb-4">
            Powerful Features to Drive Customer Engagement & Growth
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Raffily helps businesses boost customer loyalty, increase email engagement, and collect valuable
            insights—all while running fully branded, compliant raffles.
          </p>
        </div>

        {/* Featured cards (larger, top row) */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {featuredFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)", transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className={`h-3 bg-gradient-to-r ${feature.color}`}></div>
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}
                    >
                      <feature.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="bg-gray-100 rounded-lg py-2.5 px-5 inline-block">
                      <span className="text-2xl font-bold text-[#1E0B36]">{feature.stat}</span>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-bold text-[#1E0B36] mb-3">{feature.title}</h3>
                    <p className="text-gray-600 mb-6">{feature.description}</p>
                    <Button asChild className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white rounded-full px-8 py-2">
                      <Link href={feature.href}>Free Demo</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Regular cards (smaller, bottom rows) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regularFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)", transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, delay: (index + featuredFeatures.length) * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
              <div className="p-6">
                <div className="flex items-center mb-5">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-lg py-1.5 px-4 ml-3">
                    <span className="text-lg font-bold text-[#1E0B36]">{feature.stat}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#1E0B36] mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-5">{feature.description}</p>
                <Button asChild className="w-full bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white rounded-full px-6 py-2">
                  <Link href={feature.href}>Free Demo</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

