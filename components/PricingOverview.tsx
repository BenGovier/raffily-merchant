import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const pricingPlans = [
  {
    name: "Free-Entry Model",
    price: "£0.25 per issued ticket",
    features: [
      "£0.50 for 2 custom questions",
      "Unlimited raffles",
      "Pay as you go",
      "No monthly fee",
      "Fully compliant",
    ],
  },
  {
    name: "Paid-Entry Model",
    price: "25% revenue share",
    features: [
      "Monetize your raffle",
      "Premium analytics",
      "No upfront cost",
      "Higher engagement rates",
      "Full compliance support",
    ],
  },
]

export default function PricingOverview() {
  return (
    <section className="py-20 bg-gray-50" id="pricing">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#1E0B36] mb-12">Flexible Pricing for Every Need</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="bg-white rounded-lg p-8 shadow-md">
              <h3 className="text-2xl font-bold text-[#1E0B36] mb-4">{plan.name}</h3>
              <p className="text-3xl font-bold text-[#FF4D8D] mb-6">{plan.price}</p>
              <ul className="space-y-2 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-[#FF4D8D] hover:bg-[#FF6B9D] text-white">Start Now</Button>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="outline" className="text-[#1E0B36] border-[#1E0B36] hover:bg-[#1E0B36] hover:text-white">
            Compare Plans
          </Button>
        </div>
      </div>
    </section>
  )
}
