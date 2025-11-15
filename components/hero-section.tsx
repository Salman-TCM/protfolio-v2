"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function HeroSection() {
  const [displayText, setDisplayText] = useState("")
  const fullText = "> Hello, I'm Salman Hossain_"
  const subText = "> Software Engineer | Automation & AI Enthusiast"

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl text-center"
      >
        {/* Terminal window frame */}
        <div className="border-2 border-white border-white p-8 mb-8 bg-black/80 backdrop-blur">
          {/* Terminal header */}
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/50">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-white rounded-full" />
              <div className="w-3 h-3 bg-white rounded-full" />
              <div className="w-3 h-3 bg-gray rounded-full" />
            </div>
            <span className="text-xs text-white/60 ml-auto">WELCOME_TERMINAL.exe</span>
          </div>

          {/* Terminal content */}
          <div className="font-mono text-left space-y-4">
            <div className="text-white text-xl md:text-2xl">
              {displayText}
              <span className="cursor ml-2">|</span>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5 }}
              className="text-white text-sm md:text-lg"
            >
              {subText}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5 }}
              className="pt-4 space-y-2 text-white text-xs md:text-sm"
            >
              <p>{"> System Status: ONLINE ✓"}</p>
              <p>{"> Terminal Mode: ACTIVE"}</p>
              <p className="text-gray">{'> Type "help" for available commands'}</p>
            </motion.div>
          </div>
        </div>

        {/* Animated CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.5 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <button className="px-6 py-2 border-2 border-white text-white hover:bg-white/10 hover:shadow-lg transition-all border-white font-mono">
            {"> EXPLORE"}
          </button>
          <button className="px-6 py-2 border-2 border-white text-white hover:bg-white/10 transition-all border-white font-mono">
            {"> CONTACT"}
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}
