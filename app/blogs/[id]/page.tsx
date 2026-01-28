'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowLeft, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface Blog {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  image: string
  date: string
  readTime: string
}

export default function BlogDetailPage() {
  const params = useParams()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchBlog = useCallback(async () => {
    try {
      const response = await fetch(`/api/blogs/${params.id}`)
      const data = await response.json()
      setBlog(data.blog)
    } catch (error) {
      console.error('Error fetching blog:', error)
    } finally {
      setLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    if (params.id) {
      fetchBlog()
    }
  }, [params.id, fetchBlog])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold mb-4">Blog Not Found</h1>
          <Link href="/blogs">
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Blogs
            </motion.button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background pt-24">
      {/* Header */}
      <div className="fixed inset-x-0 top-4 z-40">
        <div className="container-page max-w-4xl">
          <div className="surface-glass rounded-2xl px-4 py-3 flex items-center justify-between">
            <Link href="/blogs">
              <motion.button
                className="icon-btn cursor-pointer px-4 py-2"
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Blogs</span>
              </motion.button>
            </Link>
            <span className="chip">
              <BookOpen className="w-4 h-4 text-accent" />
              {blog.category}
            </span>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <article className="container-page max-w-4xl py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 tracking-tight">{blog.title}</h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 text-text-muted mb-8 pb-8 border-b border-primary-light/40">
            <div className="chip">
              <Calendar className="w-5 h-5" />
              {blog.date}
            </div>
            <div className="chip">
              <Clock className="w-5 h-5" />
              {blog.readTime}
            </div>
          </div>

          {/* Image */}
          <div className="card overflow-hidden mb-8">
            <div className="h-64 bg-gradient-to-br from-accent/18 to-accent/5 flex items-center justify-center text-8xl">
            {blog.image}
            </div>
          </div>

          {/* Content */}
          <div className="card p-7 md:p-8">
            <div className="text-text-muted text-lg leading-relaxed whitespace-pre-line">
              {blog.content}
            </div>
          </div>
        </motion.div>
      </article>
    </main>
  )
}
