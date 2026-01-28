'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, BookOpen, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Blog {
  id?: number
  title: string
  excerpt: string
  content?: string
  category: string
  image: string
  date: string
  readTime: string
}

export default function BlogsPage() {
  const [allBlogs, setAllBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const pageSize = 4

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs')
      const data = await response.json()
      setAllBlogs(data.blogs || [])
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Fallback data if API fails
  const fallbackBlogs: Blog[] = [
  {
    title: 'Building Scalable AI Workflows with LangGraph',
    excerpt: 'Learn how to design and implement intelligent AI workflows using LangGraph for document processing, semantic search, and knowledge retrieval systems. This comprehensive guide covers architecture patterns, best practices, and real-world examples.',
    date: 'Jan 15, 2025',
    readTime: '8 min read',
    category: 'AI & Machine Learning',
    image: '🤖',
  },
  {
    title: 'FastAPI Best Practices for Production Backends',
    excerpt: 'A comprehensive guide to building robust, scalable backend APIs using FastAPI, including authentication, database optimization, and deployment strategies. Learn from real-world production experiences.',
    date: 'Dec 20, 2024',
    readTime: '12 min read',
    category: 'Backend Development',
    image: '⚡',
  },
  {
    title: 'Agentic AI: The Future of Intelligent Automation',
    excerpt: 'Exploring the power of agentic AI systems and how they can orchestrate complex workflows, making intelligent decisions and improving system efficiency by 70-80%. Discover the architecture behind intelligent agents.',
    date: 'Nov 28, 2024',
    readTime: '10 min read',
    category: 'AI & Machine Learning',
    image: '🧠',
  },
  {
    title: 'Optimizing Python Applications with Redis Caching',
    excerpt: 'Discover how to implement Redis caching strategies to improve application performance, reduce database load, and achieve 70-80% performance improvements. Real-world case studies and implementation patterns.',
    date: 'Oct 10, 2024',
    readTime: '6 min read',
    category: 'Performance',
    image: '🚀',
  },
  {
    title: 'Multi-Cloud Architecture with AWS, GCP, and Azure',
    excerpt: 'Building unified backend systems that work seamlessly across multiple cloud providers using MCP servers and AI-driven orchestration. Learn how to manage 128+ cloud tools dynamically.',
    date: 'Sep 5, 2024',
    readTime: '15 min read',
    category: 'Cloud & DevOps',
    image: '☁️',
  },
  {
    title: 'Django vs FastAPI: Choosing the Right Framework',
    excerpt: 'A detailed comparison of Django and FastAPI for modern Python web development. Understand when to use each framework based on project requirements, team size, and performance needs.',
    date: 'Aug 18, 2024',
    readTime: '9 min read',
    category: 'Backend Development',
    image: '🐍',
  },
  {
    title: 'Implementing OAuth 2.0 in FastAPI Applications',
    excerpt: 'Step-by-step guide to implementing secure OAuth 2.0 authentication in FastAPI applications. Covering authorization flows, token management, and security best practices.',
    date: 'Jul 22, 2024',
    readTime: '11 min read',
    category: 'Security',
    image: '🔐',
  },
  {
    title: 'Building Real-time Applications with WebSockets',
    excerpt: 'Learn how to build real-time features using WebSockets in Python applications. From basic implementations to scaling strategies for high-traffic applications.',
    date: 'Jun 15, 2024',
    readTime: '7 min read',
    category: 'Backend Development',
    image: '⚡',
  },
  ]

  const sourceBlogs = (allBlogs.length > 0 ? allBlogs : fallbackBlogs)
  const totalPages = Math.max(1, Math.ceil(sourceBlogs.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const startIdx = (safePage - 1) * pageSize
  const pageItems = sourceBlogs.slice(startIdx, startIdx + pageSize)

  const goToPage = (nextPage: number) => {
    const clamped = Math.min(Math.max(1, nextPage), totalPages)
    setPage(clamped)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <main className="min-h-screen bg-background pt-24">
      {/* Header with Back Button */}
      <div className="fixed inset-x-0 top-4 z-40">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="surface-glass rounded-2xl px-4 py-3 flex items-center justify-between"
          >
            <Link href="/">
              <motion.button
                className="icon-btn cursor-pointer px-4 py-2"
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </motion.button>
            </Link>
            <span className="chip">
              <BookOpen className="w-4 h-4 text-accent" />
              Blogs
            </span>
          </motion.div>
        </div>
      </div>

      {/* Page Content */}
      <div className="container-page max-w-7xl py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            All <span className="text-accent">Blogs</span>
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-4" />
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Explore all my articles, tutorials, and insights on AI, backend development, and cloud architecture
          </p>
        </motion.div>

        {/* Vertical Blog Cards */}
        <div className="space-y-10">
          {pageItems.map((blog, index) => (
            <motion.article
              key={blog.id || `fallback-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card card-hover overflow-hidden group"
              whileHover={{ y: -5 }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Blog Image/Icon - Vertical Layout */}
                <div className="w-full md:w-80 h-56 md:h-auto bg-gradient-to-br from-accent/18 to-accent/5 flex items-center justify-center text-6xl group-hover:scale-[1.02] transition-transform duration-300 flex-shrink-0 border-b md:border-b-0 md:border-r border-primary-light/40">
                  {blog.image}
                </div>

                {/* Blog Content */}
                <div className="flex-1 p-6">
                  {/* Category */}
                  <div className="mb-3">
                    <span className="chip">
                      <BookOpen className="w-4 h-4 text-accent" />
                      {blog.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-heading font-bold mb-3 text-text group-hover:text-accent transition-colors duration-200 tracking-tight">
                    {blog.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-text-muted text-base mb-4 leading-relaxed">
                    {blog.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-text-muted text-sm mb-4">
                    <div className="chip">
                      <Calendar className="w-4 h-4" />
                      {blog.date}
                    </div>
                    <div className="chip">
                      <Clock className="w-4 h-4" />
                      {blog.readTime}
                    </div>
                  </div>

                  {/* Read More */}
                  {blog.id ? (
                    <Link href={`/blogs/${blog.id}`}>
                      <motion.span
                        className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-semibold group-hover:gap-3 transition-all duration-200 cursor-pointer"
                        whileHover={{ x: 5 }}
                      >
                        Read Full Article
                        <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    </Link>
                  ) : (
                    <motion.span
                      className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-medium group-hover:gap-3 transition-all duration-200 cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      Read Full Article
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => goToPage(safePage - 1)}
            disabled={safePage <= 1}
            className="icon-btn disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2"
            aria-label="Previous page"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).slice(0, 7).map((_, i) => {
              const p = i + 1
              const active = p === safePage
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => goToPage(p)}
                  className={`min-w-[44px] rounded-xl border border-primary-light/40 px-3 py-2 text-sm transition-colors ${
                    active ? 'bg-accent text-background' : 'bg-primary/50 text-text hover:bg-primary'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {p}
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() => goToPage(safePage + 1)}
            disabled={safePage >= totalPages}
            className="icon-btn disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2"
            aria-label="Next page"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Back to Home Button at Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 pt-8 border-t border-primary-light/40"
        >
          <Link href="/">
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(34, 197, 94, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
