"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface BlogPost {
  id: number
  title: string
  date: string
  excerpt: string
  category: string
  readTime: number
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Retro UIs with Modern Web Tech",
    date: "2024-01-15",
    excerpt: "Explore how to create synthwave and cyberpunk aesthetics using React, Framer Motion, and Tailwind CSS.",
    category: "Design",
    readTime: 8,
  },
  {
    id: 2,
    title: "AI Automation: From Concept to Production",
    date: "2024-01-10",
    excerpt: "Deep dive into implementing AI-powered automation workflows with OpenAI APIs and Node.js.",
    category: "AI/ML",
    readTime: 12,
  },
  {
    id: 3,
    title: "Full-Stack Development Best Practices",
    date: "2024-01-05",
    excerpt: "A comprehensive guide to building scalable applications with Next.js, MongoDB, and modern tooling.",
    category: "Backend",
    readTime: 15,
  },
  {
    id: 4,
    title: "Terminal UIs: The Return of Retro Computing",
    date: "2023-12-28",
    excerpt: "Why terminal-based interfaces are making a comeback and how to build them with style.",
    category: "Frontend",
    readTime: 10,
  },
]

function BlogCard({ post }: { post: BlogPost }) {
  const [isHovered, setIsHovered] = useState(false)

  const categoryColors = {
    Design: "text-white",
    "AI/ML": "text-white",
    Backend: "text-gray",
    Frontend: "text-white",
  }

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ x: 10 }}
      className="border-l-2 border-white pl-6 py-4 relative group cursor-pointer"
    >
      {/* Animated line indicator */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0.3 }}
        className="absolute -left-1 top-0 w-1 h-full bg-white"
      />

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors">
            {post.title}
          </h3>
          <span
            className={`text-xs font-mono whitespace-nowrap ${categoryColors[post.category as keyof typeof categoryColors]}`}
          >
            [{post.category}]
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-white/60 font-mono">
          <span>{post.date}</span>
          <span>{`${post.readTime} min read`}</span>
        </div>

        <p className="text-white/70 text-sm leading-relaxed">{post.excerpt}</p>

        <motion.button
          whileHover={{ x: 5 }}
          className="text-sm font-mono text-white hover:text-white transition-colors mt-2"
        >
          {"> read more"}
        </motion.button>
      </div>
    </motion.div>
  )
}

export function BlogSection() {
  const [displayedLines, setDisplayedLines] = useState(0)
  const totalLines = blogPosts.length

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative">
      {/* Background accent */}
      <div className="absolute -left-32 top-1/2 w-64 h-64 bg-gray/20 rounded-full blur-3xl pointer-events-none" />

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="max-w-3xl w-full relative z-10">
        {/* Terminal-style header */}
        <div className="mb-12 border-2 border-white p-4 bg-black/80 backdrop-blur border-white">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/50">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-white rounded-full" />
              <div className="w-2 h-2 bg-white rounded-full" />
              <div className="w-2 h-2 bg-gray rounded-full" />
            </div>
            <span className="text-xs text-white/60 ml-auto">blog_viewer.log</span>
          </div>
          <p className="text-white font-mono text-sm">{"$ cat latest_posts.log"}</p>
        </div>

        {/* Blog posts - terminal style */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">{"> Latest Posts_"}</h2>
            <p className="text-white/60 font-mono text-sm">{"// Terminal blog feed - sorting by date DESC"}</p>
          </motion.div>

          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>

        {/* Terminal footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-white/30 text-white/60 font-mono text-xs space-y-2"
        >
          <p>{`// Total posts: ${totalLines} | Recent: Last 30 days`}</p>
          <p>{`$ _`}</p>
        </motion.div>

        {/* View all blogs button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <button className="px-8 py-3 border-2 border-white border-white text-white font-mono text-sm hover:bg-white/10 transition-all">
            {"> VIEW ALL ARTICLES"}
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}
