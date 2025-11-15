"use client"

import { motion } from "framer-motion"

export function AboutSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      {/* Background accent */}
      <div className="absolute -left-32 top-20 w-64 h-64 bg-gray/20 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl relative z-10"
      >
        {/* Retro ASCII-style border card */}
        <div className="border-2 border-white p-8 bg-black/80 backdrop-blur border-white">
          {/* ASCII border pattern */}
          <div className="text-white/50 text-xs mb-6 font-mono">
            {`╔${"═".repeat(50)}╗`}
            {"\n"}
            {`║ SYSTEM.PROFILE.001 ${"┃".repeat(30)}`}
            {"\n"}
            {`╚${"═".repeat(50)}╝`}
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">{"> About Me_"}</h2>
              <p className="text-white/80 font-mono text-sm md:text-base leading-relaxed">
                Software engineer passionate about automation, AI integration, and building elegant solutions.
                Experienced in full-stack development with modern tech stacks. Always exploring new technologies and
                pushing the boundaries of web development.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="border border-white/50 p-4 hover:border-white hover:shadow-lg transition-all border-white/30"
              >
                <p className="text-white/60 text-xs mb-2 font-mono">SKILL_CATEGORY</p>
                <p className="text-white text-sm font-bold">Frontend</p>
                <p className="text-white/60 text-xs mt-1 font-mono">React | Next.js | TypeScript</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="border border-gray/50 p-4 hover:border-gray hover:shadow-lg transition-all"
              >
                <p className="text-gray/60 text-xs mb-2 font-mono">SKILL_CATEGORY</p>
                <p className="text-gray text-sm font-bold">Backend</p>
                <p className="text-gray/60 text-xs mt-1 font-mono">Node.js | MongoDB | APIs</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="border border-white/50 p-4 hover:border-white transition-all border-white/30"
              >
                <p className="text-white/60 text-xs mb-2 font-mono">SKILL_CATEGORY</p>
                <p className="text-white text-sm font-bold">Tools</p>
                <p className="text-white/60 text-xs mt-1 font-mono">Git | Docker | Linux</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="border border-white/50 p-4 hover:border-white transition-all"
              >
                <p className="text-white/60 text-xs mb-2 font-mono">EXPERTISE_AREA</p>
                <p className="text-white text-sm font-bold">AI & Automation</p>
                <p className="text-white/60 text-xs mt-1 font-mono">LLMs | Workflows | Bots</p>
              </motion.div>
            </div>
          </motion.div>

          {/* ASCII border footer */}
          <div className="text-white/50 text-xs mt-8 font-mono">
            {`╔${"═".repeat(50)}╗`}
            {"\n"}
            {`║ END_PROFILE ${"┃".repeat(36)}`}
            {"\n"}
            {`╚${"═".repeat(50)}╝`}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
