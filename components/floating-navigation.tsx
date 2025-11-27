'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FloatingNavigationProps {
  onNavigate: (command: string) => void
}

const FloatingNavigation = ({ onNavigate }: FloatingNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'About', command: 'about', icon: '◉', color: 'white' },
    { label: 'Projects', command: 'projects', icon: '▦', color: 'white' },
    { label: 'Skills', command: 'skills', icon: '◆', color: 'gray' },
    { label: 'Contact', command: 'contact', icon: '✉', color: 'white' },
    { label: 'Download CV', command: 'cv', icon: '⬇', color: 'gray' },
    { label: 'AI Chat', command: 'ai', icon: '⟟', color: 'gray' },
    { label: 'Help', command: 'help', icon: '?', color: 'white' },
    { label: 'Sound', command: 'sound', icon: '♫', color: 'white' },
  ]

  return (
    <div className="fixed top-2 sm:top-4 md:top-6 right-2 sm:right-4 md:right-6 z-50 nav-top-right">
      {/* Main Toggle Button - Improved Design */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-black flex items-center justify-center text-white hover:bg-white hover:text-black transition-all relative group"
        aria-label="Toggle navigation menu"
      >
        <motion.div
          className="flex flex-col gap-1 w-4 h-4 sm:w-5 sm:h-5 justify-center items-center"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
        >
          <motion.span 
            className="w-4 h-0.5 sm:w-5 bg-current transition-all origin-center"
            animate={{ 
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 2 : 0
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span 
            className="w-4 h-0.5 sm:w-5 bg-current transition-all"
            animate={{ 
              opacity: isOpen ? 0 : 1,
              x: isOpen ? -20 : 0
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.span 
            className="w-4 h-0.5 sm:w-5 bg-current transition-all origin-center"
            animate={{ 
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -2 : 0
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        
        {/* Corner accent lines */}
        <div className="absolute top-0 left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-t border-l border-white group-hover:border-black hidden" />
        <div className="absolute top-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-t border-r border-white group-hover:border-black hidden" />
        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-b border-l border-white group-hover:border-black hidden" />
        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-b border-r border-white group-hover:border-black hidden" />
      </motion.button>

      {/* Navigation Menu - Responsive */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute top-12 sm:top-14 md:top-16 right-0 bg-black/90 border border-white/30 rounded-lg p-2 sm:p-3 md:p-4 backdrop-blur-sm max-w-[85vw] sm:max-w-[90vw] md:max-w-none nav-menu-top-right"
          >
            <div className="text-xs text-white mb-1 sm:mb-2 md:mb-3 text-center font-mono">
              QUICK NAVIGATION
            </div>
            
            <div className="space-y-1 sm:space-y-2 min-w-[140px] sm:min-w-[160px] md:min-w-[180px]">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.command}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    onNavigate(item.command)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center space-x-1 sm:space-x-2 md:space-x-3 p-1.5 sm:p-2 md:p-3 border border-white/20 text-white hover:bg-white hover:text-black transition-all font-mono text-xs sm:text-xs md:text-sm group`}
                >
                  <span className="text-xs sm:text-sm md:text-lg">{item.icon}</span>
                  <span className="flex-1 text-left truncate">{item.label}</span>
                  <span className="text-xs text-gray-500 hidden sm:inline">⏎</span>
                </motion.button>
              ))}
            </div>

            <div className="mt-2 sm:mt-3 md:mt-4 pt-1 sm:pt-2 md:pt-3 border-t border-white/20">
              <div className="text-xs text-gray-500 text-center font-mono">
                Click buttons or type commands in terminal
              </div>
              <div className="text-xs text-white/70 text-center font-mono mt-0.5 sm:mt-1">
                All buttons execute terminal commands
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Hint - Responsive */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute top-12 sm:top-14 md:top-16 right-0 bg-black/80 text-white text-xs p-1.5 sm:p-2 rounded border border-white/30 backdrop-blur-sm pointer-events-none hidden sm:block nav-hint-top-right"
        >
          Click for navigation
        </motion.div>
      )}

    </div>
  )
}

export default FloatingNavigation
