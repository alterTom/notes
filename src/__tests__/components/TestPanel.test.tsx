import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TestPanel } from '../../components/TestPanel/TestPanel'
import type { TestSuite } from '../../lib/test-runner'

describe('TestPanel', () => {
  it('suite 为 null 时不渲染', () => {
    const { container } = render(<TestPanel suite={null} onClose={vi.fn()} />)
    expect(container.innerHTML).toBe('')
  })

  it('全部通过时显示成功态', () => {
    const suite: TestSuite = {
      results: [{ name: 'test 1', pass: true }],
      passed: 1,
      failed: 0,
      total: 1
    }
    render(<TestPanel suite={suite} onClose={vi.fn()} />)
    expect(screen.getByText('全部通过 1/1 通过')).toBeInTheDocument()
  })

  it('有失败时显示失败态', () => {
    const suite: TestSuite = {
      results: [{ name: 'test 1', pass: false, error: 'boom' }],
      passed: 0,
      failed: 1,
      total: 1
    }
    render(<TestPanel suite={suite} onClose={vi.fn()} />)
    expect(screen.getByText('0/1 通过，1 失败')).toBeInTheDocument()
    expect(screen.getByText('boom')).toBeInTheDocument()
  })

  it('点击关闭按钮触发 onClose', () => {
    const onClose = vi.fn()
    const suite: TestSuite = {
      results: [{ name: 'test', pass: true }],
      passed: 1,
      failed: 0,
      total: 1
    }
    render(<TestPanel suite={suite} onClose={onClose} />)
    // Find the close button (the X icon button)
    const closeBtn = screen.getByRole('button')
    closeBtn.click()
    expect(onClose).toHaveBeenCalled()
  })

  it('渲染测试用例编号和名称', () => {
    const suite: TestSuite = {
      results: [
        { name: 'test A', pass: true },
        { name: 'test B', pass: true }
      ],
      passed: 2,
      failed: 0,
      total: 2
    }
    render(<TestPanel suite={suite} onClose={vi.fn()} />)
    expect(screen.getByText('1. test A')).toBeInTheDocument()
    expect(screen.getByText('2. test B')).toBeInTheDocument()
  })
})
