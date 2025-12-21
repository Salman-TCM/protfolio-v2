"use client"

import { useState, useEffect } from "react"
import { PixelSparkLoader } from "@/components/pixel-spark-loader"
import { TerminalInterface } from "@/components/terminal-interface"

export default function Home() {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black">
      <PixelSparkLoader
        isVisible={showLoader}
        onComplete={() => setShowLoader(false)}
        duration={5000}
        theme="green"
        pixelCount={64}
        gridSize={8}
      />
      
      {!showLoader && <TerminalInterface />}
    </div>
  )
}
