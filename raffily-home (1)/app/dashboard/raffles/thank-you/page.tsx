import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, ArrowRight } from "lucide-react"

export default function RaffleThankYou() {
  return (
    <div className="max-w-md mx-auto mt-12">
      <Card className="border-2 border-[#00B8A9]">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-[#00B8A9]/10 w-16 h-16 rounded-full flex items-center justify-center">
            <Clock className="h-8 w-8 text-[#00B8A9]" />
          </div>
          <CardTitle className="text-2xl">Raffle Submitted!</CardTitle>
          <CardDescription>Your raffle is now in the review queue</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="space-y-4">
            <p className="text-gray-600">
              Thank you for submitting your raffle. Our team will review your submission within 24 hours.
            </p>

            <div className="bg-blue-50 p-4 rounded-lg text-left">
              <h3 className="font-medium text-blue-800 mb-2">What happens next?</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                  <span>Our team will review your raffle details and images</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                  <span>You'll receive an email notification when your raffle is approved</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                  <span>Once approved, your raffle will go live according to your selected schedule</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full bg-[#00B8A9] hover:bg-[#00B8A9]/90">
            <Link href="/dashboard/raffles">
              View Your Raffles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard">Return to Dashboard</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

