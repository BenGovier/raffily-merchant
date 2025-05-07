import Image from "next/image"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#0a1638] py-16 md:py-24">
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                🎉 Reward. Engage. Convert. All From One Free Raffle.
              </h1>
              <p className="text-lg text-white/80">
                Run high-impact giveaways that increase loyalty, skyrocket engagement, and help convert your audience —
                all powered by Raffily's £5,000 Monthly Mega Prize.
              </p>
              <div className="space-y-4">
                <Button
                  size="lg"
                  className="bg-[#00e1c0] hover:bg-[#00c5a8] text-[#0a1638] border-0 h-12 px-6 text-base font-bold"
                >
                  <Check className="mr-2 h-5 w-5" /> Start Free – We'll Provide the Prize
                </Button>
                <p className="text-sm text-white/70">No prize costs. No tech skills. Just results.</p>
              </div>
            </div>

            <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
              <div className="relative w-[280px] md:w-[320px] h-[560px] md:h-[640px] transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/mobile-app-interface.png"
                  alt="Raffily Mobile App"
                  width={320}
                  height={640}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Countdown Strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#00e1c0]/90 py-3 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <p className="text-center text-[#0a1638] font-medium">
              ⏳ Entries for the £5,000 Mega Prize close in: <span className="font-bold">21 days, 3 hours</span>
            </p>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-xl font-bold mb-8">World-class marketing teams trust Raffily</h2>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {[1, 2, 3, 4, 5, 6].map((logo) => (
              <div key={logo} className="grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                  src="/generic-company-logo.png"
                  alt="Partner Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Turn Your Superfans with Free Raffles</h2>
            <p className="text-lg text-gray-600">
              Raffily helps you connect, reward, and retain — no matter your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-8">
              {[
                {
                  icon: (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00e1c0] text-white">
                      1
                    </div>
                  ),
                  title: "Easily Collect Valuable Data",
                  description:
                    "Gather insights on customer preferences and behaviors through customized raffle entries.",
                },
                {
                  icon: (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00e1c0] text-white">
                      2
                    </div>
                  ),
                  title: "Create More Conversions, Get Growth",
                  description:
                    "Increase conversion rates by adding excitement and incentives to your customer journey.",
                },
                {
                  icon: (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00e1c0] text-white">
                      3
                    </div>
                  ),
                  title: "Improve Retention, Reduce Churn",
                  description: "Keep customers engaged and coming back with regular prize opportunities.",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">{item.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}

              <Button className="bg-[#00e1c0] hover:bg-[#00c5a8] text-[#0a1638] border-0 font-bold">
                Get Started for Free
              </Button>
            </div>

            <div className="relative h-[500px] flex items-center justify-center">
              <Image
                src="/placeholder.svg?key=lkaav"
                alt="Raffily Mobile App Interface"
                width={300}
                height={500}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features to Drive Customer Engagement & Growth
            </h2>
            <p className="text-lg text-gray-600">
              Raffily offers a complete toolkit to help you engage customers and drive business growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 overflow-hidden">
              <div className="bg-[#ff6b6b] h-2"></div>
              <div className="p-6">
                <div className="bg-[#ff6b6b]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#ff6b6b] font-bold text-xl">+34%</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Higher Engagement, More Sales</h3>
                <p className="text-gray-600 mb-4">
                  Campaigns with raffles see a 34% increase in customer engagement and higher conversion rates.
                </p>
                <Button variant="outline" className="text-[#0a1638] hover:bg-[#00e1c0]/10">
                  Learn More
                </Button>
              </div>
            </Card>

            <Card className="border border-gray-200 overflow-hidden">
              <div className="bg-[#00e1c0] h-2"></div>
              <div className="p-6">
                <div className="bg-[#00e1c0]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#00e1c0] font-bold text-xl">+65%</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Turn One-Time Customers Into Loyal Fans</h3>
                <p className="text-gray-600 mb-4">
                  65% of customers are more likely to return when offered the chance to win prizes.
                </p>
                <Button variant="outline" className="text-[#0a1638] hover:bg-[#00e1c0]/10">
                  Learn More
                </Button>
              </div>
            </Card>

            <Card className="border border-gray-200 overflow-hidden">
              <div className="bg-[#845ef7] h-2"></div>
              <div className="p-6">
                <div className="bg-[#845ef7]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#845ef7] font-bold">📊</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Valuable Customer Insights</h3>
                <p className="text-gray-600 mb-4">
                  Collect actionable data on customer preferences and behaviors to inform your marketing strategy.
                </p>
                <Button variant="outline" className="text-[#0a1638] hover:bg-[#00e1c0]/10">
                  Learn More
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-[#0a1638]">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Turn Every Customer Into a Fan — for Free
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Raffily gives you the tools to surprise, engage, and convert — with zero prize budget.
            </p>

            <Button
              size="lg"
              className="bg-[#00e1c0] hover:bg-[#00c5a8] text-[#0a1638] border-0 h-12 px-8 text-base font-bold"
            >
              🎉 Launch Your Free Raffle Now
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
