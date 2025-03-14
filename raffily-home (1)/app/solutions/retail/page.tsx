import SolutionTemplate from "@/components/SolutionTemplate"
import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"

export default function RetailSolution() {
  const solutionData = {
    sector: "Retail",
    heroImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/retail.jpg-FlIVn8mUgf2eKrUd0sb3J3zqu51T6G.jpeg",
    description:
      "Discover how Raffily helps retail businesses increase foot traffic, boost customer loyalty, and gather valuable insights through engaging raffle campaigns.",
    statistics: [
      {
        value: "250%",
        label: "Engagement Increase",
        description: "Average increase in customer interaction rates",
      },
      {
        value: "45%",
        label: "Data Collection",
        description: "More customer data gathered compared to traditional methods",
      },
      {
        value: "98%",
        label: "Satisfaction Rate",
        description: "Customer satisfaction with raffle experiences",
      },
    ],
    caseStudy: {
      company: "Fashion Boutique Chain",
      challenge:
        "Struggling with declining foot traffic and limited customer data in an increasingly digital retail landscape.",
      solution:
        "Implemented Raffily's raffle platform to create exciting in-store events and capture valuable customer insights.",
      results: [
        {
          metric: "Foot Traffic Increase",
          value: "+45%",
        },
        {
          metric: "Customer Data Collected",
          value: "10,000+",
        },
        {
          metric: "Return Visit Rate",
          value: "+60%",
        },
      ],
      testimonial: {
        quote:
          "Raffily transformed our customer engagement strategy. We've seen unprecedented levels of customer participation and valuable data collection.",
        author: "Sarah Johnson",
        role: "Head of Marketing, Fashion Boutique Chain",
      },
    },
    engagementMetrics: {
      participationRate: "78%",
      customerRetention: "+45%",
      dataCollectionRate: "85%",
      averageTickets: "3.5",
    },
  }

  return (
    <>
      <MainNav />
      <SolutionTemplate {...solutionData} />
      <Footer />
    </>
  )
}

