import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#1E0B36] to-[#4B1248] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Engage & Retain More Customers?</h2>
        <p className="text-xl mb-8">Launch your first raffle in minutes—no tech skills needed.</p>
        <Link href="/request-demo">
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all rounded-full"
          >
            Create My Raffle
          </Button>
        </Link>
      </div>
    </section>
  )
}

export { FinalCTA }
