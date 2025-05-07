import SectorTemplate from "@/components/SectorTemplate"
import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function NonProfitSector() {
  const sectorData = {
    sector: "Non-Profit",
    heroImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/non%20profit.jpg-8UA5glhzUewWIAWZpFgVyCeJfDmpWb.jpeg",
    description:
      "Learn how Raffily empowers non-profit organizations to engage donors, boost fundraising efforts, and increase awareness through innovative raffle campaigns.",
    statistics: [
      {
        value: "200%",
        label: "Donation Increase",
        description: "Average increase in donation amounts from raffle participants",
      },
      {
        value: "60%",
        label: "Donor Acquisition",
        description: "Increase in new donor acquisition through raffle campaigns",
      },
      {
        value: "97%",
        label: "Engagement Rate",
        description: "Percentage of donors who found raffles an engaging way to contribute",
      },
    ],
    caseStudy: {
      company: "GreenEarth Foundation",
      challenge:
        "Struggling to attract younger donors and maintain engagement with existing supporters in a crowded non-profit landscape.",
      solution:
        "Utilized Raffily's platform to create mission-driven raffle campaigns that educated and excited donors about environmental causes.",
      results: [
        {
          metric: "Young Donor Acquisition",
          value: "+80%",
        },
        {
          metric: "Average Donation Amount",
          value: "+45%",
        },
        {
          metric: "Donor Retention Rate",
          value: "+50%",
        },
      ],
      testimonial: {
        quote:
          "Raffily has transformed our fundraising strategy. We're not just raising more funds; we're creating a community of engaged, informed supporters.",
        author: "Michael Green",
        role: "Development Director, GreenEarth Foundation",
      },
    },
    engagementMetrics: {
      participationRate: "75%",
      customerRetention: "+60%",
      dataCollectionRate: "88%",
      averageTickets: "3.8",
    },
    cta: {
      buttons: (
        <div className="flex gap-4">
          <Button asChild size="lg" className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white">
            <Link href="/auth/register">Start Free Trial</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-[#0A1F44] border-white bg-white hover:bg-white hover:text-[#0A1F44]"
          >
            <Link href="/auth/register">View Demo</Link>
          </Button>
        </div>
      ),
      button: (
        <Button asChild size="lg" className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white">
          <Link href="/auth/register">
            Start Free Trial <ArrowRight className="ml-2" />
          </Link>
        </Button>
      ),
    },
  }

  return (
    <>
      <MainNav />
      <SectorTemplate {...sectorData} />
      <Footer />
    </>
  )
}
