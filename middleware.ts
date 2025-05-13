import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  // Skip middleware for public routes and API auth routes
  if (
    request.nextUrl.pathname === "/auth/login" ||
    request.nextUrl.pathname === "/auth/register" ||
    request.nextUrl.pathname === "/admin/login" ||
    request.nextUrl.pathname.startsWith("/api/auth/") ||
    request.nextUrl.pathname === "/api/webhooks/" ||
    request.nextUrl.pathname === "/api/raffles" // Allow raffle creation without middleware check
  ) {
    return NextResponse.next()
  }

  // Check if the request is for an API route that requires authentication
  if (request.nextUrl.pathname.startsWith("/api/")) {
    // For API routes, check for JWT token
    const token = await getToken({ req: request })

    // Also check for user cookie
    const userCookie = request.cookies.get("user")?.value

    if (!token && !userCookie) {
      return NextResponse.json({ error: "Unauthorized: Authentication required" }, { status: 401 })
    }

    // For admin-only API routes, check role
    if (request.nextUrl.pathname.startsWith("/api/admin/")) {
      const role = token?.role || (userCookie ? JSON.parse(userCookie).role : null)
      if (role !== "admin") {
        return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 })
      }
    }

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

  // For dashboard routes, check if user is logged in
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const userCookie = request.cookies.get("user")?.value

    if (!userCookie) {
      // Check localStorage as fallback (for existing users)
      // This won't work server-side, but we'll handle it client-side as well
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/api/:path*"],
}

