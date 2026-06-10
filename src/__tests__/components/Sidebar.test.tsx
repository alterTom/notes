import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NotesProvider } from '../../store/NotesContext'
import { Sidebar } from '../../components/Sidebar/Sidebar'

describe('Sidebar', () => {
  it('渲染侧边栏标题', () => {
    render(
      <NotesProvider>
        <Sidebar onTestResults={vi.fn()} />
      </NotesProvider>
    )
    expect(screen.getByText('笔记')).toBeInTheDocument()
  })

  it('渲染新建按钮', () => {
    render(
      <NotesProvider>
        <Sidebar onTestResults={vi.fn()} />
      </NotesProvider>
    )
    expect(screen.getByText('+ 新建')).toBeInTheDocument()
  })

  it('渲染搜索框', () => {
    render(
      <NotesProvider>
        <Sidebar onTestResults={vi.fn()} />
      </NotesProvider>
    )
    expect(screen.getByPlaceholderText('搜索笔记...')).toBeInTheDocument()
  })

  it('渲染空状态提示', () => {
    render(
      <NotesProvider>
        <Sidebar onTestResults={vi.fn()} />
      </NotesProvider>
    )
    expect(screen.getByText(/点击/)).toBeInTheDocument()
  })

  it('渲染运行测试按钮', () => {
    render(
      <NotesProvider>
        <Sidebar onTestResults={vi.fn()} />
      </NotesProvider>
    )
    expect(screen.getByTitle('运行测试')).toBeInTheDocument()
  })
})
