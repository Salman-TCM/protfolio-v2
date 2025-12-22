"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function AboutMeCard() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  if (!isVisible && !isMinimized) return null

  return (
    <>
      <AnimatePresence>
        {isVisible && !isMinimized && (
          <motion.div
            className="fixed top-20 left-1/2 z-50 w-[90%] sm:w-[550px] md:w-[650px]"
            initial={{ 
              opacity: 0, 
              scale: 0,
              x: "-50%",
              rotateY: 90,
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: position.x - 50 + "%",
              y: position.y,
              rotateY: 0,
            }}
            exit={{ 
              opacity: 0, 
              scale: 0,
              rotateY: -90,
            }}
            drag
            dragMomentum={false}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              setPosition({ x: info.offset.x, y: info.offset.y })
            }}
            whileDrag={{ scale: 1.01, cursor: "grabbing" }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 blur-xl" />
              
              {/* Card Body */}
              <div className="relative bg-black border-2 border-white/50 overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.2),inset_0_0_50px_rgba(255,255,255,0.05)]">
                {/* Scanlines Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-10"
                  style={{
                    background: `repeating-linear-gradient(
                      0deg,
                      rgba(255, 255, 255, 0.1) 0px,
                      transparent 1px,
                      transparent 2px,
                      rgba(255, 255, 255, 0.1) 3px
                    )`
                  }}
                />
                
                {/* Header Bar */}
                <div 
                  className="bg-white/10 border-b-2 border-white/50 px-4 py-2 flex items-center justify-between cursor-move relative"
                  style={{ touchAction: "none" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="text-white/70 font-mono text-xs animate-pulse">[SYSTEM]</div>
                    <span className="text-white font-mono text-sm font-bold tracking-wider">
                      {glitchActive ? "▓▒░ PROFILE.DAT ░▒▓" : "═══ PROFILE.DAT ═══"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsMinimized(true)
                        setIsVisible(false)
                      }}
                      className="text-white hover:text-white/80 font-mono text-xs px-2 py-1 border border-white/50 hover:bg-white/10 transition-all"
                    >
                      [_]
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsVisible(false)
                        setIsMinimized(false)
                      }}
                      className="text-white hover:text-white/80 font-mono text-xs px-2 py-1 border border-white/50 hover:bg-white/10 transition-all"
                    >
                      [X]
                    </button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 space-y-4 text-white font-mono relative">
                  {/* ASCII Border Top */}
                  <div className="text-white/50 text-xs mb-4 overflow-hidden">
                    ╔═══════════════════════════════════════════════════════╗
                  </div>
                  
                  {/* Profile Section */}
                  <div className="flex items-start gap-4">
                    {/* ASCII Art Avatar */}
                    <div className="text-white text-xs leading-none">
                      <pre className={`${glitchActive ? 'animate-pulse' : ''}`}>
{`╭─────╮
│ ░▒▓ │
│ SH  │
│ ▓▒░ │
╰─────╯`}
                      </pre>
                    </div>
                    
                    <div className="flex-1">
                      <h2 className="text-white text-lg font-bold mb-1 tracking-wide">
                        &gt; MD. SALMAN HOSSAIN
                      </h2>
                      <p className="text-white/70 text-sm mb-3">
                        SOFTWARE ENGINEER // TECHNOMETRICS LTD
                      </p>
                      
                      {/* Social Links as Terminal Commands */}
                      <div className="space-y-1 text-xs">
                        <div className="text-white/70">
                          $ git remote -v
                        </div>
                        <div className="pl-4 space-y-1">
                          <a href="https://github.com/Salman-TCM" target="_blank" rel="noopener noreferrer" 
                             className="block hover:text-white/80 transition-colors">
                            origin  github.com/Salman-TCM.git
                          </a>
                          <a href="https://linkedin.com/in/salman" target="_blank" rel="noopener noreferrer"
                             className="block hover:text-white/80 transition-colors">
                            social  linkedin.com/in/salman
                          </a>
                          <a href="mailto:salmann.hossain@gmail.com"
                             className="block hover:text-white/80 transition-colors">
                            mail    salmann.hossain@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Section */}
                  <div className="space-y-3 text-sm border-t border-white/30 pt-4">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-white/70">RUNTIME:</span>
                        <span className="text-white ml-2">3+ YEARS</span>
                      </div>
                      <div>
                        <span className="text-white/70">MODE:</span>
                        <span className="text-white ml-2">FULL-STACK</span>
                      </div>
                    </div>
                    
                    {/* Skills as Loading Bars */}
                    <div>
                      <div className="text-white/70 text-xs mb-2">LOADING MODULES...</div>
                      <div className="space-y-1">
                        {[
                          { name: "PYTHON", level: 95 },
                          { name: "DJANGO", level: 90 },
                          { name: "REACT", level: 85 },
                          { name: "NLP/AI", level: 88 },
                          { name: "SCRAPING", level: 92 },
                          { name: "API", level: 90 }
                        ].map((skill) => (
                          <div key={skill.name} className="flex items-center gap-2 text-xs">
                            <span className="w-16 text-white/70">{skill.name}</span>
                            <div className="flex-1 bg-black border border-white/30 h-3 relative overflow-hidden">
                              <motion.div 
                                className="absolute inset-y-0 left-0 bg-white/50"
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                              />
                              <div className="absolute inset-0 flex items-center justify-center text-white text-[10px]">
                                {Array(Math.floor(skill.level / 10)).fill("█").join("")}
                                {Array(10 - Math.floor(skill.level / 10)).fill("░").join("")}
                              </div>
                            </div>
                            <span className="text-white/70">{skill.level}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Bio Terminal Output */}
                    <div className="pt-3 border-t border-white/30">
                      <div className="text-white/70 text-xs mb-1">$ cat bio.txt</div>
                      <p className="text-white/80 text-xs leading-relaxed pl-4">
                        &gt; Building scalable web scraping solutions<br/>
                        &gt; RESTful APIs and NLP classification systems<br/>
                        &gt; Enterprise-grade cloud applications<br/>
                        &gt; STATUS: AVAILABLE FOR HIRE
                      </p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <a 
                        href="/cv.pdf" 
                        download
                        className="px-4 py-2 bg-white/20 text-white font-bold text-xs border border-white/50 hover:bg-white/30 transition-all tracking-wider"
                      >
                        [DOWNLOAD CV]
                      </a>
                      <button
                        onClick={() => {
                          setIsVisible(false)
                          setIsMinimized(false)
                        }}
                        className="px-4 py-2 bg-black text-white font-bold text-xs border border-white/50 hover:bg-white/10 transition-all tracking-wider"
                      >
                        [ESC]
                      </button>
                    </div>
                  </div>
                  
                  {/* ASCII Border Bottom */}
                  <div className="text-white/50 text-xs overflow-hidden">
                    ╚═══════════════════════════════════════════════════════╝
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMinimized && (
          <motion.button
            className="fixed bottom-24 right-4 z-50 bg-black border-2 border-white/50 text-white font-mono text-xs px-3 py-2 hover:bg-white/10 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            initial={{ opacity: 0, scale: 0, x: 100 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0,
            }}
            exit={{ opacity: 0, scale: 0, x: 100 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 50px rgba(255,255,255,0.5)"
            }}
            onClick={() => {
              setIsMinimized(false)
              setIsVisible(true)
            }}
          >
            <div className="flex items-center gap-2">
              <span className="animate-pulse">&gt;</span>
              <span className="tracking-wider">[PROFILE.DAT]</span>
              <span className="text-white/70 text-[10px]">▲</span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
