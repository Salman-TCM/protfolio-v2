"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { RETRO_THEMES } from './terminal-effects'

interface SystemStats {
  cpu: number
  memory: number
  disk: number
  network: number
  temperature: number
  processes: number
  uptime: string
}

interface Process {
  pid: number
  name: string
  cpu: number
  memory: number
}

export function RetroSystemMonitor({ 
  theme = 'green',
  compact = false 
}: { 
  theme?: keyof typeof RETRO_THEMES;
  compact?: boolean;
}) {
  const [stats, setStats] = useState<SystemStats>({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0,
    temperature: 0,
    processes: 0,
    uptime: '00:00:00'
  })

  const [processes, setProcesses] = useState<Process[]>([])
  const currentTheme = RETRO_THEMES[theme]

  // Simulate system stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        cpu: Math.max(5, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(20, Math.min(85, prev.memory + (Math.random() - 0.5) * 5)),
        disk: 67.3,
        network: Math.max(0, Math.min(100, Math.random() * 100)),
        temperature: Math.max(35, Math.min(65, prev.temperature + (Math.random() - 0.5) * 2)),
        processes: Math.floor(Math.random() * 50) + 120,
        uptime: formatUptime()
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Simulate processes
  useEffect(() => {
    const processNames = [
      'terminal.exe', 'portfolio-server', 'animation-engine', 'sound-visualizer',
      'network-monitor', 'cache-manager', 'renderer', 'input-handler',
      'theme-engine', 'command-parser', 'history-daemon', 'auto-complete'
    ]

    const interval = setInterval(() => {
      const activeProcesses = processNames
        .sort(() => Math.random() - 0.5)
        .slice(0, 6)
        .map((name, index) => ({
          pid: 1000 + index,
          name,
          cpu: Math.random() * 30,
          memory: Math.random() * 500 + 50
        }))

      setProcesses(activeProcesses)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const formatUptime = () => {
    const now = Date.now()
    const start = now - (Math.random() * 86400000 + 3600000) // 1-25 hours ago
    const uptime = now - start
    
    const hours = Math.floor(uptime / 3600000)
    const minutes = Math.floor((uptime % 3600000) / 60000)
    const seconds = Math.floor((uptime % 60000) / 1000)
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const StatBar = ({ label, value, max = 100, unit = '%' }: {
    label: string;
    value: number;
    max?: number;
    unit?: string;
  }) => (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-1">
        <span 
          className="font-mono text-xs"
          style={{ color: currentTheme.secondary }}
        >
          {label.toUpperCase()}
        </span>
        <span 
          className="font-mono text-xs"
          style={{ color: currentTheme.primary }}
        >
          {value.toFixed(1)}{unit}
        </span>
      </div>
      <div 
        className="h-2 border overflow-hidden"
        style={{ borderColor: currentTheme.primary }}
      >
        <motion.div
          className="h-full rounded-sm"
          style={{ 
            backgroundColor: currentTheme.primary,
            boxShadow: `0 0 5px ${currentTheme.glow}`
          }}
          initial={{ width: 0 }}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )

  if (compact) {
    return (
      <motion.div
        className="p-3 border rounded-lg"
        style={{
          borderColor: currentTheme.primary,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          boxShadow: `0 0 15px ${currentTheme.glow}`
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span style={{ color: currentTheme.dim }}>CPU:</span>
            <span style={{ color: currentTheme.primary, marginLeft: '4px' }}>
              {stats.cpu.toFixed(0)}%
            </span>
          </div>
          <div>
            <span style={{ color: currentTheme.dim }}>MEM:</span>
            <span style={{ color: currentTheme.primary, marginLeft: '4px' }}>
              {stats.memory.toFixed(0)}%
            </span>
          </div>
          <div>
            <span style={{ color: currentTheme.dim }}>NET:</span>
            <span style={{ color: currentTheme.primary, marginLeft: '4px' }}>
              {stats.network.toFixed(0)}%
            </span>
          </div>
          <div>
            <span style={{ color: currentTheme.dim }}>TEMP:</span>
            <span style={{ color: currentTheme.primary, marginLeft: '4px' }}>
              {stats.temperature.toFixed(0)}°C
            </span>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="p-4 border rounded-lg space-y-4"
      style={{
        borderColor: currentTheme.primary,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        boxShadow: `0 0 20px ${currentTheme.glow}`
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-2">
        <h3 
          className="font-bold font-mono text-sm tracking-wider"
          style={{ color: currentTheme.primary }}
        >
          SYSTEM MONITOR
        </h3>
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: currentTheme.primary }}
          />
          <span 
            className="font-mono text-xs"
            style={{ color: currentTheme.secondary }}
          >
            {stats.uptime}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <StatBar label="CPU Usage" value={stats.cpu} />
        <StatBar label="Memory" value={stats.memory} />
        <StatBar label="Disk Usage" value={stats.disk} />
        <StatBar label="Network" value={stats.network} />
      </div>

      {/* Temperature */}
      <div className="pt-2 border-t" style={{ borderColor: currentTheme.primary }}>
        <div className="flex justify-between items-center">
          <span 
            className="font-mono text-xs"
            style={{ color: currentTheme.secondary }}
          >
            TEMPERATURE
          </span>
          <span 
            className="font-mono text-xs"
            style={{ 
              color: stats.temperature > 60 ? '#ff4444' : currentTheme.primary 
            }}
          >
            {stats.temperature.toFixed(1)}°C
          </span>
        </div>
      </div>

      {/* Processes */}
      <div className="pt-2 border-t" style={{ borderColor: currentTheme.primary }}>
        <div 
          className="font-mono text-xs mb-2"
          style={{ color: currentTheme.secondary }}
        >
          ACTIVE PROCESSES ({stats.processes})
        </div>
        <div className="space-y-1">
          {processes.slice(0, 4).map((process, index) => (
            <motion.div
              key={process.pid}
              className="flex items-center justify-between text-xs py-1"
              style={{ color: currentTheme.secondary }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-2">
                <span 
                  className="font-mono opacity-60"
                  style={{ color: currentTheme.dim }}
                >
                  {process.pid}
                </span>
                <span 
                  className="font-mono"
                  style={{ color: currentTheme.primary }}
                >
                  {process.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span 
                  className="font-mono opacity-70"
                  style={{ color: currentTheme.secondary }}
                >
                  {process.cpu.toFixed(1)}%
                </span>
                <span 
                  className="font-mono opacity-50"
                  style={{ color: currentTheme.dim }}
                >
                  {process.memory.toFixed(0)}MB
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Retro Terminal Clock Widget
export function RetroTerminalClock({ 
  theme = 'green',
  showDate = false 
}: { 
  theme?: keyof typeof RETRO_THEMES;
  showDate?: boolean;
}) {
  const [time, setTime] = useState(new Date())
  const currentTheme = RETRO_THEMES[theme]

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatDigitalClock = () => {
    return time.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const formatDate = () => {
    return time.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).toUpperCase()
  }

  return (
    <motion.div
      className="p-3 border rounded-lg text-center"
      style={{
        borderColor: currentTheme.primary,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        boxShadow: `0 0 15px ${currentTheme.glow}`
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div 
        className="font-mono text-2xl tracking-wider mb-1"
        style={{ 
          color: currentTheme.primary,
          textShadow: `0 0 10px ${currentTheme.glow}`,
          fontFamily: 'monospace'
        }}
      >
        {formatDigitalClock()}
      </div>
      {showDate && (
        <div 
          className="font-mono text-xs"
          style={{ color: currentTheme.secondary }}
        >
          {formatDate()}
        </div>
      )}
    </motion.div>
  )
}

// Retro Network Status Widget
export function RetroNetworkStatus({ 
  theme = 'green' 
}: { 
  theme?: keyof typeof RETRO_THEMES;
}) {
  const [status, setStatus] = useState({
    connected: true,
    speed: 0,
    packets: 0,
    latency: 0
  })

  const currentTheme = RETRO_THEMES[theme]

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => ({
        connected: Math.random() > 0.05, // 95% uptime
        speed: Math.max(0, Math.min(1000, prev.speed + (Math.random() - 0.5) * 100)),
        packets: prev.packets + Math.floor(Math.random() * 100),
        latency: Math.max(5, Math.min(150, prev.latency + (Math.random() - 0.5) * 20))
      }))
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="p-3 border rounded-lg space-y-2"
      style={{
        borderColor: currentTheme.primary,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        boxShadow: `0 0 15px ${currentTheme.glow}`
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex items-center justify-between">
        <span 
          className="font-mono text-xs tracking-wider"
          style={{ color: currentTheme.primary }}
        >
          NETWORK STATUS
        </span>
        <div className="flex items-center gap-2">
          <div 
            className={`w-2 h-2 rounded-full ${status.connected ? 'animate-pulse' : ''}`}
            style={{ 
              backgroundColor: status.connected ? currentTheme.primary : '#ff4444',
              boxShadow: status.connected ? `0 0 5px ${currentTheme.glow}` : 'none'
            }}
          />
          <span 
            className="font-mono text-xs"
            style={{ 
              color: status.connected ? currentTheme.secondary : '#ff4444' 
            }}
          >
            {status.connected ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      {status.connected && (
        <div className="space-y-1 text-xs font-mono">
          <div className="flex justify-between">
            <span style={{ color: currentTheme.dim }}>SPEED:</span>
            <span style={{ color: currentTheme.primary }}>
              {status.speed.toFixed(0)} KB/s
            </span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: currentTheme.dim }}>PACKETS:</span>
            <span style={{ color: currentTheme.primary }}>
              {status.packets.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: currentTheme.dim }}>LATENCY:</span>
            <span style={{ color: currentTheme.primary }}>
              {status.latency.toFixed(0)}ms
            </span>
          </div>
        </div>
      )}
    </motion.div>
  )
}
