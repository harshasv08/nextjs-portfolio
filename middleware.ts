import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Allow public GET requests to blogs API
  if (request.nextUrl.pathname.startsWith('/api/blogs') && request.method === 'GET') {
    return NextResponse.next()
  }

  // Protect admin routes (except login)
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/blogs/:path*',
    '/api/auth/:path*',
  ],
}
