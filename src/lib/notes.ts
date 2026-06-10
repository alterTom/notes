// Pure functions for note CRUD, search, and sort.
// These are extracted from the original vanilla JS and operate on
// explicit notes arrays rather than module-level mutable state.

export interface Note {
  id: string
  title: string
  content: string
  createdAt: number
  updatedAt: number
}

let _idCounter = 0

function generateId(): string {
  _idCounter++
  return `note_${Date.now()}_${_idCounter}_${Math.random().toString(36).slice(2, 8)}`
}

export function createNote(title?: string, content?: string): Note {
  const now = Date.now()
  return {
    id: generateId(),
    title: title || '',
    content: content || '',
    createdAt: now,
    updatedAt: now
  }
}

export function updateNote(notes: Note[], id: string, updates: Partial<Pick<Note, 'title' | 'content'>>): Note | null {
  const idx = findIndex(notes, id)
  if (idx === -1) return null
  notes[idx] = { ...notes[idx], ...updates, updatedAt: Date.now() }
  return notes[idx]
}

export function deleteNote(notes: Note[], id: string): boolean {
  const idx = findIndex(notes, id)
  if (idx === -1) return false
  notes.splice(idx, 1)
  return true
}

export function findNote(notes: Note[], id: string): Note | null {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) return notes[i]
  }
  return null
}

export function findIndex(notes: Note[], id: string): number {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) return i
  }
  return -1
}

export function getFilteredNotes(notes: Note[], query: string): Note[] {
  const q = query.toLowerCase().trim()
  if (!q) return notes
  return notes.filter(n =>
    n.title.toLowerCase().indexOf(q) !== -1 ||
    n.content.toLowerCase().indexOf(q) !== -1
  )
}

export function sortNotes(notes: Note[]): Note[] {
  return notes.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function resolveSelectionAfterDelete(
  notes: Note[],
  deletedId: string,
  currentSelectedId: string | null
): string | null {
  if (currentSelectedId !== deletedId) return currentSelectedId
  if (notes.length > 0) return notes[0].id
  return null
}
