'use client'

import { motion } from 'framer-motion'
import { User, Target, Award } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-background-light/50"
    >
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            About <span className="text-accent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
          <p className="text-text-muted mt-4 max-w-2xl mx-auto">
            Backend-first engineer building reliable systems and AI workflows with clean architecture,
            measurable performance, and production-grade delivery.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          <motion.div
            variants={itemVariants}
            className="card card-hover p-8"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="w-16 h-16 bg-accent/15 rounded-2xl flex items-center justify-center mb-6 border border-accent/20">
              <User className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-heading font-semibold mb-4">Profile</h3>
            <p className="text-text-muted leading-relaxed">
              Python Developer with 4+ years of professional experience in backend
              engineering, scalable system design, and cloud-native applications.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="card card-hover p-8"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="w-16 h-16 bg-accent/15 rounded-2xl flex items-center justify-center mb-6 border border-accent/20">
              <Target className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-heading font-semibold mb-4">Expertise</h3>
            <p className="text-text-muted leading-relaxed">
              Hands-on experience in Agentic AI and LLM-driven systems for 1+ year,
              building intelligent workflows, AI agents, and semantic search platforms.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="card card-hover p-8"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="w-16 h-16 bg-accent/15 rounded-2xl flex items-center justify-center mb-6 border border-accent/20">
              <Award className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-heading font-semibold mb-4">Achievements</h3>
            <p className="text-text-muted leading-relaxed">
              Improved platform engagement by 65% and reduced operational overhead by 60%
              through system optimization and intelligent automation.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 card p-8 md:p-12"
        >
          <h3 className="text-3xl font-heading font-bold mb-6 text-center">
            Career <span className="text-accent">Summary</span>
          </h3>
          <p className="text-text-muted text-lg leading-relaxed max-w-4xl mx-auto text-center">
            Strong expertise in FastAPI, Django, distributed systems, automation, and
            performance optimization. Passionate about building scalable, intelligent
            systems that solve real-world problems.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
