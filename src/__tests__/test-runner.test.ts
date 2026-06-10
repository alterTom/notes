import { describe, it, expect, beforeEach } from 'vitest'
import { test, assert, runAllTests, clearTestCases } from '../lib/test-runner'

describe('test-runner', () => {
  beforeEach(() => {
    clearTestCases()
  })

  it('所有测试通过', () => {
    test('test 1', () => { assert(true) })
    test('test 2', () => { assert(1 === 1) })

    const suite = runAllTests(() => null, () => {})

    expect(suite.passed).toBe(2)
    expect(suite.failed).toBe(0)
    expect(suite.total).toBe(2)
    expect(suite.results).toHaveLength(2)
    expect(suite.results[0].pass).toBe(true)
    expect(suite.results[1].pass).toBe(true)
  })

  it('测试失败捕获错误信息', () => {
    test('failing test', () => { assert(false, '期望失败') })

    const suite = runAllTests(() => null, () => {})

    expect(suite.passed).toBe(0)
    expect(suite.failed).toBe(1)
    expect(suite.results[0].pass).toBe(false)
    expect(suite.results[0].error).toBe('期望失败')
  })

  it('assert 无消息时抛默认错误', () => {
    test('no msg', () => { assert(false) })

    const suite = runAllTests(() => null, () => {})

    expect(suite.results[0].error).toBe('断言失败')
  })

  it('runAllTests 前后状态保存恢复', () => {
    let state = 'before'

    const suite = runAllTests(
      () => state,
      (saved) => { state = saved as string }
    )

    expect(state).toBe('before')
  })
})
