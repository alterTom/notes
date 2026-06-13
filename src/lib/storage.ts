// localStorage wrapper for note persistence.
// Mirrors the original app's STORAGE_KEY approach.

import type { Note } from './notes'

export const STORAGE_KEY = 'notes_app_data_v1'
export const THEME_KEY = 'notes_app_theme_v1'

export type SaveResult = { success: true } | { success: false; error: string }

export function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveNotes(notes: Note[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

export async function loadNotesFromDatabase(): Promise<Note[] | null> {
  if (!window.electronAPI?.loadNotes) return null

  try {
    const result = await window.electronAPI.loadNotes()
    return result.success ? result.notes : null
  } catch {
    return null
  }
}

export async function saveNotesToDatabase(notes: Note[]): Promise<SaveResult> {
  if (!window.electronAPI?.saveNotes) {
    return { success: false, error: 'Electron 数据库接口不可用，请在桌面应用中保存。' }
  }

  try {
    const result = await window.electronAPI.saveNotes(notes)
    return result.success
      ? { success: true }
      : { success: false, error: result.error || 'MySQL 保存失败。' }
  } catch {
    return { success: false, error: '调用 MySQL 保存接口失败。' }
  }
}

export async function saveNoteToDatabase(note: Note): Promise<SaveResult> {
  if (!window.electronAPI?.saveNote) {
    return { success: false, error: 'Electron 数据库接口不可用，请在桌面应用中保存。' }
  }

  try {
    const result = await window.electronAPI.saveNote(note)
    return result.success
      ? { success: true }
      : { success: false, error: result.error || 'MySQL 保存失败。' }
  } catch {
    return { success: false, error: '调用 MySQL 保存接口失败。' }
  }
}

export function loadTheme(): 'light' | 'dark' {
  const saved = localStorage.getItem(THEME_KEY)
  return saved === 'dark' ? 'dark' : 'light'
}

export function saveTheme(theme: 'light' | 'dark'): void {
  localStorage.setItem(THEME_KEY, theme)
}
