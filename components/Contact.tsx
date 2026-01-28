'use client'

import { motion } from 'framer-motion'
import { Mail, Send, Linkedin, Github } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({ name: '', email: '', message: '' })
      alert('Thank you for your message! I\'ll get back to you soon.')
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section
      id="contact"
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
            Get In <span className="text-accent">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            I’m always open to discussing new projects, creative ideas, or opportunities
            to be part of your visions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-heading font-bold mb-6 text-accent">
                Let’s Connect
              </h3>
              <p className="text-text-muted mb-8">
                Feel free to reach out if you’re looking for a developer, have a
                question, or just want to connect.
              </p>
            </div>

            <div className="space-y-4">
              <motion.a
                href="mailto:harshasv09@gmail.com"
                className="card card-hover flex items-center gap-4 p-4 group"
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 bg-accent/15 rounded-2xl flex items-center justify-center border border-accent/20 group-hover:bg-accent/25 transition-colors duration-300">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-text-muted text-sm">Email</p>
                  <p className="text-text font-medium">harshasv09@gmail.com</p>
                </div>
              </motion.a>

              <div className="flex gap-4">
                <motion.a
                  href="https://www.linkedin.com/in/harsha-s-v-0846a616b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn flex-1 cursor-pointer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="https://github.com/harshasv08?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn flex-1 cursor-pointer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-6 h-6" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="card p-8"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-text font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background-light/40 border border-primary-light/40 rounded-xl text-text focus:outline-none focus:border-accent transition-colors duration-200"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-text font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background-light/40 border border-primary-light/40 rounded-xl text-text focus:outline-none focus:border-accent transition-colors duration-200"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-text font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-background-light/40 border border-primary-light/40 rounded-xl text-text focus:outline-none focus:border-accent transition-colors duration-200 resize-none"
                  placeholder="Your message..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
