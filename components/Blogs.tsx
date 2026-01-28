'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react'

const blogs = [
  {
    title: 'Building Scalable AI Workflows with LangGraph',
    excerpt: 'Learn how to design and implement intelligent AI workflows using LangGraph for document processing, semantic search, and knowledge retrieval systems.',
    date: 'Jan 15, 2025',
    readTime: '8 min read',
    category: 'AI & Machine Learning',
    image: '🤖',
  },
  {
    title: 'FastAPI Best Practices for Production Backends',
    excerpt: 'A comprehensive guide to building robust, scalable backend APIs using FastAPI, including authentication, database optimization, and deployment strategies.',
    date: 'Dec 20, 2024',
    readTime: '12 min read',
    category: 'Backend Development',
    image: '⚡',
  },
  {
    title: 'Agentic AI: The Future of Intelligent Automation',
    excerpt: 'Exploring the power of agentic AI systems and how they can orchestrate complex workflows, making intelligent decisions and improving system efficiency by 70-80%.',
    date: 'Nov 28, 2024',
    readTime: '10 min read',
    category: 'AI & Machine Learning',
    image: '🧠',
  },
  {
    title: 'Optimizing Python Applications with Redis Caching',
    excerpt: 'Discover how to implement Redis caching strategies to improve application performance, reduce database load, and achieve 70-80% performance improvements.',
    date: 'Oct 10, 2024',
    readTime: '6 min read',
    category: 'Performance',
    image: '🚀',
  },
  {
    title: 'Multi-Cloud Architecture with AWS, GCP, and Azure',
    excerpt: 'Building unified backend systems that work seamlessly across multiple cloud providers using MCP servers and AI-driven orchestration.',
    date: 'Sep 5, 2024',
    readTime: '15 min read',
    category: 'Cloud & DevOps',
    image: '☁️',
  },
  {
    title: 'Django vs FastAPI: Choosing the Right Framework',
    excerpt: 'A detailed comparison of Django and FastAPI for modern Python web development. Understand when to use each framework based on project requirements.',
    date: 'Aug 18, 2024',
    readTime: '9 min read',
    category: 'Backend Development',
    image: '🐍',
  },
  {
    title: 'Implementing OAuth 2.0 in FastAPI Applications',
    excerpt: 'Step-by-step guide to implementing secure OAuth 2.0 authentication in FastAPI applications. Covering authorization flows and security best practices.',
    date: 'Jul 22, 2024',
    readTime: '11 min read',
    category: 'Security',
    image: '🔐',
  },
  {
    title: 'Building Real-time Applications with WebSockets',
    excerpt: 'Learn how to build real-time features using WebSockets in Python applications. From basic implementations to scaling strategies.',
    date: 'Jun 15, 2024',
    readTime: '7 min read',
    category: 'Backend Development',
    image: '⚡',
  },
]

export default function Blogs() {
  return (
    <section
      id="blogs"
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Latest <span className="text-accent">Blogs</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-4" />
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on AI, backend development, and cloud architecture
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((blog, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-primary rounded-xl overflow-hidden hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 cursor-pointer group"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Blog Image/Icon */}
              <div className="h-48 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                {blog.image}
              </div>

              <div className="p-6">
                {/* Category */}
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-accent" />
                  <span className="text-accent text-sm font-medium">{blog.category}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-heading font-bold mb-3 text-text group-hover:text-accent transition-colors duration-200">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-text-muted text-sm mb-4 leading-relaxed line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-text-muted text-xs mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                {/* Read More */}
                <motion.a
                  href="#"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-medium text-sm group-hover:gap-3 transition-all duration-200"
                  whileHover={{ x: 5 }}
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Blogs Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/blogs"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-background font-semibold rounded-lg hover:bg-accent-hover transition-colors duration-200 cursor-pointer"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(34, 197, 94, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            View All Blogs
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
