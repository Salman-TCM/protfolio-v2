"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronUp, 
  ChevronDown, 
  X,
  ExternalLink,
  Github,
  Globe,
  Code,
  Layers,
  Terminal,
  Zap,
  Database,
  Server,
  MousePointer
} from "lucide-react"

const PROJECTS = [
  {
    id: 1,
    name: "bKash SIDA - AI Social Media Analytics",
    image: "/project1.png",
    tech: ["Python", "Transformers", "Pandas", "Scikit-learn", "LangChain"],
    description: "NLP pipeline for multi-class topic classification and sentiment analysis for bKash social channels (Bengali).",
    fullDescription: "Developed a sophisticated NLP pipeline using state-of-the-art transformer models for Bengali language processing. Implemented multi-class topic classification, named entity recognition, and sentiment analysis to automate social media monitoring for Bangladesh's largest mobile financial services provider.",
    status: "ACTIVE",
    type: "AI/ML",
    highlights: [
      "95% accuracy in topic classification",
      "Real-time sentiment analysis",
      "Processes 100k+ messages daily",
      "Bengali language NLP"
    ],
    github: null,
    url: null
  },
  {
    id: 2,
    name: "CTTC Social Media Monitoring System",
    image: "/image.png",
    tech: ["Django", "Elasticsearch", "PostgreSQL", "MinIO", "Redis"],
    description: "High-performance data API and analytics platform for social media ingestion and search.",
    fullDescription: "Architected a scalable API with Elasticsearch backend for real-time social media monitoring. Implemented advanced query optimization, distributed caching with Redis, and MinIO-based object storage for handling large-scale media files and analytics data.",
    status: "ACTIVE",
    type: "Backend",
    highlights: [
      "Handles 1M+ API requests/day",
      "Sub-second query response",
      "Distributed architecture",
      "Real-time data ingestion"
    ],
    github: null,
    url: null
  },
  {
    id: 3,
    name: "BGB E-Recruitment Platform",
    image: "/project 4.png",
    tech: ["Django", "React", "MySQL", "Docker", "Kubernetes"],
    description: "Enterprise recruitment platform with secure payments, 2FA and RBAC.",
    fullDescription: "Built a comprehensive recruitment platform for Border Guard Bangladesh, handling the entire recruitment lifecycle. Implemented secure payment gateway integration, two-factor authentication, role-based access control, and containerized deployment with auto-scaling capabilities.",
    status: "LIVE",
    type: "Full-Stack",
    highlights: [
      "50,000+ active users",
      "Secure payment processing",
      "99.9% uptime SLA",
      "Multi-stage recruitment workflow"
    ],
    github: null,
    url: "https://joinborderguard.bgb.gov.bd"
  },
  {
    id: 4,
    name: "Vault Alarm & Monitoring — Jamuna Bank",
    image: "/placeholder.jpg",
    tech: ["DSC DLS", "Sur-Gard", "Kronos", "IoT", "Python"],
    description: "IoT-enabled vault alarm and monitoring deployed across bank branches.",
    fullDescription: "Led deployment of sophisticated alarm and monitoring systems across 35+ bank branches. Programmed DSC panels, integrated Sur-Gard central monitoring, and developed Python-based automation scripts for real-time alert management and incident response.",
    status: "DEPLOYED",
    type: "IoT/Security",
    highlights: [
      "35+ branches secured",
      "24/7 monitoring system",
      "Zero security breaches",
      "Automated incident response"
    ],
    github: null,
    url: null
  },
  {
    id: 5,
    name: "AV Automation — Huawei / Unilever",
    image: "/placeholder.jpg",
    tech: ["Crestron SIMPL", "Dante", "Xilica", "Control Systems"],
    description: "Enterprise AV automation, audio-over-IP and DSP integrations for corporate clients.",
    fullDescription: "Designed and implemented enterprise-grade AV automation systems for Fortune 500 companies. Configured Dante audio networks for low-latency audio distribution, programmed Crestron control systems, and optimized DSP configurations for premium conference room experiences.",
    status: "COMPLETED",
    type: "Hardware/AV",
    highlights: [
      "10+ enterprise deployments",
      "Ultra-low latency audio",
      "Custom control interfaces",
      "Remote management capability"
    ],
    github: null,
    url: null
  },
  {
    id: 6,
    name: "ZKTeco Access Control",
    image: "/placeholder.jpg",
    tech: ["ZKTeco", "PostgreSQL", "RBAC", "Biometric", "Python"],
    description: "Biometric access control system with real-time logging and RBAC.",
    fullDescription: "Implemented enterprise-grade biometric access control system with advanced features. Developed custom middleware for device integration, optimized database schemas for audit logging, and created real-time dashboards for security monitoring and access management.",
    status: "COMPLETED",
    type: "Security",
    highlights: [
      "1000+ users managed",
      "Real-time access logs",
      "Multi-factor authentication",
      "Compliance ready"
    ],
    github: null,
    url: null
  }
]

export function TerminalProjectsGallery() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [isGlitching, setIsGlitching] = useState(false)
  const [showProjectInfo, setShowProjectInfo] = useState(false)
  const [showFullDetails, setShowFullDetails] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()
  const touchStartY = useRef<number>(0)

  const currentProject = PROJECTS[currentProjectIndex]

  const handleScroll = (e: React.WheelEvent) => {
    e.preventDefault()
    
    if (showProjectInfo) return // Don't scroll when info is open
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    setIsGlitching(true)
    
    scrollTimeoutRef.current = setTimeout(() => {
      if (e.deltaY > 0 && currentProjectIndex < PROJECTS.length - 1) {
        setCurrentProjectIndex(prev => prev + 1)
      } else if (e.deltaY < 0 && currentProjectIndex > 0) {
        setCurrentProjectIndex(prev => prev - 1)
      }
      setIsGlitching(false)
    }, 100)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (showProjectInfo) return // Don't swipe when info is open
    
    const touchEndY = e.changedTouches[0].clientY
    const diff = touchStartY.current - touchEndY

    if (Math.abs(diff) > 50) {
      setIsGlitching(true)
      setTimeout(() => {
        if (diff > 0 && currentProjectIndex < PROJECTS.length - 1) {
          setCurrentProjectIndex(prev => prev + 1)
        } else if (diff < 0 && currentProjectIndex > 0) {
          setCurrentProjectIndex(prev => prev - 1)
        }
        setIsGlitching(false)
      }, 100)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowProjectInfo(false)
      setShowFullDetails(false)
    } else if (!showProjectInfo) {
      if (e.key === "ArrowDown" && currentProjectIndex < PROJECTS.length - 1) {
        navigateToProject(currentProjectIndex + 1)
      } else if (e.key === "ArrowUp" && currentProjectIndex > 0) {
        navigateToProject(currentProjectIndex - 1)
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault()
        setShowProjectInfo(true)
      } else if (e.key >= "1" && e.key <= "6") {
        const index = parseInt(e.key) - 1
        if (index < PROJECTS.length) {
          navigateToProject(index)
        }
      }
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault()
      setShowFullDetails(!showFullDetails)
    }
  }

  const navigateToProject = (index: number) => {
    setIsGlitching(true)
    setShowProjectInfo(false)
    setShowFullDetails(false)
    setTimeout(() => {
      setCurrentProjectIndex(index)
      setIsGlitching(false)
      setImageLoading(true)
    }, 100)
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [currentProjectIndex, showProjectInfo, showFullDetails])

  useEffect(() => {
    setImageLoading(true)
    setShowProjectInfo(false)
    setShowFullDetails(false)
  }, [currentProjectIndex])

  const getTypeIcon = (type: string) => {
    switch(type) {
      case "AI/ML": return <Zap className="w-4 h-4" />
      case "Backend": return <Server className="w-4 h-4" />
      case "Full-Stack": return <Layers className="w-4 h-4" />
      case "IoT/Security": return <Database className="w-4 h-4" />
      case "Hardware/AV": return <Terminal className="w-4 h-4" />
      case "Security": return <Code className="w-4 h-4" />
      default: return <Code className="w-4 h-4" />
    }
  }

  return (
    <div 
      ref={containerRef}
      className="h-full w-full bg-black overflow-hidden relative"
      onWheel={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Full Screen Container - No TV Frame */}
      <div className="absolute inset-0 bg-black">
        {/* Full Screen Display - No Borders */}
        <div 
          className="absolute inset-0 bg-black overflow-hidden"
        >
          {/* Screen curvature effect */}
          <div 
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at center, transparent 0%, transparent 85%, rgba(0,0,0,0.3) 100%)`,
            }}
          />
          
          {/* Scanlines Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-15 z-10"
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

          {/* TV Static/Noise Effect */}
          <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-screen"
            style={{
              background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
              animation: 'noise 0.2s infinite'
            }}
          />

          {/* Glitch Effect Overlay */}
          <AnimatePresence>
            {isGlitching && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20"
              >
                <div className="h-full w-full bg-white/8 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/15 to-transparent animate-pulse" />
                {/* TV interference lines */}
                <div className="absolute inset-0"
                  style={{
                    background: `repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 2px,
                      rgba(255,255,255,0.1) 2px,
                      rgba(255,255,255,0.1) 4px
                    )`,
                    animation: 'interference 0.1s infinite'
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col relative"
            >
              {/* Full Screen Image */}
              <div className="relative h-full w-full">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center z-30">
                    <div className="text-white/70 font-mono text-lg animate-pulse">
                      [LOADING...]
                    </div>
                  </div>
                )}
                
                {/* Main Image - Clickable */}
                <motion.div 
                  className="h-full w-full relative cursor-pointer group"
                  onClick={() => setShowProjectInfo(true)}
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.2 }}
                >
                  <img 
                    src={currentProject.image} 
                    alt={currentProject.name}
                    className="w-full h-full object-contain p-2"
                    onLoad={() => setImageLoading(false)}
                    style={{
                      filter: isGlitching 
                        ? 'blur(1px) brightness(1.3) contrast(1.2)' 
                        : 'brightness(1.1) contrast(1.05)',
                    }}
                  />

                  {/* Click Instruction - Shows when not loading and info not shown */}
                  {!imageLoading && !showProjectInfo && (
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="bg-black/90 border border-white/30 px-6 py-3 flex items-center gap-3 text-white font-mono rounded-lg backdrop-blur-sm">
                          <MousePointer className="w-4 h-4" />
                          <span className="text-sm">CLICK TO VIEW DETAILS</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Minimal Project Title - Bottom */}
                  {!showProjectInfo && !imageLoading && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-6"
                    >
                      <div className="text-white font-mono text-center">
                        <h2 className="text-lg md:text-xl font-bold tracking-wide">{currentProject.name}</h2>
                        <div className="text-xs text-white/50 mt-1">
                          {currentProject.type} • {currentProject.status}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Project Information Panel - Overlay */}
              <AnimatePresence>
                {showProjectInfo && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-black/95 backdrop-blur-sm z-40 overflow-y-auto"
                  >
                    <div className="min-h-full p-6 md:p-12 lg:p-16">
                      {/* Close Button */}
                      <button
                        onClick={() => {
                          setShowProjectInfo(false)
                          setShowFullDetails(false)
                        }}
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50"
                      >
                        <X className="w-6 h-6" />
                      </button>

                      <div className="max-w-4xl mx-auto">
                        {/* Project Header */}
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="mb-8"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center gap-2">
                              {getTypeIcon(currentProject.type)}
                              <span className="text-white/50 text-sm font-mono">{currentProject.type}</span>
                            </div>
                            <div className={`text-xs px-3 py-1 border font-mono ${
                              currentProject.status === 'ACTIVE' || currentProject.status === 'LIVE' 
                                ? 'border-white text-white animate-pulse' 
                                : 'border-white/50 text-white/70'
                            }`}>
                              [{currentProject.status}]
                            </div>
                          </div>
                          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-mono mb-4">
                            {currentProject.name}
                          </h1>
                        </motion.div>

                        {/* Tech Stack */}
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="mb-8"
                        >
                          <div className="text-white/50 text-sm font-mono mb-3">// TECH STACK</div>
                          <div className="flex flex-wrap gap-2">
                            {currentProject.tech.map((tech, index) => (
                              <span 
                                key={index}
                                className="text-sm px-3 py-1 border border-white/30 text-white/80 hover:border-white hover:text-white transition-colors font-mono"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </motion.div>

                        {/* Description */}
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="mb-8"
                        >
                          <div className="text-white/50 text-sm font-mono mb-3">// DESCRIPTION</div>
                          <AnimatePresence mode="wait">
                            {showFullDetails ? (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <p className="text-white/90 text-base leading-relaxed mb-6 font-mono">
                                  {currentProject.fullDescription}
                                </p>
                                
                                {/* Highlights */}
                                <div>
                                  <div className="text-white/50 text-sm font-mono mb-3">// KEY HIGHLIGHTS</div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {currentProject.highlights.map((highlight, index) => (
                                      <div key={index} className="flex items-start gap-2">
                                        <span className="text-white/50 mt-1">▸</span>
                                        <span className="text-white/80 text-sm font-mono">{highlight}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            ) : (
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-white/80 text-base font-mono"
                              >
                                {currentProject.description}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="flex flex-wrap gap-3"
                        >
                          {currentProject.url && (
                            <a 
                              href={currentProject.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-white text-sm border border-white/50 px-4 py-2 hover:bg-white hover:text-black transition-all font-mono"
                            >
                              <Globe className="w-4 h-4" /> VIEW LIVE DEMO
                            </a>
                          )}
                          {currentProject.github && (
                            <a 
                              href={currentProject.github} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-white text-sm border border-white/50 px-4 py-2 hover:bg-white hover:text-black transition-all font-mono"
                            >
                              <Github className="w-4 h-4" /> VIEW SOURCE
                            </a>
                          )}
                          <button
                            onClick={() => setShowFullDetails(!showFullDetails)}
                            className="inline-flex items-center gap-2 text-white text-sm border border-white/50 px-4 py-2 hover:bg-white hover:text-black transition-all font-mono"
                          >
                            {showFullDetails ? 'LESS INFO' : 'MORE INFO'}
                          </button>
                        </motion.div>

                        {/* Keyboard Hint */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="mt-8 pt-8 border-t border-white/10"
                        >
                          <div className="text-white/30 text-xs font-mono text-center">
                            [ESC] Close • [SPACE] Toggle Details • [↑↓] Navigate • [1-6] Jump
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Simple Navigation Bar - Bottom */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30">
                <div className="flex items-center bg-black/80 backdrop-blur-sm rounded-full border border-white/20">
                  <button 
                    onClick={() => navigateToProject(currentProjectIndex - 1)}
                    disabled={currentProjectIndex === 0}
                    className={`text-xs font-mono ${
                      currentProjectIndex === 0 
                        ? 'text-white/30 cursor-not-allowed' 
                        : 'text-white hover:text-white/70 transition-colors'
                    }`}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  
                  {/* Simple dots indicator */}
                  <div className="flex gap-1">
                    {PROJECTS.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentProjectIndex ? 'bg-white' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => navigateToProject(currentProjectIndex + 1)}
                    disabled={currentProjectIndex === PROJECTS.length - 1}
                    className={`text-xs font-mono ${
                      currentProjectIndex === PROJECTS.length - 1 
                        ? 'text-white/30 cursor-not-allowed' 
                        : 'text-white hover:text-white/70 transition-colors'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes noise {
          0% { transform: translateX(0px); }
          10% { transform: translateX(-2px); }
          20% { transform: translateX(2px); }
          30% { transform: translateX(0px); }
          40% { transform: translateX(1px); }
          50% { transform: translateX(-1px); }
          60% { transform: translateX(0px); }
          70% { transform: translateX(-1px); }
          80% { transform: translateX(1px); }
          90% { transform: translateX(0px); }
          100% { transform: translateX(0px); }
        }
        
        @keyframes interference {
          0% { transform: translateY(0px) scaleX(1); }
          33% { transform: translateY(-2px) scaleX(1.02); }
          66% { transform: translateY(1px) scaleX(0.98); }
          100% { transform: translateY(0px) scaleX(1); }
        }
      `}</style>
    </div>
  )
}
