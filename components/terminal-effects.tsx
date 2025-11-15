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

// Terminal Boot Sequence
export function TerminalBootSequence({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const bootSteps = [
    "BIOS POST... OK",
    "Loading kernel modules...",
    "Initializing hardware drivers...",
    "Starting network services...",
    "Mounting file systems...",
    "Loading user profile...",
    "TERMINAL READY"
  ]

  useEffect(() => {
    if (currentStep < bootSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
      }, 300 + Math.random() * 400)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setIsComplete(true)
        setTimeout(onComplete, 800)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [currentStep, bootSteps.length, onComplete])

  if (isComplete) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center font-mono"
      exit={{ opacity: 0 }}
    >
      <div className="max-w-md">
        {bootSteps.slice(0, currentStep + 1).map((step, index) => (
          <motion.div
            key={index}
            className="text-white text-sm mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-gray">{">"}</span> {step}
            {index === currentStep && (
              <motion.span
                className="ml-2"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                █
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
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

// ASCII Art Loader
export function ASCIILoader({ isVisible }: { isVisible: boolean }) {
  const [frame, setFrame] = useState(0)

  const frames = [
    "◐", "◓", "◑", "◒"
  ]

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setFrame(prev => (prev + 1) % frames.length)
    }, 200)

    return () => clearInterval(interval)
  }, [isVisible, frames.length])

  if (!isVisible) return null

  return (
    <span className="text-white font-mono">
      {frames[frame]}
    </span>
  )
}

// Terminal Window Manager
export function TerminalWindowEffect({ children }: { children: React.ReactNode }) {
  const [flicker, setFlicker] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.01) { // 1% chance
        setFlicker(true)
        setTimeout(() => setFlicker(false), 50)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`transition-opacity duration-50 ${flicker ? 'opacity-95' : 'opacity-100'}`}>
      {children}
    </div>
  )
}