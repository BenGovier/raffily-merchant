import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getAuthorizationUrl, refreshAccessToken } from "@/lib/calendly"

export async function GET() {
  const authUrl = getAuthorizationUrl()
  return NextResponse.redirect(authUrl)
}

export async function POST(request: Request) {
  const cookieStore = cookies()
  let accessToken = cookieStore.get("calendly_access_token")?.value
  const refreshToken = cookieStore.get("calendly_refresh_token")?.value

  if (!accessToken && refreshToken) {
    try {
      const tokenData = await refreshAccessToken(refreshToken)
      accessToken = tokenData.access_token
    } catch (error) {
      return NextResponse.json({ error: "Failed to refresh token" }, { status: 401 })
    }
  }

  if (!accessToken) {
    return NextResponse.json({ error: "No access token" }, { status: 401 })
  }

  const body = await request.json()
  const { action, ...data } = body

  try {
    switch (action) {
      case "getSlots":
        const slots = await fetch("https://api.calendly.com/scheduled_events", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        const slotsData = await slots.json()
        return NextResponse.json(slotsData)

      case "book":
        const booking = await fetch("https://api.calendly.com/scheduling_links", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        const bookingData = await booking.json()
        return NextResponse.json(bookingData)

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: "Calendly API error" }, { status: 500 })
  }
}
