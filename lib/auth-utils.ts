import { cookies } from "next/headers"

export async function getCurrentUser() {
  const cookieStore = cookies()
  const userCookie = cookieStore.get("user")?.value

  if (userCookie) {
    try {
      return JSON.parse(userCookie)
    } catch (error) {
      console.error("Error parsing user cookie:", error)
      return null
    }
  } else {
    return null
  }
}
