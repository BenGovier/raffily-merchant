import Image from "next/image"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
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
                  src="/placeholder.svg?key=ph37k"
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
                src="/placeholder.svg?key=gyqfr"
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

          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <Card className="border border-gray-200 overflow-hidden">
              <div className="bg-[#845ef7] h-2"></div>
              <div className="p-6">
                <div className="bg-[#845ef7]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#845ef7] font-bold">🔍</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Detailed Analytics</h3>
                <p className="text-gray-600 mb-4">
                  Track performance with comprehensive analytics and reporting tools.
                </p>
                <Button variant="outline" className="text-[#0a1638] hover:bg-[#00e1c0]/10">
                  Learn More
                </Button>
              </div>
            </Card>

            <Card className="border border-gray-200 overflow-hidden">
              <div className="bg-[#ff6b6b] h-2"></div>
              <div className="p-6">
                <div className="bg-[#ff6b6b]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#ff6b6b] font-bold">📱</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Mobile-First, Fully Customizable</h3>
                <p className="text-gray-600 mb-4">
                  Create beautiful, branded raffle experiences that work perfectly on any device.
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
                  <span className="text-[#00e1c0] font-bold">🔄</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Seamless Integrations & APIs</h3>
                <p className="text-gray-600 mb-4">
                  Connect Raffily with your existing tools and platforms for a unified workflow.
                </p>
                <Button variant="outline" className="text-[#0a1638] hover:bg-[#00e1c0]/10">
                  Learn More
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Solutions Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Find the Perfect Raffle Solution for Your Business</h2>
            <p className="text-lg text-gray-600">
              Whether you're a small business or a large enterprise, Raffily has the right solution for you.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {["Retail & E-commerce", "Financial Services", "SaaS & Technology", "Hospitality & Events"].map(
              (industry, index) => (
                <Button key={index} variant="outline" className="text-[#0a1638] hover:bg-[#00e1c0]/10 border-gray-200">
                  {industry}
                </Button>
              ),
            )}
          </div>

          <div className="text-center mt-8">
            <Button className="bg-[#00e1c0] hover:bg-[#00c5a8] text-[#0a1638] border-0 font-bold">
              Find Your Perfect Solution
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-[#0a1638] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Raffily Works: Create, Launch & Grow in Minutes</h2>
            <p className="text-lg text-white/80">
              Get started in just a few simple steps and watch your customer engagement soar.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4 mb-12">
            {[
              {
                icon: "🎯",
                title: "Set Your Goals",
                description: "Define what you want to achieve with your raffle campaign.",
              },
              {
                icon: "🎁",
                title: "Choose Prize",
                description: "Select from our £5,000 Mega Prize or add your own custom prize.",
              },
              {
                icon: "✏️",
                title: "Customize",
                description: "Brand your raffle and add custom questions to gather insights.",
              },
              {
                icon: "🚀",
                title: "Launch",
                description: "Share your raffle with customers via email, social, or your website.",
              },
              {
                icon: "📈",
                title: "Analyze & Grow",
                description: "Track performance and use insights to optimize future campaigns.",
              },
            ].map((step, index) => (
              <div key={index} className="bg-[#0f1f4a] p-4 rounded-lg hover:bg-[#152657] transition-colors">
                <div className="text-2xl mb-2">{step.icon}</div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-white/70 text-sm">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#152657] p-6 rounded-lg max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#00e1c0] text-[#0a1638] font-bold">
                5
              </div>
              <h3 className="text-xl font-bold">Step 5: Use data to drive future success</h3>
            </div>
            <p className="text-white/80 mb-4">
              Leverage the valuable customer data and insights gathered from your raffle to inform your marketing
              strategy, personalize communications, and drive long-term growth.
            </p>
            <Button className="bg-[#00e1c0] hover:bg-[#00c5a8] text-[#0a1638] border-0 font-bold w-full sm:w-auto">
              Get Started with Raffily
            </Button>
          </div>
        </div>
      </section>

      {/* Solutions for Every Sector */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Solutions for Every Sector</h2>
            <p className="text-lg text-gray-600">
              Discover how Raffily can help your specific industry drive engagement and growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Retail and E-commerce",
                image: "/placeholder.svg?key=brwki",
              },
              {
                title: "E-commerce",
                image: "/placeholder.svg?key=4is5z",
              },
              {
                title: "Financial Services",
                image: "/financial-services-abstract.png",
              },
              {
                title: "Hospitality",
                image: "/placeholder.svg?key=0ejkk",
              },
              {
                title: "SaaS Platforms",
                image: "/placeholder.svg?height=200&width=400&query=software as a service",
              },
              {
                title: "Subscriptions",
                image: "/placeholder.svg?height=200&width=400&query=subscription service",
              },
            ].map((sector, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1638]/80 to-transparent z-10"></div>
                <Image
                  src={sector.image || "/placeholder.svg"}
                  alt={sector.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-white font-bold mb-2">{sector.title}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Open Rates Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Boost Your Email Open Rates with Raffily</h2>
            <p className="text-lg text-gray-600">
              Discover how Raffily can significantly improve your email engagement with prize-driven campaigns that get
              opened, read, and acted upon.
            </p>
          </div>

          <div className="text-center mt-8">
            <Button className="bg-[#00e1c0] hover:bg-[#00c5a8] text-[#0a1638] border-0 font-bold">
              Improve Your Email Performance
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-[#0a1638] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
            <p className="text-lg text-white/80">
              See how businesses across industries are achieving remarkable results with Raffily.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "We saw 40%+ open rates after using Raffily in our CRM campaigns.",
                author: "Marketing Director",
                company: "E-commerce Brand",
              },
              {
                quote: "Zero prize cost and over 1,400 entries in three days — insane ROI.",
                author: "Growth Lead",
                company: "SaaS Platform",
              },
              {
                quote: "Our customer retention increased by 28% after implementing Raffily's solution.",
                author: "Customer Success Manager",
                company: "Subscription Service",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-[#152657] p-6 rounded-lg">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-[#00e1c0]">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-lg mb-4 flex-grow">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-white/70">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "Is Raffily legal? Compliant for my region?",
                  answer:
                    "Yes! Raffily is designed to be fully compliant with promotional and lottery regulations. Our platform includes a free entry option, eliminating any required purchase, which qualifies our raffles as promotional activities, not gambling.",
                },
                {
                  question: "What do I get from a raffle?",
                  answer:
                    "With Raffily, you get valuable customer data, increased engagement, and improved retention. Our platform allows you to collect insights on customer preferences and behaviors, which you can use to inform your marketing strategy and personalize communications.",
                },
                {
                  question: "How do I collect customer data from my raffle entries?",
                  answer:
                    "Raffily makes it easy to collect customer data through customized entry forms. You can add your own questions to gather specific insights relevant to your business. All data is securely stored and easily accessible through our analytics dashboard.",
                },
                {
                  question: "How much does Raffily cost to use?",
                  answer:
                    "Raffily offers flexible pricing options to suit businesses of all sizes. You can start for free with our basic plan, or choose from our premium plans starting at £149/month. We also offer a pay-as-you-go option for businesses that want to use their own prizes.",
                },
                {
                  question: "Can I bring my own raffle prize?",
                  answer:
                    "While Raffily offers a £5,000 Mega Prize at no cost to you, you also have the option to use your own prizes. This gives you complete flexibility to tailor your raffles to your specific audience and objectives.",
                },
              ].map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="px-6 py-4 bg-white">
                    <p>{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="text-center mt-8">
              <p className="mb-4">Still have questions?</p>
              <Button className="bg-[#00e1c0] hover:bg-[#00c5a8] text-[#0a1638] border-0 font-bold">Contact Us</Button>
            </div>
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
