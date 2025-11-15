"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TVNoiseProps {
  isVisible: boolean
  onComplete?: () => void
  duration?: number
}

export function TVNoise({ isVisible, onComplete, duration = 2000 }: TVNoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const [showScanlines, setShowScanlines] = useState(false)

  useEffect(() => {
    if (!isVisible) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Generate authentic TV static noise
    const generateNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const buffer = new Uint32Array(imageData.data.buffer)

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          // Create more authentic TV static with RGB color variations
          const random = Math.random()
          
          // Generate grayscale values for black and white noise
          const r = Math.floor(random * 255)
          const g = r
          const b = r
          
          // Add some intensity clustering for more realistic static
          const intensity = Math.random() < 0.1 ? 255 : random < 0.5 ? 0 : random * 255
          
          const finalR = Math.min(255, Math.floor(r * (intensity / 255)))
          const finalG = Math.min(255, Math.floor(g * (intensity / 255)))
          const finalB = Math.min(255, Math.floor(b * (intensity / 255)))

          buffer[y * canvas.width + x] = 
            (255 << 24) |                    // alpha
            (finalB << 16) |                 // blue
            (finalG << 8) |                  // green
            finalR                           // red
        }
      }

      ctx.putImageData(imageData, 0, 0)
    }

    // Animation loop with faster frame rate for authentic TV static
    let startTime = Date.now()
    let frameCount = 0
    const animate = () => {
      const elapsed = Date.now() - startTime
      
      if (elapsed < duration) {
        // Generate noise at ~30fps for authentic TV static feel
        if (frameCount % 2 === 0) {
          generateNoise()
        }
        frameCount++
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        // Fade out noise and show scanlines
        setShowScanlines(true)
        setTimeout(() => {
          onComplete?.()
        }, 500)
      }
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isVisible, duration, onComplete])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        // Render noise as an absolutely positioned layer that fills the parent (terminal) container
        className="absolute inset-0 z-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Screen (fill entire parent) */}
        <div className="absolute inset-0 bg-transparent overflow-hidden">
          {/* Noise Canvas */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
              showScanlines ? 'opacity-20' : 'opacity-100'
            }`}
            style={{ imageRendering: 'pixelated' }}
          />

          {/* Scanlines overlay */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              showScanlines ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
            }}
          />

          {/* Loading Text (centered) */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: showScanlines ? 1 : 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-center">
              <div className="text-white font-mono text-xl mb-4">LOADING PROJECT...</div>
              <div className="flex gap-1 justify-center">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-white"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Screen Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 100px rgba(255,255,255,0.06)'
            }}
          />
        </div>

        {/* Static Audio Visualization (inside terminal) */}
        <motion.div className="absolute bottom-4 left-4 text-white font-mono text-xs space-y-1 pointer-events-none">
          <motion.div animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 0.8, repeat: Infinity }}>
            [SIGNAL DETECTED] TUNING FREQUENCY...
          </motion.div>
          <motion.div className="opacity-60" animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}>
            FREQ: 477.25MHz | SNR: -12dB
          </motion.div>
          <motion.div className="opacity-40" animate={{ opacity: [0.1, 0.5, 0.1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.6 }}>
            SEARCHING FOR CLEAN SIGNAL...
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Matrix Rain Effect Component
export function MatrixRain({ isVisible }: { isVisible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isVisible) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("")

    const fontSize = 10
    const columns = canvas.width / fontSize

    const drops: number[] = []
    for (let x = 0; x < columns; x++) {
      drops[x] = 1
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#fff'
      ctx.font = fontSize + 'px monospace'

      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const animate = () => {
      draw()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-20"
    />
  )
}