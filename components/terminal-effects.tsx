"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Glitch Effect Component
export function GlitchText({ children, isActive = false }: { children: string; isActive?: boolean }) {
  const [glitched, setGlitched] = useState(false)

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setGlitched(true)
      setTimeout(() => setGlitched(false), 150)
    }, 2000 + Math.random() * 3000)

    return () => clearInterval(interval)
  }, [isActive])

  if (glitched) {
    return (
      <span className="relative">
        <span className="absolute inset-0 text-white opacity-80 transform translate-x-1">
          {children.split('').map((char, i) => 
            Math.random() > 0.7 ? String.fromCharCode(33 + Math.floor(Math.random() * 94)) : char
          ).join('')}
        </span>
        <span className="absolute inset-0 text-gray opacity-60 transform -translate-x-1 translate-y-0.5">
          {children}
        </span>
        <span className="opacity-90">{children}</span>
      </span>
    )
  }

  return <span>{children}</span>
}

// Import the pixel spark loader
import { PixelSparkLoader } from './pixel-spark-loader'

// Simple Terminal Boot Sequence
export function TerminalBootSequence({ 
  onComplete, 
  theme = 'green',
  skip = false 
}: { 
  onComplete: () => void; 
  theme?: keyof typeof RETRO_THEMES;
  skip?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(true)
  const currentTheme = RETRO_THEMES[theme]

  useEffect(() => {
    if (skip) {
      setIsVisible(false)
      setTimeout(onComplete, 100)
      return
    }

    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onComplete, 500)
    }, 3000) // Extended to show pixel-spark animation

    return () => clearTimeout(timer)
  }, [onComplete, skip])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        setIsVisible(false)
        setTimeout(onComplete, 100)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50">
      <PixelSparkLoader
        isVisible={isVisible}
        onComplete={onComplete}
        duration={3000}
        theme={theme}
        pixelCount={49} // 7x7 grid for clean terminal look
        gridSize={10}
      />
    </div>
  )
}

// Typing Effect Hook
export function useTypingEffect(text: string, speed: number = 50) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setDisplayedText('')
    setIsComplete(false)
    let index = 0

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(prev => prev + text[index])
        index++
      } else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed])

  return { displayedText, isComplete }
}

// Terminal Scan Lines Effect
export function TerminalScanLines({ intensity = 0.02 }: { intensity?: number }) {
  return (
    <div 
      className="absolute inset-0 pointer-events-none z-10"
      style={{
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(255,255,255,${intensity}) 2px,
          rgba(255,255,255,${intensity}) 4px
        )`
      }}
    />
  )
}

// CRT Screen Effect
export function CRTEffect({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      {/* Screen curvature simulation */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-lg"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.1) 100%)',
          borderRadius: '8px'
        }}
      />
      {/* Screen glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 50px rgba(255,255,255,0.05)'
        }}
      />
    </div>
  )
}

// Progress Bar Component
export function TerminalProgressBar({ 
  progress, 
  label, 
  isComplete = false 
}: { 
  progress: number; 
  label: string; 
  isComplete?: boolean;
}) {
  const barWidth = 40

  return (
    <div className="font-mono text-white">
      <div className="mb-1">{label}</div>
      <div className="flex items-center gap-2">
        <div className="border border-white">
          <div 
            className="h-1 bg-white transition-all duration-300"
            style={{ width: `${(progress / 100) * barWidth * 4}px` }}
          />
        </div>
        <span className={isComplete ? "text-white" : "text-gray"}>
          {Math.round(progress)}%
        </span>
        {isComplete && <span className="text-white">✓</span>}
      </div>
    </div>
  )
}

// Simple Retro Loader
export function ASCIILoader({ isVisible }: { isVisible: boolean }) {
  const [dots, setDots] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setDots(prev => (prev + 1) % 4)
    }, 300)

    return () => clearInterval(interval)
  }, [isVisible])

  if (!isVisible) return null

  return (
    <span className="text-green-400 font-mono text-sm">
      LOADING{Array(dots + 1).fill('.').join('')}
    </span>
  )
}

// Retro Terminal Color Themes
export const RETRO_THEMES = {
  green: {
    primary: '#00ff41',
    secondary: '#00cc33',
    dim: '#008025',
    glow: 'rgba(0, 255, 65, 0.3)',
    text: '#00ff41',
    background: '#000000',
    scanline: 'rgba(0, 255, 65, 0.02)'
  },
  amber: {
    primary: '#ffb000',
    secondary: '#cc8800',
    dim: '#805500',
    glow: 'rgba(255, 176, 0, 0.3)',
    text: '#ffb000',
    background: '#000000',
    scanline: 'rgba(255, 176, 0, 0.02)'
  },
  white: {
    primary: '#ffffff',
    secondary: '#cccccc',
    dim: '#888888',
    glow: 'rgba(255, 255, 255, 0.3)',
    text: '#ffffff',
    background: '#000000',
    scanline: 'rgba(255, 255, 255, 0.02)'
  },
  cyberspace: {
    primary: '#00ffff',
    secondary: '#00cccc',
    dim: '#008888',
    glow: 'rgba(0, 255, 255, 0.3)',
    text: '#00ffff',
    background: '#000011',
    scanline: 'rgba(0, 255, 255, 0.02)'
  }
}

// Enhanced CRT Effect with Chromatic Aberration
export function EnhancedCRTEffect({ 
  children, 
  theme = 'green',
  intensity = 0.5 
}: { 
  children: React.ReactNode; 
  theme?: keyof typeof RETRO_THEMES;
  intensity?: number;
}) {
  const [chromaticShift, setChromaticShift] = useState(0)
  const currentTheme = RETRO_THEMES[theme]

  useEffect(() => {
    const interval = setInterval(() => {
      setChromaticShift(Math.random() * 2 - 1) // Random shift between -1 and 1
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      className="relative"
      style={{
        '--retro-primary': currentTheme.primary,
        '--retro-secondary': currentTheme.secondary,
        '--retro-dim': currentTheme.dim,
        '--retro-glow': currentTheme.glow,
        '--retro-text': currentTheme.text,
        '--retro-bg': currentTheme.background,
        '--retro-scanline': currentTheme.scanline,
      } as React.CSSProperties}
    >
      {/* Chromatic Aberration Layers */}
      <div 
        className="absolute inset-0 pointer-events-none z-20 opacity-30"
        style={{
          transform: `translateX(${chromaticShift * intensity}px)`,
          filter: 'blur(0.5px)',
          mixBlendMode: 'screen'
        }}
      >
        <div className="w-full h-full" style={{ backgroundColor: 'red' }} />
      </div>
      <div 
        className="absolute inset-0 pointer-events-none z-20 opacity-30"
        style={{
          transform: `translateX(${-chromaticShift * intensity}px)`,
          filter: 'blur(0.5px)',
          mixBlendMode: 'screen'
        }}
      >
        <div className="w-full h-full" style={{ backgroundColor: 'cyan' }} />
      </div>

      {/* Screen Curvature */}
      <div 
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.3) 100%)',
          borderRadius: '12px'
        }}
      />

      {/* Screen Glow */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          boxShadow: `
            inset 0 0 120px ${currentTheme.glow},
            inset 0 0 60px ${currentTheme.glow},
            0 0 40px ${currentTheme.glow}
          `
        }}
      />

      {/* Vignette Effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-25"
        style={{
          boxShadow: 'inset 0 0 200px rgba(0,0,0,0.8)'
        }}
      />

      {children}
    </div>
  )
}

// Terminal Window Manager with Enhanced Effects
export function TerminalWindowEffect({ 
  children, 
  theme = 'green',
  enableFlicker = true,
  enableGhosting = true 
}: { 
  children: React.ReactNode; 
  theme?: keyof typeof RETRO_THEMES;
  enableFlicker?: boolean;
  enableGhosting?: boolean;
}) {
  const [flicker, setFlicker] = useState(false)
  const [ghosting, setGhosting] = useState(false)
  const currentTheme = RETRO_THEMES[theme]

  useEffect(() => {
    if (!enableFlicker) return

    const flickerInterval = setInterval(() => {
      if (Math.random() < 0.02) { // 2% chance
        setFlicker(true)
        setTimeout(() => setFlicker(false), 50 + Math.random() * 100)
      }
    }, 100)

    return () => clearInterval(flickerInterval)
  }, [enableFlicker])

  useEffect(() => {
    if (!enableGhosting) return

    const ghostingInterval = setInterval(() => {
      if (Math.random() < 0.005) { // 0.5% chance
        setGhosting(true)
        setTimeout(() => setGhosting(false), 200)
      }
    }, 200)

    return () => clearInterval(ghostingInterval)
  }, [enableGhosting])

  return (
    <div 
      className={`relative transition-all duration-50 ${
        flicker ? 'opacity-90 brightness-110' : 'opacity-100 brightness-100'
      } ${ghosting ? 'blur-sm' : ''}`}
      style={{
        filter: ghosting ? 'blur(1px) contrast(1.2)' : 'none',
        textShadow: `0 0 10px ${currentTheme.glow}`
      }}
    >
      {/* Phosphor Persistence Effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `linear-gradient(180deg, transparent, ${currentTheme.scanline})`,
          mixBlendMode: 'screen'
        }}
      />
      
      {children}
    </div>
  )
}

// Retro Terminal Header with System Info
export function RetroTerminalHeader({ 
  theme = 'green',
  title = 'TERMINAL',
  showSystemInfo = true 
}: {
  theme?: keyof typeof RETRO_THEMES;
  title?: string;
  showSystemInfo?: boolean;
}) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const currentTheme = RETRO_THEMES[theme]

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div 
      className="px-4 py-2 border-b flex justify-between items-center"
      style={{
        borderColor: currentTheme.primary,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        boxShadow: `inset 0 -1px 0 ${currentTheme.glow}`
      }}
    >
      <div className="flex items-center gap-4">
        <span 
          className="font-bold font-mono text-sm tracking-wider"
          style={{ color: currentTheme.primary, textShadow: `0 0 5px ${currentTheme.glow}` }}
        >
          {title}
        </span>
        {showSystemInfo && (
          <div className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: currentTheme.primary }}
            />
            <span 
              className="font-mono text-xs opacity-70"
              style={{ color: currentTheme.secondary }}
            >
              ONLINE
            </span>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-6">
        <span 
          className="font-mono text-xs opacity-70"
          style={{ color: currentTheme.secondary }}
        >
          {currentTime.toLocaleTimeString()}
        </span>
        <div className="flex gap-2">
          {['_', '□', '×'].map((char, i) => (
            <button
              key={i}
              className="w-4 h-4 flex items-center justify-center font-mono text-xs hover:opacity-100 transition-opacity"
              style={{ 
                color: currentTheme.primary,
                opacity: 0.6,
                border: `1px solid ${currentTheme.primary}`
              }}
            >
              {char}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
