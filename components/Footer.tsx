'use client'

import { motion } from 'framer-motion'
import { Heart, ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="py-14 border-t border-primary-light/40">
      <div className="container-page">
        <div className="surface-glass rounded-2xl px-5 py-5 flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-text-muted text-sm flex items-center gap-2"
          >
            <span className="text-text">© {new Date().getFullYear()} Harsha</span>
            <span className="text-primary-light/60">•</span>
            All rights reserved.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-text-muted text-sm flex items-center gap-2"
          >
            Built with <Heart className="w-4 h-4 text-accent fill-accent" /> Next.js
          </motion.p>

          <motion.button
            onClick={scrollToTop}
            className="icon-btn cursor-pointer"
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-text" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
