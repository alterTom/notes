import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react'
import type { Note } from '../lib/notes'

export interface NotesState {
  notes: Note[]
  selectedId: string | null
  searchQuery: string
  showTestPanel: boolean
}

export type NotesAction =
  | { type: 'SET_NOTES'; notes: Note[] }
  | { type: 'ADD_NOTE'; note: Note }
  | { type: 'UPDATE_NOTE'; id: string; updates: Partial<Pick<Note, 'title' | 'content'>> }
  | { type: 'DELETE_NOTE'; id: string }
  | { type: 'SELECT_NOTE'; id: string | null }
  | { type: 'SET_SEARCH_QUERY'; query: string }
  | { type: 'SHOW_TEST_PANEL'; show: boolean }

export const initialState: NotesState = {
  notes: [],
  selectedId: null,
  searchQuery: '',
  showTestPanel: false
}

export function notesReducer(state: NotesState, action: NotesAction): NotesState {
  switch (action.type) {
    case 'SET_NOTES':
      return { ...state, notes: action.notes }

    case 'ADD_NOTE':
      return {
        ...state,
        notes: [action.note, ...state.notes],
        selectedId: action.note.id
      }

    case 'UPDATE_NOTE': {
      const idx = state.notes.findIndex(n => n.id === action.id)
      if (idx === -1) return state
      const updated = [...state.notes]
      updated[idx] = { ...updated[idx], ...action.updates, updatedAt: Date.now() }
      return { ...state, notes: updated }
    }

    case 'DELETE_NOTE': {
      const filtered = state.notes.filter(n => n.id !== action.id)
      let nextId = state.selectedId
      if (state.selectedId === action.id) {
        nextId = filtered.length > 0 ? filtered[0].id : null
      }
      return { ...state, notes: filtered, selectedId: nextId }
    }

    case 'SELECT_NOTE':
      return { ...state, selectedId: action.id }

    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.query }

    case 'SHOW_TEST_PANEL':
      return { ...state, showTestPanel: action.show }

    default:
      return state
  }
}

interface NotesContextValue {
  state: NotesState
  dispatch: Dispatch<NotesAction>
}

const NotesContext = createContext<NotesContextValue | null>(null)

interface NotesProviderProps { children: ReactNode }
export function NotesProvider({ children }: NotesProviderProps) {
  const [state, dispatch] = useReducer(notesReducer, initialState)

  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      {children}
    </NotesContext.Provider>
  )
}

export function useNotesContext(): NotesContextValue {
  const ctx = useContext(NotesContext)
  if (!ctx) throw new Error('useNotesContext must be used within NotesProvider')
  return ctx
}
