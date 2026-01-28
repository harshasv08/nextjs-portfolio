'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Plus, Edit, Trash2, LogOut, BookOpen, Calendar, Clock } from 'lucide-react'

interface Blog {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  image: string
  date: string
  readTime: string
  created_at: string
  updated_at: string
}

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    image: '',
    date: '',
    readTime: '',
  })
  const router = useRouter()

  useEffect(() => {
    fetchBlogs()
    verifyAuth()
  }, [])

  const verifyAuth = async () => {
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('auth-token='))
        ?.split('=')[1]

      if (!token) {
        router.push('/admin/login')
        return
      }

      const response = await fetch('/api/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        router.push('/admin/login')
      }
    } catch (error) {
      router.push('/admin/login')
    }
  }

  const fetchBlogs = async () => {
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('auth-token='))
        ?.split('=')[1]

      const response = await fetch('/api/blogs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      setBlogs(data.blogs || [])
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    document.cookie = 'auth-token=; path=/; max-age=0'
    router.push('/admin/login')
  }

  const handleCreate = () => {
    setEditingBlog(null)
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      image: '',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      readTime: '5 min read',
    })
    setShowModal(true)
  }

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog)
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      image: blog.image,
      date: blog.date,
      readTime: blog.readTime,
    })
    setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog?')) return

    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('auth-token='))
        ?.split('=')[1]

      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        fetchBlogs()
      }
    } catch (error) {
      console.error('Error deleting blog:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('auth-token='))
        ?.split('=')[1]

      const url = editingBlog ? `/api/blogs/${editingBlog.id}` : '/api/blogs'
      const method = editingBlog ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setShowModal(false)
        fetchBlogs()
      }
    } catch (error) {
      console.error('Error saving blog:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Header */}
      <div className="fixed inset-x-0 top-4 z-40">
        <div className="container-page">
          <div className="surface-glass rounded-2xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="chip">
                <BookOpen className="w-4 h-4 text-accent" />
                Admin
              </span>
              <h1 className="text-lg sm:text-xl font-heading font-bold text-text">
                Dashboard
              </h1>
            </div>
            <motion.button
              onClick={handleLogout}
              className="btn btn-primary px-4 py-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </div>
        </div>
      </div>

      <div className="container-page py-10">
        {/* Actions */}
        <div className="mb-6">
          <motion.button
            onClick={handleCreate}
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            Create New Blog
          </motion.button>
        </div>

        {/* Blogs List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card card-hover p-6"
            >
              <div className="h-32 bg-gradient-to-br from-accent/18 to-accent/5 rounded-2xl flex items-center justify-center text-4xl mb-4 border border-primary-light/40">
                {blog.image}
              </div>

              <div className="mb-3">
                <span className="chip">{blog.category}</span>
              </div>

              <h3 className="text-xl font-heading font-bold mb-2 text-text">{blog.title}</h3>
              <p className="text-text-muted text-sm mb-4 line-clamp-2">{blog.excerpt}</p>

              <div className="flex items-center gap-4 text-text-muted text-xs mb-4">
                <div className="chip">
                  <Calendar className="w-3 h-3" />
                  {blog.date}
                </div>
                <div className="chip">
                  <Clock className="w-3 h-3" />
                  {blog.readTime}
                </div>
              </div>

              <div className="flex gap-2">
                <motion.button
                  onClick={() => handleEdit(blog)}
                  className="btn btn-secondary flex-1 px-4 py-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </motion.button>
                <motion.button
                  onClick={() => handleDelete(blog.id)}
                  className="icon-btn border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-text-muted mx-auto mb-4" />
            <p className="text-text-muted">No blogs yet. Create your first blog!</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-heading font-bold mb-6">
              {editingBlog ? 'Edit Blog' : 'Create New Blog'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-text font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 bg-background-light/40 border border-primary-light/40 rounded-xl text-text focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-text font-medium mb-2">Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-2 bg-background-light/40 border border-primary-light/40 rounded-xl text-text focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div>
                <label className="block text-text font-medium mb-2">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={6}
                  className="w-full px-4 py-2 bg-background-light/40 border border-primary-light/40 rounded-xl text-text focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-text font-medium mb-2">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-background-light/40 border border-primary-light/40 rounded-xl text-text focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-text font-medium mb-2">Image (Emoji)</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-background-light/40 border border-primary-light/40 rounded-xl text-text focus:outline-none focus:border-accent"
                    placeholder="🤖"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-text font-medium mb-2">Date</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-background-light/40 border border-primary-light/40 rounded-xl text-text focus:outline-none focus:border-accent"
                    placeholder="Jan 15, 2025"
                  />
                </div>
                <div>
                  <label className="block text-text font-medium mb-2">Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-background-light/40 border border-primary-light/40 rounded-xl text-text focus:outline-none focus:border-accent"
                    placeholder="8 min read"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <motion.button
                  type="submit"
                  className="btn btn-primary flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {editingBlog ? 'Update Blog' : 'Create Blog'}
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-secondary px-6"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
