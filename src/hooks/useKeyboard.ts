import { useEffect } from 'react'
import type { NotesAction } from '../store/NotesContext'

export function useKeyboard(
  dispatch: React.Dispatch<NotesAction>,
  onNewNote: () => string | undefined,
  showTestPanel: boolean,
  onCloseTest: () => void
) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Escape closes test panel
      if (e.key === 'Escape' && showTestPanel) {
        onCloseTest()
        return
      }

      // Ctrl/Cmd+N: new note
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault()
        onNewNote()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [dispatch, onNewNote, showTestPanel, onCloseTest])
}
