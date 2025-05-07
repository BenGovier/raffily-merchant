import { z } from "zod"
import { NextResponse } from "next/server"

export async function validateRequest<T>(
  request: Request,
  schema: z.ZodType<T>,
): Promise<{ success: true; data: T } | { success: false; response: NextResponse }> {
  try {
    const body = await request.json()
    const result = schema.safeParse(body)

    if (!result.success) {
      const formattedErrors = result.error.format()
      return {
        success: false,
        response: NextResponse.json({ error: "Validation error", details: formattedErrors }, { status: 400 }),
      }
    }

    return { success: true, data: result.data }
  } catch (error) {
    return {
      success: false,
      response: NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 }),
    }
  }
}

// Common validation schemas
export const idSchema = z.object({
  id: z.string().min(1, "ID is required"),
})

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
})
