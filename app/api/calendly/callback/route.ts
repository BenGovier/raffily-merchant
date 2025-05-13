import { NextResponse } from "next/server"
import { exchangeCodeForToken } from "@/lib/calendly-auth"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 })
  }

  try {
    // In a real application, you would securely retrieve the code verifier here
    // For this example, we're using a placeholder
    const codeVerifier = "PLACEHOLDER_CODE_VERIFIER"
    const tokenData = await exchangeCodeForToken(code, codeVerifier)

    // Here, you should store the token data securely (e.g., in a database)
    // For this example, we'll just set it in a cookie
    const response = NextResponse.redirect("/request-demo")
    response.cookies.set("calendly_access_token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: tokenData.expires_in,
    })
    response.cookies.set("calendly_refresh_token", tokenData.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    return response
  } catch (error) {
    console.error("Error exchanging code for token:", error)
    return NextResponse.json({ error: "Failed to exchange code for token" }, { status: 500 })
  }
}
