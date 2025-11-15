"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Terminal Sound Effect Simulator
export function TerminalSoundSimulator({ 
  isTyping, 
  showVisualizer = true 
}: { 
  isTyping: boolean; 
  showVisualizer?: boolean;
}) {
  const [beats, setBeats] = useState<number[]>([])

  useEffect(() => {
    if (!isTyping) return

    const interval = setInterval(() => {
      setBeats(prev => [...prev.slice(-10), Math.random() * 100])
    }, 100)

    return () => clearInterval(interval)
  }, [isTyping])

  if (!showVisualizer || !isTyping) return null

  return (
    <div className="fixed bottom-4 right-4 flex items-end gap-1">
      {beats.map((beat, index) => (
        <motion.div
          key={index}
          className="w-1 bg-white"
          style={{ height: `${Math.max(4, beat * 0.3)}px` }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.1 }}
        />
      ))}
    </div>
  )
}

// Keyboard Sound Effect Visual
export function KeyboardSoundEffect({ isActive }: { isActive: boolean }) {
  const [ripples, setRipples] = useState<{ id: string; x: number; y: number }[]>([])

  useEffect(() => {
    if (!isActive) return

    const addRipple = () => {
      const newRipple = {
        id: Date.now().toString(),
        x: Math.random() * window.innerWidth,
        y: window.innerHeight - 100 - Math.random() * 50
      }
      
      setRipples(prev => [...prev, newRipple])
      
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id))
      }, 1000)
    }

    const interval = setInterval(addRipple, 200)
    return () => clearInterval(interval)
  }, [isActive])

  return (
    <>
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="fixed pointer-events-none"
          style={{ left: ripple.x, top: ripple.y }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="w-2 h-2 border border-white rounded-full" />
        </motion.div>
      ))}
    </>
  )
}

// System Boot Sound Visualizer
export function BootSoundVisualizer({ isActive }: { isActive: boolean }) {
  if (!isActive) return null

  return (
    <motion.div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.2, 1] }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      <div className="relative">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 border border-white rounded-full"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: [0, 2, 3], 
              opacity: [1, 0.5, 0] 
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}