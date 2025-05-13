import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { refreshAccessToken } from "@/lib/calendly-auth"

export async function GET() {
  const cookieStore = cookies()
  let accessToken = cookieStore.get("calendly_access_token")?.value
  const refreshToken = cookieStore.get("calendly_refresh_token")?.value

  if (!accessToken && refreshToken) {
    try {
      const tokenData = await refreshAccessToken(refreshToken)
      accessToken = tokenData.access_token
      // Update the access token cookie
      cookieStore.set("calendly_access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: tokenData.expires_in,
      })
    } catch (error) {
      console.error("Error refreshing access token:", error)
      return NextResponse.json({ error: "Failed to refresh access token" }, { status: 401 })
    }
  }

  if (!accessToken) {
    return NextResponse.json({ error: "No access token available" }, { status: 401 })
  }

  try {
    // Fetch the user's data
    const userResponse = await fetch("https://api.calendly.com/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!userResponse.ok) {
      const errorText = await userResponse.text()
      console.error("Error fetching user data:", userResponse.status, userResponse.statusText, errorText)
      throw new Error(`Failed to fetch user data: ${userResponse.status} ${userResponse.statusText}`)
    }

    const userData = await userResponse.json()

    // Fetch available time slots
    const now = new Date()
    const twoWeeksFromNow = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)
    const availableSlotsUri = `https://api.calendly.com/scheduled_events?user=${userData.resource.uri}&min_start_time=${now.toISOString()}&max_start_time=${twoWeeksFromNow.toISOString()}&status=active`

    const slotsResponse = await fetch(availableSlotsUri, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!slotsResponse.ok) {
      const errorText = await slotsResponse.text()
      console.error("Error fetching available slots:", slotsResponse.status, slotsResponse.statusText, errorText)
      throw new Error(`Failed to fetch available slots: ${slotsResponse.status} ${slotsResponse.statusText}`)
    }

    const slotsData = await slotsResponse.json()

    return NextResponse.json(slotsData.collection)
  } catch (error) {
    console.error("Error in GET /api/calendly/available-slots:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unexpected error occurred" },
      { status: 500 },
    )
  }
}

