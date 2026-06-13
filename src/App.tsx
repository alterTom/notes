import { useCallback, useState } from 'react'
import { NotesProvider, useNotesContext } from './store/NotesContext'
import { useNotes } from './hooks/useNotes'
import { useKeyboard } from './hooks/useKeyboard'
import { Sidebar } from './components/Sidebar/Sidebar'
import { Editor } from './components/Editor/Editor'
import { TestPanel } from './components/TestPanel/TestPanel'
import type { TestSuite } from './lib/test-runner'

function AppInner() {
  const { state, dispatch } = useNotesContext()
  const { selectedNote, handleNewNote, handleUpdateNote, handleSaveNote, handleDeleteNote } = useNotes()
  const [testSuite, setTestSuite] = useState<TestSuite | null>(null)

  const closeTestPanel = useCallback(() => {
    dispatch({ type: 'SHOW_TEST_PANEL', show: false })
  }, [dispatch])

  useKeyboard(dispatch, handleNewNote, state.showTestPanel, closeTestPanel)

  // Listen for Electron menu actions
  const onMenuAction = useCallback((action: string) => {
    switch (action) {
      case 'new-note':
        handleNewNote()
        break
      case 'toggle-theme':
        // Theme is handled by ThemeToggle component
        break
    }
  }, [handleNewNote])

  // Set up IPC listeners
  if (typeof window !== 'undefined' && (window as any).electronAPI) {
    const api = (window as any).electronAPI
    if (!api._listenersSetup) {
      api._listenersSetup = true
      api.onMenuAction?.(onMenuAction)
    }
  }

  return (
    <div id="app">
      <Sidebar onTestResults={setTestSuite} />
      <div id="main">
        {selectedNote ? (
          <Editor
            note={selectedNote}
            onUpdate={handleUpdateNote}
            onSave={handleSaveNote}
            onDelete={handleDeleteNote}
          />
        ) : (
          <div className="empty-editor">
            <span>选择左侧笔记开始编辑，或点击「+ 新建」创建笔记</span>
          </div>
        )}
      </div>
      {state.showTestPanel && (
        <TestPanel suite={testSuite} onClose={closeTestPanel} />
      )}
    </div>
  )
}

export default function App() {
  return (
    <NotesProvider>
      <AppInner />
    </NotesProvider>
  )
}
