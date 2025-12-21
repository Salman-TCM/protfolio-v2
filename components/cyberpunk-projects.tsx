"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ExternalLink, 
  Github, 
  Eye, 
  Code, 
  Zap,
  Cpu,
  Globe,
  Database,
  Shield
} from "lucide-react"

/**
 * CyberpunkProjects - Advanced project showcase with holographic effects
 * Features 3D transforms, glitch animations, and interactive hover states
 */

// Enhanced project data with cyberpunk styling
const projects = [
  {
    id: "scraping-system",
    title: "WEB SCRAPING SYSTEM",
    description: "Advanced multi-threaded scraping infrastructure with proxy rotation and CAPTCHA bypass",
    category: "INFRASTRUCTURE",
    tech: ["Python", "Scrapy", "Redis", "Docker"],
    color: "cyan",
    status: "ACTIVE",
    metrics: {
      speed: "95%",
      reliability: "99.2%",
      uptime: "99.9%"
    },
    links: {
      demo: "https://scraping.demo.com",
      github: "https://github.com/Salman-TCM/scraping-system"
    },
    features: [
      "✓ Proxy Rotation",
      "✓ CAPTCHA Bypass", 
      "✓ Real-time Monitoring",
      "✓ Auto-scaling"
    ]
  },
  {
    id: "nlp-classifier",
    title: "NLP CLASSIFICATION ENGINE",
    description: "Machine learning powered text classification with 98.7% accuracy",
    category: "AI/ML",
    tech: ["Python", "TensorFlow", "NLTK", "FastAPI"],
    color: "magenta",
    status: "BETA",
    metrics: {
      accuracy: "98.7%",
      speed: "120ms",
      throughput: "10K req/s"
    },
    links: {
      demo: "https://nlp.demo.com",
      github: "https://github.com/Salman-TCM/nlp-classifier"
    },
    features: [
      "✓ Multi-language",
      "✓ Custom Models",
      "✓ Real-time API",
      "✓ Dashboard"
    ]
  },
  {
    id: "api-gateway",
    title: "MICROSERVICES GATEWAY",
    description: "High-performance API gateway with rate limiting and authentication",
    category: "BACKEND",
    tech: ["Node.js", "Express", "MongoDB", "JWT"],
    color: "purple",
    status: "PRODUCTION",
    metrics: {
      requests: "1M+/day",
      latency: "45ms",
      availability: "99.95%"
    },
    links: {
      demo: "https://api.demo.com",
      github: "https://github.com/Salman-TCM/api-gateway"
    },
    features: [
      "✓ Rate Limiting",
      "✓ Authentication",
      "✓ Load Balancing",
      "✓ Monitoring"
    ]
  },
  {
    id: "dashboard-analytics",
    title: "REAL-TIME ANALYTICS",
    description: "Interactive dashboard with live data visualization and alerts",
    category: "FRONTEND",
    tech: ["React", "D3.js", "WebSocket", "Chart.js"],
    color: "green",
    status: "PRODUCTION",
    metrics: {
      users: "50K+",
      dataPoints: "1M+",
      refresh: "100ms"
    },
    links: {
      demo: "https://analytics.demo.com",
      github: "https://github.com/Salman-TCM/analytics-dashboard"
    },
    features: [
      "✓ Real-time Updates",
      "✓ Custom Widgets",
      "✓ Export Reports",
      "✓ Mobile Responsive"
    ]
  },
  {
    id: "security-scanner",
    title: "SECURITY SCANNER",
    description: "Automated vulnerability scanner with comprehensive reporting",
    category: "SECURITY",
    tech: ["Python", "Nmap", "Metasploit", "ELK Stack"],
    color: "yellow",
    status: "ALPHA",
    metrics: {
      scans: "1000+",
      vulnerabilities: "500+",
      time: "5min"
    },
    links: {
      demo: "https://security.demo.com",
      github: "https://github.com/Salman-TCM/security-scanner"
    },
    features: [
      "✓ Automated Scanning",
      "✓ Risk Assessment",
      "✓ PDF Reports",
      "✓ API Integration"
    ]
  },
  {
    id: "blockchain-wallet",
    title: "BLOCKCHAIN WALLET",
    description: "Secure cryptocurrency wallet with multi-chain support",
    category: "BLOCKCHAIN",
    tech: ["Solidity", "Web3.js", "React", "IPFS"],
    color: "red",
    status: "DEVELOPMENT",
    metrics: {
      chains: "5+",
      tokens: "50+",
      security: "AAA"
    },
    links: {
      demo: "https://wallet.demo.com",
      github: "https://github.com/Salman-TCM/blockchain-wallet"
    },
    features: [
      "✓ Multi-chain",
      "✓ Hardware Wallet",
      "✓ DeFi Integration",
      "✓ NFT Support"
    ]
  }
]

export function CyberpunkProjects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [filter, setFilter] = useState("ALL")
  const [isGlitching, setIsGlitching] = useState(false)

  // Categories for filtering
  const categories = ["ALL", "INFRASTRUCTURE", "AI/ML", "BACKEND", "FRONTEND", "SECURITY", "BLOCKCHAIN"]

  // Filtered projects
  const filteredProjects = filter === "ALL" 
    ? projects 
    : projects.filter(p => p.category === filter)

  // Color classes
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
      cyan: {
        bg: "bg-cyan-500/20",
        text: "text-cyan-400",
        border: "border-cyan-400",
        glow: "shadow-cyan-400/50"
      },
      magenta: {
        bg: "bg-magenta-500/20",
        text: "text-magenta-400",
        border: "border-magenta-400",
        glow: "shadow-magenta-400/50"
      },
      purple: {
        bg: "bg-purple-500/20",
        text: "text-purple-400",
        border: "border-purple-400",
        glow: "shadow-purple-400/50"
      },
      green: {
        bg: "bg-green-500/20",
        text: "text-green-400",
        border: "border-green-400",
        glow: "shadow-green-400/50"
      },
      yellow: {
        bg: "bg-yellow-500/20",
        text: "text-yellow-400",
        border: "border-yellow-400",
        glow: "shadow-yellow-400/50"
      },
      red: {
        bg: "bg-red-500/20",
        text: "text-red-400",
        border: "border-red-400",
        glow: "shadow-red-400/50"
      }
    }
    return colorMap[color] || colorMap.cyan
  }

  // Trigger glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 150)
    }, 10000)
    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className={`text-6xl font-bold tracking-widest mb-4 ${isGlitching ? 'animate-pulse' : ''}`}>
            <span className="bg-gradient-to-r from-cyan-400 via-magenta-400 to-purple-400 bg-clip-text text-transparent">
              PROJECT ARCHIVE
            </span>
          </h1>
          <p className="text-gray-400 font-mono text-lg tracking-wide">
            [SYSTEM.STATUS: ONLINE] [PROJECTS: {projects.length}]
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 border font-mono text-sm font-bold tracking-wider transition-all duration-300 ${
                filter === category
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white border-white/30 hover:border-white/60 hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {category === "ALL" ? "[ALL]" : `[${category}]`}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              const colors = getColorClasses(project.color)
              const isHovered = hoveredProject === project.id
              const isSelected = selectedProject === project.id

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotateY: 0,
                    z: isHovered ? 50 : 0
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.8, 
                    rotateY: 10,
                    z: -50
                  }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateX: 5,
                    rotateY: 5,
                    z: 100
                  }}
                  onHoverStart={() => setHoveredProject(project.id)}
                  onHoverEnd={() => setHoveredProject(null)}
                  onClick={() => setSelectedProject(isSelected ? null : project.id)}
                  className={`relative border-2 ${colors.border} ${colors.bg} rounded-none p-6 cursor-pointer transform-gpu transition-all duration-300 ${
                    isHovered ? `shadow-2xl ${colors.glow}` : ""
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                  }}
                >
                  {/* Holographic overlay */}
                  {isHovered && (
                    <div className={`absolute inset-0 ${colors.bg} opacity-50 pointer-events-none animate-pulse`} />
                  )}

                  {/* Status Badge */}
                  <div className={`absolute -top-3 -right-3 px-3 py-1 ${colors.bg} ${colors.border} border text-xs font-bold ${colors.text} rounded-none`}>
                    {project.status}
                  </div>

                  {/* Project Header */}
                  <div className="mb-4">
                    <h3 className={`text-xl font-bold ${colors.text} mb-2 tracking-wider`}>
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-mono">
                      {project.category}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-1 ${colors.bg} ${colors.border} border text-xs ${colors.text} rounded-none font-mono`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-xs font-mono">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className={`${colors.text} font-bold`}>{value}</div>
                        <div className="text-gray-500 uppercase text-[10px]">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className={`text-xs ${colors.text} font-bold mb-2`}>[FEATURES]</div>
                    <div className="space-y-1">
                      {project.features.slice(0, isHovered ? 4 : 2).map((feature, idx) => (
                        <div key={idx} className="text-xs text-gray-400 font-mono">
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <motion.a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 ${colors.border} ${colors.bg} border ${colors.text} text-xs font-bold transition-all duration-300`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Eye className="w-3 h-3" />
                      DEMO
                    </motion.a>
                    <motion.a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 ${colors.border} ${colors.bg} border ${colors.text} text-xs font-bold transition-all duration-300`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-3 h-3" />
                      CODE
                    </motion.a>
                  </div>

                  {/* Glitch Effect Overlay */}
                  {isGlitching && (
                    <div className="absolute inset-0 bg-white/10 animate-pulse pointer-events-none" />
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="bg-black border-2 border-white/20 rounded-none max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
                initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotateY: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal content would go here */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {projects.find(p => p.id === selectedProject)?.title}
                  </h2>
                  <p className="text-gray-400">
                    Detailed project information coming soon...
                  </p>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="mt-4 px-4 py-2 border border-red-400 text-red-400 font-mono text-sm hover:bg-red-400/10 transition-all"
                  >
                    [CLOSE]
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CRT Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.03) 0px,
              transparent 1px,
              transparent 2px,
              rgba(255, 255, 255, 0.03) 3px
            )`,
            animation: 'scanlines 8s linear infinite'
          }}
        />
      </div>
    </div>
  )
}
