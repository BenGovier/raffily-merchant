import type { NextRequest } from "next/server"
import { EntryModel } from "@/models/entry"
import { RaffleModel } from "@/models/raffle"
import { successResponse, errorResponse, notFoundResponse, forbiddenResponse } from "@/lib/api-response"
import { getToken } from "next-auth/jwt"

// Helper function to check if user has access to an entry
async function checkEntryAccess(entryId: string, userId: string, isAdmin: boolean) {
  const entry = await EntryModel.findById(entryId)

  if (!entry) {
    return { access: false, entry: null, reason: "not_found" }
  }

  // Admins have access to all entries
  if (isAdmin) {
    return { access: true, entry, reason: null }
  }

  // Check if the user is the owner of the raffle this entry belongs to
  const raffle = await RaffleModel.findById(entry.raffleId)

  if (!raffle) {
    return { access: false, entry, reason: "raffle_not_found" }
  }

  const isOwner = raffle.merchantId.toString() === userId

  if (!isOwner) {
    return { access: false, entry, reason: "forbidden" }
  }

  return { access: true, entry, reason: null }
}

// GET a specific entry
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get the authenticated user
    const token = await getToken({ req: request })

    if (!token?.id) {
      return errorResponse("Unauthorized", 401)
    }

    // Check if user has access to the entry
    const { access, entry, reason } = await checkEntryAccess(params.id, token.id, token.role === "admin")

    if (!access) {
      if (reason === "not_found") {
        return notFoundResponse("Entry")
      } else if (reason === "raffle_not_found") {
        return notFoundResponse("Raffle associated with this entry")
      } else {
        return forbiddenResponse("You don't have access to this entry")
      }
    }

    return successResponse({
      entry: {
        ...entry,
        _id: entry._id?.toString(),
        raffleId: entry.raffleId.toString(),
      },
    })
  } catch (error) {
    console.error("Error fetching entry:", error)
    return errorResponse("Failed to fetch entry", 500)
  }
}

// DELETE an entry
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get the authenticated user
    const token = await getToken({ req: request })

    if (!token?.id) {
      return errorResponse("Unauthorized", 401)
    }

    // Check if user has access to the entry
    const { access, entry, reason } = await checkEntryAccess(params.id, token.id, token.role === "admin")

    if (!access) {
      if (reason === "not_found") {
        return notFoundResponse("Entry")
      } else if (reason === "raffle_not_found") {
        return notFoundResponse("Raffle associated with this entry")
      } else {
        return forbiddenResponse("You don't have access to this entry")
      }
    }

    // Delete the entry
    const success = await EntryModel.delete(params.id)

    if (!success) {
      return notFoundResponse("Entry")
    }

    // Decrement raffle entry count
    await RaffleModel.updateEntryCount(entry.raffleId.toString(), -1)

    return successResponse({ message: "Entry deleted successfully" })
  } catch (error) {
    console.error("Error deleting entry:", error)
    return errorResponse("Failed to delete entry", 500)
  }
}

