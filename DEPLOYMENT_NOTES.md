# Deployment Notes for Vercel

## ⚠️ Important: SQLite3 on Vercel

SQLite3 with `better-sqlite3` can work on Vercel, but there are some considerations:

### Option 1: Use /tmp Directory (Current Setup)
- Database is stored in `/tmp` directory (writable on Vercel)
- **Note**: `/tmp` is ephemeral - data may be lost between deployments
- Good for development/testing

### Option 2: Use External Database (Recommended for Production)
For production, consider:
- **Vercel Postgres** (recommended)
- **PlanetScale** (MySQL)
- **Supabase** (PostgreSQL)
- **Turso** (SQLite with edge support)

## 🔧 Current Setup

The current setup uses SQLite3 in `/tmp` directory which works for:
- ✅ Development
- ✅ Testing
- ⚠️ Production (with data persistence limitations)

## 📦 Dependencies Installed

- `better-sqlite3` - SQLite database
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication

## 🚀 Quick Start

1. **Run locally**:
```bash
npm run dev
```

2. **Access admin portal**:
   - Go to: http://localhost:3001/admin/login
   - Username: `admin`
   - Password: `admin123`

3. **Create blogs**:
   - Login to dashboard
   - Click "Create New Blog"
   - Fill in the form and save

4. **View blogs**:
   - Public page: http://localhost:3001/blogs
   - Fetches from `/api/blogs` endpoint

## 🔐 Environment Variables for Vercel

Add these in Vercel Dashboard → Settings → Environment Variables:

```
JWT_SECRET=your-strong-random-secret-key-here
```

## 📝 Migration to Production Database (Optional)

If you want to use a production database, you'll need to:

1. Update `lib/db.ts` to use your database client
2. Update SQL queries if needed
3. Keep the same API structure

Example with Vercel Postgres:
```typescript
import { sql } from '@vercel/postgres'
// Replace SQLite queries with Postgres queries
```

## ✅ What's Working

- ✅ Admin login page
- ✅ JWT authentication
- ✅ Blog CRUD operations
- ✅ Public blogs API
- ✅ Blog detail pages
- ✅ SQLite3 database setup
- ✅ Vercel-compatible configuration

## 🎯 Next Steps

1. Test locally: `npm run dev`
2. Login at `/admin/login`
3. Create some blogs
4. View them at `/blogs`
5. Deploy to Vercel
6. (Optional) Migrate to production database
