"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp, ChevronDown, ExternalLink } from "lucide-react"

const PROJECTS = [
  {
    id: 1,
    name: "bKash SIDA - AI Social Media Analytics",
    image: "/project1.png",
    tech: "Python, Transformers, Pandas, Scikit-learn, LangChain",
    description: "NLP pipeline for multi-class topic classification and sentiment analysis for bKash social channels (Bengali).",
    status: "ACTIVE",
    url: null
  },
  {
    id: 2,
    name: "CTTC Social Media Monitoring System",
    image: "/image.png",
    tech: "Django, Elasticsearch, PostgreSQL, MinIO",
    description: "High-performance data API and analytics platform for social media ingestion and search.",
    status: "ACTIVE",
    url: null
  },
  {
    id: 3,
    name: "BGB E-Recruitment Platform",
    image: "/project 4.png",
    tech: "Django, React, MySQL, Docker",
    description: "Enterprise recruitment platform with secure payments, 2FA and RBAC.",
    status: "LIVE",
    url: "https://joinborderguard.bgb.gov.bd"
  },
  {
    id: 4,
    name: "Vault Alarm & Monitoring — Jamuna Bank",
    image: "/placeholder.jpg",
    tech: "DSC DLS, Sur-Gard, Kronos, IoT",
    description: "IoT-enabled vault alarm and monitoring deployed across bank branches.",
    status: "DEPLOYED",
    url: null
  },
  {
    id: 5,
    name: "AV Automation — Huawei / Unilever",
    image: "/placeholder.jpg",
    tech: "Crestron SIMPL, Dante, Xilica",
    description: "Enterprise AV automation, audio-over-IP and DSP integrations for corporate clients.",
    status: "COMPLETED",
    url: null
  },
  {
    id: 6,
    name: "ZKTeco Access Control",
    image: "/placeholder.jpg",
    tech: "ZKTeco, PostgreSQL, RBAC, Biometric",
    description: "Biometric access control system with real-time logging and RBAC.",
    status: "COMPLETED",
    url: null
  }
]

export function TerminalProjectsGallery() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [isGlitching, setIsGlitching] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  const currentProject = PROJECTS[currentProjectIndex]

  const handleScroll = (e: React.WheelEvent) => {
    e.preventDefault()
    
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

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown" && currentProjectIndex < PROJECTS.length - 1) {
      setIsGlitching(true)
      setTimeout(() => {
        setCurrentProjectIndex(prev => prev + 1)
        setIsGlitching(false)
      }, 100)
    } else if (e.key === "ArrowUp" && currentProjectIndex > 0) {
      setIsGlitching(true)
      setTimeout(() => {
        setCurrentProjectIndex(prev => prev - 1)
        setIsGlitching(false)
      }, 100)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [currentProjectIndex])

  return (
    <div 
      ref={containerRef}
      className="h-full w-full bg-black overflow-hidden relative"
      onWheel={handleScroll}
    >
      {/* Scanlines Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10 z-10"
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

      {/* Glitch Effect Overlay */}
      {isGlitching && (
        <div className="absolute inset-0 z-20">
          <div className="h-full w-full bg-white/5 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse" />
        </div>
      )}

      {/* Project Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProject.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="h-full flex flex-col p-4 md:p-8"
        >
          {/* Header */}
          <div className="text-white font-mono mb-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-white/50 text-xs">PROJECT {currentProject.id}/{PROJECTS.length}</span>
                <h2 className="text-xl md:text-2xl font-bold tracking-wide">{currentProject.name}</h2>
              </div>
              <div className="text-right">
                <div className={`text-xs px-2 py-1 inline-block border ${
                  currentProject.status === 'ACTIVE' ? 'border-white text-white' :
                  currentProject.status === 'LIVE' ? 'border-white text-white animate-pulse' :
                  'border-white/50 text-white/70'
                }`}>
                  [{currentProject.status}]
                </div>
              </div>
            </div>
            <div className="text-white/70 text-sm">{currentProject.tech}</div>
          </div>

          {/* Project Image Container */}
          <div className="flex-1 relative overflow-hidden border-2 border-white/30 bg-black/50">
            <img 
              src={currentProject.image} 
              alt={currentProject.name}
              className="w-full h-full object-contain"
              style={{
                filter: isGlitching ? 'blur(2px) brightness(1.2)' : 'none',
                transform: isGlitching ? 'scale(1.01)' : 'scale(1)',
                transition: 'all 0.3s'
              }}
            />
            
            {/* Project Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <p className="text-white/90 text-sm mb-2">{currentProject.description}</p>
              {currentProject.url && (
                <a 
                  href={currentProject.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white text-xs border border-white/50 px-3 py-1 hover:bg-white hover:text-black transition-all"
                >
                  VIEW LIVE <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-4 flex items-center justify-between text-white font-mono text-sm">
            <div className="flex items-center gap-4">
              {currentProjectIndex > 0 && (
                <button 
                  onClick={() => {
                    setIsGlitching(true)
                    setTimeout(() => {
                      setCurrentProjectIndex(prev => prev - 1)
                      setIsGlitching(false)
                    }, 100)
                  }}
                  className="flex items-center gap-1 hover:text-white/70 transition-colors"
                >
                  <ChevronUp className="w-4 h-4" /> PREV
                </button>
              )}
              {currentProjectIndex < PROJECTS.length - 1 && (
                <button 
                  onClick={() => {
                    setIsGlitching(true)
                    setTimeout(() => {
                      setCurrentProjectIndex(prev => prev + 1)
                      setIsGlitching(false)
                    }, 100)
                  }}
                  className="flex items-center gap-1 hover:text-white/70 transition-colors"
                >
                  NEXT <ChevronDown className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {/* Progress Indicator */}
            <div className="flex gap-1">
              {PROJECTS.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 border border-white/50 ${
                    index === currentProjectIndex ? 'bg-white' : 'bg-transparent'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 text-white/50 text-xs font-mono">
        [SCROLL or ↑↓ to navigate]
      </div>
    </div>
  )
}