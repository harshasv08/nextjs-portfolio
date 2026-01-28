# Admin Portal Setup Guide

## 🚀 Features

- **Admin Login**: Secure authentication with JWT tokens
- **Blog CRUD**: Create, Read, Update, Delete blogs
- **SQLite3 Database**: Works on Vercel with /tmp directory
- **Public API**: Fetch blogs for public pages
- **Blog Details**: Individual blog pages with full content

## 📋 Default Credentials

- **Username**: `admin`
- **Password**: `admin123`

**⚠️ IMPORTANT**: Change the default password in production!

## 🔧 Installation

1. Install dependencies:
```bash
npm install
```

2. The database will be automatically initialized on first run.

## 📁 File Structure

```
app/
├── admin/
│   ├── login/
│   │   └── page.tsx          # Admin login page
│   └── dashboard/
│       └── page.tsx          # Admin dashboard with blog CRUD
├── api/
│   ├── auth/
│   │   ├── login/route.ts    # Login API
│   │   └── verify/route.ts   # Token verification API
│   └── blogs/
│       ├── route.ts          # GET all blogs, POST create blog
│       └── [id]/route.ts     # GET/PUT/DELETE single blog
└── blogs/
    ├── page.tsx              # Public blogs listing (fetches from API)
    └── [id]/page.tsx         # Individual blog detail page

lib/
├── db.ts                     # SQLite3 database setup
└── auth.ts                   # Authentication utilities
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/login` - Login with username/password
- `GET /api/auth/verify` - Verify JWT token

### Blogs (Public)
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/[id]` - Get single blog by ID

### Blogs (Admin - Requires Auth)
- `POST /api/blogs` - Create new blog
- `PUT /api/blogs/[id]` - Update blog
- `DELETE /api/blogs/[id]` - Delete blog

## 🎯 Usage

### Access Admin Portal
1. Navigate to `/admin/login`
2. Login with default credentials
3. You'll be redirected to `/admin/dashboard`

### Create Blog
1. Click "Create New Blog" button
2. Fill in all fields:
   - Title
   - Excerpt
   - Content (full article text)
   - Category
   - Image (emoji)
   - Date
   - Read Time
3. Click "Create Blog"

### Edit Blog
1. Click "Edit" button on any blog card
2. Modify the fields
3. Click "Update Blog"

### Delete Blog
1. Click the trash icon on any blog card
2. Confirm deletion

## 🌐 Vercel Deployment

The setup is configured to work on Vercel:

1. **Database Location**: Uses `/tmp` directory on Vercel (writable)
2. **SQLite3**: Configured in `next.config.js` for serverless functions
3. **Environment Variables**: Set `JWT_SECRET` in Vercel dashboard

### Vercel Environment Variables
```
JWT_SECRET=your-secret-key-here
```

## 🔒 Security Notes

1. **Change Default Password**: Update the admin password in production
2. **JWT Secret**: Use a strong, random JWT_SECRET in production
3. **HTTPS**: Always use HTTPS in production
4. **Rate Limiting**: Consider adding rate limiting for login attempts

## 📝 Database Schema

### Users Table
- `id` (INTEGER PRIMARY KEY)
- `username` (TEXT UNIQUE)
- `password` (TEXT - bcrypt hashed)
- `created_at` (DATETIME)

### Blogs Table
- `id` (INTEGER PRIMARY KEY)
- `title` (TEXT)
- `excerpt` (TEXT)
- `content` (TEXT)
- `category` (TEXT)
- `image` (TEXT - emoji)
- `date` (TEXT)
- `readTime` (TEXT)
- `created_at` (DATETIME)
- `updated_at` (DATETIME)

## 🐛 Troubleshooting

### Database Issues
- Check that `/tmp` directory is writable (Vercel)
- Verify database file permissions
- Check console logs for initialization errors

### Authentication Issues
- Verify JWT_SECRET is set
- Check token expiration (7 days default)
- Clear cookies and re-login

### API Errors
- Check network tab for API responses
- Verify authentication token is being sent
- Check server logs for errors
