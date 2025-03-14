import { NextResponse } from "next/server"
import { getAuthorizationUrl } from "@/lib/calendly-auth"

export async function GET() {
  const authUrl = getAuthorizationUrl()
  return NextResponse.redirect(authUrl)
}

