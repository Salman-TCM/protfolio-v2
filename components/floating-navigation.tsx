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
    <div className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50 nav-top-right">
      {/* Main Toggle Button - Improved Design */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 sm:w-14 sm:h-14 bg-black border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-black transition-all relative group"
        aria-label="Toggle navigation menu"
      >
        <motion.div
          className="flex flex-col gap-1 w-5 h-5 justify-center items-center"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
        >
          <motion.span 
            className="w-5 h-0.5 bg-current transition-all origin-center"
            animate={{ 
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 2.5 : 0
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span 
            className="w-5 h-0.5 bg-current transition-all"
            animate={{ 
              opacity: isOpen ? 0 : 1,
              x: isOpen ? -20 : 0
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.span 
            className="w-5 h-0.5 bg-current transition-all origin-center"
            animate={{ 
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -2.5 : 0
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        
        {/* Corner accent lines */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white group-hover:border-black" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white group-hover:border-black" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white group-hover:border-black" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white group-hover:border-black" />
      </motion.button>

      {/* Navigation Menu - Responsive */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute top-14 sm:top-16 right-0 bg-black/90 border border-white/30 rounded-lg p-3 sm:p-4 backdrop-blur-sm max-w-[90vw] sm:max-w-none nav-menu-top-right"
          >
            <div className="text-xs text-white mb-2 sm:mb-3 text-center font-mono">
              QUICK NAVIGATION
            </div>
            
            <div className="space-y-1 sm:space-y-2 min-w-[160px] sm:min-w-[180px]">
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
                  className={`w-full flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 border border-white/20 text-white hover:bg-white hover:text-black transition-all font-mono text-xs sm:text-sm group`}
                >
                  <span className="text-sm sm:text-lg">{item.icon}</span>
                  <span className="flex-1 text-left">{item.label}</span>
                  <span className="text-xs text-gray-500 hidden sm:inline">⏎</span>
                </motion.button>
              ))}
            </div>

            <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-white/20">
              <div className="text-xs text-gray-500 text-center font-mono">
                Click buttons or type commands in terminal
              </div>
              <div className="text-xs text-white/70 text-center font-mono mt-1">
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
          className="absolute top-14 sm:top-16 right-0 bg-black/80 text-white text-xs p-2 rounded border border-white/30 backdrop-blur-sm pointer-events-none hidden sm:block nav-hint-top-right"
        >
          Click for navigation
        </motion.div>
      )}

    </div>
  )
}

export default FloatingNavigation
