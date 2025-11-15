"use client"

import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ScrollSectionProps {
  children: React.ReactNode
  className?: string
}

export function HorizontalScrollSection({ children, className = "" }: ScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])

  return (
    <section ref={containerRef} className={`overflow-hidden ${className}`}>
      <motion.div
        style={{ x }}
        className="flex gap-8 will-change-transform"
      >
        {children}
      </motion.div>
    </section>
  )
}

export function ParallaxText({ 
  children, 
  baseVelocity = 100,
  className = ""
}: { 
  children: React.ReactNode
  baseVelocity?: number
  className?: string
}) {
  const baseX = useRef(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useRef(0)
  const smoothVelocity = useRef(0)
  const velocityFactor = useRef(1)
  const x = useRef(0)

  const directionFactor = useRef<number>(1)

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest < scrollY.getPrevious()) {
        directionFactor.current = -1
      } else if (latest > scrollY.getPrevious()) {
        directionFactor.current = 1
      }
      scrollVelocity.current = scrollY.getVelocity()
    })
  }, [scrollY])

  useEffect(() => {
    const updateVelocity = () => {
      smoothVelocity.current = lerp(smoothVelocity.current, scrollVelocity.current, 0.1)
      velocityFactor.current = lerp(velocityFactor.current, Math.abs(smoothVelocity.current) / 1000, 0.1)
      
      baseX.current += (baseVelocity / 100) * velocityFactor.current * directionFactor.current
      x.current = wrap(-50, 0, baseX.current)
      
      requestAnimationFrame(updateVelocity)
    }
    updateVelocity()
  }, [baseVelocity])

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block"
        style={{ x: `${x.current}%` }}
      >
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
      </motion.div>
    </div>
  )
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}