import type { Metadata } from 'next'
import { Archivo, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import ThemeScript from '@/components/ThemeScript'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heading',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'Harsha - Python Developer | AI & Backend Engineer',
  description: 'Portfolio of Harsha - Python Developer with 4+ years of experience in backend engineering, Agentic AI, and LLM-driven systems.',
  keywords: 'Python Developer, FastAPI, Django, AI, LLM, LangChain, Backend Engineer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${archivo.variable} ${spaceGrotesk.variable} font-body antialiased`}>
        <ThemeScript />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
