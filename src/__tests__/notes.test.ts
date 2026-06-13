import { describe, it, expect, beforeEach } from 'vitest'
import {
  createNote,
  updateNote,
  deleteNote,
  findNote,
  getFilteredNotes,
  sortNotes,
  type Note
} from '../lib/notes'
import {
  STORAGE_KEY,
  loadNotes,
  loadNotesFromDatabase,
  saveNotes,
  saveNotesToDatabase
} from '../lib/storage'

describe('笔记核心逻辑（17 个原有用例）', () => {
  let notes: Note[]
  let searchQuery: string

  function wrapCreate(title?: string, content?: string): Note {
    const note = createNote(title, content)
    notes.unshift(note)
    return note
  }

  function wrapUpdate(id: string, updates: Partial<Pick<Note, 'title' | 'content'>>): Note | null {
    return updateNote(notes, id, updates)
  }

  function wrapDelete(id: string): boolean {
    const result = deleteNote(notes, id)
    saveNotes(notes)
    return result
  }

  function wrapFiltered(): Note[] {
    return getFilteredNotes(notes, searchQuery)
  }

  beforeEach(() => {
    notes = []
    searchQuery = ''
  })

  it('1. 创建笔记：返回正确的笔记对象结构', () => {
    const note = createNote()
    expect(note.id).toBeTruthy()
    expect(typeof note.title).toBe('string')
    expect(typeof note.content).toBe('string')
    expect(typeof note.createdAt).toBe('number')
    expect(note.createdAt).toBeGreaterThan(0)
    expect(note.updatedAt).toBe(note.createdAt)
  })

  it('2. 创建笔记：笔记保存到 notes 数组', () => {
    const note = wrapCreate('测试标题', '测试内容')
    expect(notes).toHaveLength(1)
    expect(notes[0].title).toBe('测试标题')
    expect(notes[0].content).toBe('测试内容')
  })

  it('3. 持久化：笔记写入 localStorage', () => {
    wrapCreate('持久化测试')
    saveNotes(notes)
    const raw = localStorage.getItem(STORAGE_KEY)
    expect(raw).not.toBeNull()
    const parsed: Note[] = JSON.parse(raw!)
    expect(parsed).toHaveLength(1)
    expect(parsed[0].title).toBe('持久化测试')
  })

  it('4. 加载：从 localStorage 正确加载笔记', () => {
    const testNote = [{
      id: 'load_test_1',
      title: '加载测试',
      content: '内容体',
      createdAt: 1000,
      updatedAt: 2000
    }]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testNote))
    const loaded = loadNotes()
    expect(loaded).toHaveLength(1)
    expect(loaded[0].id).toBe('load_test_1')
    expect(loaded[0].title).toBe('加载测试')
  })

  it('4.1 数据库不可用时：读取返回 null', async () => {
    const originalAPI = window.electronAPI
    window.electronAPI = undefined

    await expect(loadNotesFromDatabase()).resolves.toBeNull()

    window.electronAPI = originalAPI
  })

  it('4.2 数据库不可用时：保存返回 false', async () => {
    const originalAPI = window.electronAPI
    window.electronAPI = undefined

    await expect(saveNotesToDatabase([])).resolves.toBe(false)

    window.electronAPI = originalAPI
  })

  it('5. 更新笔记：修改标题和内容', () => {
    const note = wrapCreate('旧标题', '旧内容')
    const result = wrapUpdate(note.id, { title: '新标题', content: '新内容' })
    expect(result).not.toBeNull()
    const updated = findNote(notes, note.id)
    expect(updated!.title).toBe('新标题')
    expect(updated!.content).toBe('新内容')
  })

  it('6. 更新笔记：updatedAt 时间戳应更新', async () => {
    const note = wrapCreate('时间测试')
    const oldTs = note.updatedAt
    await new Promise(r => setTimeout(r, 5))
    const updated = wrapUpdate(note.id, { title: '改' })
    expect(updated!.updatedAt).toBeGreaterThan(oldTs)
  })

  it('7. 更新不存在的笔记：应返回 null', () => {
    const result = wrapUpdate('non_existent_id', { title: 'x' })
    expect(result).toBeNull()
  })

  it('8. 删除笔记：从 notes 数组移除', () => {
    const note = wrapCreate()
    expect(notes).toHaveLength(1)
    const result = wrapDelete(note.id)
    expect(result).toBe(true)
    expect(notes).toHaveLength(0)
  })

  it('9. 删除笔记：从 localStorage 移除', () => {
    const note = wrapCreate('删我')
    saveNotes(notes)
    wrapDelete(note.id)
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed: Note[] = JSON.parse(raw!)
    expect(parsed).toHaveLength(0)
  })

  it('10. 删除不存在的笔记：应返回 false', () => {
    wrapCreate()
    const result = wrapDelete('non_existent_id')
    expect(result).toBe(false)
    expect(notes).toHaveLength(1)
  })

  it('11. 排序：笔记按 updatedAt 降序排列', () => {
    const n1 = createNote('第一')
    const n2 = createNote('第二')
    n1.updatedAt = 1000
    n2.updatedAt = 3000
    const sorted = sortNotes([n1, n2])
    expect(sorted[0].id).toBe(n2.id)
  })

  it('12. 搜索：按标题匹配', () => {
    wrapCreate('项目计划', '')
    wrapCreate('会议纪要', '')
    searchQuery = '项目'
    const filtered = wrapFiltered()
    expect(filtered).toHaveLength(1)
    expect(filtered[0].title).toBe('项目计划')
  })

  it('13. 搜索：按内容匹配', () => {
    wrapCreate('笔记A', '这是一个关于预算的内容')
    wrapCreate('笔记B', '这是另一个话题')
    searchQuery = '预算'
    const filtered = wrapFiltered()
    expect(filtered).toHaveLength(1)
  })

  it('14. 搜索：空查询返回所有笔记', () => {
    wrapCreate()
    wrapCreate()
    wrapCreate()
    searchQuery = ''
    const filtered = wrapFiltered()
    expect(filtered).toHaveLength(3)
  })

  it('15. 搜索：无匹配时返回空数组', () => {
    wrapCreate('测试')
    searchQuery = 'zzzzNoMatchString999'
    const filtered = wrapFiltered()
    expect(filtered).toHaveLength(0)
  })

  it('16. 搜索：不区分大小写', () => {
    wrapCreate('Hello World')
    searchQuery = 'hello'
    const filtered = wrapFiltered()
    expect(filtered).toHaveLength(1)
  })

  it('17. 笔记 ID 唯一性：批量创建不重复', () => {
    const ids = new Set<string>()
    for (let i = 0; i < 30; i++) {
      const note = wrapCreate()
      expect(ids.has(note.id)).toBe(false)
      ids.add(note.id)
    }
  })
})
