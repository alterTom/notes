import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Editor } from '../../components/Editor/Editor'
import type { Note } from '../../lib/notes'

const mockNote: Note = {
  id: 'test-1',
  title: '测试标题',
  content: '测试内容',
  createdAt: 1000,
  updatedAt: 2000
}

describe('Editor', () => {
  it('渲染标题输入', () => {
    render(
      <Editor note={mockNote} onUpdate={vi.fn()} onDelete={vi.fn()} />
    )
    const titleInput = screen.getByPlaceholderText('无标题') as HTMLInputElement
    expect(titleInput.value).toBe('测试标题')
  })

  it('渲染内容文本区', () => {
    render(
      <Editor note={mockNote} onUpdate={vi.fn()} onDelete={vi.fn()} />
    )
    const textarea = screen.getByPlaceholderText('开始输入...') as HTMLTextAreaElement
    expect(textarea.value).toBe('测试内容')
  })

  it('渲染字数统计', () => {
    render(
      <Editor note={mockNote} onUpdate={vi.fn()} onDelete={vi.fn()} />
    )
    expect(screen.getByText(/字/)).toBeInTheDocument()
  })

  it('渲染删除按钮', () => {
    render(
      <Editor note={mockNote} onUpdate={vi.fn()} onDelete={vi.fn()} />
    )
    expect(screen.getByText('删除笔记')).toBeInTheDocument()
  })

  it('切换笔记时同步内容', () => {
    const { rerender } = render(
      <Editor note={mockNote} onUpdate={vi.fn()} onDelete={vi.fn()} />
    )

    const note2: Note = { ...mockNote, id: 'test-2', title: '第二篇', content: '新内容' }
    rerender(
      <Editor note={note2} onUpdate={vi.fn()} onDelete={vi.fn()} />
    )

    const titleInput = screen.getByPlaceholderText('无标题') as HTMLInputElement
    expect(titleInput.value).toBe('第二篇')
  })
})
