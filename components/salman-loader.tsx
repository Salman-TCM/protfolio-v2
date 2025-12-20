"use client"

import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RETRO_THEMES } from './terminal-effects'

interface Pixel {
  id: number
  x: number
  y: number
  scale: number
  opacity: number
  color: string
}

interface Spark {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  color: string
  size: number
}

interface SalmanLoaderProps {
  isVisible: boolean
  onComplete?: () => void
  duration?: number
  theme?: keyof typeof RETRO_THEMES
  gridSize?: number
  pixelCount?: number
}

export function SalmanLoader({
  isVisible,
  onComplete,
  duration = 3000,
  theme = 'green',
  gridSize = 8,
  pixelCount = 64
}: SalmanLoaderProps) {
  const [pixels, setPixels] = useState<Pixel[]>([])
  const [sparks, setSparks] = useState<Spark[]>([])
  const [isMorphing, setIsMorphing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showText, setShowText] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const currentTheme = RETRO_THEMES[theme]

  // Initialize pixels in a grid formation
  useEffect(() => {
    if (!isVisible) return

      const newPixels: Pixel[] = []
      const cols = Math.ceil(Math.sqrt(pixelCount))
      const rows = Math.ceil(pixelCount / cols)
    
    for (let i = 0; i < pixelCount; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)
      const centerX = (cols - 1) / 2
      const centerY = (rows - 1) / 2
      
      newPixels.push({
        id: i,
        x: (col - centerX) * gridSize,
        y: (row - centerY) * gridSize,
        scale: 1,
        opacity: 1,
        color: currentTheme.primary
      })
    }
    
    setPixels(newPixels)
    setIsMorphing(false)
    setProgress(0)
    setSparks([])
    setShowText(false)
    startTimeRef.current = Date.now()
  }, [isVisible, pixelCount, gridSize, currentTheme.primary])

  // Create spark particles when pixels morph
  const createSparks = (pixelX: number, pixelY: number) => {
    const newSparks: Spark[] = []
    const sparkCount = 3 + Math.floor(Math.random() * 5)
    
    for (let i = 0; i < sparkCount; i++) {
      const angle = (Math.PI * 2 * i) / sparkCount + Math.random() * 0.5
      const velocity = 2 + Math.random() * 4
      
      newSparks.push({
        id: Date.now() + i,
        x: pixelX,
        y: pixelY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 1,
        color: Math.random() > 0.5 ? currentTheme.primary : currentTheme.secondary,
        size: 1 + Math.random() * 2
      })
    }
    
    setSparks(prev => [...prev, ...newSparks])
  }

  // Animation loop for morphing and spark effects
  useEffect(() => {
    if (!isVisible || !startTimeRef.current) return

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current!
      const progress = Math.min(elapsed / duration, 1)
      
      setProgress(progress)

      // Start morphing after initial pause
      if (progress > 0.2 && !isMorphing) {
        setIsMorphing(true)
      }

      // Show text after morphing starts
      if (progress > 0.3 && !showText) {
        setShowText(true)
      }

      // Update pixels during morph
      if (progress > 0.2 && progress < 0.8) {
        const morphProgress = (progress - 0.2) / 0.6
        const currentPixelCount = Math.floor(pixelCount * (1 - morphProgress * 0.7))
        
        setPixels(prev => prev.slice(0, currentPixelCount).map((pixel, index) => ({
          ...pixel,
          scale: 1 + morphProgress * 2,
          opacity: 1 - morphProgress * 0.5,
          x: pixel.x * (1 + morphProgress * 0.3),
          y: pixel.y * (1 + morphProgress * 0.3)
        })))

        // Generate sparks randomly during morph
        if (Math.random() < 0.1) {
          const randomPixel = pixels[Math.floor(Math.random() * pixels.length)]
          if (randomPixel) {
            createSparks(randomPixel.x, randomPixel.y)
          }
        }
      }

      // Final spark explosion
      if (progress > 0.8 && progress < 0.9) {
        const explosionProgress = (progress - 0.8) / 0.1
        pixels.forEach(pixel => {
          if (Math.random() < explosionProgress) {
            createSparks(pixel.x, pixel.y)
          }
        })
        
        setPixels(prev => prev.map(pixel => ({
          ...pixel,
          scale: 1 - explosionProgress,
          opacity: 0.3
        })))
      }

      // Clean up old sparks and update their positions
      setSparks(prev => prev
        .map(spark => ({
          ...spark,
          x: spark.x + spark.vx,
          y: spark.y + spark.vy,
          vy: spark.vy + 0.2, // gravity
          life: spark.life - 0.02
        }))
        .filter(spark => spark.life > 0)
      )

      if (progress >= 1) {
        onComplete?.()
        return
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isVisible, duration, isMorphing, pixels, pixelCount, currentTheme, onComplete, showText])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.03) 2px,
              rgba(255, 255, 255, 0.03) 4px
            )
          `,
        }}
      />

      {/* Main content container */}
      <div className="relative flex flex-col items-center justify-center gap-8">
        
        {/* Pixel and sparks container */}
        <div className="relative">
          <motion.div
            className="relative flex items-center justify-center"
            style={{
              transform: `scale(${1 + progress * 0.2})`,
            }}
          >
            {pixels.map((pixel) => (
              <motion.div
                key={pixel.id}
                className="absolute"
                style={{
                  width: `${gridSize}px`,
                  height: `${gridSize}px`,
                  backgroundColor: pixel.color,
                  boxShadow: `0 0 ${gridSize}px ${pixel.color}`,
                  transform: `translate(${pixel.x}px, ${pixel.y}px) scale(${pixel.scale})`,
                  opacity: pixel.opacity,
                }}
                animate={{
                  filter: isMorphing ? `brightness(${1 + Math.random() * 0.5})` : 'brightness(1)',
                }}
                transition={{
                  duration: 0.1,
                  repeat: isMorphing ? Infinity : 0,
                  repeatType: 'reverse',
                }}
              />
            ))}
          </motion.div>

          {/* Spark particles */}
          <div className="absolute inset-0">
            {sparks.map((spark) => (
              <motion.div
                key={spark.id}
                className="absolute rounded-full"
                style={{
                  width: `${spark.size}px`,
                  height: `${spark.size}px`,
                  backgroundColor: spark.color,
                  boxShadow: `0 0 ${spark.size * 2}px ${spark.color}`,
                  left: '200px',
                  top: '200px',
                  transform: `translate(${spark.x}px, ${spark.y}px)`,
                  opacity: spark.life,
                }}
              />
            ))}
          </div>
        </div>

        {/* SALMAN Text Loader */}
        <AnimatePresence>
          {showText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="loader-container">
                <div className="loader" />
                <div 
                  className="text-2xl font-bold font-mono"
                  style={{ 
                    color: currentTheme.primary,
                    textShadow: `0 0 20px ${currentTheme.glow}`,
                    animation: 'pulse 2s infinite'
                  }}
                >
                  SALMAN
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="font-mono text-lg mb-4" style={{ color: currentTheme.primary }}>
            {progress < 0.3 && 'INITIALIZING'}
            {progress >= 0.3 && progress < 0.7 && 'MORPHING'}
            {progress >= 0.7 && progress < 0.9 && 'IGNITING'}
            {progress >= 0.9 && 'COMPLETE'}
          </div>
          
          {/* Progress bar */}
          <div className="mx-auto w-64 h-1 border" style={{ borderColor: currentTheme.primary }}>
            <motion.div
              className="h-full"
              style={{ 
                backgroundColor: currentTheme.primary,
                boxShadow: `0 0 10px ${currentTheme.glow}`
              }}
              initial={{ width: '0%' }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Percentage */}
          <div className="font-mono text-sm mt-2" style={{ color: currentTheme.secondary }}>
            {Math.round(progress * 100)}%
          </div>
        </motion.div>
      </div>

      {/* Press to skip hint */}
      <motion.div
        className="absolute top-8 left-0 right-0 text-center font-mono text-sm opacity-50"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ color: currentTheme.secondary }}
      >
        Press SPACE to skip
      </motion.div>

      {/* Keyboard handler */}
      <div
        className="absolute inset-0"
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            onComplete?.()
          }
        }}
        tabIndex={0}
      />

      {/* CSS for the custom loader animation */}
      <style jsx>{`
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .loader {
          height: 15px;
          aspect-ratio: 4;
          --_g: no-repeat radial-gradient(farthest-side, ${currentTheme.primary} 90%, #0000);
          background: 
            var(--_g) left, 
            var(--_g) right;
          background-size: 25% 100%;
          display: flex;
        }

        .loader:before {
          content: "";
          flex: 1;
          background: inherit;
          animation: l50 2s infinite;
        }

        @keyframes l50 {
          0%    {transform: translate( 37.5%) rotate(0)     }
          16.67%{transform: translate( 37.5%) rotate(90deg) }
          33.33%{transform: translate(-37.5%) rotate(90deg) }
          50%   {transform: translate(-37.5%) rotate(180deg)}
          66.67%{transform: translate(-37.5%) rotate(270deg)}
          83.33%{transform: translate( 37.5%) rotate(270deg)}
          100%  {transform: translate( 37.5%) rotate(360deg)}
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </motion.div>
  )
}

// Hook to use the Salman loader with lifecycle management
export function useSalmanLoader(options?: {
  duration?: number
  theme?: keyof typeof RETRO_THEMES
  autoShow?: boolean
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const show = () => {
    setIsLoading(true)
    setIsVisible(true)
  }

  const hide = () => {
    setIsVisible(false)
    setTimeout(() => setIsLoading(false), 300) // Wait for exit animation
  }

  const complete = () => {
    hide()
  }

  // Auto-show on mount if specified
  useEffect(() => {
    if (options?.autoShow) {
      show()
      
      // Auto-hide after duration
      const timer = setTimeout(() => {
        hide()
      }, options?.duration || 3000)
      
      return () => clearTimeout(timer)
    }
  }, [options?.autoShow, options?.duration])

  return {
    isLoading,
    isVisible,
    show,
    hide,
    complete,
    Loader: () => (
      <SalmanLoader
        isVisible={isVisible}
        onComplete={complete}
        duration={options?.duration}
        theme={options?.theme}
      />
    )
  }
}
