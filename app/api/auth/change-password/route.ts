import type { NextRequest } from "next/server"
import { UserModel } from "@/models/user"
import { validateRequest } from "@/lib/api-validation"
import { successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-response"
import { z } from "zod"
import { getToken } from "next-auth/jwt"
import { comparePassword } from "@/lib/password-utils"

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
})

export async function POST(request: NextRequest) {
  try {
    // Validate request body
    const validation = await validateRequest(request, changePasswordSchema)
    if (!validation.success) {
      return validation.response
    }

    const { currentPassword, newPassword } = validation.data

    // Get the authenticated user
    const token = await getToken({ req: request })

    if (!token?.id) {
      return unauthorizedResponse()
    }

    // Get the user from the database
    const user = await UserModel.findById(token.id)

    if (!user) {
      return errorResponse("User not found", 404)
    }

    // Verify current password
    const isPasswordValid = await comparePassword(currentPassword, user.password)

    if (!isPasswordValid) {
      return errorResponse("Current password is incorrect", 400)
    }

    // Change password
    const success = await UserModel.changePassword(user._id!, newPassword)

    if (!success) {
      return errorResponse("Failed to change password", 500)
    }

    return successResponse({ message: "Password changed successfully" })
  } catch (error) {
    console.error("Error changing password:", error)
    return errorResponse("An error occurred while changing password", 500)
  }
}
