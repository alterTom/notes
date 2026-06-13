import { describe, expect, it } from 'vitest'
import { initialState, notesReducer } from '../store/NotesContext'
import type { Note } from '../lib/notes'

function makeNote(id: string, updatedAt: number): Note {
  return {
    id,
    title: id,
    content: '',
    createdAt: updatedAt,
    updatedAt
  }
}

describe('NotesContext reducer', () => {
  it('初始加载返回时保留已新建并选中的笔记', () => {
    const newNote = makeNote('new-note', 3000)
    const loadedNote = makeNote('loaded-note', 2000)

    const withNewNote = notesReducer(initialState, {
      type: 'ADD_NOTE',
      note: newNote
    })

    const hydrated = notesReducer(withNewNote, {
      type: 'HYDRATE_NOTES',
      notes: [loadedNote]
    })

    expect(hydrated.notes.map(note => note.id)).toEqual(['new-note', 'loaded-note'])
    expect(hydrated.selectedId).toBe('new-note')
  })

  it('初始加载空状态时自动选中最新笔记', () => {
    const older = makeNote('older', 1000)
    const newer = makeNote('newer', 2000)

    const hydrated = notesReducer(initialState, {
      type: 'HYDRATE_NOTES',
      notes: [older, newer]
    })

    expect(hydrated.notes.map(note => note.id)).toEqual(['newer', 'older'])
    expect(hydrated.selectedId).toBe('newer')
  })
})
