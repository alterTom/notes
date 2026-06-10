import { formatRelativeTime, trimTo, esc } from '../../lib/formatters'
import type { Note } from '../../lib/notes'

interface NoteItemProps {
  note: Note
  active: boolean
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}

export function NoteItem({ note, active, onSelect, onDelete }: NoteItemProps) {
  const className = `note-item${active ? ' active' : ''}`

  return (
    <div className={className} onClick={() => onSelect(note.id)}>
      <div className="note-item-row">
        <span className="note-item-title">
          {note.title || '无标题'}
        </span>
        <button
          className="note-item-del"
          title="删除"
          onClick={e => {
            e.stopPropagation()
            const label = note.title ? `「${note.title}」` : '这条笔记'
            if (confirm(`确定要删除${label}吗？`)) {
              onDelete(note.id)
            }
          }}
        >
          ×
        </button>
      </div>
      <div className="note-item-preview">
        {trimTo(note.content, 60) || '空白笔记'}
      </div>
      <div className="note-item-time">
        {formatRelativeTime(note.updatedAt)}
      </div>
    </div>
  )
}
