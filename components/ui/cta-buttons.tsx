import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function PrimaryCTA({ children, href, className = "" }) {
  return (
    <Button
      asChild
      size="xl"
      className={`bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white text-lg px-8 py-8 h-16 font-bold shadow-lg hover:shadow-xl transition-all ${className}`}
    >
      <Link href={href}>
        {children} <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </Button>
  )
}

export function SecondaryCTA({ children, href, className = "" }) {
  return (
    <Button
      asChild
      size="xl"
      variant="outline"
      className={`text-white border-2 border-white hover:bg-white hover:text-[#0A1F44] text-lg px-8 py-8 h-16 font-bold transition-all ${className}`}
    >
      <Link href={href}>{children}</Link>
    </Button>
  )
}

export function CTAGroup() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <PrimaryCTA href="/request-demo">Book a Demo</PrimaryCTA>
      <SecondaryCTA href="/apply">Start Free Trial</SecondaryCTA>
    </div>
  )
}

