const CALENDLY_CLIENT_ID = process.env.NEXT_PUBLIC_CALENDLY_CLIENT_ID!
const CALENDLY_CLIENT_SECRET = process.env.CALENDLY_CLIENT_SECRET!
const CALENDLY_REDIRECT_URI = process.env.NEXT_PUBLIC_CALENDLY_REDIRECT_URI!

export function getAuthorizationUrl() {
  const params = new URLSearchParams({
    client_id: CALENDLY_CLIENT_ID,
    response_type: "code",
    redirect_uri: CALENDLY_REDIRECT_URI,
  })

  return `https://auth.calendly.com/oauth/authorize?${params.toString()}`
}

export async function exchangeCodeForToken(code: string) {
  const response = await fetch("https://auth.calendly.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${CALENDLY_CLIENT_ID}:${CALENDLY_CLIENT_SECRET}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: CALENDLY_REDIRECT_URI,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to exchange code for token")
  }

  return response.json()
}

export async function refreshAccessToken(refreshToken: string) {
  const response = await fetch("https://auth.calendly.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${CALENDLY_CLIENT_ID}:${CALENDLY_CLIENT_SECRET}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: CALENDLY_CLIENT_ID,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to refresh access token")
  }

  return response.json()
}

