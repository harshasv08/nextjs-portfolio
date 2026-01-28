import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

// For Vercel deployment, use /tmp directory (writable)
const isVercel = process.env.VERCEL === '1'
const dbDir = isVercel ? '/tmp' : path.join(process.cwd(), 'data')

if (!isVercel && !fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

const dbPath = path.join(dbDir, 'portfolio.db')
let db: Database.Database

try {
  db = new Database(dbPath)
} catch (error) {
  console.error('Database initialization error:', error)
  throw error
}

// Enable foreign keys
db.pragma('foreign_keys = ON')

// Initialize database tables
export function initDatabase() {
  // Users table for admin
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Blogs table
  db.exec(`
    CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT NOT NULL,
      image TEXT NOT NULL,
      date TEXT NOT NULL,
      readTime TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Create default admin user if it doesn't exist
  try {
    const adminExists = db.prepare('SELECT id FROM users WHERE username = ?').get('admin')
    if (!adminExists) {
      // Default password: admin123 (hashed with bcrypt)
      // In production, change this!
      const bcrypt = require('bcryptjs')
      const hashedPassword = bcrypt.hashSync('admin123', 10)
      db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('admin', hashedPassword)
      console.log('Default admin user created: username=admin, password=admin123')
    }
  } catch (error) {
    console.error('Error creating admin user:', error)
  }
}

// Initialize on import
initDatabase()

export default db
