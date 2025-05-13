"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, CreditCard, HelpCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Define credit packages with the 15% markup applied
const MARKUP_PERCENTAGE = 15

const creditPackages = [
  {
    id: "starter",
    name: "Starter",
    credits: 500,
    price: 18.4, // 500 * 0.0368 = £18.40
    pricePerSMS: 3.68, // 3.20p + 15% markup
    popular: false,
    description: "Perfect for small businesses just getting started with SMS marketing",
  },
  {
    id: "basic",
    name: "Basic",
    credits: 2000,
    price: 73.6, // 2000 * 0.0368 = £73.60
    pricePerSMS: 3.68, // 3.20p + 15% markup
    popular: false,
    description: "Ideal for regular SMS campaigns to a moderate customer base",
  },
  {
    id: "standard",
    name: "Standard",
    credits: 5000,
    price: 174.0, // 5000 * 0.0348 = £174.00
    pricePerSMS: 3.48, // 3.03p + 15% markup
    popular: true,
    description: "Our most popular package for growing businesses",
    savings: "5.4% savings per SMS",
  },
  {
    id: "premium",
    name: "Premium",
    credits: 50000,
    price: 1635.0, // 50000 * 0.0327 = £1,635.00
    pricePerSMS: 3.27, // 2.84p + 15% markup
    popular: false,
    description: "For businesses with large customer bases and frequent campaigns",
    savings: "11.1% savings per SMS",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    credits: 150000,
    price: 4440.0, // 150000 * 0.0296 = £4,440.00
    pricePerSMS: 2.96, // 2.57p + 15% markup
    popular: false,
    description: "Enterprise-level solution for maximum reach and engagement",
    savings: "19.6% savings per SMS",
  },
]

// Pricing tiers information
const pricingTiers = [
  { volume: "Under 5,000", basePrice: "3.20p", withMarkup: "3.68p", savings: "0%" },
  { volume: "5,000+", basePrice: "3.03p", withMarkup: "3.48p", savings: "5.4%" },
  { volume: "50,000+", basePrice: "2.84p", withMarkup: "3.27p", savings: "11.1%" },
  { volume: "150,000+", basePrice: "2.57p", withMarkup: "2.96p", savings: "19.6%" },
]

export default function SMSCreditsPage() {
  const [selectedPackage, setSelectedPackage] = useState(creditPackages[2]) // Default to Standard
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handlePurchase = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/payments/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageId: selectedPackage.id,
          credits: selectedPackage.credits,
          price: selectedPackage.price,
        }),
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        console.error("Failed to create checkout session")
      }
    } catch (error) {
      console.error("Error creating checkout session:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-3xl font-bold">SMS Credits</h1>
        <p className="text-gray-500 mt-2">Purchase SMS credits to send messages to your customers</p>
      </div>

      {/* Pricing Tiers Information Card */}
      <Card className="mb-8 bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="mr-2 h-5 w-5 text-blue-500" />
            SMS Pricing Tiers
          </CardTitle>
          <CardDescription>
            Our SMS pricing includes a 15% service fee and offers volume discounts for larger purchases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-700 mb-2">
            <div>Volume</div>
            <div>Base Price</div>
            <div>Your Price (incl. 15% fee)</div>
            <div>Savings</div>
          </div>
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`grid grid-cols-4 gap-4 text-sm py-2 ${
                index < pricingTiers.length - 1 ? "border-b border-blue-100" : ""
              }`}
            >
              <div className="font-medium">{tier.volume}</div>
              <div>{tier.basePrice}</div>
              <div>{tier.withMarkup}</div>
              <div>{tier.savings}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Tabs defaultValue="packages" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="packages">Credit Packages</TabsTrigger>
          <TabsTrigger value="custom">Custom Amount</TabsTrigger>
        </TabsList>

        <TabsContent value="packages" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creditPackages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`relative overflow-hidden ${
                  selectedPackage.id === pkg.id
                    ? "border-2 border-blue-500 shadow-lg"
                    : "border border-gray-200 hover:border-blue-300 hover:shadow-md"
                } transition-all duration-200`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-bold">
                    MOST POPULAR
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">£{pkg.price.toFixed(2)}</span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{pkg.credits.toLocaleString()} SMS credits</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>
                        {typeof pkg.pricePerSMS === "number" ? pkg.pricePerSMS.toFixed(2) : "0.00"}p per SMS (includes
                        15% service fee)
                      </span>
                    </li>
                    {pkg.savings && (
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-blue-600 font-medium">{pkg.savings}</span>
                      </li>
                    )}
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>No expiration date</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${selectedPackage.id === pkg.id ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                    onClick={() => setSelectedPackage(pkg)}
                    variant={selectedPackage.id === pkg.id ? "default" : "outline"}
                  >
                    {selectedPackage.id === pkg.id ? "Selected" : "Select Package"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">{selectedPackage.name} Package</span>
                    <span>£{selectedPackage.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Credits</span>
                    <span>{selectedPackage.credits.toLocaleString()} SMS</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span className="flex items-center">
                      Price per SMS
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="font-medium">SMS Pricing Details</h4>
                            <p className="text-sm text-gray-500">
                              Price includes a 15% service fee on top of our base SMS rates. Higher volume packages
                              receive discounted rates.
                            </p>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </span>
                    <span>
                      {typeof selectedPackage.pricePerSMS === "number"
                        ? selectedPackage.pricePerSMS.toFixed(2)
                        : "0.00"}
                      p
                    </span>
                  </div>
                  <div className="pt-4 border-t border-gray-200 flex justify-between font-bold">
                    <span>Total</span>
                    <span>£{selectedPackage.price.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full flex items-center justify-center"
                  size="lg"
                  onClick={handlePurchase}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-5 w-5" /> Proceed to Checkout
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>Custom Credit Amount</CardTitle>
              <CardDescription>Coming soon! Contact support for custom credit packages.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-gray-500">
                For custom credit amounts or enterprise pricing, please contact our sales team.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">Contact Sales</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Do SMS credits expire?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>No, your SMS credits never expire. Use them at your own pace.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How are SMS credits calculated?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                One credit equals one standard SMS message (160 characters). Longer messages may use multiple credits.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>We accept all major credit cards through our secure payment processor, Stripe.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Why is there a 15% service fee?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                The 15% service fee covers our operational costs, including SMS delivery infrastructure, reliability
                improvements, and customer support.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

