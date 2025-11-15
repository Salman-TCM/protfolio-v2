"use client"

import type React from "react"
import { ProjectModal } from './project-modal'
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
  KeyboardSoundEffect, 
  BootSoundVisualizer 
} from './terminal-sound-effects'

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TerminalCommand {
  id: string
  input: string
  output: string | React.ReactNode
  timestamp: string
}

const PROJECTS = [
  {
    id: 1,
    name: "Border Guard Bangladesh Recruitment",
    url: "https://joinborderguard.bgb.gov.bd",
    tech: "Next.js, React, Tailwind CSS",
    description: "Official recruitment portal for Bangladesh Border Guard Force",
    status: "LIVE",
    fullDescription: "A comprehensive recruitment management system for the Bangladesh Border Guard organization, featuring online application submission, status tracking, and admin dashboard for managing applications and announcements.",
  },
  {
    id: 2,
    name: "E-Commerce Platform",
    url: "https://example-ecommerce.com",
    tech: "Next.js, Stripe, PostgreSQL",
    description: "Full-stack e-commerce solution with real-time inventory",
    status: "LIVE",
    fullDescription: "A modern e-commerce platform with real-time inventory management, secure payment processing with Stripe, user authentication, and a comprehensive admin dashboard.",
  },
  {
    id: 3,
    name: "AI Content Generator",
    url: "https://example-ai.com",
    tech: "React, OpenAI API, Vercel",
    description: "Generate marketing copy with AI assistance",
    status: "IN DEVELOPMENT",
    fullDescription: "An intelligent content generation tool powered by OpenAI, helping businesses create compelling marketing copy, social media content, and product descriptions.",
  },
]

export function TerminalInterface() {
  const [showBootSequence, setShowBootSequence] = useState(true)
  const [showTVNoise, setShowTVNoise] = useState(false)
  const [showMatrix, setShowMatrix] = useState(false)
  const [isHacking, setIsHacking] = useState(false)
  const [terminalReady, setTerminalReady] = useState(false)
  const [showSoundVisualizer, setShowSoundVisualizer] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  
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
            {/* {`████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     
╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     
   ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     
   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     
   ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║╚══════╝
   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝`} */}
          </motion.div>
          <motion.div 
            className="text-white font-bold"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            Welcome to My Portfolio
          </motion.div>
          <motion.div 
            className="text-gray text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            Type "help" to see available commands
          </motion.div>
        </div>
      ),
      timestamp: new Date().toLocaleTimeString(),
    },
  ])
  const [input, setInput] = useState("")
  const [currentSection, setCurrentSection] = useState("home")
  const [projectsModalOpen, setProjectsModalOpen] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const terminalEndRef = useRef<HTMLDivElement>(null)

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
  • cat readme - Read README file
      `,
    },
    about: {
      title: "ABOUT ME",
      content: `
┌──────────────────────────────────────┐
│        ABOUT ME - PROFILE             │
└──────────────────────────────────────┘

Name: Salman Hossain
Role: Full Stack Developer
Experience: 5+ years

Bio:
Passionate developer with expertise in modern web technologies.
Specialized in building scalable applications with React, Next.js, and Node.js.

Currently working on innovative projects combining AI and web development.
Always learning and exploring new technologies.

Education:
• Computer Science Degree
• Self-taught in modern frameworks
• Active open-source contributor

Contact: hello@example.com
Portfolio: github.com/salmanhossain
      `,
    },
    projects: {
      title: "PROJECTS",
      content: `
┌──────────────────────────────────────┐
│         FEATURED PROJECTS             │
└──────────────────────────────────────┘

[1] Border Guard Bangladesh Recruitment
    Tech: Next.js, React, Tailwind CSS
    Official recruitment portal for Bangladesh Border Guard Force
    Status: ✓ LIVE
    Link: joinborderguard.bgb.gov.bd
    Command: view 1

[2] E-Commerce Platform
    Tech: Next.js, Stripe, PostgreSQL
    A full-stack e-commerce solution with real-time inventory
    Status: ✓ LIVE
    Link: example-ecommerce.com
    Command: view 2

[3] AI Content Generator
    Tech: React, OpenAI API, Vercel
    Generate marketing copy with AI assistance
    Status: IN DEVELOPMENT
    Link: example-ai.com
    Command: view 3

Type "view [number]" to open project in preview
Type "back" to return to projects list
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

Frontend:
  ██████████████████░░ 95% | React, Next.js, Vue.js
  ██████████████████░░ 90% | TypeScript, JavaScript
  █████████████░░░░░░ 85% | Tailwind CSS, SASS
  █████████████░░░░░░ 80% | Animation, UI/UX

Backend:
  ██████████████████░░ 92% | Node.js, Express
  █████████████░░░░░░ 85% | Python, FastAPI
  ██████████████░░░░░░ 88% | SQL, NoSQL Databases
  █████████░░░░░░░░░░ 75% | API Design, REST

Tools & DevOps:
  ██████████████░░░░░░ 85% | Git, GitHub
  █████████████░░░░░░░ 80% | Docker, Docker Compose
  ██████████░░░░░░░░░░ 75% | CI/CD, GitHub Actions
  █████████░░░░░░░░░░░ 70% | AWS, Vercel

Soft Skills:
  • Problem Solving
  • Team Leadership
  • Mentoring
  • Technical Writing
      `,
    },
    contact: {
      title: "CONTACT & SOCIAL",
      content: `
┌──────────────────────────────────────┐
│         CONTACT INFORMATION           │
└──────────────────────────────────────┘

Email: hello@example.com
Phone: +1 (555) 123-4567
Location: San Francisco, CA

Social Links:
  • GitHub: github.com/salmanhossain
  • LinkedIn: linkedin.com/in/salmanhossain
  • Twitter: @salmanhossain
  • Portfolio: salmanhossain.com

Available for:
  ✓ Freelance Projects
  ✓ Full-time Opportunities
  ✓ Consulting
  ✓ Speaking Engagements

Send me an email or reach out on social media!
      `,
    },
  }

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
      // Show TV static effect before opening projects
      output = `$ Loading project database...`
      setShowTVNoise(true)
      setTimeout(() => {
        setShowTVNoise(false)
        setProjectsModalOpen(true)
      }, 2500)
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
      setProjectsModalOpen(false)
    } else if (trimmed === "back") {
      output = contentData.projects.content
      newSection = "projects"
      setSelectedProjectId(null)
    } else if (trimmed.startsWith("view ")) {
      const projectNum = Number.parseInt(trimmed.split(" ")[1])
      if (projectNum && projectNum >= 1 && projectNum <= PROJECTS.length) {
        // Show TV noise effect before opening project
        output = `$ Initiating project viewer...`
        setShowTVNoise(true)
        setTimeout(() => {
          setShowTVNoise(false)
          setProjectsModalOpen(true)
          setSelectedProjectId(projectNum)
        }, 2500)
      } else {
        output = `Error: Project ${projectNum} not found. Available: 1-${PROJECTS.length}`
      }
    } else if (trimmed.startsWith("blog ")) {
      const num = trimmed.split(" ")[1]
      output = `Loading blog post ${num}...\n\n[This would show full blog content]`
    } else if (trimmed === "matrix") {
      setShowMatrix(true)
      output = `$ Entering the matrix...`
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
    <div className="min-h-screen bg-black p-4 md:p-8 font-mono pb-24 relative">
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

      {/* TV Noise Effect */}
      <TVNoise 
        isVisible={showTVNoise} 
        onComplete={() => setShowTVNoise(false)} 
      />

      {/* Matrix Rain Effect */}
      <MatrixRain isVisible={showMatrix} />

      {/* Sound Effects */}
      <TerminalSoundSimulator isTyping={isTyping} />
      <KeyboardSoundEffect isActive={isTyping} />
      <BootSoundVisualizer isActive={showBootSequence} />

      <FloatingNavigation onNavigate={handleNavigate} />

      {/* Quick Commands - Left Sidebar */}
      {terminalReady && (
        <motion.div
          className="fixed left-4 top-1/2 transform -translate-y-1/2 z-30"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="bg-black/90 backdrop-blur-md p-4 rounded-lg border border-white/20">
            <div className="flex flex-col gap-2">
              <div className="text-white font-mono text-xs mb-2 opacity-60">QUICK CMD</div>
              {['about', 'projects', 'skills', 'contact', 'matrix', 'hack', 'neofetch', 'static'].map((cmd, index) => (
                <motion.button
                  key={cmd}
                  className="px-3 py-2 bg-white/5 text-gray-300 rounded font-mono text-xs hover:bg-white/10 hover:text-white transition-all text-left border border-white/10"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.05 }}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setInput(cmd)
                    executeCommand(cmd)
                  }}
                >
                  {cmd}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <ProjectModal
        isOpen={projectsModalOpen}
        projects={PROJECTS}
        onClose={() => {
          setProjectsModalOpen(false)
          setSelectedProjectId(null)
        }}
        onSelectProject={(id) => {
          if (id === 0) {
            setSelectedProjectId(null)
          } else {
            setSelectedProjectId(id)
          }
        }}
        selectedProjectId={selectedProjectId}
      />

      {terminalReady && (
        <ScrollReveal direction="up" delay={0.2}>
        <motion.div
          className="max-w-6xl mx-auto px-4 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
        {/* Terminal Window */}
        <CRTEffect>
          <TerminalWindowEffect>
            <motion.div 
              className="bg-black border-2 border-white/20 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] backdrop-blur-sm relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Scan lines overlay */}
              <TerminalScanLines intensity={0.015} />
              
              {/* Terminal Shadow Inset */}
              <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none" />
          {/* Terminal Header */}
          <motion.div 
            className="bg-gradient-to-r from-white to-gray-100 text-black px-6 py-4 flex justify-between items-center border-b border-white/10"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center gap-4">
              <motion.div 
                className="font-bold font-mono text-lg tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                PORTFOLIO TERMINAL
              </motion.div>
              <motion.div
                className="text-xs text-gray-600 font-mono"
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
            
            <div className="p-4 md:p-8 space-y-4 md:space-y-6 h-[60vh] md:h-[70vh] overflow-y-auto custom-scrollbar relative z-10">
            <AnimatePresence mode="wait">
              {commands.map((cmd, index) => (
                <motion.div
                  key={cmd.id}
                  className="space-y-3 p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm"
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
                      className="flex items-center gap-3 text-white border-b border-white/10 pb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="text-white text-lg">❯</span>
                      <span className="font-mono text-sm">{cmd.input}</span>
                      <span className="text-gray-400 text-xs ml-auto">{cmd.timestamp}</span>
                    </motion.div>
                  )}
                  <motion.div 
                    className="text-white whitespace-pre-wrap font-mono text-sm leading-relaxed pl-6"
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
            className="border-t border-white/20 bg-gradient-to-r from-black/80 to-gray-900/80 px-8 py-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-4">
              <motion.div
                className="flex items-center gap-2 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="font-mono text-sm text-gray-400">visitor@portfolio</span>
                <span className="text-gray-500">:</span>
                <span className="text-blue-400 text-sm">~</span>
                <span className="text-white text-lg ml-2">❯</span>
              </motion.div>
              
              <motion.input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter command..."
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 font-mono text-sm border-b border-transparent focus:border-white/30 transition-all duration-300 py-1"
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
                <div className="w-1 bg-white animate-pulse h-4" />
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
