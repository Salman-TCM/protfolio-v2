"use client"

import { useState, useEffect } from "react"

export function StatusBar() {
  const [time, setTime] = useState<string>("")

  useEffect(() => {
    setTime(new Date().toLocaleTimeString())
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t-2 border-white px-4 py-2 font-mono text-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side - Status indicators */}
        <div className="flex items-center gap-2 text-white">
          <span>•••</span>
          <span>SYSTEM: ONLINE</span>
        </div>

        {/* Center - System info */}
        <div className="flex items-center gap-4 text-gray text-xs">
          <span>GITHUB: 633</span>
          <span>│</span>
          <span>UP: 3Y 152D</span>
          <span>│</span>
          <span>EARTH</span>
        </div>

        {/* Right side - Status icons and time */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-gray rounded-full" />
            <div className="w-2 h-2 bg-gray rounded-full" />
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
          <span className="text-white">{time}</span>
        </div>
      </div>
    </div>
  )
}
