'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface StatsData {
  portfolio: {
    totalProjects: number
    featuredProjects: number
    totalBlogPosts: number
    totalMessages: number
    recentActivity: {
      projects: Array<{ title: string; updatedAt: string }>
      posts: Array<{ title: string; createdAt: string }>
    }
  }
  github: {
    followers: number
    following: number
    publicRepos: number
    totalStars: number
    totalForks: number
    contributions: number
    lastUpdated: string
    error?: string
  }
  system: {
    online: boolean
    uptime: number
    memoryUsage: {
      used: number
      total: number
    }
    nodeVersion: string
    platform: string
    lastUpdated: string
  }
}

const LiveStats = () => {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats')
      const result = await response.json()
      
      if (result.success) {
        setStats(result.data)
        setError(null)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('Failed to fetch stats')
      console.error('Stats fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
    
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const formatMemory = (bytes: number) => {
    return `${(bytes / 1024 / 1024).toFixed(1)}MB`
  }

  if (loading) {
    return (
      <div className="terminal-window">
        <div className="flex items-center justify-center py-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
          />
          <span className="ml-2 font-mono text-white">Loading stats...</span>
        </div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="terminal-window">
        <div className="text-center py-8">
          <div className="text-red-400 font-mono mb-2">❌ ERROR</div>
          <div className="text-white/70 font-mono text-sm">
            {error || 'Failed to load stats'}
          </div>
          <motion.button
            onClick={fetchStats}
            className="mt-4 button text-xs"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            RETRY
          </motion.button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="terminal-window"
      >
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/30">
          <div className="text-sm font-mono text-white">SYSTEM_STATUS.LOG</div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${stats.system.online ? 'bg-white' : 'bg-gray'}`}></div>
            <span className={`text-xs font-mono ${stats.system.online ? 'text-white' : 'text-gray'}`}>
              {stats.system.online ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 font-mono text-xs">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray">UPTIME:</span>
              <span className="text-white">{formatUptime(stats.system.uptime)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray">MEMORY:</span>
              <span className="text-white">{formatMemory(stats.system.memoryUsage.used)}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray">NODE:</span>
              <span className="text-white">{stats.system.nodeVersion}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray">OS:</span>
              <span className="text-white">{stats.system.platform.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* GitHub Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="terminal-window"
      >
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/30">
          <div className="text-sm font-mono text-white">GITHUB.API</div>
          <div className="text-xs font-mono text-gray/70">
            {stats.github.error ? 'ERROR' : 'CONNECTED'}
          </div>
        </div>

        {stats.github.error ? (
          <div className="text-center py-4">
            <div className="text-red-400 font-mono text-xs mb-2">⚠ {stats.github.error}</div>
            <div className="text-white/50 font-mono text-xs">Check API limits or token</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 font-mono text-xs">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray">REPOS:</span>
                <span className="text-white">{stats.github.publicRepos}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray">STARS:</span>
                <span className="text-white">{stats.github.totalStars}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray">FORKS:</span>
                <span className="text-white">{stats.github.totalForks}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray">FOLLOWERS:</span>
                <span className="text-white">{stats.github.followers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray">FOLLOWING:</span>
                <span className="text-white">{stats.github.following}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray">COMMITS:</span>
                <span className="text-white">{stats.github.contributions || '∞'}</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Portfolio Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="terminal-window"
      >
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/30">
          <div className="text-sm font-mono text-white">PORTFOLIO.JSON</div>
          <div className="text-xs font-mono text-white">LIVE</div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 font-mono text-xs">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray">PROJECTS:</span>
                <span className="text-white">{stats.portfolio.totalProjects}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray">FEATURED:</span>
                <span className="text-white">{stats.portfolio.featuredProjects}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray">POSTS:</span>
                <span className="text-white">{stats.portfolio.totalBlogPosts}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray">MESSAGES:</span>
                <span className="text-white">{stats.portfolio.totalMessages}</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          {stats.portfolio.recentActivity.projects.length > 0 && (
            <div className="pt-3 border-t border-white/30">
              <div className="text-gray font-mono text-xs mb-2">RECENT_ACTIVITY:</div>
              <div className="space-y-1">
                {stats.portfolio.recentActivity.projects.slice(0, 2).map((project, index) => (
                  <div key={index} className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white/80 truncate">{project.title}</span>
                    <span className="text-gray/70 ml-2">
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Refresh Info */}
      <div className="text-center">
        <div className="text-xs font-mono text-white/50">
          Auto-refresh: 30s | Last update: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}

export default LiveStats