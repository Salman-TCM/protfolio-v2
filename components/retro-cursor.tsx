'use client'

import { useEffect, useState } from 'react'

const RetroCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsMoving(true)

      // Reset moving state after a short delay
      setTimeout(() => setIsMoving(false), 100)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {/* Custom cursor */}
      <div
        className="pointer-events-none fixed z-[9999] w-4 h-4"
        style={{
          left: `${mousePosition.x - 8}px`,
          top: `${mousePosition.y - 8}px`,
          transform: 'translate(0, 0)',
        }}
      >
        {/* Outer glow */}
        <div className="absolute inset-0 bg-white rounded-full blur-sm opacity-40" />
        
        {/* Main cursor dot */}
        <div className="absolute inset-1 bg-white rounded-full" />
        
        {/* Center crosshair */}
        <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-black rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Trail effect circles */}
      {isMoving && (
        <div
          className="pointer-events-none fixed z-[9998] w-8 h-8 rounded-full border-2 border-white/30"
          style={{
            left: `${mousePosition.x - 16}px`,
            top: `${mousePosition.y - 16}px`,
            animation: 'pulse-ring 0.6s ease-out',
          }}
        />
      )}

      <style>{`
        * {
          cursor: none;
        }

        @keyframes pulse-ring {
          0% {
            opacity: 1;
            transform: scale(1);
            border-width: 2px;
          }
          100% {
            opacity: 0;
            transform: scale(2);
            border-width: 1px;
          }
        }

        /* Retro scanline effect on entire page */
        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            repeating-linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.03),
              rgba(255, 255, 255, 0.03) 1px,
              transparent 1px,
              transparent 2px
            );
          pointer-events: none;
          z-index: 9997;
        }
      `}</style>
    </>
  )
}

export default RetroCursor
