"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "$ welcome to contact terminal v1.0",
    "$ type your message to reach out",
    "$",
  ])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    setTerminalHistory((prev) => [
      ...prev,
      `> send message "name: ${formState.name}, email: ${formState.email}"`,
      "$ processing...",
    ])

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setTerminalHistory((prev) => [...prev, "$ message received successfully ✓", "$ thank you for reaching out!", "$"])
      setSubmitted(true)
      setFormState({ name: "", email: "", message: "" })

      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error"
      setTerminalHistory((prev) => [...prev, `$ error: ${errorMsg}`, "$ please try again later", "$"])
      setError(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative">
      {/* Background accent */}
      <div className="absolute -right-32 top-20 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none" />

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="max-w-2xl w-full relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">{"> Get in Touch_"}</h2>
          <p className="text-white/60 font-mono text-sm">{"// Open channel: let's collaborate or just chat"}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Terminal output */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="border-2 border-white p-6 bg-black/80 backdrop-blur border-white"
          >
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray/50">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray rounded-full" />
                <div className="w-2 h-2 bg-white rounded-full" />
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              <span className="text-xs text-gray/60 ml-auto">contact_terminal.log</span>
            </div>

            <div className="space-y-2 font-mono text-sm h-64 overflow-y-auto">
              {terminalHistory.map((line, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`${
                    line.includes("$")
                      ? "text-white"
                      : line.includes("✓")
                        ? "text-white"
                        : "text-gray"
                  }`}
                >
                  {line}
                </motion.p>
              ))}
              {isLoading && (
                <motion.span
                  animate={{ opacity: [0, 1] }}
                  transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                  className="text-white"
                >
                  _
                </motion.span>
              )}
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="border-2 border-white p-6 bg-black/80 backdrop-blur border-white"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-mono text-white mb-2">{"> name"}</label>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full bg-black border border-white/50 text-white px-4 py-2 font-mono text-sm placeholder-white/40 focus:outline-none focus:border-white focus:shadow-lg transition-all focus:shadow-white/50"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-white mb-2">{"> email"}</label>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full bg-black border border-white/50 text-white px-4 py-2 font-mono text-sm placeholder-white/40 focus:outline-none focus:border-white focus:shadow-lg transition-all focus:shadow-white/50"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-white mb-2">{"> message"}</label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message here..."
                  rows={4}
                  className="w-full bg-black border border-white/50 text-white px-4 py-2 font-mono text-sm placeholder-white/40 focus:outline-none focus:border-white focus:shadow-lg transition-all resize-none focus:shadow-white/50"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                type="submit"
                className="w-full py-3 bg-black border-2 border-white text-white font-mono text-sm hover:bg-white/10 disabled:opacity-50 transition-all "
              >
                {isLoading ? "> SENDING..." : "> SEND MESSAGE"}
              </motion.button>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-gray font-mono text-sm"
                >
                  ✗ Error: {error}
                </motion.p>
              )}

              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-white font-mono text-sm"
                >
                  ✓ Message sent successfully!
                </motion.p>
              )}
            </form>

            {/* Quick contact links */}
            <div className="mt-6 pt-6 border-t border-white/30 space-y-2">
              <p className="text-xs font-mono text-white mb-3">{"// or find me here"}</p>
              <div className="flex gap-4">
                <a href="#" className="text-white hover:text-white transition-colors text-xs font-mono">
                  GitHub
                </a>
                <a href="#" className="text-white hover:text-white transition-colors text-xs font-mono">
                  Twitter
                </a>
                <a href="#" className="text-white hover:text-white transition-colors text-xs font-mono">
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
