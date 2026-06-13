import mysql from 'mysql2/promise'
import type { Note } from '../src/lib/notes'

interface NoteRow {
  id: string
  title: string
  content: string
  created_at: number
  updated_at: number
}

const dbConfig = {
  host: process.env.NOTES_DB_HOST || '192.168.142.129',
  port: Number(process.env.NOTES_DB_PORT || 3336),
  user: process.env.NOTES_DB_USER || 'root',
  password: process.env.NOTES_DB_PASSWORD || '123456',
  database: process.env.NOTES_DB_NAME || 'zook_v1.0',
  waitForConnections: true,
  connectionLimit: 5,
  namedPlaceholders: true
}

let pool: mysql.Pool | null = null
let schemaReady = false

function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool(dbConfig)
  }
  return pool
}

async function ensureSchema(): Promise<void> {
  if (schemaReady) return

  await getPool().query(`
    CREATE TABLE IF NOT EXISTS notes (
      id VARCHAR(191) NOT NULL PRIMARY KEY,
      title TEXT NOT NULL,
      content MEDIUMTEXT NOT NULL,
      created_at BIGINT UNSIGNED NOT NULL,
      updated_at BIGINT UNSIGNED NOT NULL,
      INDEX idx_notes_updated_at (updated_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `)

  schemaReady = true
}

export async function loadNotesFromMySql(): Promise<Note[]> {
  await ensureSchema()

  const [rows] = await getPool().query<mysql.RowDataPacket[] & NoteRow[]>(`
    SELECT id, title, content, created_at, updated_at
    FROM notes
    ORDER BY updated_at DESC
  `)

  return rows.map(row => ({
    id: row.id,
    title: row.title,
    content: row.content,
    createdAt: Number(row.created_at),
    updatedAt: Number(row.updated_at)
  }))
}

export async function saveNotesToMySql(notes: Note[]): Promise<void> {
  await ensureSchema()

  const connection = await getPool().getConnection()
  try {
    await connection.beginTransaction()

    await connection.execute('DELETE FROM notes')

    for (const note of notes) {
      await connection.execute(`
        INSERT INTO notes (id, title, content, created_at, updated_at)
        VALUES (:id, :title, :content, :createdAt, :updatedAt)
      `, note)
    }

    await connection.commit()
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    connection.release()
  }
}

export async function saveNoteToMySql(note: Note): Promise<void> {
  await ensureSchema()

  await getPool().execute(`
    INSERT INTO notes (id, title, content, created_at, updated_at)
    VALUES (:id, :title, :content, :createdAt, :updatedAt)
    ON DUPLICATE KEY UPDATE
      title = VALUES(title),
      content = VALUES(content),
      created_at = VALUES(created_at),
      updated_at = VALUES(updated_at)
  `, note)
}
