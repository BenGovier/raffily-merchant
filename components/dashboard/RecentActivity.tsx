"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div className="flex items-center" key={index}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.avatar} alt="Avatar" />
            <AvatarFallback>{activity.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.name}</p>
            <p className="text-sm text-muted-foreground">{activity.action}</p>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">{activity.time}</div>
        </div>
      ))}
    </div>
  )
}

const activities = [
  {
    name: "John Smith",
    action: "Entered the iPhone 14 raffle",
    time: "2h ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Sarah Johnson",
    action: "Entered the PS5 giveaway",
    time: "4h ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Michael Brown",
    action: "Entered the Amazon gift card raffle",
    time: "1d ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Emily Davis",
    action: "Entered the vacation package raffle",
    time: "2d ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "David Wilson",
    action: "Entered the MacBook Pro raffle",
    time: "3d ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]
