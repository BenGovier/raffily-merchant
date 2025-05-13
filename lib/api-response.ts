import { NextResponse } from "next/server"

export function successResponse(data: any, status = 200) {
  return NextResponse.json({ success: true, ...data }, { status })
}

export function errorResponse(message: string, status = 500, details?: any) {
  return NextResponse.json(
    {
      success: false,
      error: message,
      ...(details ? { details } : {}),
    },
    { status },
  )
}

export function notFoundResponse(entity = "Resource") {
  return errorResponse(`${entity} not found`, 404)
}

export function badRequestResponse(message = "Bad request", details?: any) {
  return errorResponse(message, 400, details)
}

export function unauthorizedResponse(message = "Unauthorized") {
  return errorResponse(message, 401)
}

export function forbiddenResponse(message = "Forbidden") {
  return errorResponse(message, 403)
}
