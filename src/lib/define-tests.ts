// Define all 17 test cases — ported verbatim from the original app.
// These run both in-app (via TestPanel) and in Vitest.

import {
  createNote,
  updateNote,
  deleteNote,
  findNote,
  getFilteredNotes,
  sortNotes,
  type Note
} from './notes'
import { STORAGE_KEY, saveNotes, loadNotes } from './storage'
import { test, assert, clearTestCases } from './test-runner'

export function defineAllTests(): void {
  clearTestCases()

  // State that tests mutate
  let notes: Note[] = []
  let searchQuery = ''

  // Helpers
  function setNotes(n: Note[]) { notes = n }
  function getNotes() { return notes }
  function setSearchQuery(q: string) { searchQuery = q }
  function getSearchQuery() { return searchQuery }

  function wrapCreate(title?: string, content?: string): Note {
    const note = createNote(title, content)
    notes.unshift(note)
    return note
  }

  function wrapUpdate(id: string, updates: Partial<Pick<Note, 'title' | 'content'>>): Note | null {
    return updateNote(notes, id, updates)
  }

  function wrapDelete(id: string): boolean {
    return deleteNote(notes, id)
  }

  function wrapFiltered(): Note[] {
    return getFilteredNotes(notes, searchQuery)
  }

  // 1. 创建笔记：返回正确的笔记对象结构
  test('创建笔记：返回正确的笔记对象结构', () => {
    notes = []
    const note = createNote()
    assert(!!note.id, '笔记应有 id')
    assert(typeof note.title === 'string', 'title 应为字符串')
    assert(typeof note.content === 'string', 'content 应为字符串')
    assert(typeof note.createdAt === 'number' && note.createdAt > 0, 'createdAt 应为时间戳')
    assert(note.updatedAt === note.createdAt, '新建时 updatedAt 应等于 createdAt')
  })

  // 2. 创建笔记：笔记保存到 notes 数组
  test('创建笔记：笔记保存到 notes 数组', () => {
    notes = []
    const note = wrapCreate('测试标题', '测试内容')
    assert(notes.length === 1, 'notes 数组应有 1 条笔记')
    assert(notes[0].title === '测试标题', '标题应匹配')
    assert(notes[0].content === '测试内容', '内容应匹配')
  })

  // 3. 持久化：笔记写入 localStorage
  test('持久化：笔记写入 localStorage', () => {
    notes = []
    const note = wrapCreate('持久化测试')
    saveNotes(notes)
    const raw = localStorage.getItem(STORAGE_KEY)
    assert(raw !== null, 'localStorage 中应有数据')
    const parsed: Note[] = JSON.parse(raw!)
    assert(parsed.length === 1, '应有一条笔记')
    assert(parsed[0].title === '持久化测试', '标题应匹配')
  })

  // 4. 加载：从 localStorage 正确加载笔记
  test('加载：从 localStorage 正确加载笔记', () => {
    const testNote = [{
      id: 'load_test_1',
      title: '加载测试',
      content: '内容体',
      createdAt: 1000,
      updatedAt: 2000
    }]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testNote))
    const loaded = loadNotes()
    assert(loaded.length === 1, '应加载 1 条笔记')
    assert(loaded[0].id === 'load_test_1', 'ID 应匹配')
    assert(loaded[0].title === '加载测试', '标题应匹配')
  })

  // 5. 更新笔记：修改标题和内容
  test('更新笔记：修改标题和内容', () => {
    notes = []
    const note = wrapCreate('旧标题', '旧内容')
    const result = wrapUpdate(note.id, { title: '新标题', content: '新内容' })
    assert(result !== null, 'updateNote 应返回笔记对象')
    const updated = findNote(notes, note.id)
    assert(updated!.title === '新标题', '标题应更新为新标题')
    assert(updated!.content === '新内容', '内容应更新为新内容')
  })

  // 6. 更新笔记：updatedAt 时间戳应更新
  test('更新笔记：updatedAt 时间戳应更新', () => {
    notes = []
    const note = wrapCreate('时间测试')
    const oldTs = note.updatedAt
    const start = Date.now()
    // Wait at least 1ms
    while (Date.now() === start) { /* busy */ }
    const updated = wrapUpdate(note.id, { title: '改' })
    assert(updated!.updatedAt > oldTs, 'updatedAt 应大于旧值')
  })

  // 7. 更新不存在的笔记：应返回 null
  test('更新不存在的笔记：应返回 null', () => {
    notes = []
    const result = wrapUpdate('non_existent_id', { title: 'x' })
    assert(result === null, '不存在的笔记更新应返回 null')
  })

  // 8. 删除笔记：从 notes 数组移除
  test('删除笔记：从 notes 数组移除', () => {
    notes = []
    const note = wrapCreate()
    assert(notes.length === 1, '删除前应有 1 条')
    const result = wrapDelete(note.id)
    assert(result === true, 'deleteNote 应返回 true')
    assert(notes.length === 0, '删除后应为 0 条')
  })

  // 9. 删除笔记：从 localStorage 移除
  test('删除笔记：从 localStorage 移除', () => {
    notes = []
    const note = wrapCreate('删我')
    saveNotes(notes)
    wrapDelete(note.id)
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed: Note[] = JSON.parse(raw!)
    assert(parsed.length === 0, 'localStorage 中应无笔记')
  })

  // 10. 删除不存在的笔记：应返回 false
  test('删除不存在的笔记：应返回 false', () => {
    notes = []
    wrapCreate()
    const result = wrapDelete('non_existent_id')
    assert(result === false, '删除不存在的笔记应返回 false')
    assert(notes.length === 1, '笔记数量不应变化')
  })

  // 11. 排序：笔记按 updatedAt 降序排列
  test('排序：笔记按 updatedAt 降序排列', () => {
    const n1 = createNote('第一')
    const n2 = createNote('第二')
    n1.updatedAt = 1000
    n2.updatedAt = 3000
    const sorted = sortNotes([n1, n2])
    assert(sorted[0].id === n2.id, '最近更新的笔记应在最前')
  })

  // 12. 搜索：按标题匹配
  test('搜索：按标题匹配', () => {
    notes = []
    wrapCreate('项目计划', '')
    wrapCreate('会议纪要', '')
    searchQuery = '项目'
    const filtered = wrapFiltered()
    assert(filtered.length === 1, '应匹配到 1 条')
    assert(filtered[0].title === '项目计划', '应为项目计划')
    searchQuery = ''
  })

  // 13. 搜索：按内容匹配
  test('搜索：按内容匹配', () => {
    notes = []
    wrapCreate('笔记A', '这是一个关于预算的内容')
    wrapCreate('笔记B', '这是另一个话题')
    searchQuery = '预算'
    const filtered = wrapFiltered()
    assert(filtered.length === 1, '应匹配到 1 条')
    searchQuery = ''
  })

  // 14. 搜索：空查询返回所有笔记
  test('搜索：空查询返回所有笔记', () => {
    notes = []
    wrapCreate()
    wrapCreate()
    wrapCreate()
    searchQuery = ''
    const filtered = wrapFiltered()
    assert(filtered.length === 3, '应返回全部 3 条')
  })

  // 15. 搜索：无匹配时返回空数组
  test('搜索：无匹配时返回空数组', () => {
    notes = []
    wrapCreate('测试')
    searchQuery = 'zzzzNoMatchString999'
    const filtered = wrapFiltered()
    assert(filtered.length === 0, '应返回空数组')
    searchQuery = ''
  })

  // 16. 搜索：不区分大小写
  test('搜索：不区分大小写', () => {
    notes = []
    wrapCreate('Hello World')
    searchQuery = 'hello'
    const filtered = wrapFiltered()
    assert(filtered.length === 1, '小写搜索应匹配')
    searchQuery = ''
  })

  // 17. 笔记 ID 唯一性：批量创建不重复
  test('笔记 ID 唯一性：批量创建不重复', () => {
    notes = []
    const ids = new Set<string>()
    for (let i = 0; i < 30; i++) {
      const note = wrapCreate()
      assert(!ids.has(note.id), `ID 不应重复: ${note.id}`)
      ids.add(note.id)
    }
  })
}
