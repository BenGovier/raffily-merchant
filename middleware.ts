import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Skip middleware for login page and API routes
  if (request.nextUrl.pathname === "/admin/login" || request.nextUrl.pathname.includes("/api/")) {
    return NextResponse.next()
  }

  // Check if the request is for an admin page
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Check if the user is authenticated via cookies
    const adminLoggedIn = request.cookies.get("adminLoggedIn")?.value === "true"

    // If not authenticated, redirect to login
    if (!adminLoggedIn) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

