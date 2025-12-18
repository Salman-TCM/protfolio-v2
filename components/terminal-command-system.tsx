"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RETRO_THEMES } from './terminal-effects'

interface CommandHistory {
  id: string
  command: string
  timestamp: string
  output?: string
}

interface AutoCompleteOption {
  command: string
  description: string
  category: string
}

// Command definitions for autocomplete
const COMMAND_DEFINITIONS: AutoCompleteOption[] = [
  // Navigation
  { command: 'home', description: 'Return to home screen', category: 'Navigation' },
  { command: 'about', description: 'View about me information', category: 'Navigation' },
  { command: 'projects', description: 'View project gallery', category: 'Navigation' },
  { command: 'gallery', description: 'Open full-screen project viewer', category: 'Navigation' },
  { command: 'blog', description: 'View blog posts', category: 'Navigation' },
  { command: 'skills', description: 'View technical skills', category: 'Navigation' },
  { command: 'contact', description: 'View contact information', category: 'Navigation' },
  { command: 'back', description: 'Go back to previous section', category: 'Navigation' },
  
  // System Commands
  { command: 'help', description: 'Show available commands', category: 'System' },
  { command: 'clear', description: 'Clear terminal screen', category: 'System' },
  { command: 'status', description: 'Show system status', category: 'System' },
  { command: 'time', description: 'Display current time', category: 'System' },
  { command: 'date', description: 'Display current date', category: 'System' },
  { command: 'whoami', description: 'Display current user', category: 'System' },
  { command: 'pwd', description: 'Print working directory', category: 'System' },
  { command: 'ls', description: 'List directory contents', category: 'System' },
  { command: 'ps', description: 'Show running processes', category: 'System' },
  { command: 'neofetch', description: 'Display system information', category: 'System' },
  
  // Network Commands
  { command: 'scan', description: 'Scan network for devices', category: 'Network' },
  { command: 'ping', description: 'Ping a host', category: 'Network' },
  { command: 'weather', description: 'Show weather information', category: 'Network' },
  
  // Fun Commands
  { command: 'matrix', description: 'Enter the matrix', category: 'Fun' },
  { command: 'hack', description: 'Start hacking sequence', category: 'Fun' },
  { command: 'glitch', description: 'Glitch the system', category: 'Fun' },
  { command: 'static', description: 'Generate TV static', category: 'Fun' },
  { command: 'tv', description: 'Generate TV static', category: 'Fun' },
  
  // File Commands
  { command: 'cat readme', description: 'Read README file', category: 'Files' },
  { command: 'cat', description: 'Display file contents', category: 'Files' },
  
  // Theme Commands
  { command: 'theme green', description: 'Switch to green phosphor theme', category: 'Theme' },
  { command: 'theme amber', description: 'Switch to amber phosphor theme', category: 'Theme' },
  { command: 'theme white', description: 'Switch to white phosphor theme', category: 'Theme' },
  { command: 'theme cyberspace', description: 'Switch to cyberspace theme', category: 'Theme' },
  
  // History Commands
  { command: 'history', description: 'Show command history', category: 'System' },
  { command: '!', description: 'Execute previous command (e.g., !1)', category: 'System' },
]

export function TerminalCommandSystem({
  onCommand,
  theme = 'green',
  maxHistory = 50
}: {
  onCommand: (command: string) => void;
  theme?: keyof typeof RETRO_THEMES;
  maxHistory?: number;
}) {
  const [history, setHistory] = useState<CommandHistory[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [suggestions, setSuggestions] = useState<AutoCompleteOption[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const currentTheme = RETRO_THEMES[theme]

  // Filter suggestions based on input
  const filterSuggestions = useCallback((input: string) => {
    const trimmedInput = input.toLowerCase().trim()
    if (!trimmedInput) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    const filtered = COMMAND_DEFINITIONS.filter(cmd =>
      cmd.command.toLowerCase().startsWith(trimmedInput) ||
      cmd.description.toLowerCase().includes(trimmedInput) ||
      cmd.category.toLowerCase().includes(trimmedInput)
    ).slice(0, 8) // Limit to 8 suggestions

    setSuggestions(filtered)
    setShowSuggestions(filtered.length > 0)
    setSelectedSuggestion(0)
  }, [])

  // Execute command and add to history
  const executeCommand = useCallback((command: string) => {
    const trimmedCommand = command.trim()
    if (!trimmedCommand) return

    // Add to history
    const newEntry: CommandHistory = {
      id: Date.now().toString(),
      command: trimmedCommand,
      timestamp: new Date().toLocaleTimeString()
    }

    setHistory(prev => [newEntry, ...prev].slice(0, maxHistory))
    setCurrentIndex(-1)
    setShowSuggestions(false)
    setSuggestions([])

    onCommand(trimmedCommand)
  }, [onCommand, maxHistory])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value

    switch (e.key) {
      case 'Tab':
        e.preventDefault()
        if (showSuggestions && suggestions.length > 0) {
          const selected = suggestions[selectedSuggestion]
          e.currentTarget.value = selected.command
          setShowSuggestions(false)
        }
        break

      case 'ArrowUp':
        e.preventDefault()
        if (showSuggestions) {
          setSelectedSuggestion(prev => 
            prev > 0 ? prev - 1 : suggestions.length - 1
          )
        } else if (history.length > 0) {
          const newIndex = currentIndex < history.length - 1 ? currentIndex + 1 : currentIndex
          setCurrentIndex(newIndex)
          e.currentTarget.value = history[newIndex].command
        }
        break

      case 'ArrowDown':
        e.preventDefault()
        if (showSuggestions) {
          setSelectedSuggestion(prev => 
            prev < suggestions.length - 1 ? prev + 1 : 0
          )
        } else if (currentIndex > 0) {
          const newIndex = currentIndex - 1
          setCurrentIndex(newIndex)
          e.currentTarget.value = history[newIndex].command
        } else if (currentIndex === 0) {
          setCurrentIndex(-1)
          e.currentTarget.value = ''
        }
        break

      case 'Enter':
        if (showSuggestions) {
          e.preventDefault()
          const selected = suggestions[selectedSuggestion]
          e.currentTarget.value = selected.command
          setShowSuggestions(false)
        }
        break

      case 'Escape':
        setShowSuggestions(false)
        setSuggestions([])
        break
    }
  }, [showSuggestions, suggestions, selectedSuggestion, history, currentIndex])

  // Handle input changes
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCurrentIndex(-1)
    filterSuggestions(value)
  }, [filterSuggestions])

  // Handle history command execution (!1, !2, etc.)
  const executeHistoryCommand = useCallback((command: string) => {
    if (command.startsWith('!') && command.length > 1) {
      const index = parseInt(command.slice(1)) - 1
      if (!isNaN(index) && index >= 0 && index < history.length) {
        return history[index].command
      }
    }
    return command
  }, [history])

  // Public method to get command history
  const getHistory = useCallback(() => history, [history])

  // Public method to clear history
  const clearHistory = useCallback(() => {
    setHistory([])
    setCurrentIndex(-1)
  }, [])

  return {
    executeCommand: (cmd: string) => executeCommand(executeHistoryCommand(cmd)),
    handleKeyDown,
    handleInputChange,
    inputRef,
    suggestions,
    showSuggestions,
    selectedSuggestion,
    getHistory,
    clearHistory
  }
}

// Autocomplete Suggestions Component
export function AutoCompleteSuggestions({
  suggestions,
  showSuggestions,
  selectedSuggestion,
  theme = 'green',
  onSelect
}: {
  suggestions: AutoCompleteOption[];
  showSuggestions: boolean;
  selectedSuggestion: number;
  theme?: keyof typeof RETRO_THEMES;
  onSelect: (command: string) => void;
}) {
  const currentTheme = RETRO_THEMES[theme]

  if (!showSuggestions || suggestions.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        className="absolute bottom-full left-0 right-0 mb-2 border rounded-lg overflow-hidden z-50"
        style={{
          borderColor: currentTheme.primary,
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          boxShadow: `0 4px 20px ${currentTheme.glow}`
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
      >
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={suggestion.command}
            className="w-full px-3 py-2 text-left flex items-center justify-between hover:opacity-100 transition-opacity"
            style={{
              backgroundColor: index === selectedSuggestion 
                ? currentTheme.glow 
                : 'transparent',
              opacity: index === selectedSuggestion ? 1 : 0.7,
              color: currentTheme.text
            }}
            whileHover={{ backgroundColor: currentTheme.glow }}
            onClick={() => onSelect(suggestion.command)}
          >
            <div className="flex items-center gap-3">
              <span 
                className="font-mono text-sm"
                style={{ color: currentTheme.primary }}
              >
                {suggestion.command}
              </span>
              <span 
                className="text-xs opacity-60"
                style={{ color: currentTheme.dim }}
              >
                {suggestion.category}
              </span>
            </div>
            <span 
              className="text-xs opacity-50 max-w-xs truncate"
              style={{ color: currentTheme.secondary }}
            >
              {suggestion.description}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}

// Command History Display Component
export function CommandHistoryDisplay({
  history,
  theme = 'green',
  maxItems = 10
}: {
  history: CommandHistory[];
  theme?: keyof typeof RETRO_THEMES;
  maxItems?: number;
}) {
  const currentTheme = RETRO_THEMES[theme]

  if (history.length === 0) {
    return (
      <div 
        className="text-center py-4 text-sm"
        style={{ color: currentTheme.dim }}
      >
        No command history yet
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div 
        className="font-mono text-xs mb-3 pb-2 border-b"
        style={{ 
          color: currentTheme.secondary,
          borderColor: currentTheme.primary
        }}
      >
        COMMAND HISTORY (Recent {Math.min(maxItems, history.length)} items)
      </div>
      
      {history.slice(0, maxItems).map((entry, index) => (
        <motion.div
          key={entry.id}
          className="flex items-center justify-between py-1 px-2 rounded hover:bg-opacity-10 hover:bg-white transition-all"
          style={{ color: currentTheme.secondary }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div className="flex items-center gap-3">
            <span 
              className="font-mono text-xs opacity-50"
              style={{ color: currentTheme.dim }}
            >
              {history.length - index}
            </span>
            <span 
              className="font-mono text-sm"
              style={{ color: currentTheme.primary }}
            >
              {entry.command}
            </span>
          </div>
          <span 
            className="font-mono text-xs opacity-50"
            style={{ color: currentTheme.dim }}
          >
            {entry.timestamp}
          </span>
        </motion.div>
      ))}
    </div>
  )
}
