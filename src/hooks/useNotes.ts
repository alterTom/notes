import { useCallback, useEffect, useRef } from 'react'
import { createNote, findNote, getFilteredNotes, sortNotes } from '../lib/notes'
import { saveNotes, loadNotes } from '../lib/storage'
import { useNotesContext } from '../store/NotesContext'

export function useNotes() {
  const { state, dispatch } = useNotesContext()
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Load notes on mount
  useEffect(() => {
    const loaded = loadNotes()
    sortNotes(loaded)
    dispatch({ type: 'SET_NOTES', notes: loaded })
    if (loaded.length > 0) {
      dispatch({ type: 'SELECT_NOTE', id: loaded[0].id })
    }
  }, [dispatch])

  // Persist on every change
  useEffect(() => {
    saveNotes(state.notes)
  }, [state.notes])

  const handleNewNote = useCallback(() => {
    const note = createNote()
    dispatch({ type: 'ADD_NOTE', note })
    return note.id
  }, [dispatch])

  const handleSelectNote = useCallback((id: string | null) => {
    dispatch({ type: 'SELECT_NOTE', id })
  }, [dispatch])

  const handleUpdateNote = useCallback((id: string, updates: { title?: string; content?: string }) => {
    dispatch({ type: 'UPDATE_NOTE', id, updates })
  }, [dispatch])

  const handleDeleteNote = useCallback((id: string) => {
    dispatch({ type: 'DELETE_NOTE', id })
  }, [dispatch])

  const filteredNotes = getFilteredNotes(state.notes, state.searchQuery)

  const selectedNote = state.selectedId ? findNote(state.notes, state.selectedId) : null

  return {
    notes: state.notes,
    filteredNotes,
    selectedId: state.selectedId,
    selectedNote,
    handleNewNote,
    handleSelectNote,
    handleUpdateNote,
    handleDeleteNote
  }
}
