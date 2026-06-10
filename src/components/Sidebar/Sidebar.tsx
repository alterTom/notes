import { useNotes } from '../../hooks/useNotes'
import { useSearch } from '../../hooks/useSearch'
import { useNotesContext } from '../../store/NotesContext'
import { defineAllTests } from '../../lib/define-tests'
import { runAllTests, type TestSuite } from '../../lib/test-runner'
import { saveNotes, loadNotes } from '../../lib/storage'
import type { Note } from '../../lib/notes'
import { SidebarHeader } from './SidebarHeader'
import { SearchInput } from './SearchInput'
import { NoteList } from './NoteList'
import { ThemeToggle } from './ThemeToggle'

interface SidebarProps {
  onTestResults: (suite: TestSuite) => void
}

export function Sidebar({ onTestResults }: SidebarProps) {
  const { state, dispatch } = useNotesContext()
  const { filteredNotes, handleSelectNote, handleDeleteNote } = useNotes()
  const { searchQuery } = useSearch()

  const handleRunTests = () => {
    defineAllTests()

    const suite = runAllTests(
      () => ({
        notes: JSON.parse(JSON.stringify(state.notes)),
        selectedId: state.selectedId,
        searchQuery: state.searchQuery
      }),
      (saved: unknown) => {
        const s = saved as { notes: Note[]; selectedId: string | null; searchQuery: string }
        dispatch({ type: 'SET_NOTES', notes: s.notes })
        dispatch({ type: 'SET_SEARCH_QUERY', query: s.searchQuery })
        if (s.selectedId) {
          dispatch({ type: 'SELECT_NOTE', id: s.selectedId })
        }
      }
    )

    onTestResults(suite)
    dispatch({ type: 'SHOW_TEST_PANEL', show: true })
  }

  return (
    <div id="sidebar">
      <SidebarHeader onRunTests={handleRunTests} />
      <SearchInput />
      <NoteList
        notes={filteredNotes}
        selectedId={state.selectedId}
        searchQuery={searchQuery}
        onSelect={handleSelectNote}
        onDelete={handleDeleteNote}
      />
      <ThemeToggle />
    </div>
  )
}
