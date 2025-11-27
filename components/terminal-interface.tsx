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
import { ProjectList } from './project-list'

interface TerminalCommand {
  id: string
  input: string
  output: string | React.ReactNode
  timestamp: string
}

const PROJECTS = [
  {
    id: 1,
    name: "bKash SIDA - AI Social Media Analytics",
    url: "#",
    tech: "Python, Transformers, Pandas, Scikit-learn, LangChain",
    description: "NLP pipeline for multi-class topic classification and sentiment analysis for bKash social channels (Bengali).",
    status: "ACTIVE",
    fullDescription:
      "Developed multi-class topic classification, NER and sentiment analysis pipeline using LLMs and classical ML to automate social media monitoring for Bangladesh's largest MFS provider.",
  },
  {
    id: 2,
    name: "CTTC Social Media Monitoring System",
    url: "#",
    tech: "Django, Elasticsearch, PostgreSQL, MinIO",
    description: "High-performance data API and analytics platform for social media ingestion and search.",
    status: "ACTIVE",
    fullDescription:
      "Architected a scalable API with Elasticsearch backend, advanced query optimization, caching, and MinIO-based distributed storage for enterprise analytics.",
  },
  {
    id: 3,
    name: "Vault Alarm & Monitoring — Jamuna Bank",
    url: "#",
    tech: "DSC DLS, Sur-Gard, Kronos, IoT",
    description: "IoT-enabled vault alarm and monitoring deployed across bank branches.",
    status: "DEPLOYED",
    fullDescription:
      "Led deployment of alarm & monitoring systems across 35+ branches with DSC programming, Sur-Gard integration, and centralized monitoring automation.",
  },
  {
    id: 4,
    name: "BGB E-Recruitment Platform",
    url: "https://joinborderguard.bgb.gov.bd",
    tech: "Django, React, MySQL, Docker",
    description: "Enterprise recruitment platform with secure payments, 2FA and RBAC.",
    status: "LIVE",
    fullDescription:
      "Built secure recruitment workflows, payment integration, 2FA, and containerized deployments for Border Guard Bangladesh's recruitment portal.",
  },
  {
    id: 5,
    name: "AV Automation — Huawei / Unilever",
    url: "#",
    tech: "Crestron SIMPL, Dante, Xilica",
    description: "Enterprise AV automation, audio-over-IP and DSP integrations for corporate clients.",
    status: "COMPLETED",
    fullDescription:
      "Designed low-latency AV switching and configured Dante networks, Crestron automation, and DSPs for high-quality corporate conference systems.",
  },
  {
    id: 6,
    name: "ZKTeco Access Control",
    url: "#",
    tech: "ZKTeco, PostgreSQL, RBAC, Biometric",
    description: "Biometric access control system with real-time logging and RBAC.",
    status: "COMPLETED",
    fullDescription:
      "Implemented enterprise-grade access control with biometric integration, optimized PostgreSQL schemas, and audit logging.",
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
      // leave timestamp empty on initial server render to avoid SSR/client hydration mismatch
      timestamp: "",
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
    content: `
┌──────────────────────────────────────┐
│         FEATURED PROJECTS             │
└──────────────────────────────────────┘

[1] bKash SIDA - AI Social Media Analytics
  Tech: Python, Transformers, Pandas, Scikit-learn, LangChain
  NLP pipeline for multi-class topic classification, NER and sentiment analysis (Bengali)
  Status: ACTIVE
  Link: #
  Command: view 1

[2] CTTC Social Media Monitoring System
  Tech: Django, Elasticsearch, PostgreSQL, MinIO
  High-performance data API and analytics platform for social media monitoring
  Status: ACTIVE
  Link: #
  Command: view 2

[3] Vault Alarm & Monitoring — Jamuna Bank
  Tech: DSC DLS, Sur-Gard, Kronos, IoT
  IoT-enabled vault alarm and centralized monitoring across 35+ branches
  Status: DEPLOYED
  Link: #
  Command: view 3

[4] BGB E-Recruitment Platform
  Tech: Django, React, MySQL, Docker
  Secure recruitment portal with 2FA, payments and RBAC (Border Guard Bangladesh)
  Status: LIVE
  Link: https://joinborderguard.bgb.gov.bd
  Command: view 4

[5] AV Automation — Huawei / Unilever
  Tech: Crestron SIMPL, Dante, Xilica
  Enterprise AV automation and DSP integration for corporate facilities
  Status: COMPLETED
  Link: #
  Command: view 5

[6] ZKTeco Access Control
  Tech: ZKTeco, PostgreSQL, RBAC, Biometric
  Biometric access control with real-time logging and audit trails
  Status: COMPLETED
  Link: #
  Command: view 6

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
      // Trigger TV noise and show a loading line, then append the project list into the terminal
  setShowTVNoise(true)
  // Remove the initial welcome message (id: "0") so it is hidden when viewing projects
  setCommands((prev) => prev.filter((c) => c.id !== "0"))
  output = `$ Loading project database...`
      // ensure modal is closed until users click a project in the terminal list
      setProjectsModalOpen(false)
      newSection = "projects"

      // After a short delay remove noise and append the project list (modal-style) into terminal
      setTimeout(() => {
        setShowTVNoise(false)
        const projectNode = (
          <div>
            <div className="text-white font-bold mb-2">{contentData.projects.title}</div>
            <ProjectList
              projects={PROJECTS}
              onViewProject={(project) => {
                setCommands([
                  {
                    id: Date.now().toString(),
                    input: '',
                    output: (
                      <div className="bg-black p-6 space-y-4">
                        <div>
                          <div className="text-white text-2xl font-bold mb-2">{project.name ?? project.title}</div>
                          <div className="text-white text-sm mb-4">{project.description}</div>
                          <div className="text-gray text-xs mb-4">Tech: {project.tech}</div>
                        </div>
                        {project.url && (
                          <button
                            className="px-4 py-2 bg-white text-black font-bold font-mono text-sm border-2 border-white hover:bg-black hover:text-white transition"
                            onClick={() => {
                              setCommands((prev) => [
                                ...prev,
                                {
                                  id: (Date.now() + 1).toString(),
                                  input: '',
                                  output: (
                                    <div className="bg-black p-6 space-y-4">
                                      <div className="text-white text-lg font-bold mb-4">{project.name ?? project.title} - Live Preview</div>
                                      <iframe
                                        src={project.url}
                                        title={project.title}
                                        className="w-full h-96 border border-white/20 rounded bg-white"
                                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                                      />
                                      <button
                                        className="mt-4 px-4 py-2 bg-white text-black font-bold font-mono border-2 border-white hover:bg-black hover:text-white transition"
                                        onClick={() => executeCommand('projects')}
                                      >
                                        Back to Projects
                                      </button>
                                    </div>
                                  ),
                                  timestamp: new Date().toLocaleTimeString(),
                                },
                              ])
                            }}
                          >
                            View Live Preview
                          </button>
                        )}
                        <button
                          className="mt-6 px-4 py-2 bg-white text-black font-bold font-mono border-2 border-white hover:bg-black hover:text-white transition"
                          onClick={() => executeCommand('projects')}
                        >
                          Back to Projects
                        </button>
                      </div>
                    ),
                    timestamp: new Date().toLocaleTimeString(),
                  },
                ]);
              }}
            />
          </div>
        )

        setCommands([
          {
            id: Date.now().toString(),
            input: "",
            output: projectNode,
            timestamp: new Date().toLocaleTimeString(),
          },
        ])

        // update section state so header shows PROJECTS
        setCurrentSection("projects")
      }, 2000)
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
      <BootSoundVisualizer isActive={showBootSequence} />

      <FloatingNavigation onNavigate={handleNavigate} />

      {/* Quick Commands - Left Sidebar - Hidden on small mobile */}
      {terminalReady && (
        <motion.div
          className="fixed left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-30 hidden sm:block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="bg-black/90 backdrop-blur-md p-2 sm:p-4 rounded-lg border border-white/20">
            <div className="flex flex-col gap-1 sm:gap-2">
              <div className="text-white font-mono text-xs mb-1 sm:mb-2 opacity-60">QUICK CMD</div>
              {['about', 'projects', 'skills', 'contact', 'matrix', 'hack', 'neofetch', 'static'].map((cmd, index) => (
                <motion.button
                  key={cmd}
                  className="px-2 py-1 sm:px-3 sm:py-2 bg-white/5 text-gray-300 rounded font-mono text-xs hover:bg-white/10 hover:text-white transition-all text-left border border-white/10"
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
          className="max-w-4xl sm:max-w-5xl md:max-w-6xl mx-auto px-2 sm:px-4 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
        {/* Terminal Window */}
        <CRTEffect>
          <TerminalWindowEffect>
            <motion.div 
              className="bg-black border border-white/20 sm:border-2 border-white/20 rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] backdrop-blur-sm relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Scan lines overlay */}
              <TerminalScanLines intensity={0.015} />

              {/* TV Noise Effect rendered inside the terminal frame so the noise is clipped to the terminal */}
              <TVNoise isVisible={showTVNoise} onComplete={() => setShowTVNoise(false)} />

              {/* Terminal Shadow Inset */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none" />
          {/* Terminal Header */}
          <motion.div 
            className="bg-gradient-to-r from-white to-gray-100 text-black px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex justify-between items-center border-b border-white/10"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <motion.div 
                className="font-bold font-mono text-sm sm:text-base md:text-lg tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="hidden xs:inline">PORTFOLIO TERMINAL</span>
                <span className="xs:hidden">TERMINAL</span>
              </motion.div>
              <motion.div
                className="text-xs text-gray-600 font-mono hidden sm:block"
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
            
            <div className="flex flex-col p-2 sm:p-3 md:p-4 lg:p-6 h-[70vh] sm:h-[75vh] md:h-[80vh] lg:h-[85vh] overflow-y-auto custom-scrollbar relative z-10">
            <AnimatePresence mode="wait">
              {commands.map((cmd, index) => (
                <motion.div
                  key={cmd.id}
                  className="space-y-2 sm:space-y-3 p-2 sm:p-3 md:p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm"
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
