'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Code, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

const roles = ['Python Developer', 'AI Engineer', 'Backend Specialist', 'LLM Expert']

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToAbout = () => {
    scrollToSection('#about')
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-28"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-light to-background opacity-60" />
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
          backgroundSize: '200% 200%',
        }}
      />

      <div className="relative z-10 container-page text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="chip">
              <Code className="w-4 h-4 text-accent" />
              Backend • AI • Cloud
            </span>
            <span className="chip">
              <Sparkles className="w-4 h-4 text-accent" />
              4+ years experience
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-4 tracking-tight">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="block text-text"
            >
              Hi, I’m{' '}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="block text-accent"
            >
              Harsha
            </motion.span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-8"
        >
          <div className="h-16 flex items-center justify-center">
            <motion.h2
              key={currentRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-2xl md:text-4xl font-heading font-semibold text-text-muted"
            >
              {roles[currentRole]}
            </motion.h2>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-lg md:text-xl text-text-muted max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Python Developer with 4+ years of experience building scalable backend systems,
          AI-driven applications, and LLM-powered workflows. Passionate about Agentic AI
          and intelligent automation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('#contact')
            }}
            className="btn btn-primary"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(34, 197, 94, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
          <motion.a
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('#projects')
            }}
            className="btn btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-20"
        >
          <motion.button
            onClick={scrollToAbout}
            className="text-text-muted hover:text-accent transition-colors duration-200 cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            aria-label="Scroll down"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
