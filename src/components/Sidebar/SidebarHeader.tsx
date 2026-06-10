import { useNotesContext } from '../../store/NotesContext'
import { useNotes } from '../../hooks/useNotes'
import logoUrl from '../../../logo.svg'

interface SidebarHeaderProps {
  onRunTests: () => void
}

export function SidebarHeader({ onRunTests }: SidebarHeaderProps) {
  const { handleNewNote } = useNotes()

  return (
    <div className="sidebar-header">
      <div className="sidebar-brand">
        <img src={logoUrl} alt="Notes" className="sidebar-logo" />
        <h1>笔记</h1>
      </div>
      <div className="header-actions">
        <button
          className="btn btn-primary"
          onClick={handleNewNote}
          title="新建笔记 (Ctrl+N)"
        >
          + 新建
        </button>
        <button
          className="btn btn-icon"
          onClick={onRunTests}
          title="运行测试"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
            <path d="M9 14l2 2 4-4" />
          </svg>
        </button>
      </div>
    </div>
  )
}
