import Image from "next/image"
import { Check, Gift, Mail, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Keep existing navigation */}

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#110044] to-[#1a0066] py-16 md:py-24">
        <div className="absolute inset-0 opacity-20">
          <Image src="/placeholder.svg?key=fz80f" alt="Confetti Background" fill className="object-cover" />
        </div>

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
                  className="bg-gradient-to-r from-[#F471B5] to-[#B878F1] hover:opacity-90 text-white border-0 h-12 px-6 text-base"
                >
                  <Check className="mr-2 h-5 w-5" /> Start Free – We'll Provide the Prize
                </Button>
                <p className="text-sm text-white/70">No prize costs. No tech skills. Just results.</p>
              </div>
            </div>

            <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
              <div className="relative w-[280px] md:w-[320px] h-[560px] md:h-[640px] transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <Image src="/placeholder.svg?key=2xnzg" alt="Raffily Mobile App" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Countdown Strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#F471B5]/90 to-[#B878F1]/90 py-3 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <p className="text-center text-white font-medium">
              ⏳ Entries for the £5,000 Mega Prize close in: <span className="font-bold">21 days, 3 hours</span>
            </p>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Made for Modern Marketers, Founders & CRM Teams</h2>
            <p className="text-lg text-gray-600">
              Raffily helps you connect, reward, and retain — no matter your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: "E-commerce & Retail",
                description: "Turn one-time shoppers into loyal customers.",
                icon: "shopping bag icon",
              },
              {
                title: "SaaS & Subscription Apps",
                description: "Boost engagement, reduce churn — automatically.",
                icon: "recurring subscription icon",
              },
              {
                title: "Financial Services & Applications",
                description: "Convert more signups with powerful incentives.",
                icon: "financial growth chart",
              },
            ].map((card, index) => (
              <Card
                key={index}
                className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="h-12 w-12 mb-4 rounded-full bg-gradient-to-r from-[#F471B5]/10 to-[#B878F1]/10 flex items-center justify-center">
                  <Image
                    src={`/abstract-geometric-shapes.png?height=48&width=48&query=${card.icon}`}
                    alt={card.title}
                    width={24}
                    height={24}
                    className="opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </Card>
            ))}
          </div>

          {/* Brand Logos */}
          <div className="py-8 border-t border-b border-gray-100">
            <p className="text-center text-sm text-gray-500 mb-6">Trusted by innovative brands</p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {[1, 2, 3, 4, 5, 6].map((logo) => (
                <div key={logo} className="grayscale hover:grayscale-0 transition-all duration-300">
                  <Image
                    src="/placeholder-logo.svg"
                    alt="Partner Logo"
                    width={120}
                    height={40}
                    className="h-8 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Case Benefits Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Drive More Opens. More Clicks. More Loyalty.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Gift className="h-8 w-8 text-[#F471B5]" />,
                title: "The Ultimate Thank You",
                description: "Surprise loyal customers with a chance to win — we handle the prize.",
              },
              {
                icon: <Mail className="h-8 w-8 text-[#B878F1]" />,
                title: "Emails People Want to Open",
                description: "Attach a high-value prize to your next campaign and see open rates skyrocket.",
              },
              {
                icon: <ShoppingCart className="h-8 w-8 text-[#F471B5]" />,
                title: "Add Excitement to Any Funnel",
                description: "Whether it's a sign-up form, application or basket — increase conversion with one click.",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              >
                <div className="mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-gradient-to-r from-[#F471B5] to-[#B878F1] hover:opacity-90 text-white border-0">
              ⚡ Use Raffily's £5,000 prize this month – for free
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Today in Just 3 Steps</h2>
          </div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#F471B5] to-[#B878F1] rounded-l-lg"
              >
                ✅ Use Raffily's Prize
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-lg hover:bg-gray-100"
              >
                🪙 Bring Your Own Prize
              </button>
            </div>
          </div>

          <div className="relative">
            {/* Timeline connector */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#F471B5] to-[#B878F1] hidden md:block transform -translate-x-1/2"></div>

            <div className="space-y-12 relative">
              {[
                {
                  number: "1",
                  title: "Choose Your Prize",
                  description: "Use our Mega Prize or upload your own",
                },
                {
                  number: "2",
                  title: "Share Your Entry Link",
                  description: "Or plug directly into your app or checkout",
                },
                {
                  number: "3",
                  title: "Grow With Every Entry",
                  description: "Get engagement, insights & brand love",
                },
              ].map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                  <div className={`md:w-1/2 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                    <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300 border border-gray-100">
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-center z-10">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#F471B5] to-[#B878F1] flex items-center justify-center text-white font-bold">
                      {step.number}
                    </div>
                  </div>

                  <div className={`md:w-1/2 ${index % 2 === 1 ? "md:order-1" : ""} hidden md:block`}>
                    {/* Placeholder for potential illustrations */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Block */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Free. Scale When You're Ready.</h2>
            <p className="text-lg text-gray-600">
              No long contracts. No setup fees. Flexible options for every business.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <Card className="border-2 border-[#B878F1] p-8 rounded-xl shadow-lg">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Business Plan</h3>
                <p className="text-4xl font-bold mb-2">
                  From £149<span className="text-lg font-normal text-gray-500">/mo</span>
                </p>
                <p className="text-gray-600 mb-6">includes a £5,000 customer prize</p>

                <ul className="space-y-3 text-left mb-8">
                  {[
                    "Unlimited raffles",
                    "Full analytics dashboard",
                    "Custom branding",
                    "API access",
                    "Priority support",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-[#F471B5] mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full bg-gradient-to-r from-[#F471B5] to-[#B878F1] hover:opacity-90 text-white border-0">
                  Explore Pricing Plans
                </Button>
              </div>
            </Card>

            <p className="text-center text-sm text-gray-500 mt-4">
              Prefer pay-as-you-go? Use your own prize for just £0.75 per ticket.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials & Trust Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Businesses Who Put Their Customers First</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
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
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 border border-gray-200 rounded-xl">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-lg mb-4 flex-grow">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Partner logos */}
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {[1, 2, 3, 4, 5, 6].map((logo) => (
              <div key={logo} className="grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                  src="/placeholder-logo.svg"
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

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "Can I use my own prize?",
                  answer:
                    "Yes! You can use your own prize or take advantage of our £5,000 Mega Prize at no cost to you. Using your own prize gives you more flexibility with a pay-as-you-go pricing model.",
                },
                {
                  question: "What's included with the Mega Prize?",
                  answer:
                    "The £5,000 Mega Prize is fully funded by Raffily. It includes prize administration, winner selection, and prize fulfillment. You get all the benefits of offering a high-value prize without any of the costs or administrative burden.",
                },
                {
                  question: "How are winners chosen?",
                  answer:
                    "Winners are selected randomly using our secure prize draw system. The process is fully transparent and compliant with all relevant regulations. Winners are notified automatically, and you'll receive a notification as well.",
                },
                {
                  question: "Is it free to start?",
                  answer:
                    "Yes! You can start using Raffily completely free. We offer a generous free tier that includes access to our £5,000 Mega Prize. As your needs grow, you can upgrade to our paid plans for additional features and customization options.",
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
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-[#110044] to-[#1a0066]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?key=fmlkx')] bg-repeat opacity-20"></div>
        </div>

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
              className="bg-gradient-to-r from-[#F471B5] to-[#B878F1] hover:opacity-90 text-white border-0 h-12 px-8 text-base animate-pulse"
            >
              🎉 Launch Your Free Raffle Now
            </Button>
          </div>
        </div>
      </section>

      {/* Keep existing footer */}
    </main>
  )
}
