import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  const originalElectronAPI = window.electronAPI

  afterEach(() => {
    window.electronAPI = originalElectronAPI
  })

  it('桌面端 electronAPI 对象被冻结时仍能渲染主界面', async () => {
    window.electronAPI = Object.freeze({
      onMenuAction: vi.fn(() => vi.fn()),
      exportNote: vi.fn(),
      loadNotes: vi.fn(async () => ({ success: true as const, notes: [] })),
      saveNotes: vi.fn(async () => ({ success: true })),
      saveNote: vi.fn(async () => ({ success: true }))
    })

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('笔记')).toBeInTheDocument()
    })
    expect(screen.getByText('+ 新建')).toBeInTheDocument()
    expect(screen.getByText(/选择左侧笔记开始编辑/)).toBeInTheDocument()
  })
})
