import { NextResponse } from "next/server"

// Mock projects data (in production, fetch from MongoDB)
const projectsData = [
  {
    id: 1,
    title: "AI Automation Suite",
    description: "Intelligent workflow automation using LLMs and custom APIs",
    tech: ["Next.js", "OpenAI", "Node.js"],
    image: "/projects/ai-suite.png",
  },
  {
    id: 2,
    title: "Real-time Data Dashboard",
    description: "Live analytics dashboard with WebSocket integration",
    tech: ["React", "MongoDB", "Socket.io"],
    image: "/projects/dashboard.png",
  },
  {
    id: 3,
    title: "Retro CLI Tool",
    description: "Terminal-based project management with synthwave vibes",
    tech: ["Node.js", "Chalk", "Inquirer"],
    image: "/projects/cli-tool.png",
  },
]

export async function GET() {
  return NextResponse.json({
    success: true,
    data: projectsData,
  })
}
