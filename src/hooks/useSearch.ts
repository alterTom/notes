import { useCallback } from 'react'
import { useNotesContext } from '../store/NotesContext'

export function useSearch() {
  const { state, dispatch } = useNotesContext()

  const setSearchQuery = useCallback((query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', query })
  }, [dispatch])

  return {
    searchQuery: state.searchQuery,
    setSearchQuery
  }
}
