import SectorTemplate from "@/components/SectorTemplate"
import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HealthcareSector() {
  const sectorData = {
    sector: "Healthcare",
    heroImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/healthcare.jpg-CtgKyoEC3PvuWktDrekOlNE6zHX7zL.jpeg",
    description:
      "Raffily transforms healthcare engagement by dramatically increasing email open rates, incentivizing patient participation, and improving adherence to care plans. Our HIPAA-compliant raffle campaigns drive meaningful patient interactions and valuable data collection.",
    statistics: [
      {
        value: "220%",
        label: "Email Open Rate Increase",
        description: "Average boost in patient email engagement",
      },
      {
        value: "60%",
        label: "Patient Participation",
        description: "Increase in engagement with health initiatives",
      },
      {
        value: "85%",
        label: "Data Collection Rate",
        description: "Success in gathering patient feedback and health data",
      },
    ],
    caseStudy: {
      company: "HealthFirst Clinic Network",
      challenge: "Low email engagement and poor patient adherence to preventive care and follow-up appointments.",
      solution:
        "Implemented Raffily's healthcare-optimized raffle platform to incentivize preventive care and improve communication.",
      results: [
        {
          metric: "Email Open Rate",
          value: "+180%",
        },
        {
          metric: "Preventive Care Visits",
          value: "+50%",
        },
        {
          metric: "Follow-up Appointment Attendance",
          value: "+45%",
        },
      ],
      testimonial: {
        quote:
          "Raffily has transformed our patient engagement strategy. We're seeing remarkable improvements in email communication, preventive care participation, and overall patient satisfaction.",
        author: "Dr. Sarah Johnson",
        role: "Chief Medical Officer, HealthFirst Clinic Network",
      },
    },
    engagementMetrics: {
      participationRate: "75%",
      customerRetention: "+40%",
      dataCollectionRate: "85%",
      averageTickets: "3.2",
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
