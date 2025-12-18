"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { RETRO_THEMES } from './terminal-effects'

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

// Retro Terminal Sound Manager
export class RetroTerminalSoundManager {
  private audioContext: AudioContext | null = null
  private isMuted: boolean = false

  constructor() {
    // Initialize audio context on first user interaction
    this.initAudioContext()
  }

  private initAudioContext() {
    if (typeof window !== 'undefined' && !this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }

  private createOscillator(frequency: number, duration: number, type: OscillatorType = 'sine'): void {
    if (!this.audioContext || this.isMuted) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.frequency.value = frequency
    oscillator.type = type

    // ADSR envelope
    const now = this.audioContext.currentTime
    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(0.1, now + 0.01) // Attack
    gainNode.gain.exponentialRampToValueAtTime(0.05, now + 0.05) // Decay
    gainNode.gain.exponentialRampToValueAtTime(0, now + duration) // Release

    oscillator.start(now)
    oscillator.stop(now + duration)
  }

  // Classic terminal beep sound
  public terminalBeep(frequency: number = 800, duration: number = 0.1): void {
    this.createOscillator(frequency, duration, 'square')
  }

  // Key press sound (subtle click)
  public keyPress(): void {
    this.createOscillator(1200, 0.02, 'square')
  }

  // Return key sound (confirmation)
  public returnKey(): void {
    this.createOscillator(600, 0.05, 'sine')
    setTimeout(() => this.createOscillator(800, 0.05, 'sine'), 50)
  }

  // Error sound
  public errorBeep(): void {
    this.createOscillator(200, 0.2, 'sawtooth')
  }

  // Success sound
  public successBeep(): void {
    this.createOscillator(400, 0.1, 'sine')
    setTimeout(() => this.createOscillator(600, 0.1, 'sine'), 100)
    setTimeout(() => this.createOscillator(800, 0.15, 'sine'), 200)
  }

  // Boot sequence sounds
  public bootSequence(): void {
    const bootSounds = [
      { freq: 400, delay: 0 },
      { freq: 600, delay: 200 },
      { freq: 800, delay: 400 },
      { freq: 1000, delay: 600 }
    ]

    bootSounds.forEach(({ freq, delay }) => {
      setTimeout(() => this.createOscillator(freq, 0.15, 'sine'), delay)
    })
  }

  // Matrix rain sound effect
  public matrixSound(): void {
    if (this.isMuted) return

    const createRainDrop = () => {
      if (!this.audioContext) return
      const frequency = Math.random() * 2000 + 1000
      this.createOscillator(frequency, 0.05, 'sine')
    }

    // Create multiple rain drops
    for (let i = 0; i < 5; i++) {
      setTimeout(createRainDrop, Math.random() * 1000)
    }
  }

  // System alert sound
  public systemAlert(): void {
    this.createOscillator(1000, 0.3, 'square')
    setTimeout(() => this.createOscillator(800, 0.3, 'square'), 150)
  }

  // Toggle mute
  public toggleMute(): boolean {
    this.isMuted = !this.isMuted
    return this.isMuted
  }

  public getIsMuted(): boolean {
    return this.isMuted
  }
}

// Global sound manager instance
export const terminalSoundManager = new RetroTerminalSoundManager()

// Enhanced Terminal Sound Hook
export function useRetroTerminalSounds() {
  const [isMuted, setIsMuted] = useState(false)

  const playBeep = (frequency?: number, duration?: number) => {
    terminalSoundManager.terminalBeep(frequency, duration)
  }

  const playKeyPress = () => {
    terminalSoundManager.keyPress()
  }

  const playReturnKey = () => {
    terminalSoundManager.returnKey()
  }

  const playError = () => {
    terminalSoundManager.errorBeep()
  }

  const playSuccess = () => {
    terminalSoundManager.successBeep()
  }

  const playBootSequence = () => {
    terminalSoundManager.bootSequence()
  }

  const playMatrixSound = () => {
    terminalSoundManager.matrixSound()
  }

  const playSystemAlert = () => {
    terminalSoundManager.systemAlert()
  }

  const toggleMute = () => {
    const newState = terminalSoundManager.toggleMute()
    setIsMuted(newState)
    return newState
  }

  return {
    isMuted,
    playBeep,
    playKeyPress,
    playReturnKey,
    playError,
    playSuccess,
    playBootSequence,
    playMatrixSound,
    playSystemAlert,
    toggleMute
  }
}

// Retro Sound Control Panel
export function RetroSoundControl({ 
  theme = 'green' 
}: { 
  theme?: keyof typeof RETRO_THEMES;
}) {
  const { isMuted, toggleMute } = useRetroTerminalSounds()
  const currentTheme = RETRO_THEMES[theme]

  return (
    <motion.div
      className="p-2 border rounded-lg flex items-center gap-3"
      style={{
        borderColor: currentTheme.primary,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        boxShadow: `0 0 10px ${currentTheme.glow}`
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <button
        onClick={() => {
          toggleMute()
          !isMuted && terminalSoundManager.terminalBeep(800, 0.1)
        }}
        className="flex items-center gap-2 px-3 py-1 border rounded font-mono text-xs transition-all hover:opacity-80"
        style={{
          borderColor: currentTheme.primary,
          color: currentTheme.primary,
          backgroundColor: isMuted ? 'rgba(255, 0, 0, 0.1)' : 'transparent'
        }}
      >
        <span className="text-lg">
          {isMuted ? '🔇' : '🔊'}
        </span>
        <span>{isMuted ? 'MUTED' : 'SOUND ON'}</span>
      </button>
      
      <div className="flex gap-1">
        {['BEEP', 'ERROR', 'SUCCESS'].map((sound) => (
          <button
            key={sound}
            onClick={() => {
              switch (sound) {
                case 'BEEP':
                  terminalSoundManager.terminalBeep()
                  break
                case 'ERROR':
                  terminalSoundManager.errorBeep()
                  break
                case 'SUCCESS':
                  terminalSoundManager.successBeep()
                  break
              }
            }}
            className="px-2 py-1 border rounded font-mono text-xs transition-all hover:opacity-80"
            style={{
              borderColor: currentTheme.primary,
              color: currentTheme.secondary
            }}
          >
            {sound}
          </button>
        ))}
      </div>
    </motion.div>
  )
}

// Enhanced Key Sound Effect with Visual Feedback
export function EnhancedKeySoundEffect({ 
  isActive, 
  theme = 'green' 
}: { 
  isActive: boolean; 
  theme?: keyof typeof RETRO_THEMES;
}) {
  const [ripples, setRipples] = useState<{ id: string; x: number; y: number; key: string }[]>([])

  useEffect(() => {
    if (!isActive) return

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Backspace') {
        terminalSoundManager.returnKey()
      } else if (e.key.length === 1) {
        terminalSoundManager.keyPress()
      }

      const newRipple = {
        id: Date.now().toString() + Math.random(),
        x: Math.random() * window.innerWidth,
        y: window.innerHeight - 100 - Math.random() * 50,
        key: e.key
      }
      
      setRipples(prev => [...prev, newRipple])
      
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id))
      }, 1000)
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isActive])

  const currentTheme = RETRO_THEMES[theme]

  return (
    <>
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="fixed pointer-events-none z-40"
          style={{ 
            left: ripple.x, 
            top: ripple.y,
            color: currentTheme.primary
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex flex-col items-center">
            <div 
              className="w-2 h-2 border rounded-full mb-1"
              style={{ borderColor: currentTheme.primary }}
            />
            <span 
              className="font-mono text-xs"
              style={{ 
                color: currentTheme.primary,
                textShadow: `0 0 5px ${currentTheme.glow}`
              }}
            >
              {ripple.key === ' ' ? 'SPACE' : ripple.key.toUpperCase()}
            </span>
          </div>
        </motion.div>
      ))}
    </>
  )
}

// System Boot Sound Visualizer with Enhanced Effects
export function BootSoundVisualizer({ 
  isActive, 
  theme = 'green' 
}: { 
  isActive: boolean; 
  theme?: keyof typeof RETRO_THEMES;
}) {
  const currentTheme = RETRO_THEMES[theme]

  useEffect(() => {
    if (isActive) {
      terminalSoundManager.bootSequence()
    }
  }, [isActive])

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
            className="absolute w-20 h-20 border rounded-full"
            style={{ 
              borderColor: currentTheme.primary,
              boxShadow: `0 0 20px ${currentTheme.glow}`
            }}
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
        
        {/* Central pulse */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ 
            duration: 1,
            repeat: Infinity 
          }}
        >
          <div 
            className="w-8 h-8 rounded-full"
            style={{ 
              backgroundColor: currentTheme.primary,
              boxShadow: `0 0 30px ${currentTheme.glow}`
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
