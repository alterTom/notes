import { useState, useEffect, useCallback, useRef } from 'react'
import type { Note } from '../../lib/notes'
import { TitleInput } from './TitleInput'
import { ContentArea } from './ContentArea'
import { StatusBar } from './StatusBar'

type EditorMode = 'edit' | 'preview'

interface EditorProps {
  note: Note
  onUpdate: (id: string, updates: { title?: string; content?: string }) => void
  onDelete: (id: string) => void
}

export function Editor({ note, onUpdate, onDelete }: EditorProps) {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [mode, setMode] = useState<EditorMode>('edit')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastSavedRef = useRef({ title: note.title, content: note.content })

  // Sync when switching notes
  useEffect(() => {
    setTitle(note.title)
    setContent(note.content)
    lastSavedRef.current = { title: note.title, content: note.content }
  }, [note.id])

  // Flush pending save on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const scheduleSave = useCallback((newTitle: string, newContent: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const prev = lastSavedRef.current
      if (prev.title !== newTitle || prev.content !== newContent) {
        onUpdate(note.id, { title: newTitle, content: newContent })
        lastSavedRef.current = { title: newTitle, content: newContent }
      }
    }, 500)
  }, [note.id, onUpdate])

  const handleTitleChange = (value: string) => {
    setTitle(value)
    scheduleSave(value, content)
  }

  const handleContentChange = (value: string) => {
    setContent(value)
    scheduleSave(title, value)
  }

  const handleDelete = () => {
    const label = note.title ? `「${note.title}」` : '这条笔记'
    if (confirm(`确定要删除${label}吗？此操作不可撤销。`)) {
      onDelete(note.id)
    }
  }

  const wordCount = content.trim().length

  return (
    <div id="editor-container" className="visible">
      <div className="editor-header">
        <TitleInput value={title} onChange={handleTitleChange} />
        <div className="mode-toggle">
          <button
            className={`mode-btn ${mode === 'edit' ? 'active' : ''}`}
            onClick={() => setMode('edit')}
            title="编辑模式"
          >
            编辑
          </button>
          <button
            className={`mode-btn ${mode === 'preview' ? 'active' : ''}`}
            onClick={() => setMode('preview')}
            title="预览模式"
          >
            预览
          </button>
        </div>
      </div>
      <ContentArea value={content} onChange={handleContentChange} mode={mode} />
      <StatusBar
        updatedAt={note.updatedAt}
        contentLength={wordCount}
        onDelete={handleDelete}
      />
    </div>
  )
}
