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
                Software Engineer with hands-on experience designing scalable data pipelines, NLP systems, and
                full-stack web applications. At Technometrics Ltd I build web-scraping platforms, REST APIs, and
                production NLP pipelines using Python, FastAPI, Django and modern ML tooling. I focus on reliable
                engineering, security (JWT, RBAC, 2FA), and scalable architectures (Docker, Kubernetes, cloud). Recently
                led an AI-powered social media analytics project for bKash achieving strong classification accuracy.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="border border-white/50 p-4 hover:border-white hover:shadow-lg transition-all border-white/30"
              >
                <p className="text-white/60 text-xs mb-2 font-mono">LANGUAGES</p>
                <p className="text-white text-sm font-bold">Languages</p>
                <p className="text-white/60 text-xs mt-1 font-mono">Python | JavaScript | SQL | Bash | HTML/CSS</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="border border-gray/50 p-4 hover:border-gray hover:shadow-lg transition-all"
              >
                <p className="text-gray/60 text-xs mb-2 font-mono">FRAMEWORKS</p>
                <p className="text-gray text-sm font-bold">Backend & APIs</p>
                <p className="text-gray/60 text-xs mt-1 font-mono">Django | FastAPI | Laravel | Flask</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="border border-white/50 p-4 hover:border-white transition-all border-white/30"
              >
                <p className="text-white/60 text-xs mb-2 font-mono">TOOLS</p>
                <p className="text-white text-sm font-bold">DevOps & Tools</p>
                <p className="text-white/60 text-xs mt-1 font-mono">Docker | Kubernetes | Git | GitHub Actions | NGINX</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="border border-white/50 p-4 hover:border-white transition-all"
              >
                <p className="text-white/60 text-xs mb-2 font-mono">EXPERTISE</p>
                <p className="text-white text-sm font-bold">AI & NLP</p>
                <p className="text-white/60 text-xs mt-1 font-mono">LLMs | Transformers | NER | Sentiment Analysis | TensorFlow</p>
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
