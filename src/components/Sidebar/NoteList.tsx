import type { Note } from '../../lib/notes'
import { NoteItem } from './NoteItem'

interface NoteListProps {
  notes: Note[]
  selectedId: string | null
  searchQuery: string
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}

export function NoteList({ notes, selectedId, searchQuery, onSelect, onDelete }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <div id="note-list">
        <div className="empty-list">
          {searchQuery ? '无匹配结果' : '暂无笔记<br />点击「+ 新建」开始'}
        </div>
      </div>
    )
  }

  return (
    <div id="note-list">
      {notes.map(note => (
        <NoteItem
          key={note.id}
          note={note}
          active={note.id === selectedId}
          onSelect={onSelect}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
