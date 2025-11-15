import { NextResponse } from "next/server"

// Mock blog posts (in production, fetch from MongoDB)
const blogPosts = [
  {
    id: 1,
    title: "Building Retro UIs with Modern Web Tech",
    date: "2024-01-15",
    excerpt: "Explore how to create synthwave and cyberpunk aesthetics using React, Framer Motion, and Tailwind CSS.",
    category: "Design",
    readTime: 8,
    slug: "retro-ui-modern-tech",
  },
  {
    id: 2,
    title: "AI Automation: From Concept to Production",
    date: "2024-01-10",
    excerpt: "Deep dive into implementing AI-powered automation workflows with OpenAI APIs and Node.js.",
    category: "AI/ML",
    readTime: 12,
    slug: "ai-automation-production",
  },
]

export async function GET() {
  return NextResponse.json({
    success: true,
    data: blogPosts,
  })
}
