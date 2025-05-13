import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Validate required fields
    const requiredFields = ["name", "email", "company", "phone", "industry"]
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ success: false, message: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Log the form submission (in a real app, you would save this to a database)
    console.log("Demo request received:", {
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      industry: data.industry,
      preferredDate: data.preferredDate || "Not specified",
      preferredTime: data.preferredTime || "Not specified",
      message: data.message || "None provided",
    })

    // Return success response
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing demo request:", error)
    return NextResponse.json({ success: false, message: "Failed to process request" }, { status: 500 })
  }
}
