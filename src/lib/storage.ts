// localStorage wrapper for note persistence.
// Mirrors the original app's STORAGE_KEY approach.

import type { Note } from './notes'

export const STORAGE_KEY = 'notes_app_data_v1'
export const THEME_KEY = 'notes_app_theme_v1'

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

export function loadTheme(): 'light' | 'dark' {
  const saved = localStorage.getItem(THEME_KEY)
  return saved === 'dark' ? 'dark' : 'light'
}

export function saveTheme(theme: 'light' | 'dark'): void {
  localStorage.setItem(THEME_KEY, theme)
}
