import type { NextRequest } from "next/server"
import { UserModel } from "@/models/user"
import { ObjectId } from "mongodb"
import { validateRequest } from "@/lib/api-validation"
import { successResponse, errorResponse, notFoundResponse } from "@/lib/api-response"
import { z } from "zod"
import { getToken } from "next-auth/jwt"

const updateUserSchema = z.object({
  id: z.string().min(1, "User ID is required"),
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  company: z.string().optional(),
  companyLogo: z.string().optional(),
  billingEmail: z.string().email("Invalid billing email").optional(),
  phone: z.string().optional(),
  status: z.enum(["active", "inactive", "suspended"]).optional(),
  plan: z.string().optional(),
})

export async function PUT(request: NextRequest) {
  try {
    // Validate request body
    const validation = await validateRequest(request, updateUserSchema)
    if (!validation.success) {
      return validation.response
    }

    const { id, ...updateData } = validation.data

    // Get the authenticated user
    const token = await getToken({ req: request })

    // Check if user is updating their own profile or is an admin
    if (token?.id !== id && token?.role !== "admin") {
      return errorResponse("Forbidden: You can only update your own profile", 403)
    }

    // Update user
    const success = await UserModel.update(new ObjectId(id), updateData)

    if (!success) {
      return notFoundResponse("User")
    }

    // Get updated user
    const updatedUser = await UserModel.findById(id)

    if (!updatedUser) {
      return errorResponse("Failed to retrieve updated user", 500)
    }

    // Don't return the password
    const { password: _, ...userWithoutPassword } = updatedUser

    // Convert MongoDB _id to id for frontend consistency
    const userForClient = {
      ...userWithoutPassword,
      id: userWithoutPassword._id?.toString(),
    }

    return successResponse({ user: userForClient })
  } catch (error) {
    console.error("Error updating user:", error)
    return errorResponse("An error occurred while updating user", 500)
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get the authenticated user from the token
    const token = await getToken({ req: request })

    if (!token?.id) {
      return errorResponse("Unauthorized", 401)
    }

    // Get user details
    const user = await UserModel.findById(token.id)

    if (!user) {
      return notFoundResponse("User")
    }

    // Don't return the password
    const { password: _, ...userWithoutPassword } = user

    return successResponse({
      user: {
        ...userWithoutPassword,
        id: userWithoutPassword._id?.toString(),
        _id: undefined,
      },
    })
  } catch (error) {
    console.error("Error fetching user:", error)
    return errorResponse("An error occurred while fetching user", 500)
  }
}
