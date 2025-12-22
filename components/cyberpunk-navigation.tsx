"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Terminal, 
  Home, 
  User, 
  Briefcase, 
  Mail, 
  Code, 
  Settings,
  Zap,
  Cpu,
  Wifi
} from "lucide-react"

/**
 * CyberpunkNavigation - Advanced retro-cyberpunk navigation system
 * Features holographic effects, glitch animations, and interactive hover states
 */
export function CyberpunkNavigation() {
  const [activeSection, setActiveSection] = useState("terminal")
  const [isGlitching, setIsGlitching] = useState(false)

  // Navigation items with icons and labels
  const navItems = [
    { id: "terminal", label: "TERMINAL", icon: Terminal, color: "cyan" },
    { id: "home", label: "HOME", icon: Home, color: "magenta" },
    { id: "about", label: "ABOUT", icon: User, color: "purple" },
    { id: "projects", label: "PROJECTS", icon: Briefcase, color: "green" },
    { id: "skills", label: "SKILLS", icon: Code, color: "yellow" },
    { id: "contact", label: "CONTACT", icon: Mail, color: "red" },
    { id: "settings", label: "SETTINGS", icon: Settings, color: "blue" }
  ]

  // Trigger periodic glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 8000)

    return () => clearInterval(glitchInterval)
  }, [])

  // Handle navigation click
  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId)
    // Add sound effect here if needed
  }

  // Color classes for different sections
  const getColorClasses = (color: string, isActive: boolean) => {
    const colorMap: Record<string, { bg: string; text: string; border: string }> = {
      cyan: {
        bg: isActive ? "bg-cyan-500/20" : "bg-cyan-500/10",
        text: isActive ? "text-cyan-400" : "text-cyan-600",
        border: isActive ? "border-cyan-400" : "border-cyan-600/30"
      },
      magenta: {
        bg: isActive ? "bg-magenta-500/20" : "bg-magenta-500/10",
        text: isActive ? "text-magenta-400" : "text-magenta-600",
        border: isActive ? "border-magenta-400" : "border-magenta-600/30"
      },
      purple: {
        bg: isActive ? "bg-purple-500/20" : "bg-purple-500/10",
        text: isActive ? "text-purple-400" : "text-purple-600",
        border: isActive ? "border-purple-400" : "border-purple-600/30"
      },
      green: {
        bg: isActive ? "bg-green-500/20" : "bg-green-500/10",
        text: isActive ? "text-green-400" : "text-green-600",
        border: isActive ? "border-green-400" : "border-green-600/30"
      },
      yellow: {
        bg: isActive ? "bg-yellow-500/20" : "bg-yellow-500/10",
        text: isActive ? "text-yellow-400" : "text-yellow-600",
        border: isActive ? "border-yellow-400" : "border-yellow-600/30"
      },
      red: {
        bg: isActive ? "bg-red-500/20" : "bg-red-500/10",
        text: isActive ? "text-red-400" : "text-red-600",
        border: isActive ? "border-red-400" : "border-red-600/30"
      },
      blue: {
        bg: isActive ? "bg-blue-500/20" : "bg-blue-500/10",
        text: isActive ? "text-blue-400" : "text-blue-600",
        border: isActive ? "border-blue-400" : "border-blue-600/30"
      }
    }
    return colorMap[color] || colorMap.cyan
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      {/* Holographic overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <Cpu className={`w-8 h-8 text-cyan-400 ${isGlitching ? 'animate-pulse' : ''}`} />
              <div className="absolute inset-0 blur-xl bg-cyan-400/30" />
            </div>
            <div className="flex flex-col">
              <span className={`text-white font-bold text-sm tracking-widest ${isGlitching ? 'animate-pulse' : ''}`}>
                SALMAN.TECH
              </span>
              <span className="text-cyan-400 text-xs font-mono tracking-wider opacity-70">
                {isGlitching ? "▒▓▒ SYSTEM.ACTIVE ▒▓▒" : "> SYSTEM.ONLINE"}
              </span>
            </div>
          </motion.div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-1">
            <AnimatePresence>
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id
                const colors = getColorClasses(item.color, isActive)
                const Icon = item.icon

                return (
                  <motion.button
                    key={item.id}
                    className={`relative px-4 py-2 border ${colors.border} ${colors.bg} rounded-none transition-all duration-300 group overflow-hidden`}
                    onClick={() => handleNavClick(item.id)}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Hover glow effect */}
                    <div className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    {/* Content */}
                    <div className="relative flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${colors.text} transition-colors duration-300`} />
                      <span className={`font-mono text-xs font-bold tracking-wider ${colors.text} transition-colors duration-300`}>
                        {item.label}
                      </span>
                    </div>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className={`absolute bottom-0 left-0 right-0 h-0.5 ${colors.text.replace('text-', 'bg-')}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.1 }}
                      />
                    )}

                    {/* Glitch effect overlay */}
                    {isGlitching && isActive && (
                      <div className="absolute inset-0 bg-white/10 animate-pulse" />
                    )}
                  </motion.button>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Status Indicators */}
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Connection Status */}
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-green-400 animate-pulse" />
              <span className="text-green-400 text-xs font-mono">ONLINE</span>
            </div>

            {/* System Status */}
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-xs font-mono">POWER:MAX</span>
            </div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 border border-cyan-400/30 bg-cyan-500/10 rounded-none"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(6, 182, 212, 0.2)" }}
            whileTap={{ scale: 0.9 }}
          >
            <Terminal className="w-5 h-5 text-cyan-400" />
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {false && ( /* Add mobile menu state here */
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id
                  const colors = getColorClasses(item.color, isActive)
                  const Icon = item.icon

                  return (
                    <button
                      key={item.id}
                      className={`w-full px-4 py-3 border-l-4 ${colors.border} ${colors.bg} flex items-center gap-3 transition-all duration-300`}
                      onClick={() => handleNavClick(item.id)}
                    >
                      <Icon className={`w-5 h-5 ${colors.text}`} />
                      <span className={`font-mono text-sm font-bold tracking-wider ${colors.text}`}>
                        {item.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div 
          className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          style={{
            animation: "scanlines 8s linear infinite"
          }}
        />
      </div>
    </nav>
  )
}
