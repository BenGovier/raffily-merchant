"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Gift } from "lucide-react"
import Link from "next/link"

export function RecentRaffles() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {raffles.map((raffle) => (
        <Card
          key={raffle.id}
          className="overflow-hidden border-t-2 border-t-[#00B8A9] hover:shadow-md transition-shadow"
        >
          <div className="relative h-48 bg-gray-100">
            <div className="absolute top-2 right-2">
              <Badge
                className={
                  raffle.status === "active"
                    ? "bg-green-500"
                    : raffle.status === "scheduled"
                      ? "bg-blue-500"
                      : raffle.status === "completed"
                        ? "bg-gray-500"
                        : "bg-yellow-500"
                }
              >
                {raffle.status.charAt(0).toUpperCase() + raffle.status.slice(1)}
              </Badge>
            </div>
            <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Gift className="h-12 w-12 text-gray-400" />
            </div>
          </div>
          <CardHeader className="p-4 bg-white">
            <CardTitle className="text-lg">{raffle.title}</CardTitle>
            <CardDescription className="line-clamp-2">{raffle.description}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0 bg-white">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4 text-[#00B8A9]" />
                <span>{raffle.duration}</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-1 h-4 w-4 text-[#FD8E8E]" />
                <span>{raffle.entries} entries</span>
              </div>
              <div className="col-span-2">
                <span className="font-medium">Prize:</span> {raffle.prize}
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 border-t bg-gray-50">
            <Link href={`/dashboard/raffles/${raffle.id}`} className="w-full">
              <Button variant="outline" className="w-full hover:bg-[#00B8A9] hover:text-white transition-colors">
                View Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

const raffles = [
  {
    id: "1",
    title: "iPhone 14 Pro Giveaway",
    description: "Win the latest iPhone 14 Pro in your choice of color.",
    prize: "iPhone 14 Pro",
    duration: "Ends in 5 days",
    entries: 1245,
    status: "active",
  },
  {
    id: "2",
    title: "PlayStation 5 Bundle",
    description: "Win a PS5 console with 2 controllers and 3 games.",
    prize: "PS5 Bundle",
    duration: "Ends in 10 days",
    entries: 987,
    status: "active",
  },
  {
    id: "3",
    title: "$500 Amazon Gift Card",
    description: "Win a $500 Amazon gift card to spend on anything you want.",
    prize: "$500 Gift Card",
    duration: "Starts in 2 days",
    entries: 0,
    status: "scheduled",
  },
  {
    id: "4",
    title: "MacBook Pro Giveaway",
    description: "Win a brand new MacBook Pro with M2 chip.",
    prize: "MacBook Pro",
    duration: "Ended on Jul 15",
    entries: 2341,
    status: "completed",
  },
  {
    id: "5",
    title: "Luxury Vacation Package",
    description: "Win a 7-day luxury vacation for two to the Maldives.",
    prize: "Vacation Package",
    duration: "Ends in 15 days",
    entries: 567,
    status: "active",
  },
  {
    id: "6",
    title: "Gaming PC Setup",
    description: "Win a complete gaming PC setup with RTX 4080.",
    prize: "Gaming PC",
    duration: "Draft",
    entries: 0,
    status: "draft",
  },
]
