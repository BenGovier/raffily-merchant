import crypto from "crypto"

const CALENDLY_CLIENT_ID = process.env.NEXT_PUBLIC_CALENDLY_CLIENT_ID!
const CALENDLY_CLIENT_SECRET = process.env.CALENDLY_CLIENT_SECRET!
const CALENDLY_REDIRECT_URI = process.env.NEXT_PUBLIC_CALENDLY_REDIRECT_URI!

function generateCodeVerifier() {
  return crypto.randomBytes(32).toString("base64url")
}

function generateCodeChallenge(verifier: string) {
  return crypto.createHash("sha256").update(verifier).digest("base64url")
}

export function getAuthorizationUrl() {
  const codeVerifier = generateCodeVerifier()
  const codeChallenge = generateCodeChallenge(codeVerifier)

  const params = new URLSearchParams({
    client_id: CALENDLY_CLIENT_ID,
    response_type: "code",
    redirect_uri: CALENDLY_REDIRECT_URI,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  })

  // Store the code verifier in the session or a secure cookie
  // This is just a placeholder - implement secure storage as per your app's needs
  // sessionStorage.setItem('code_verifier', codeVerifier)

  return `https://auth.calendly.com/oauth/authorize?${params.toString()}`
}

export async function exchangeCodeForToken(code: string, codeVerifier: string) {
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
      client_id: CALENDLY_CLIENT_ID,
      code_verifier: codeVerifier,
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
    const errorText = await response.text()
    console.error("Error refreshing token:", response.status, response.statusText, errorText)
    throw new Error(`Failed to refresh access token: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function getAccessToken() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get("calendly_access_token")?.value
  const refreshToken = cookieStore.get("calendly_refresh_token")?.value

  if (accessToken) {
    return accessToken
  } else if (refreshToken) {
    try {
      const tokenData = await refreshAccessToken(refreshToken)
      return tokenData.access_token
    } catch (error) {
      console.error("Error refreshing access token:", error)
      return null
    }
  } else {
    return null
  }
}
