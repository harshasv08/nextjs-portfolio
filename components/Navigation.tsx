'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from './ThemeProvider'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    // Only handle hash links here (routes are handled by Next.js Link)
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-x-0 top-4 z-50"
      >
        <div className="container-page">
          <div
            className={`surface-glass mx-auto flex h-16 items-center justify-between rounded-2xl px-4 sm:px-5 transition-all duration-300 ${
              isScrolled ? 'shadow-[0_14px_40px_rgba(0,0,0,0.28)]' : ''
            }`}
          >
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('#home')
              }}
              className="text-xl sm:text-2xl font-heading font-bold text-accent cursor-pointer tracking-tight"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Harsha
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                if (item.href.startsWith('/')) {
                  // Use Next.js Link for routes
                  return (
                    <Link key={item.name} href={item.href}>
                      <motion.span
                        className="text-text-muted hover:text-accent transition-colors duration-200 font-medium cursor-pointer"
                        whileHover={{ y: -2 }}
                      >
                        {item.name}
                      </motion.span>
                    </Link>
                  )
                } else {
                  // Use anchor for hash links
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavClick(item.href)
                      }}
                      className="text-text-muted hover:text-accent transition-colors duration-200 font-medium cursor-pointer"
                      whileHover={{ y: -2 }}
                    >
                      {item.name}
                    </motion.a>
                  )
                }
              })}
              <motion.button
                onClick={toggleTheme}
                className="icon-btn cursor-pointer"
                whileHover={{ scale: 1.06, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-accent" />
                ) : (
                  <Moon className="w-5 h-5 text-accent" />
                )}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <motion.button
                onClick={toggleTheme}
                className="icon-btn cursor-pointer"
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-accent" />
                ) : (
                  <Moon className="w-5 h-5 text-accent" />
                )}
              </motion.button>
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="icon-btn cursor-pointer"
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-text" />
                ) : (
                  <Menu className="w-6 h-6 text-text" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-24 right-4 bottom-4 w-72 rounded-2xl surface-glass shadow-[0_18px_60px_rgba(0,0,0,0.35)] z-40 md:hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navItems.map((item, index) => {
                if (item.href.startsWith('/')) {
                  // Use Next.js Link for routes
                  return (
                    <Link key={item.name} href={item.href}>
                      <motion.span
                        className="text-text hover:text-accent transition-colors duration-200 font-medium py-2 cursor-pointer block"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {item.name}
                      </motion.span>
                    </Link>
                  )
                } else {
                  // Use anchor for hash links
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavClick(item.href)
                      }}
                      className="text-text hover:text-accent transition-colors duration-200 font-medium py-2 cursor-pointer"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.name}
                    </motion.a>
                  )
                }
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
