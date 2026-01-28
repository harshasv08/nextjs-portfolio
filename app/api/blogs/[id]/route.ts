import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'

// GET - Fetch single blog by ID (public)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blog = db.prepare('SELECT * FROM blogs WHERE id = ?').get(parseInt(params.id)) as any

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ blog })
  } catch (error) {
    console.error('Error fetching blog:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update blog (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
        'UPDATE blogs SET title = ?, excerpt = ?, content = ?, category = ?, image = ?, date = ?, readTime = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
      )
      .run(title, excerpt, content, category, image, date, readTime, parseInt(params.id))

    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    const blog = db.prepare('SELECT * FROM blogs WHERE id = ?').get(parseInt(params.id)) as any

    return NextResponse.json({ blog })
  } catch (error) {
    console.error('Error updating blog:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete blog (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = getTokenFromRequest(request)
    const user = verifyToken(token || '')

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const result = db.prepare('DELETE FROM blogs WHERE id = ?').run(parseInt(params.id))

    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Blog deleted successfully' })
  } catch (error) {
    console.error('Error deleting blog:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
