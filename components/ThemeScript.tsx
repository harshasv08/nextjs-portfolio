'use client'

import { useEffect } from 'react'

export default function ThemeScript() {
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'dark'
    document.documentElement.className = theme
  }, [])

  return null
}
