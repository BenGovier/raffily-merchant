import { Gift, FileQuestion, ShieldCheck, BarChart2, Zap, HeadphonesIcon } from "lucide-react"

const features = [
  {
    icon: Gift,
    title: "Free-Entry + Paid-Entry Options",
    description: "Reach more customers or monetize directly",
  },
  {
    icon: FileQuestion,
    title: "Tailored Questions",
    description: "Collect customer insights and feedback",
  },
  {
    icon: ShieldCheck,
    title: "Full Compliance",
    description: "Promotional model, not gambling",
  },
  {
    icon: BarChart2,
    title: "Real-Time Analytics",
    description: "Instantly see participants, conversions, data",
  },
  {
    icon: Zap,
    title: "Easy Setup & Automation",
    description: "Automatic winner draws, marketing integrations",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Expert help whenever you need it",
  },
]

export default function KeyFeatures() {
  return (
    <section className="py-20 bg-white" id="features">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#1E0B36] mb-12">Why Businesses Choose Raffily</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-md">
              <feature.icon className="w-12 h-12 text-[#FF4D8D] mb-4" />
              <h3 className="text-xl font-semibold text-[#1E0B36] mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

