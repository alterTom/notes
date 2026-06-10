import { describe, it, expect } from 'vitest'
import { trimTo, formatRelativeTime } from '../lib/formatters'

describe('formatters', () => {
  describe('trimTo', () => {
    it('短文本不截断', () => {
      expect(trimTo('hello', 10)).toBe('hello')
    })

    it('长文本截断带省略号', () => {
      expect(trimTo('hello world this is long', 10)).toBe('hello worl...')
    })

    it('空字符串返回空', () => {
      expect(trimTo('', 10)).toBe('')
    })

    it('null/undefined 返回空', () => {
      expect(trimTo(null, 10)).toBe('')
      expect(trimTo(undefined, 10)).toBe('')
    })

    it('合并空白符', () => {
      expect(trimTo('a   b\tc', 10)).toBe('a b c')
    })
  })

  describe('formatRelativeTime', () => {
    it('刚刚', () => {
      expect(formatRelativeTime(Date.now())).toBe('刚刚')
    })

    it('分钟前', () => {
      expect(formatRelativeTime(Date.now() - 5 * 60000)).toBe('5 分钟前')
    })

    it('小时前', () => {
      expect(formatRelativeTime(Date.now() - 3 * 3600000)).toBe('3 小时前')
    })

    it('天前', () => {
      expect(formatRelativeTime(Date.now() - 2 * 86400000)).toBe('2 天前')
    })

    it('日期格式（超过7天）', () => {
      const ts = Date.now() - 8 * 86400000
      const result = formatRelativeTime(ts)
      expect(result).not.toBe('刚刚')
      expect(result).not.toContain('分钟前')
      expect(result).not.toContain('小时前')
      expect(result).not.toContain('天前')
    })
  })
})
