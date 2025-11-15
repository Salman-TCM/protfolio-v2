'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'
import { ProjectList } from './project-list'

interface Project {
  id: number
  name: string
  url: string
  tech: string
  description: string
  status: string
  fullDescription?: string
  screenshot?: string
  github?: string
}

interface ProjectModalProps {
  isOpen: boolean
  projects: Project[]
  onClose: () => void
  onSelectProject: (projectId: number) => void
  selectedProjectId?: number | null
}

export function ProjectModal({
  isOpen,
  projects,
  onClose,
  onSelectProject,
  selectedProjectId,
}: ProjectModalProps) {
  const [isBooting, setIsBooting] = useState(false)
  const [viewingLive, setViewingLive] = useState(false)
  const selectedProject = projects.find((p) => p.id === selectedProjectId)

  useEffect(() => {
    if (isOpen && !selectedProjectId) {
      setIsBooting(true)
      const timer = setTimeout(() => setIsBooting(false), 1200)
      return () => clearTimeout(timer)
    }
  }, [isOpen, selectedProjectId])

  const bootupText = [
    '> INITIALIZING PROJECT VIEWER...',
    '> LOADING DISK BUFFER...',
    '> SCANNING PROJECT DATABASE...',
    '> SYSTEM READY',
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-4xl bg-black border-4 border-white rounded-lg overflow-hidden flex flex-col"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            onClick={(e) => e.stopPropagation()}
            style={{ height: viewingLive ? '90vh' : 'auto' }}
          >
            <div className="bg-white text-black px-4 py-3 flex justify-between items-center">
              <div className="font-bold text-sm">
                {viewingLive ? 'LIVE_PREVIEW.EXE' : selectedProject ? 'PROJECT_VIEWER.EXE' : 'PROJECTS.EXE'}
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                <div className="w-3 h-3 bg-gray rounded-full animate-pulse" />
                <button
                  onClick={onClose}
                  className="w-3 h-3 bg-white rounded-full hover:bg-red-500 transition-colors"
                />
              </div>
            </div>

            {/* Boot-up animation */}
            {isBooting && !selectedProjectId && (
              <div className="bg-black p-6 h-96 overflow-hidden space-y-1 font-mono text-sm">
                {bootupText.map((text, i) => (
                  <motion.div
                    key={i}
                    className="text-white "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.3 }}
                  >
                    {text}
                  </motion.div>
                ))}
              </div>
            )}

            {/* Projects list view - extracted to ProjectList to allow reuse inside terminal */}
            {isOpen && !isBooting && !selectedProject && (
              <ProjectList
                projects={projects}
                onSelectProject={(id) => {
                  onSelectProject(id)
                  setViewingLive(false)
                }}
              />
            )}

            {/* Live website preview in iframe - Updated to cyan colors */}
            {selectedProject && viewingLive && (
              <motion.div
                className="bg-black flex-1 relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 pointer-events-none scanlines" />
                <iframe
                  src={selectedProject.url}
                  className="w-full h-full border-none"
                  title={selectedProject.name}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3 flex gap-2 justify-between items-center border-t border-white/30">
                  <div className="text-white text-xs">Loading: {selectedProject.url}</div>
                  <button
                    onClick={() => setViewingLive(false)}
                    className="px-3 py-1 border-2 border-white text-white text-xs rounded hover:bg-white/10 transition-all"
                  >
                    ← BACK TO DETAILS
                  </button>
                </div>
              </motion.div>
            )}

            {/* Detailed project view - Updated to cyan colors */}
            {selectedProject && !viewingLive && !isBooting && (
              <motion.div
                className="bg-black p-6 h-96 overflow-y-auto space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border-2 border-white/50 p-4 bg-black/30 rounded relative">
                  <div className="absolute inset-0 pointer-events-none scanlines" />
                  <div className="text-white  font-bold mb-2">
                    {selectedProject.name}
                  </div>
                  <div className="text-white text-sm mb-2">{selectedProject.description}</div>
                  <div className="text-white text-xs">
                    🔧 Tech: {selectedProject.tech}
                  </div>
                </div>

                {/* Project details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray">└→</span>
                    <span className="text-white">URL:</span>
                    <a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray underline hover:text-white"
                    >
                      {selectedProject.url}
                    </a>
                  </div>
                  {selectedProject.github && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray">└→</span>
                      <span className="text-white">GitHub:</span>
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray underline hover:text-white"
                      >
                        {selectedProject.github}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-gray">└→</span>
                    <span className="text-white">Status:</span>
                    <span className="text-white font-bold">{selectedProject.status}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 pt-4 border-t border-white/20">
                  <button
                    onClick={() => setViewingLive(true)}
                    className="flex-1 bg-white text-black py-2 rounded font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all"
                  >
                    ► VISIT PROJECT
                  </button>
                  <button
                    onClick={() => {
                      onSelectProject(0)
                      setViewingLive(false)
                    }}
                    className="px-4 py-2 border-2 border-white text-white rounded hover:bg-white/10 transition-all"
                  >
                    ← BACK
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
