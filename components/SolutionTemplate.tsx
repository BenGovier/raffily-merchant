"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BarChartIcon as ChartBar, Users, Target, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Statistic {
  value: string
  label: string
  description: string
}

interface CaseStudy {
  company: string
  challenge: string
  solution: string
  results: {
    metric: string
    value: string
  }[]
  testimonial?: {
    quote: string
    author: string
    role: string
  }
}

interface SolutionTemplateProps {
  sector: string
  heroImage: string
  description: string
  statistics: Statistic[]
  caseStudy: CaseStudy
  engagementMetrics: {
    participationRate: string
    customerRetention: string
    dataCollectionRate: string
    averageTickets: string
  }
}

export default function SolutionTemplate({
  sector,
  heroImage,
  description,
  statistics,
  caseStudy,
  engagementMetrics,
}: SolutionTemplateProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[600px]">
        <Image
          src={heroImage || "/placeholder.svg"}
          alt={`Raffily for ${sector}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E0B36]/90 to-[#1E0B36]/70" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Transform {sector} Customer Engagement</h1>
              <p className="text-xl text-white/90 mb-8">{description}</p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-[#FF4D8D] hover:bg-[#FF6B9D] text-white">
                  Start Free Trial
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-[#1E0B36]"
                >
                  View Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Engagement Statistics */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#1E0B36] mb-16">Why Raffles Work in {sector}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard
              icon={Users}
              value={engagementMetrics.participationRate}
              label="Participation Rate"
              description="Average customer participation in raffle campaigns"
            />
            <StatCard
              icon={ChartBar}
              value={engagementMetrics.customerRetention}
              label="Customer Retention"
              description="Increase in customer retention after implementing raffles"
            />
            <StatCard
              icon={Target}
              value={engagementMetrics.dataCollectionRate}
              label="Data Collection"
              description="Customer data collection improvement"
            />
            <StatCard
              icon={ChartBar}
              value={engagementMetrics.averageTickets}
              label="Average Tickets"
              description="Average tickets per customer engagement"
            />
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#1E0B36] mb-16">Success Story</h2>
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h3 className="text-2xl font-bold text-[#1E0B36] mb-4">{caseStudy.company}</h3>
            <div className="mb-6">
              <h4 className="font-semibold text-[#1E0B36] mb-2">Challenge:</h4>
              <p className="text-gray-600">{caseStudy.challenge}</p>
            </div>
            <div className="mb-6">
              <h4 className="font-semibold text-[#1E0B36] mb-2">Solution:</h4>
              <p className="text-gray-600">{caseStudy.solution}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {caseStudy.results.map((result, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-[#FF4D8D] mb-2">{result.value}</div>
                  <div className="text-sm text-gray-600">{result.metric}</div>
                </div>
              ))}
            </div>
            {caseStudy.testimonial && (
              <blockquote className="border-l-4 border-[#FF4D8D] pl-4 italic text-gray-600">
                "{caseStudy.testimonial.quote}"
                <footer className="mt-2 text-sm">
                  <strong>{caseStudy.testimonial.author}</strong>
                  <br />
                  {caseStudy.testimonial.role}
                </footer>
              </blockquote>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[#1E0B36] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Transform Your Customer Engagement?</h2>
          <p className="text-xl mb-8 text-white/80">
            Join the growing number of {sector} businesses using Raffily to drive growth.
          </p>
          <Button asChild size="lg" className="bg-[#FF4D8D] hover:bg-[#FF6B9D]">
            <Link href="/request-demo">
              Schedule a Demo <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function StatCard({ icon: Icon, value, label, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center p-6 bg-white rounded-lg shadow-lg"
    >
      <Icon className="w-12 h-12 text-[#FF4D8D] mx-auto mb-4" />
      <div className="text-3xl font-bold text-[#1E0B36] mb-2">{value}</div>
      <div className="font-semibold text-[#1E0B36] mb-2">{label}</div>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  )
}

