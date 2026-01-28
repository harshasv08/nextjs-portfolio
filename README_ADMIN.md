# Admin Portal - Complete Setup

## ✅ What's Been Created

### 1. **Admin Login Page** (`/admin/login`)
- Beautiful login UI with animations
- JWT-based authentication
- Default credentials: `admin` / `admin123`

### 2. **Admin Dashboard** (`/admin/dashboard`)
- Full blog CRUD interface
- Create, Edit, Delete blogs
- View all blogs in a grid layout
- Modal forms for creating/editing

### 3. **API Endpoints**

#### Authentication
- `POST /api/auth/login` - Login endpoint
- `GET /api/auth/verify` - Verify JWT token

#### Blogs (Public)
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/[id]` - Get single blog

#### Blogs (Admin - Protected)
- `POST /api/blogs` - Create blog
- `PUT /api/blogs/[id]` - Update blog
- `DELETE /api/blogs/[id]` - Delete blog

### 4. **Public Pages**
- `/blogs` - Lists all blogs (fetches from API)
- `/blogs/[id]` - Individual blog detail page

### 5. **Database**
- SQLite3 database
- Auto-initializes on first run
- Creates default admin user
- Stores blogs with all metadata

## 🚀 How to Use

### Step 1: Start the Server
```bash
npm run dev
```

### Step 2: Access Admin Portal
1. Go to: http://localhost:3001/admin/login
2. Login with:
   - Username: `admin`
   - Password: `admin123`

### Step 3: Create Blogs
1. After login, you'll see the dashboard
2. Click "Create New Blog"
3. Fill in:
   - Title
   - Excerpt (short description)
   - Content (full article text)
   - Category
   - Image (emoji like 🤖, ⚡, etc.)
   - Date (e.g., "Jan 15, 2025")
   - Read Time (e.g., "8 min read")
4. Click "Create Blog"

### Step 4: View Blogs
- Admin Dashboard: See all blogs with edit/delete options
- Public Page: http://localhost:3001/blogs (shows all blogs)
- Individual Blog: http://localhost:3001/blogs/[id]

## 📁 File Structure

```
app/
├── admin/
│   ├── login/page.tsx          # Login page
│   └── dashboard/page.tsx     # Admin dashboard
├── api/
│   ├── auth/
│   │   ├── login/route.ts      # Login API
│   │   └── verify/route.ts    # Verify token API
│   └── blogs/
│       ├── route.ts            # GET all, POST create
│       └── [id]/route.ts       # GET/PUT/DELETE single
└── blogs/
    ├── page.tsx                # Public blogs list
    └── [id]/page.tsx           # Blog detail page

lib/
├── db.ts                       # SQLite3 setup
└── auth.ts                     # JWT utilities

middleware.ts                   # Route protection
```

## 🔒 Security Features

- ✅ JWT token authentication
- ✅ Password hashing with bcrypt
- ✅ Protected admin routes
- ✅ Public API for blogs (read-only)
- ✅ Admin-only API for CRUD operations

## 🌐 Vercel Deployment

### Environment Variables
Set in Vercel Dashboard:
```
JWT_SECRET=your-strong-secret-key-here
```

### Database
- Uses `/tmp` directory on Vercel (writable)
- Database persists during function execution
- **Note**: For production, consider using Vercel Postgres or similar

### Build Configuration
- Already configured in `next.config.js`
- SQLite3 externalized for serverless functions
- Works out of the box on Vercel

## 🎯 Features

- ✅ Secure admin login
- ✅ JWT token-based auth
- ✅ Full blog CRUD operations
- ✅ Beautiful UI with animations
- ✅ Responsive design
- ✅ Public blog listing
- ✅ Individual blog pages
- ✅ SQLite3 database
- ✅ Vercel-ready

## 📝 Notes

1. **Default Password**: Change `admin123` in production!
2. **JWT Secret**: Set a strong `JWT_SECRET` in Vercel
3. **Database**: SQLite3 in `/tmp` works but is ephemeral on Vercel
4. **Production**: Consider migrating to Vercel Postgres for data persistence

## 🐛 Troubleshooting

### Can't login?
- Check console for errors
- Verify database initialized
- Check JWT_SECRET is set

### Blogs not showing?
- Check API endpoint: `/api/blogs`
- Verify database has blogs
- Check browser console for errors

### Database errors?
- Ensure `/tmp` or `data/` directory is writable
- Check database file permissions
- Review server logs

Everything is ready to use! 🎉
