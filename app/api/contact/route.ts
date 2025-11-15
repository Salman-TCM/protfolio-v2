import { type NextRequest, NextResponse } from "next/server"

// Mock database for storing messages (in production, use MongoDB/Mongoose)
const messages: Array<{
  id: string
  name: string
  email: string
  message: string
  timestamp: string
}> = []

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Create message object
    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    }

    // Store in mock database
    messages.push(newMessage)

    // In production, send email notification here
    console.log("[CONTACT] New message:", newMessage)

    return NextResponse.json(
      {
        success: true,
        message: "Message received successfully",
        data: newMessage,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[API ERROR]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    total: messages.length,
    messages: messages.slice(-5), // Return last 5 messages
  })
}
