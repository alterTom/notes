import { useCallback, useEffect, useRef } from 'react'
import { createNote, findNote, getFilteredNotes, sortNotes } from '../lib/notes'
import { loadNotes, loadNotesFromDatabase, saveNotes, saveNotesToDatabase } from '../lib/storage'
import { useNotesContext } from '../store/NotesContext'

export function useNotes() {
  const { state, dispatch } = useNotesContext()
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasLoadedRef = useRef(false)

  // Load notes on mount
  useEffect(() => {
    let cancelled = false

    function useLoadedNotes(loaded: ReturnType<typeof loadNotes>) {
      dispatch({ type: 'SET_NOTES', notes: loaded })
      if (loaded.length > 0) {
        dispatch({ type: 'SELECT_NOTE', id: loaded[0].id })
      }
      hasLoadedRef.current = true
    }

    async function loadInitialNotes() {
      const localNotes = sortNotes(loadNotes())
      let loaded = localNotes

      const databaseNotes = await loadNotesFromDatabase()
      if (cancelled) return

      if (databaseNotes) {
        loaded = sortNotes(databaseNotes)
        if (loaded.length === 0 && localNotes.length > 0) {
          loaded = localNotes
          void saveNotesToDatabase(localNotes)
        }
      }

      useLoadedNotes(loaded)
    }

    if (!window.electronAPI?.loadNotes) {
      useLoadedNotes(sortNotes(loadNotes()))
    } else {
      void loadInitialNotes()
    }

    return () => {
      cancelled = true
    }
  }, [dispatch])

  // Persist on every change
  useEffect(() => {
    if (!hasLoadedRef.current) return

    saveNotes(state.notes)
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      void saveNotesToDatabase(state.notes)
    }, 300)
  }, [state.notes])

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [])

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
