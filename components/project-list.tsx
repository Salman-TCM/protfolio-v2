"use client"


import React from 'react'
import { motion } from 'framer-motion'

interface Project {
  id: number;
  name?: string;
  title?: string;
  url?: string; // live preview url
  tech?: string;
  description?: string;
  status?: string;
}

export function ProjectList({
  projects,
  onViewProject,
}: {
  projects: Project[];
  onViewProject: (project: Project) => void;
}) {
  return (
    <div className="bg-black p-6 overflow-y-auto space-y-3">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          className="bg-black/50 border-2 border-white/50 hover:border-white p-4 rounded transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 + index * 0.05 }}
          whileHover={{ x: 5 }}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="text-white font-bold mb-1">[{index + 1}] {project.name ?? project.title}</div>
              <div className="text-white text-xs mb-2">{project.description ?? project.title}</div>
              <div className="text-gray text-xs mb-2">→ {project.tech}</div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-white text-xs font-bold ml-2">{project.status}</div>
              <button
                className="mt-2 px-3 py-1 bg-white text-black text-xs font-bold font-mono border-2 border-white hover:bg-black hover:text-white transition"
                onClick={() => onViewProject(project)}
              >
                View
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
