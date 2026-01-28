import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'

// GET - Fetch all blogs (public)
export async function GET(request: NextRequest) {
  try {
    // Ensure database is initialized
    const blogs = db.prepare('SELECT * FROM blogs ORDER BY created_at DESC').all() as any[]
    
    return NextResponse.json({ blogs: blogs || [] })
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json(
      { error: 'Internal server error', blogs: [] },
      { status: 500 }
    )
  }
}

// POST - Create new blog (admin only)
export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request)
    const user = verifyToken(token || '')

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { title, excerpt, content, category, image, date, readTime } = await request.json()

    if (!title || !excerpt || !content || !category || !image || !date || !readTime) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const result = db
      .prepare(
        'INSERT INTO blogs (title, excerpt, content, category, image, date, readTime) VALUES (?, ?, ?, ?, ?, ?, ?)'
      )
      .run(title, excerpt, content, category, image, date, readTime)

    const blog = db.prepare('SELECT * FROM blogs WHERE id = ?').get(result.lastInsertRowid) as any

    return NextResponse.json({ blog }, { status: 201 })
  } catch (error) {
    console.error('Error creating blog:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
