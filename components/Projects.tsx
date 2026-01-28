'use client'

import { motion } from 'framer-motion'
import { Sparkles, Cloud, Database, Bot } from 'lucide-react'

const projects = [
  {
    name: 'Onyx (AI Workspace Platform)',
    description: 'Multi-tenant workspace platform with REST APIs, OAuth 2.0 authentication, and AWS S3 integration. LangGraph-based AI workflow generation for document ingestion, semantic search, and LLM-driven knowledge retrieval.',
    tech: ['FastAPI', 'LangChain', 'LangGraph', 'PostgreSQL', 'AWS S3', 'OAuth 2.0'],
    icon: Sparkles,
    highlights: [
      'Led 1+ year of AI-focused development',
      'Designed LangGraph-based AI workflow generation',
      'Developed AI voice agents with real-time voice-to-voice',
    ],
  },
  {
    name: 'Grait Cloud Backend',
    description: 'FastAPI backend providing unified API access to AWS, GCP, and Azure via MCP servers. AI agents dynamically discover and orchestrate 128+ cloud tools for provisioning, monitoring, security, and cost optimization.',
    tech: ['FastAPI', 'MCP Servers', 'AWS', 'GCP', 'Azure', 'AI Agents'],
    icon: Cloud,
    highlights: [
      'Unified API for multi-cloud operations',
      '128+ cloud tools orchestration',
      'AI-driven dynamic tool discovery',
    ],
  },
  {
    name: 'Excel Analysis POC',
    description: 'Intelligent Excel analysis system using LangGraph for multi-sheet orchestration and AI-driven insights. Automated report generation with charts and LLM-generated summaries exported as PDFs.',
    tech: ['LangGraph', 'Python', 'PDF Generation', 'Data Analysis'],
    icon: Database,
    highlights: [
      'Multi-sheet orchestration',
      'AI-driven insights generation',
      'Automated PDF report generation',
    ],
  },
  {
    name: 'Recruitment Automation Panel',
    description: 'FastAPI backend with Celery task queues and Playwright-based web scraping. Redis caching, session management, and real-time monitoring dashboards.',
    tech: ['FastAPI', 'Celery', 'Playwright', 'Redis', 'Web Scraping'],
    icon: Bot,
    highlights: [
      'Automated web scraping',
      'Real-time monitoring dashboards',
      'Redis caching optimization',
    ],
  },
  {
    name: 'Coalmandi Trading Platform',
    description: 'Secure multi-portal backend for coal trading with auctions, onboarding, contracts, and Razorpay-based payments. Optimized real-time approval workflows using Redis caching and AWS infrastructure.',
    tech: ['Django', 'Razorpay', 'Redis', 'AWS', 'Real-time Workflows'],
    icon: Database,
    highlights: [
      'Multi-portal architecture',
      'Real-time approval workflows',
      'Payment integration',
    ],
  },
  {
    name: 'Opend Email System',
    description: 'Optimized email campaign platform achieving 70–80% performance improvement using Redis caching. Built analytics dashboards using MongoDB, ClickHouse, and Elasticsearch, improving engagement by 65%.',
    tech: ['FastAPI', 'Redis', 'MongoDB', 'ClickHouse', 'Elasticsearch'],
    icon: Cloud,
    highlights: [
      '70–80% performance improvement',
      'Multi-database analytics',
      '65% engagement increase',
    ],
  },
]

export default function Projects() {
  return (
    <section
      id="projects"
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
            Key <span className="text-accent">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card card-hover p-6 group"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="w-14 h-14 bg-accent/15 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-accent/25 transition-colors duration-300 border border-accent/20">
                  <Icon className="w-7 h-7 text-accent" />
                </div>

                <h3 className="text-xl font-heading font-bold mb-3 text-accent">
                  {project.name}
                </h3>

                <p className="text-text-muted text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="chip"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <ul className="space-y-2">
                  {project.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="text-text-muted text-xs flex items-start gap-2"
                    >
                      <span className="text-accent mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
