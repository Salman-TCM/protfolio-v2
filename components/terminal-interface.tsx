"use client"

import type React from "react"
import FloatingNavigation from './floating-navigation'
import { ScrollReveal } from './scroll-reveal'
import { TVNoise, MatrixRain } from './tv-noise'
import { 
  GlitchText, 
  TerminalBootSequence, 
  useTypingEffect, 
  TerminalScanLines,
  CRTEffect,
  TerminalProgressBar,
  ASCIILoader,
  TerminalWindowEffect
} from './terminal-effects'
import { 
  TerminalSoundSimulator, 
  KeyboardSoundEffect
} from './terminal-sound-effects'
import { AboutMeCard } from './about-me-card'
import { TerminalProjectsGallery } from './terminal-projects-gallery'

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TerminalCommand {
  id: string
  input: string
  output: string | React.ReactNode
  timestamp: string
}


export function TerminalInterface() {
  const [showBootSequence, setShowBootSequence] = useState(true)
  const [showTVNoise, setShowTVNoise] = useState(false)
  const [showMatrix, setShowMatrix] = useState(false)
  const [isHacking, setIsHacking] = useState(false)
  const [terminalReady, setTerminalReady] = useState(false)
  const [showSoundVisualizer, setShowSoundVisualizer] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [currentTheme] = useState('green')
  const [input, setInput] = useState("")
  const [currentSection, setCurrentSection] = useState("home")
  const terminalEndRef = useRef<HTMLDivElement>(null)

  // Execute command function
  const executeCommand = (cmd: string) => {
    const trimmed = cmd.toLowerCase().trim()
    let output: string | React.ReactNode = ""
    let newSection = currentSection

    if (trimmed === "") {
      return
    }

    if (trimmed === "help") {
      output = contentData.home.content
    } else if (trimmed === "clear") {
      setCommands([])
      setInput("")
      return
    } else if (trimmed === "about") {
      output = contentData.about.content
      newSection = "about"
    } else if (trimmed === "projects") {
      // Show project gallery inside terminal
      setShowTVNoise(true)
      setCommands(prev => prev.filter(c => c.id !== "0")) // Remove welcome message
      output = `$ Loading projects gallery...`
      
      setTimeout(() => {
        setShowTVNoise(false)
        setCommands([{
          id: Date.now().toString(),
          input: "projects",
          output: (
            <div className="h-screen -mx-2 sm:-mx-4 md:-mx-6 lg:-mx-8 my-2 sm:my-4 md:my-6 lg:my-8">
              <TerminalProjectsGallery />
            </div>
          ),
          timestamp: new Date().toLocaleTimeString()
        }])
      }, 1500)
      newSection = "projects"
    } else if (trimmed === "blog") {
      output = contentData.blog.content
      newSection = "blog"
    } else if (trimmed === "skills") {
      output = contentData.skills.content
      newSection = "skills"
    } else if (trimmed === "contact") {
      output = contentData.contact.content
      newSection = "contact"
    } else if (trimmed === "home") {
      output = contentData.home.content
      newSection = "home"
    } else if (trimmed === "back") {
      // Go back to home
      output = contentData.home.content
      newSection = "home"
    } else if (trimmed.startsWith("view ")) {
      // View command now opens gallery  
      output = `Use 'projects' command to view project gallery`
    } else if (trimmed.startsWith("blog ")) {
      const num = trimmed.split(" ")[1]
      output = `Loading blog post ${num}...\n\n[This would show full blog content]`
    } else if (trimmed === "matrix") {
      setShowMatrix(true)
      output = `$ Entering matrix...`
      setTimeout(() => setShowMatrix(false), 5000)
    } else if (trimmed === "hack") {
      setIsHacking(true)
      output = (
        <div className="space-y-2">
          <div className="text-white">$ Initializing hacking sequence...</div>
          <TerminalProgressBar progress={33} label="Bypassing firewall" />
          <TerminalProgressBar progress={67} label="Decrypting data" />
          <TerminalProgressBar progress={100} label="Access granted" isComplete />
          <div className="text-white font-bold">HACK COMPLETE ✓</div>
        </div>
      )
      setTimeout(() => setIsHacking(false), 3000)
    } else if (trimmed === "glitch") {
      output = (
        <div className="text-white">
          System <GlitchText isActive={true}>CORRUPTED</GlitchText> - Error 404: Reality not found
        </div>
      )
    } else if (trimmed === "scan") {
      output = (
        <div className="space-y-1 text-white">
          <div>$ Scanning network...</div>
          <div>192.168.1.1    [ROUTER]         ACTIVE</div>
          <div>192.168.1.100  [DESKTOP]        ACTIVE</div>
          <div>192.168.1.255  [BROADCAST]      ACTIVE</div>
          <div>$ Scan complete: 3 devices found</div>
        </div>
      )
    } else if (trimmed === "status") {
      output = (
        <div className="space-y-1 text-white">
          <div>System Status: <span className="text-white">ONLINE</span></div>
          <div>CPU Usage: <TerminalProgressBar progress={Math.random() * 100} label="" /></div>
          <div>Memory: 8.2GB / 16GB</div>
          <div>Network: Connected</div>
          <div>Security: <span className="text-white">SECURE</span></div>
        </div>
      )
    } else if (trimmed === "time") {
      output = `Current time: ${new Date().toLocaleString()}`
    } else if (trimmed === "weather") {
      output = (
        <div className="space-y-1 text-white">
          <div>Weather Status: Partly Cloudy</div>
          <div>Temperature: 72°F</div>
          <div>Humidity: 65%</div>
          <div>Wind: 5 mph SW</div>
          <div className="text-gray text-xs mt-2">* Weather data simulated</div>
        </div>
      )
    } else if (trimmed === "whoami") {
      output = `visitor@portfolio-terminal\nYou are browsing Salman's portfolio`
    } else if (trimmed === "pwd") {
      output = `/home/visitor/portfolio`
    } else if (trimmed === "ls") {
      output = `about.md  blog/  contact.txt  projects/  skills.json  README.md`
    } else if (trimmed === "cat readme") {
      output = `# Salman's Portfolio Terminal
      
Welcome to my interactive terminal portfolio!

This terminal simulates a real command-line interface
where you can explore my projects, skills, and background.

Type "help" for available commands.

Made with ❤️ using Next.js and React`
    } else if (trimmed === "ps") {
      output = (
        <div className="space-y-1 text-white font-mono text-sm">
          <div>PID   COMMAND</div>
          <div>001   terminal.exe</div>
          <div>002   portfolio-server</div>
          <div>003   animation-engine</div>
          <div>004   sound-visualizer</div>
        </div>
      )
    } else if (trimmed === "neofetch") {
      output = (
        <div className="space-y-1 text-white font-mono text-sm">
          <div className="text-white">visitor@portfolio</div>
          <div>----------------</div>
          <div>OS: Portfolio Linux</div>
          <div>Host: Terminal Interface</div>
          <div>Kernel: 5.15.0-portfolio</div>
          <div>Shell: bash 5.1.4</div>
          <div>Terminal: portfolio-term</div>
          <div>CPU: Intel i7-8700K</div>
          <div>Memory: 2048MB / 16384MB</div>
        </div>
      )
    } else if (trimmed === "gallery") {
      // Same as projects command
      setShowTVNoise(true)
      setCommands(prev => prev.filter(c => c.id !== "0"))
      output = `$ Loading projects gallery...`
      
      setTimeout(() => {
        setShowTVNoise(false)
        setCommands([{
          id: Date.now().toString(),
          input: "gallery",
          output: (
            <div className="h-screen -mx-2 sm:-mx-4 md:-mx-6 lg:-mx-8 my-2 sm:my-4 md:my-6 lg:my-8">
              <TerminalProjectsGallery />
            </div>
          ),
          timestamp: new Date().toLocaleTimeString()
        }])
      }, 1500)
    } else if (trimmed === "static" || trimmed === "tv") {
      setShowTVNoise(true)
      output = `$ Generating TV static...`
      setTimeout(() => setShowTVNoise(false), 3000)
    } else {
      output = `Command not found: ${trimmed}\nType "help" for available commands`
    }

    const newCommand: TerminalCommand = {
      id: Date.now().toString(),
      input: cmd,
      output,
      timestamp: new Date().toLocaleTimeString(),
    }

    setCommands([...commands, newCommand])
    setCurrentSection(newSection)
    setInput("")
  }
  
  const [commands, setCommands] = useState<TerminalCommand[]>([
    {
      id: "0",
      input: "",
      output: (
        <div className="space-y-4">
          <motion.div 
            className="text-white font-mono text-xs md:text-sm leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Terminal ASCII Art */}
          </motion.div>
          <motion.div 
            className="text-white font-bold font-mono"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            Welcome to My Portfolio
          </motion.div>
          <motion.div 
            className="text-white/70 text-sm font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            Type "help" to see available commands
          </motion.div>
        </div>
      ),
      // leave timestamp empty on initial server render to avoid SSR/client hydration mismatch
      timestamp: "",
    },
  ])

  const handleNavigate = (command: string) => {
    executeCommand(command)
  }

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [commands])

  const contentData = {
    home: {
      title: "HOME",
      content: `
System: Retro Developer Portfolio v1.0
User: visitor@terminal
Location: ~/portfolio

Available sections:
  • about      - Learn about me
  • projects   - View my projects
  • gallery    - Open retro project viewer
  • blog       - Read blog posts
  • contact    - Get in touch
  • skills     - View my skills
  • view [#]   - View project [#] live
  
System commands:
  • clear      - Clear terminal
  • help       - Show this help menu
  • status     - System status
  • time       - Current time
  • scan       - Network scan
  • weather    - Weather info
  • whoami     - User info
  • pwd        - Current directory
  • ls         - List files
  • ps         - Running processes
  • neofetch   - System info
  
Fun commands:
  • matrix     - Enter the matrix
  • hack       - Start hacking sequence
  • glitch     - Glitch the system
  • static     - Generate TV static
  • gallery    - Full-screen retro project viewer
  • cat readme - Read README file
      `,
    },
    about: {
      title: "ABOUT ME",
      content: `
┌──────────────────────────────────────┐
│        ABOUT ME - PROFILE             │
└──────────────────────────────────────┘

Name: Md. Salman Hossain
Role: Software Engineer
Experience: 3+ years

Bio:
Software Engineer at Technometrics Ltd with expertise in AI/ML, NLP, and full-stack development.
Specialized in building scalable web scraping solutions, RESTful APIs, and advanced NLP classification systems.
Experienced in Python, Django, FastAPI, React, and modern cloud technologies.

Education:
• Bachelor of Science in Computer Science
• East West University, Dhaka, Bangladesh (Feb 2023)

Contact: +880 1521102041 | salmann.hossain@gmail.com
Portfolio: linkedin.com/salman | github.com/Salman-TCM | leetcode.com/SalmanTCM
      `,
    },
    projects: {
      title: "PROJECTS",
      content: `Launching retro project viewer with full-screen gallery...
      
Use arrow keys or scroll to navigate between projects
Press ESC or click [EXIT] to return to terminal
      
Features:
• CRT scanlines and VHS glitch effects
• Smooth media transitions
• Touch/swipe support on mobile
• Full-screen project galleries
• Live site links for available projects
    `,
    },
    blog: {
      title: "BLOG",
      content: `
┌──────────────────────────────────────┐
│          LATEST BLOG POSTS            │
└──────────────────────────────────────┘

[1] Building Scalable React Applications
    Date: Nov 15, 2025 | Read time: 8 min
    Tags: React, Performance, Architecture
    
[2] Next.js 16 Features You Should Know
    Date: Nov 10, 2025 | Read time: 12 min
    Tags: Next.js, Web Development, Tips
    
[3] Mastering TypeScript Types
    Date: Nov 5, 2025 | Read time: 10 min
    Tags: TypeScript, Programming, Best Practices
    
[4] The Future of Web Development
    Date: Oct 30, 2025 | Read time: 6 min
    Tags: Trends, Web3, AI
    
[5] Docker for Frontend Developers
    Date: Oct 25, 2025 | Read time: 7 min
    Tags: Docker, DevOps, Development

Type "blog [number]" to read full post
Type "blog list" for all posts
      `,
    },
    skills: {
      title: "SKILLS & EXPERTISE",
      content: `
┌──────────────────────────────────────┐
│        TECHNICAL SKILLS               │
└──────────────────────────────────────┘

Languages:
  • Python | JavaScript | SQL | Bash | HTML/CSS

Frameworks & Libraries:
  • FastAPI | Django | Laravel | React | React Native | LangChain

Machine Learning & NLP:
  • Transformers (Hugging Face) | TensorFlow | spaCy | NLTK | LLM integration | Sentiment Analysis | NER

Databases & Storage:
  • MongoDB | MySQL | PostgreSQL | MinIO

Search & Indexing:
  • Elasticsearch | Monstache

Task Queue & Caching:
  • Celery | Redis

DevOps & Tools:
  • Docker | Kubernetes | Git | GitHub Actions | NGINX | CI/CD

Cloud & Platforms:
  • AWS (EC2, S3, IAM) | DigitalOcean

Soft Skills:
  • Problem Solving | Team Collaboration | Technical Documentation
      `,
    },
    contact: {
      title: "CONTACT & SOCIAL",
      content: `
┌──────────────────────────────────────┐
│         CONTACT INFORMATION           │
└──────────────────────────────────────┘

Email: salmann.hossain@gmail.com
Phone: +880 1521102041
Location: Dhaka, Bangladesh

Social Links:
  • GitHub: github.com/Salman-TCM
  • LinkedIn: linkedin.com/salman
  • LeetCode: leetcode.com/SalmanTCM

Available for:
  ✓ Freelance Projects
  ✓ Full-time Opportunities
  ✓ Consulting
  ✓ Speaking Engagements

Send me an email or reach out on social media!
      `,
    },
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(input)
      setIsTyping(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setIsTyping(true)
    // Stop typing animation after a short delay
    setTimeout(() => setIsTyping(false), 300)
  }

  return (
    <div className="min-h-screen bg-black p-2 sm:p-4 md:p-6 lg:p-8 font-mono pb-20 sm:pb-24 relative">
      {/* Background Grid */}
      <div 
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      {/* Boot Sequence */}
      <AnimatePresence>
        {showBootSequence && (
          <TerminalBootSequence onComplete={() => {
            setShowBootSequence(false)
            setTerminalReady(true)
          }} />
        )}
      </AnimatePresence>

      {/* TV Noise Effect (rendered inside terminal frame below) */}

      {/* Matrix Rain Effect */}
      <MatrixRain isVisible={showMatrix} />

      {/* Sound Effects */}
      <TerminalSoundSimulator isTyping={isTyping} />
      <KeyboardSoundEffect isActive={isTyping} />

      <FloatingNavigation onNavigate={handleNavigate} />

      {/* About Me Card - Shows on terminal ready */}
      {terminalReady && <AboutMeCard />}

      {/* Quick Commands - Left Sidebar - Hidden on small mobile */}
      {terminalReady && (
        <motion.div
          className="fixed left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-30 hidden sm:block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="bg-black/95 backdrop-blur-md p-2 sm:p-4 border-2 border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            <div className="flex flex-col gap-1 sm:gap-2">
              <div className="text-white font-mono text-xs mb-1 sm:mb-2">[QUICK.CMD]</div>
              {['about', 'projects', 'skills', 'contact', 'matrix', 'hack', 'neofetch', 'static'].map((cmd, index) => (
                <motion.button
                  key={cmd}
                  className="px-2 py-1 sm:px-3 sm:py-2 bg-black text-white font-mono text-xs hover:bg-white/10 hover:text-white transition-all text-left border border-white/30"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.05 }}
                  whileHover={{ x: 2, boxShadow: "0 0 10px rgba(255,255,255,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setInput(cmd)
                    executeCommand(cmd)
                  }}
                >
                  $ {cmd}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}


      {terminalReady && (
        <ScrollReveal direction="up" delay={0.2}>
        <motion.div
          className="max-w-4xl sm:max-w-5xl md:max-w-6xl mx-auto px-2 sm:px-4 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
        {/* Terminal Window */}
        <CRTEffect>
          <TerminalWindowEffect>
            <motion.div 
              className="bg-black border-2 border-white/50 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.2)] backdrop-blur-sm relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Scan lines overlay */}
              <TerminalScanLines intensity={0.015} />
              
              {/* Subtle Retro Scanlines */}
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

              {/* TV Noise Effect rendered inside the terminal frame so the noise is clipped to the terminal */}
              <TVNoise isVisible={showTVNoise} onComplete={() => setShowTVNoise(false)} />

              {/* Terminal Shadow Inset */}
              <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(255,255,255,0.02)] pointer-events-none" />
          {/* Terminal Header */}
          <motion.div 
            className="bg-white/10 border-b border-white/30 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex justify-between items-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <motion.div 
                className="font-bold font-mono text-sm sm:text-base md:text-lg tracking-wide text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="hidden xs:inline">PORTFOLIO TERMINAL</span>
                <span className="xs:hidden">TERMINAL</span>
              </motion.div>
              <motion.div
                className="text-xs text-white/70 font-mono hidden sm:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                v2.0.1 | bash 5.1.4
              </motion.div>
            </div>
          </motion.div>

          {/* Terminal Content */}
          <div className="relative">
            {/* Content Background Pattern */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '20px 20px'
              }}
            />
            
            <div className="flex flex-col p-2 sm:p-3 md:p-4 lg:p-6 h-[75vh] sm:h-[75vh] md:h-[70vh] lg:h-[75vh] overflow-y-auto custom-scrollbar relative z-10">
            <AnimatePresence mode="wait">
              {commands.map((cmd, index) => (
                <motion.div
                  key={cmd.id}
                  // className="space-y-2 sm:space-y-3 p-2 sm:p-3 md:p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  {cmd.input && (
                    <motion.div 
                      className="flex items-center gap-2 sm:gap-3 text-white border-b border-white/10 pb-1 sm:pb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="text-white text-sm sm:text-base lg:text-lg">❯</span>
                      <span className="font-mono text-xs sm:text-sm flex-1 min-w-0 break-all">{cmd.input}</span>
                      <span className="text-gray-400 text-xs ml-auto whitespace-nowrap">{cmd.timestamp}</span>
                    </motion.div>
                  )}
                  <motion.div 
                    className="text-white whitespace-pre-wrap font-mono text-xs sm:text-sm leading-relaxed pl-4 sm:pl-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {cmd.output}
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={terminalEndRef} />
            </div>
          </div>

          {/* Terminal Input */}
          <motion.div 
            className="border-t border-white/20 bg-gradient-to-r from-black/80 to-gray-900/80 px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <motion.div
                className="flex items-center gap-1 sm:gap-2 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
                <span className="font-mono text-xs sm:text-sm text-gray-400 hidden xs:block">visitor@portfolio</span>
                <span className="text-gray-500 text-xs">:</span>
                <span className="text-blue-400 text-xs sm:text-sm">~</span>
                <span className="text-white text-sm sm:text-base lg:text-lg ml-1 sm:ml-2">❯</span>
              </motion.div>
              
              <motion.input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter command..."
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 font-mono text-xs sm:text-sm border-b border-transparent focus:border-white/30 transition-all duration-300 py-1"
                autoFocus
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{ delay: 1.2, duration: 0.5 }}
              />
              
              <motion.div
                className="flex items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <div className="w-0.5 sm:w-1 bg-white animate-pulse h-3 sm:h-4" />
              </motion.div>
            </div>
          </motion.div>
            </motion.div>
          </TerminalWindowEffect>
        </CRTEffect>
        </motion.div>
      </ScrollReveal>
      )}

    </div>
  )
}
