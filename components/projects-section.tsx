"use client"

import { motion, AnimatePresence, useAnimation, useScroll, useTransform } from "framer-motion"
import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react"

interface ProjectMedia {
  type: "image" | "video"
  url: string
  alt?: string
}

interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  link: string
  color: "cyan" | "magenta" | "purple"
  media: ProjectMedia[]
  fullDescription: string
  liveUrl?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "bKash SIDA - AI-Powered Social Media Analytics",
    description: "NLP pipeline for multi-class topic classification, NER and sentiment analysis for bKash social channels (Bengali) with LLMs.",
    tech: ["Python", "Transformers", "Pandas", "Scikit-learn"],
    link: "#",
    color: "cyan",
    media: [
      { type: "image", url: "/project1.png", alt: "Dashboard Overview" },
      { type: "image", url: "/image.png", alt: "Analytics Pipeline" },
      { type: "image", url: "/project 4.png", alt: "Sentiment Analysis" },
      { type: "video", url: "/placeholder-logo.png", alt: "System Demo" },
    ],
    fullDescription: "Developed multi-class topic classification, NER and sentiment analysis pipeline using LLMs and classical ML to automate social media monitoring for Bangladesh's largest MFS provider.",
  },
  {
    id: 2,
    title: "CTTC Social Media Monitoring System",
    description: "High-performance data API and analytics platform using Django, Elasticsearch and MinIO for real-time social media monitoring.",
    tech: ["Django", "Elasticsearch", "PostgreSQL", "MinIO"],
    link: "#",
    color: "magenta",
    media: [
      { type: "image", url: "/image.png", alt: "CTTC Social Media Monitoring System" },
      { type: "image", url: "/project1.png", alt: "Data Dashboard" },
      { type: "image", url: "/project 4.png", alt: "Search Interface" },
      { type: "video", url: "/placeholder-logo.png", alt: "Platform Demo" },
    ],
    fullDescription: "Architected a scalable API with Elasticsearch backend, advanced query optimization, caching, and MinIO-based distributed storage for enterprise analytics.",
  },
  {
    id: 3,
    title: "Vault Alarm & Monitoring System — Jamuna Bank",
    description: "IoT-enabled vault alarm and monitoring deployed across 35+ bank branches with DSC/DLS integration and Sur-Gard receivers.",
    tech: ["IoT", "DSC DLS", "Sur-Gard", "Kronos"],
    link: "#",
    color: "purple",
    media: [
      { type: "image", url: "/project 4.png", alt: "Monitoring Dashboard" },
      { type: "image", url: "/image.png", alt: "Bank Branch Setup" },
      { type: "video", url: "/placeholder-logo.png", alt: "System Overview" },
      { type: "image", url: "/project1.png", alt: "Alert Interface" },
    ],
    fullDescription: "Led deployment of alarm & monitoring systems across 35+ branches with DSC programming, Sur-Gard integration, and centralized monitoring automation.",
  },
  {
    id: 4,
    title: "BGB E-Recruitment Platform",
    description: "Enterprise recruitment platform with secure payments, 2FA, Dockerized deployment and role-based access control.",
    tech: ["Django", "React", "MySQL", "Docker"],
    link: "https://joinborderguard.bgb.gov.bd",
    color: "cyan",
    media: [
      { type: "image", url: "/project1.png", alt: "Application Portal" },
      { type: "image", url: "/image.png", alt: "Admin Dashboard" },
      { type: "video", url: "/placeholder-logo.png", alt: "Platform Walkthrough" },
      { type: "image", url: "/project 4.png", alt: "Payment Integration" },
    ],
    fullDescription: "Built secure recruitment workflows, payment integration, 2FA, and containerized deployments for Border Guard Bangladesh's recruitment portal.",
    liveUrl: "https://joinborderguard.bgb.gov.bd",
  },
  {
    id: 5,
    title: "AV Automation — Huawei / Unilever",
    description: "Crestron SIMPL automation, Dante audio over IP and Xilica DSP integration for corporate AV systems.",
    tech: ["Crestron", "Dante", "Xilica", "Netgear AV"],
    link: "#",
    color: "magenta",
    media: [
      { type: "image", url: "/project 4.png", alt: "Control Interface" },
      { type: "image", url: "/project1.png", alt: "Audio Setup" },
      { type: "video", url: "/placeholder-logo.png", alt: "System Demo" },
      { type: "image", url: "/image.png", alt: "Conference Room" },
    ],
    fullDescription: "Designed low-latency AV switching and configured Dante networks, Crestron automation, and DSPs for high-quality corporate conference systems.",
  },
  {
    id: 6,
    title: "ZKTeco Access Control",
    description: "Enterprise biometric access control integration with PostgreSQL backend, RBAC and real-time logging for facility security.",
    tech: ["ZKTeco", "PostgreSQL", "RBAC", "Biometrics"],
    link: "#",
    color: "purple",
    media: [
      { type: "image", url: "/image.png", alt: "Access Dashboard" },
      { type: "image", url: "/project 4.png", alt: "Biometric Scanner" },
      { type: "video", url: "/placeholder-logo.png", alt: "System Overview" },
      { type: "image", url: "/project1.png", alt: "User Management" },
    ],
    fullDescription: "Implemented enterprise-grade access control with biometric integration, optimized PostgreSQL schemas, and audit logging.",
  },
]

// CRT Scanlines Effect Component
function CRTScanlines({ intensity = 0.1 }: { intensity?: number }) {
  return (
    <div 
      className="absolute inset-0 pointer-events-none z-50"
      style={{
        background: `
          repeating-linear-gradient(
            0deg,
            rgba(255, 255, 255, ${intensity}) 0px,
            transparent 1px,
            transparent 2px,
            rgba(255, 255, 255, ${intensity}) 3px
          )
        `,
        animation: 'scanlines 8s linear infinite'
      }}
    />
  )
}

// VHS Glitch Effect
function VHSGlitch({ isActive }: { isActive: boolean }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.8, 1, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 pointer-events-none z-40"
          style={{
            background: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(255, 0, 255, 0.03) 2px,
                rgba(0, 255, 255, 0.03) 4px,
                transparent 4px,
                transparent 6px
              )
            `,
            mixBlendMode: 'screen'
          }}
        />
      )}
    </AnimatePresence>
  )
}

// Retro Glow Effect
function RetroGlow({ children, color = "cyan" }: { children: React.ReactNode; color?: string }) {
  const glowColor = {
    cyan: "rgba(0, 255, 255, 0.3)",
    magenta: "rgba(255, 0, 255, 0.3)",
    purple: "rgba(128, 0, 255, 0.3)"
  }[color]

  return (
    <div 
      className="relative"
      style={{
        boxShadow: `
          0 0 20px ${glowColor},
          0 0 40px ${glowColor},
          inset 0 0 20px ${glowColor}
        `
      }}
    >
      {children}
    </div>
  )
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false)

  const colorClass = {
    cyan: "border-cyan-400 text-cyan-400",
    magenta: "border-magenta-400 text-magenta-400", 
    purple: "border-purple-400 text-purple-400"
  }[project.color]

  const bgColorClass = {
    cyan: "hover:bg-cyan-400/5",
    magenta: "hover:bg-magenta-400/5",
    purple: "hover:bg-purple-400/5"
  }[project.color]

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, rotateY: 2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`border-2 p-6 transition-all cursor-pointer ${colorClass} ${bgColorClass} bg-black/80 backdrop-blur-sm group relative overflow-hidden`}
    >
      {/* Animated background grid on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px"
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <h3 className={`text-lg font-bold ${colorClass}`}>{project.title}</h3>
          <motion.span animate={{ rotate: isHovered ? 45 : 0 }} className={`text-xl ${colorClass}`}>
            +
          </motion.span>
        </div>

        <p className="text-white/70 text-sm mb-4 font-mono leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 3).map((tech) => (
            <span key={tech} className="text-xs px-2 py-1 border border-white/30 text-white/70 font-mono">
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-xs px-2 py-1 border border-white/30 text-white/50 font-mono">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        <motion.button
          whileHover={{ x: 5 }}
          className={`text-sm font-mono ${colorClass} hover:opacity-80 transition-opacity`}
        >
          {"> VIEW PROJECT"}
        </motion.button>
      </div>
    </motion.div>
  )
}

// Full Screen Project Viewer
function ProjectViewer({ 
  project, 
  onClose, 
  onNextProject, 
  onPrevProject 
}: { 
  project: Project
  onClose: () => void
  onNextProject: () => void
  onPrevProject: () => void
}) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [showGlitch, setShowGlitch] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({ container: containerRef })
  
  const colorClass = {
    cyan: "border-cyan-400 text-cyan-400",
    magenta: "border-magenta-400 text-magenta-400",
    purple: "border-purple-400 text-purple-400"
  }[project.color]

  const glowColor = {
    cyan: "rgba(0, 255, 255, 0.5)",
    magenta: "rgba(255, 0, 255, 0.5)",
    purple: "rgba(128, 0, 255, 0.5)"
  }[project.color]

  // Handle scroll navigation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const container = containerRef.current
      const scrollPercentage = container.scrollTop / (container.scrollHeight - container.clientHeight)
      const mediaCount = project.media.length
      const newIndex = Math.min(Math.floor(scrollPercentage * mediaCount), mediaCount - 1)
      
      if (newIndex !== currentMediaIndex) {
        setShowGlitch(true)
        setTimeout(() => {
          setCurrentMediaIndex(newIndex)
          setShowGlitch(false)
        }, 300)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [currentMediaIndex, project.media.length])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') handleNextMedia()
      if (e.key === 'ArrowLeft') handlePrevMedia()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleNextMedia = () => {
    if (currentMediaIndex < project.media.length - 1) {
      setShowGlitch(true)
      setTimeout(() => {
        setCurrentMediaIndex(prev => prev + 1)
        setShowGlitch(false)
      }, 300)
    } else {
      // Move to next project
      onNextProject()
    }
  }

  const handlePrevMedia = () => {
    if (currentMediaIndex > 0) {
      setShowGlitch(true)
      setTimeout(() => {
        setCurrentMediaIndex(prev => prev - 1)
        setShowGlitch(false)
      }, 300)
    } else {
      // Move to previous project
      onPrevProject()
    }
  }

  // Handle swipe gestures
  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    if (direction === 'right') {
      handleNextMedia()
    } else {
      handlePrevMedia()
    }
  }, [handleNextMedia, handlePrevMedia])

  // Touch handling for mobile swipe
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current || !touchStartY.current) return

    const touchEndX = e.changedTouches[0].clientX
    const touchEndY = e.changedTouches[0].clientY

    const deltaX = touchEndX - touchStartX.current
    const deltaY = Math.abs(touchEndY - touchStartY.current)

    // Check if it's a horizontal swipe (not vertical scroll)
    if (Math.abs(deltaX) > 50 && deltaY < 100) {
      if (deltaX > 0) {
        handleSwipe('right')
      } else {
        handleSwipe('left')
      }
    }

    touchStartX.current = null
    touchStartY.current = null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-black overflow-hidden"
    >
      {/* CRT Scanlines */}
      <CRTScanlines intensity={0.05} />
      
      {/* VHS Glitch Effect */}
      <VHSGlitch isActive={showGlitch} />

      {/* Main Content Container */}
      <div ref={containerRef} className="h-full overflow-y-auto custom-scrollbar">
        <div className="min-h-full flex flex-col">
          {/* Header */}
          <motion.div 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`border-b-2 ${colorClass} bg-black/80 backdrop-blur-md p-6 sticky top-0 z-40`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className={`p-2 border-2 ${colorClass} bg-black/50 hover:bg-white/10 transition-all`}
                >
                  <X className="w-6 h-6" />
                </motion.button>
                <div>
                  <h1 className={`text-2xl font-bold ${colorClass} font-mono`}>{project.title}</h1>
                  <p className="text-white/60 font-mono text-sm mt-1">{project.description}</p>
                </div>
              </div>
              
              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onPrevProject}
                  className={`p-2 border-2 ${colorClass} bg-black/50 hover:bg-white/10 transition-all`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <span className="text-white/60 font-mono text-sm px-2">
                  {currentMediaIndex + 1}/{project.media.length}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onNextProject}
                  className={`p-2 border-2 ${colorClass} bg-black/50 hover:bg-white/10 transition-all`}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Media Display Area */}
          <div 
            className="flex-1 relative"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMediaIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="h-full flex items-center justify-center p-8"
              >
                <RetroGlow color={project.color}>
                  {project.media[currentMediaIndex].type === 'image' ? (
                    <div className="relative">
                      <img
                        src={project.media[currentMediaIndex].url}
                        alt={project.media[currentMediaIndex].alt}
                        className="max-w-full max-h-[70vh] object-contain border-2 border-white/20"
                        style={{
                          filter: 'contrast(1.1) brightness(1.05)',
                        }}
                      />
                      {/* Image Caption */}
                      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 ${colorClass}`}>
                        <p className="text-white font-mono text-sm">
                          {project.media[currentMediaIndex].alt}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full max-w-4xl">
                      <video
                        src={project.media[currentMediaIndex].url}
                        className="w-full max-h-[70vh] border-2 border-white/20"
                        controls
                        autoPlay
                        muted
                        loop
                        style={{
                          filter: 'contrast(1.1) brightness(1.05)',
                        }}
                      />
                      {/* Video Caption */}
                      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 ${colorClass}`}>
                        <p className="text-white font-mono text-sm">
                          {project.media[currentMediaIndex].alt}
                        </p>
                      </div>
                    </div>
                  )}
                </RetroGlow>
              </motion.div>
            </AnimatePresence>

            {/* Arrow Hints */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 text-white/40 font-mono text-sm">
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>SCROLL</span>
              </motion.div>
              <span className="text-white/20">|</span>
              <motion.div
                animate={{ x: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-2"
              >
                <span>NAVIGATE</span>
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>

          {/* Fixed Live Site Button */}
          {project.liveUrl && (
            <motion.a
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`fixed right-8 top-1/2 transform -translate-y-1/2 px-6 py-3 bg-black/80 backdrop-blur-md border-2 ${colorClass} font-mono text-sm hover:bg-white/10 transition-all group`}
              style={{
                boxShadow: `0 0 20px ${glowColor}`,
              }}
            >
              <div className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                <span>{"> VIEW LIVE SITE"}</span>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className={`w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse`} />
              </div>
            </motion.a>
          )}

          {/* Project Info Footer */}
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className={`border-t-2 ${colorClass} bg-black/80 backdrop-blur-md p-6`}
          >
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className={`text-lg font-bold ${colorClass} font-mono mb-2`}>// PROJECT_DETAILS</h3>
                  <p className="text-white/80 font-mono text-sm leading-relaxed">
                    {project.fullDescription}
                  </p>
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${colorClass} font-mono mb-2`}>// TECH_STACK</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className={`text-xs px-3 py-1 border ${colorClass} bg-black/50 font-mono`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add scroll sections for navigation */}
      <div className="absolute inset-0 pointer-events-none">
        {project.media.map((_, index) => (
          <div
            key={index}
            className="h-screen w-1"
            style={{ position: 'absolute', top: `${index * 100}%` }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const handleProjectClick = (projectIndex: number) => {
    setSelectedProjectIndex(projectIndex)
    setIsViewerOpen(true)
  }

  const handleCloseViewer = () => {
    setIsViewerOpen(false)
    setTimeout(() => setSelectedProjectIndex(null), 500)
  }

  const handleNextProject = () => {
    if (selectedProjectIndex !== null && selectedProjectIndex < projects.length - 1) {
      setSelectedProjectIndex(prev => (prev !== null ? prev + 1 : 0))
    } else {
      setSelectedProjectIndex(0)
    }
  }

  const handlePrevProject = () => {
    if (selectedProjectIndex !== null && selectedProjectIndex > 0) {
      setSelectedProjectIndex(prev => (prev !== null ? prev - 1 : projects.length - 1))
    } else {
      setSelectedProjectIndex(projects.length - 1)
    }
  }

  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative">
        {/* Background accent */}
        <div className="absolute -right-32 bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="max-w-6xl w-full relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">{"> Featured Projects v2_"}</h2>
            <p className="text-white/60 font-mono text-sm md:text-base">
              {"// Click any project to enter retro viewer mode"}
            </p>
          </motion.div>

          {/* Projects grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProjectCard 
                  project={project} 
                  onClick={() => handleProjectClick(index)}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <div className="text-white/40 font-mono text-sm space-y-2">
              <p>{"// Click projects to view fullscreen gallery"}</p>
              <p>{"// Use scroll/arrows to navigate between media"}</p>
              <p>{"// Press ESC to exit viewer"}</p>
            </div>
            
            {/* Test Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleProjectClick(1)}
              className="mt-6 px-6 py-3 border-2 border-magenta-400 text-magenta-400 bg-black/50 hover:bg-magenta-400/10 font-mono text-sm transition-all"
            >
              {"> TEST RETRO VIEWER [CTTC PROJECT]"}
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Project Viewer Modal */}
      <AnimatePresence>
        {isViewerOpen && selectedProjectIndex !== null && (
          <ProjectViewer
            project={projects[selectedProjectIndex]}
            onClose={handleCloseViewer}
            onNextProject={handleNextProject}
            onPrevProject={handlePrevProject}
          />
        )}
      </AnimatePresence>
    </>
  )
}
