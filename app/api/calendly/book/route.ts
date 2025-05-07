import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { refreshAccessToken } from "@/lib/calendly-auth"

export async function POST(req: Request) {
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

  const { slot } = await req.json()

  try {
    const bookingResponse = await fetch(slot.uri, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Add any additional booking details here
      }),
    })

    if (bookingResponse.ok) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: "Booking failed" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error booking slot:", error)
    return NextResponse.json({ success: false, error: "Booking failed" }, { status: 500 })
  }
}
