"use client"

import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ScrollReveal, Parallax, TextReveal } from './scroll-reveal'
import { HorizontalScrollSection, ParallaxText } from './horizontal-scroll-section'
import { CursorFollower } from './cursor-follower'

export function LongshotInspiredLayout() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  
  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])

  const projects = [
    {
      title: "BORDER GUARD BANGLADESH",
      subtitle: "Official Recruitment Portal",
      description: "Next.js • React • Tailwind CSS",
      year: "2024",
      status: "LIVE"
    },
    {
      title: "E-COMMERCE PLATFORM", 
      subtitle: "Full-Stack Solution",
      description: "Next.js • Stripe • PostgreSQL",
      year: "2024",
      status: "LIVE"
    },
    {
      title: "AI CONTENT GENERATOR",
      subtitle: "Marketing Assistant",
      description: "React • OpenAI API • Vercel", 
      year: "2024",
      status: "IN DEVELOPMENT"
    },
    {
      title: "PORTFOLIO TERMINAL",
      subtitle: "Interactive Experience",
      description: "Next.js • Framer Motion • TypeScript",
      year: "2024", 
      status: "LIVE"
    }
  ]

  return (
    <div ref={containerRef} className="bg-black text-white overflow-x-hidden cursor-none">
      <CursorFollower />
      
      {/* Hero Section with Large Typography */}
      <section className="min-h-screen flex items-center justify-center relative">
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 bg-black" />
        <motion.div 
          style={{ y: textY }}
          className="relative z-10 text-center px-4"
        >
          <TextReveal 
            className="headline-giant text-glitch mb-8"
            stagger={0.05}
          >
            SALMAN HOSSAIN
          </TextReveal>
          
          <ScrollReveal direction="up" delay={0.5}>
            <div className="text-lg md:text-xl text-gray tracking-wide font-mono">
              FULL-STACK DEVELOPER
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.7}>
            <div className="text-sm text-gray mt-4 font-mono">
              BUILDING DIGITAL EXPERIENCES
            </div>
          </ScrollReveal>
        </motion.div>
      </section>

      {/* Horizontal Scrolling Projects Section */}
      <section className="py-20">
        <ScrollReveal direction="up">
          <h2 className="headline-large text-center mb-20">
            SELECTED WORKS
          </h2>
        </ScrollReveal>
        
        <div className="horizontal-scroll custom-scrollbar px-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="horizontal-scroll-item w-screen md:w-[80vw] lg:w-[60vw] p-8"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="border border-gray p-8 md:p-12 h-[60vh] flex flex-col justify-between hover-invert transition-all duration-300">
                <div>
                  <div className="text-xs text-gray font-mono mb-4">
                    {project.year} • {project.status}
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-xl md:text-2xl text-gray mb-8">
                    {project.subtitle}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-mono text-gray">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Parallax Text Section */}
      <section className="py-20 overflow-hidden">
        <ParallaxText baseVelocity={-5} className="text-8xl md:text-9xl font-bold text-gray/10">
          DEVELOPER • DESIGNER • CREATOR • 
        </ParallaxText>
      </section>

      {/* About Section with Text Reveal */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl">
          <ScrollReveal direction="up">
            <h2 className="headline-large mb-12">
              ABOUT
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollReveal direction="left" delay={0.2}>
              <div>
                <p className="text-lg md:text-xl leading-relaxed mb-6">
                  Full-stack developer with expertise in modern web technologies. 
                  Passionate about creating clean, efficient, and user-focused digital solutions.
                </p>
                <p className="text-sm text-gray font-mono">
                  Currently exploring AI integration and experimental interfaces.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right" delay={0.4}>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-mono text-gray mb-2">TECHNOLOGIES</h4>
                  <p className="text-base">
                    React, Next.js, TypeScript, Node.js, PostgreSQL, Tailwind CSS
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-mono text-gray mb-2">LOCATION</h4>
                  <p className="text-base">Bangladesh</p>
                </div>
                <div>
                  <h4 className="text-sm font-mono text-gray mb-2">STATUS</h4>
                  <p className="text-base">Available for Projects</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="text-center">
          <ScrollReveal direction="up">
            <h2 className="headline-large mb-12">
              LET'S WORK TOGETHER
            </h2>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.2}>
            <div className="space-y-4 text-lg max-w-md mx-auto">
              <a 
                href="mailto:salman@example.com" 
                className="block hover-invert minimal-hover p-4 border border-gray transition-all duration-300"
                data-cursor-hover
              >
                salman@example.com
              </a>
              <a 
                href="#" 
                className="block hover-invert minimal-hover p-4 border border-gray transition-all duration-300"
                data-cursor-hover
              >
                LinkedIn
              </a>
              <a 
                href="#" 
                className="block hover-invert minimal-hover p-4 border border-gray transition-all duration-300"
                data-cursor-hover
              >
                GitHub
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray">
        <div className="text-center">
          <p className="text-sm font-mono text-gray">
            © 2024 SALMAN HOSSAIN. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  )
}