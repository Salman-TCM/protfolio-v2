"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function StatusBar() {
  const [time, setTime] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [cpuUsage, setCpuUsage] = useState<number>(0)
  const [memoryUsage, setMemoryUsage] = useState<number>(0)
  const [networkStatus, setNetworkStatus] = useState<"online" | "offline">("online")
  const [commandCount, setCommandCount] = useState<number>(0)

  useEffect(() => {
    // Update time and date
    const updateTimeDate = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }))
      setDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }))
    }
    
    updateTimeDate()
    const timer = setInterval(updateTimeDate, 1000)

    // Simulate CPU and Memory usage
    const usageTimer = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 30) + 10) // 10-40%
      setMemoryUsage(Math.floor(Math.random() * 20) + 30) // 30-50%
    }, 3000)

    // Check network status
    const handleOnline = () => setNetworkStatus("online")
    const handleOffline = () => setNetworkStatus("offline")
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Load command count from localStorage
    const savedCount = localStorage.getItem('commandCount')
    if (savedCount) {
      setCommandCount(parseInt(savedCount))
    }

    return () => {
      clearInterval(timer)
      clearInterval(usageTimer)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Listen for command executions
  useEffect(() => {
    const handleCommandExecute = () => {
      setCommandCount(prev => {
        const newCount = prev + 1
        localStorage.setItem('commandCount', newCount.toString())
        return newCount
      })
    }

    window.addEventListener('commandExecuted', handleCommandExecute)
    return () => window.removeEventListener('commandExecuted', handleCommandExecute)
  }, [])

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/20 px-4 py-1 font-mono text-xs z-40"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="max-w-full flex items-center justify-between">
        {/* Left side - System Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <motion.div
              className={`w-2 h-2 rounded-full ${networkStatus === 'online' ? 'bg-white' : 'bg-gray-500'}`}
              animate={{ 
                scale: networkStatus === 'online' ? [1, 1.2, 1] : 1,
                opacity: networkStatus === 'online' ? 1 : 0.5
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <span className="text-white uppercase">{networkStatus}</span>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 text-gray-400">
            <span>CMD:</span>
            <span className="text-white">{commandCount}</span>
          </div>
        </div>

        {/* Center - Resource Monitor */}
        <div className="hidden md:flex items-center gap-6 text-gray-400">
          <div className="flex items-center gap-2">
            <span>CPU:</span>
            <div className="w-20 h-1 bg-white/10 relative overflow-hidden">
              <motion.div 
                className="absolute left-0 top-0 h-full bg-white"
                animate={{ width: `${cpuUsage}%` }}
                transition={{ type: "spring", stiffness: 100 }}
              />
            </div>
            <span className="text-white w-8 text-right">{cpuUsage}%</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span>MEM:</span>
            <div className="w-20 h-1 bg-white/10 relative overflow-hidden">
              <motion.div 
                className="absolute left-0 top-0 h-full bg-white"
                animate={{ width: `${memoryUsage}%` }}
                transition={{ type: "spring", stiffness: 100 }}
              />
            </div>
            <span className="text-white w-8 text-right">{memoryUsage}%</span>
          </div>
        </div>

        {/* Right side - Date, Time and Session */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 text-gray-400">
            <span className="hidden lg:inline">{date}</span>
            <span className="hidden md:inline">│</span>
            <div className="flex items-center gap-1">
              <span>SESSION:</span>
              <motion.span 
                className="text-white"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ACTIVE
              </motion.span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-3 bg-white/30"
                  animate={{ 
                    height: [3, 8, 3],
                    backgroundColor: ['rgba(255,255,255,0.3)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0.3)']
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
            <span className="text-white font-bold">{time}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}