"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  link: string
  color: "cyan" | "magenta" | "purple"
}

const projects: Project[] = [
  {
    id: 1,
    title: "bKash SIDA - AI-Powered Social Media Analytics",
    description:
      "NLP pipeline for multi-class topic classification, NER and sentiment analysis for bKash social channels (Bengali) with LLMs.",
    tech: ["Python", "Transformers", "Pandas", "Scikit-learn"],
    link: "#",
    color: "cyan",
  },
  {
    id: 2,
    title: "CTTC Social Media Monitoring System",
    description:
      "High-performance data API and analytics platform using Django, Elasticsearch and MinIO for real-time social media monitoring.",
    tech: ["Django", "Elasticsearch", "PostgreSQL", "MinIO"],
    link: "#",
    color: "magenta",
  },
  {
    id: 3,
    title: "Vault Alarm & Monitoring System — Jamuna Bank",
    description:
      "IoT-enabled vault alarm and monitoring deployed across 35+ bank branches with DSC/DLS integration and Sur-Gard receivers.",
    tech: ["IoT", "DSC DLS", "Sur-Gard", "Kronos"],
    link: "#",
    color: "purple",
  },
  {
    id: 4,
    title: "BGB E-Recruitment Platform",
    description:
      "Enterprise recruitment platform with secure payments, 2FA, Dockerized deployment and role-based access control.",
    tech: ["Django", "React", "MySQL", "Docker"],
    link: "#",
    color: "cyan",
  },
  {
    id: 5,
    title: "AV Automation — Huawei / Unilever",
    description: "Crestron SIMPL automation, Dante audio over IP and Xilica DSP integration for corporate AV systems.",
    tech: ["Crestron", "Dante", "Xilica", "Netgear AV"],
    link: "#",
    color: "magenta",
  },
  {
    id: 6,
    title: "ZKTeco Access Control",
    description:
      "Enterprise biometric access control integration with PostgreSQL backend, RBAC and real-time logging for facility security.",
    tech: ["ZKTeco", "PostgreSQL", "RBAC", "Biometrics"],
    link: "#",
    color: "purple",
  },
]

function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false)

  const colorClass = {
    cyan: "border-white ",
    magenta: "border-white ",
    purple: "border-gray",
  }[project.color]

  const bgColorClass = {
    cyan: "hover:bg-white/5",
    magenta: "hover:bg-white/5",
    purple: "hover:bg-gray/5",
  }[project.color]

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      whileTap={{ scale: 0.95 }}
      className={`border-2 p-6 transition-all cursor-pointer ${colorClass} ${bgColorClass} bg-black/60 backdrop-blur group relative overflow-hidden`}
    >
      {/* Animated background grid on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <h3 className={`text-lg font-bold ${colorClass}`}>{project.title}</h3>
          <motion.span animate={{ rotate: isHovered ? 45 : 0 }} className={`text-xl ${colorClass}`}>
            +
          </motion.span>
        </div>

        <p className="text-white/70 text-sm mb-4 font-mono leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span key={tech} className={`text-xs px-2 py-1 border border-white/30 text-white/70 font-mono`}>
              {tech}
            </span>
          ))}
        </div>

        <motion.button
          whileHover={{ x: 5 }}
          className={`text-sm font-mono ${colorClass} hover:opacity-80 transition-opacity`}
        >
          {"> EXPLORE PROJECT"}
        </motion.button>
      </div>
    </motion.div>
  )
}

export function ProjectsSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative">
      {/* Background accent */}
      <div className="absolute -right-32 bottom-20 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none" />

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="max-w-6xl w-full relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 ">{"> Featured Projects_"}</h2>
          <p className="text-white/60 font-mono text-sm md:text-base">
            {"// A selection of projects showcasing full-stack capabilities"}
          </p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: project.id * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 border-2 border-white border-white  font-mono text-sm hover:bg-white/10 transition-all">
            {"> VIEW ALL PROJECTS"}
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}
