import { createRequire } from 'node:module'
import fs from 'node:fs'
import path from 'node:path'

const require = createRequire(import.meta.url)
const pptxgen = require('pptxgenjs')

const rootDir = path.resolve(import.meta.dirname, '..', '..')
const outputDir = path.join(import.meta.dirname, 'output')
const outputPath = path.join(outputDir, 'notes-product-design-architecture.pptx')
const screenshotLight = path.join(rootDir, 'screenshot1.jpg')
const screenshotDark = path.join(rootDir, 'screenshot2.jpg')

const pptx = new pptxgen()
pptx.author = 'Codex'
pptx.company = 'Notes'
pptx.subject = '笔记软件产品设计与技术架构'
pptx.title = '笔记：产品设计与技术架构'
pptx.lang = 'zh-CN'
pptx.layout = 'LAYOUT_WIDE'
pptx.theme = {
  headFontFace: 'Microsoft YaHei',
  bodyFontFace: 'Microsoft YaHei',
  lang: 'zh-CN'
}

const W = 13.333
const H = 7.5
const C = {
  bg: 'FEF9E7',
  surface: 'FFFDF7',
  surface2: 'FDF0D5',
  border: 'F0E8D0',
  ink: '1A1C1E',
  body: '38342B',
  muted: '6B6558',
  faint: 'A09880',
  accent: 'C8960C',
  accentDark: 'A67C00',
  dark: '12121A',
  dark2: '1A1A2A',
  dark3: '242438',
  blue: '2563EB',
  red: 'D93025',
  green: '188038',
  white: 'FFFFFF'
}

function addBg(slide, fill = C.bg) {
  slide.background = { color: fill }
}

function addFooter(slide, num, dark = false) {
  const color = dark ? '77778A' : C.faint
  slide.addText('笔记 · Product Design & Technical Architecture', {
    x: 0.55, y: 7.08, w: 4.5, h: 0.18,
    fontFace: 'Microsoft YaHei', fontSize: 8.5, color
  })
  slide.addText(String(num).padStart(2, '0'), {
    x: 12.35, y: 7.08, w: 0.45, h: 0.18,
    fontFace: 'Aptos', fontSize: 8.5, color, align: 'right'
  })
}

function addKicker(slide, text, dark = false) {
  slide.addText(text, {
    x: 0.65, y: 0.48, w: 4.5, h: 0.2,
    fontFace: 'Aptos', fontSize: 9, bold: true,
    color: dark ? 'E2B328' : C.accent,
    charSpace: 1.8
  })
}

function addTitle(slide, text, dark = false, y = 0.77, w = 10.8) {
  slide.addText(text, {
    x: 0.62, y, w, h: 0.72,
    fontFace: 'Microsoft YaHei', fontSize: 25, bold: true,
    color: dark ? C.white : C.ink,
    fit: 'shrink', breakLine: false
  })
}

function addSubtitle(slide, text, x, y, w, dark = false) {
  slide.addText(text, {
    x, y, w, h: 0.56,
    fontFace: 'Microsoft YaHei', fontSize: 12.3,
    color: dark ? 'C7C7D4' : C.muted,
    fit: 'shrink',
    breakLine: false
  })
}

function roundRect(slide, x, y, w, h, fill, line = fill, radius = 0.08) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h,
    rectRadius: radius,
    fill: { color: fill },
    line: { color: line, width: 0.8 }
  })
}

function label(slide, text, x, y, w, h, opts = {}) {
  slide.addText(text, {
    x, y, w, h,
    fontFace: opts.fontFace || 'Microsoft YaHei',
    fontSize: opts.size || 11,
    bold: opts.bold || false,
    color: opts.color || C.body,
    align: opts.align || 'left',
    valign: opts.valign || 'mid',
    fit: 'shrink',
    breakLine: false,
    margin: opts.margin ?? 0.04
  })
}

function chip(slide, text, x, y, w, fill = C.surface2, color = C.body) {
  roundRect(slide, x, y, w, 0.34, fill, fill, 0.06)
  label(slide, text, x, y + 0.01, w, 0.3, {
    size: 9.5, bold: true, color, align: 'center'
  })
}

function bullet(slide, title, desc, x, y, color = C.accent) {
  slide.addShape(pptx.ShapeType.ellipse, {
    x, y: y + 0.08, w: 0.09, h: 0.09,
    fill: { color }, line: { color }
  })
  label(slide, title, x + 0.18, y, 3.1, 0.22, { size: 11.5, bold: true, color: C.ink })
  label(slide, desc, x + 0.18, y + 0.25, 3.25, 0.32, { size: 9.3, color: C.muted })
}

function addScreenshot(slide, filePath, x, y, w, h) {
  roundRect(slide, x, y, w, h, C.white, C.border, 0.05)
  slide.addImage({ path: filePath, x: x + 0.04, y: y + 0.04, w: w - 0.08, h: h - 0.08 })
}

function arrow(slide, x, y, w = 0.45, dark = false) {
  label(slide, '→', x, y, w, 0.32, {
    fontFace: 'Aptos', size: 17, bold: true, color: dark ? '77778A' : C.faint, align: 'center'
  })
}

// 01 Cover
{
  const s = pptx.addSlide()
  addBg(s, C.dark)
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color: C.dark }, line: { color: C.dark } })
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 5.95, w: W, h: 1.55, fill: { color: C.dark2, transparency: 18 }, line: { color: C.dark2, transparency: 100 } })
  label(s, '笔记', 0.82, 1.08, 2.8, 0.72, { size: 34, bold: true, color: C.white })
  label(s, '产品设计与技术架构', 0.82, 1.86, 4.5, 0.36, { size: 16, color: 'E2B328', bold: true })
  addSubtitle(s, '一个以“轻量、专注、本地优先”为核心的 Electron 桌面 Markdown 笔记客户端。', 0.82, 2.42, 5.1, true)
  chip(s, 'Electron', 0.82, 3.32, 1.15, C.dark3, 'D8D8E0')
  chip(s, 'React 18', 2.08, 3.32, 1.18, C.dark3, 'D8D8E0')
  chip(s, 'TypeScript', 3.38, 3.32, 1.42, C.dark3, 'D8D8E0')
  chip(s, 'Markdown', 4.92, 3.32, 1.35, C.dark3, 'D8D8E0')
  addScreenshot(s, screenshotDark, 6.55, 0.78, 6.25, 4.9)
  label(s, 'v1.0.0 / 2026-06-13', 0.82, 6.55, 2.6, 0.22, { size: 9, color: '77778A' })
  addFooter(s, 1, true)
}

// 02 Product Positioning
{
  const s = pptx.addSlide()
  addBg(s)
  addKicker(s, 'PRODUCT STRATEGY')
  addTitle(s, '产品定位：把日常记录压缩到最少路径。')
  addSubtitle(s, '笔记不是知识库巨舰，而是启动快、可离线、进入即写的桌面记录工具。', 0.65, 1.52, 7.4)

  const cards = [
    ['目标用户', '需要快速记录想法、会议纪要、代码片段和待办的人。'],
    ['核心价值', '以本地优先的方式保存文本资产，降低“写之前先整理”的摩擦。'],
    ['设计原则', '清晰层级、低打扰、键盘友好、编辑与预览随时切换。']
  ]
  cards.forEach(([t, d], i) => {
    const y = 2.35 + i * 1.05
    roundRect(s, 0.72, y, 5.15, 0.72, i === 1 ? C.surface2 : C.surface, C.border, 0.06)
    label(s, t, 0.96, y + 0.12, 1.2, 0.2, { size: 11.2, bold: true, color: C.accentDark })
    label(s, d, 2.15, y + 0.1, 3.45, 0.34, { size: 10.2, color: C.body })
  })

  roundRect(s, 6.45, 1.85, 5.95, 3.75, C.surface, C.border, 0.08)
  label(s, '核心信息架构', 6.75, 2.12, 2, 0.25, { size: 12.5, bold: true, color: C.ink })
  const flows = [
    ['搜索/选择', '定位已有内容'],
    ['新建/编辑', '快速捕捉信息'],
    ['预览/阅读', '校验结构与排版'],
    ['删除/导出', '管理生命周期']
  ]
  flows.forEach(([a, b], i) => {
    const x = 6.82 + (i % 2) * 2.55
    const y = 2.65 + Math.floor(i / 2) * 1.1
    roundRect(s, x, y, 2.15, 0.58, i % 2 ? C.surface2 : C.bg, C.border, 0.04)
    label(s, a, x, y + 0.08, 2.15, 0.2, { size: 11, bold: true, align: 'center', color: C.ink })
    label(s, b, x, y + 0.31, 2.15, 0.15, { size: 8.8, align: 'center', color: C.muted })
  })
  arrow(s, 8.98, 2.78)
  arrow(s, 8.98, 3.88)
  label(s, '设计判断：只在主界面保留高频动作，让工作流围绕“找到笔记 → 写下内容 → 随时预览”展开。', 6.75, 5.05, 5.25, 0.35, { size: 9.6, color: C.muted })
  addFooter(s, 2)
}

// 03 UX Surface
{
  const s = pptx.addSlide()
  addBg(s)
  addKicker(s, 'PRODUCT DESIGN')
  addTitle(s, '双栏界面：导航和编辑分离，主任务始终在中央。')
  addScreenshot(s, screenshotLight, 0.62, 1.55, 7.4, 4.5)
  const callouts = [
    ['侧边栏', '搜索、列表、新建、主题切换聚合在左侧。'],
    ['编辑器', '标题、正文、编辑/预览模式集中在右侧。'],
    ['状态栏', '最后修改时间、字数、删除入口固定在底部。'],
    ['低学习成本', '桌面软件常见布局，打开即可理解。']
  ]
  callouts.forEach(([t, d], i) => bullet(s, t, d, 8.65, 1.8 + i * 0.88, i === 2 ? C.red : C.accent))
  roundRect(s, 8.48, 5.62, 3.95, 0.68, C.surface2, C.border, 0.06)
  label(s, '交互节奏', 8.7, 5.75, 1.0, 0.2, { size: 10.3, bold: true, color: C.accentDark })
  label(s, '左侧负责上下文，右侧负责深度输入，减少视线跳转。', 9.55, 5.73, 2.6, 0.24, { size: 9.2, color: C.body })
  addFooter(s, 3)
}

// 04 Visual System
{
  const s = pptx.addSlide()
  addBg(s)
  addKicker(s, 'VISUAL SYSTEM')
  addTitle(s, '明暗双主题基于 CSS 变量，视觉系统轻而可控。')
  addScreenshot(s, screenshotLight, 0.68, 1.55, 5.45, 3.3)
  addScreenshot(s, screenshotDark, 6.82, 1.55, 5.45, 3.3)
  label(s, 'Light：暖底色适合长时间写作', 1.02, 5.02, 3.5, 0.2, { size: 10.5, bold: true, color: C.ink })
  label(s, 'Dark：低亮度界面服务夜间记录', 7.15, 5.02, 3.55, 0.2, { size: 10.5, bold: true, color: C.ink })
  const tokens = [
    ['--bg', 'FEF9E7'], ['--surface', 'FFFDF7'], ['--accent', 'C8960C'],
    ['--dark-bg', '12121A'], ['--dark-surface', '1A1A2A'], ['--danger', 'D93025']
  ]
  tokens.forEach(([name, color], i) => {
    const x = 0.85 + i * 1.95
    slideSwatch(s, x, 6.0, color, name)
  })
  addFooter(s, 4)
}

function slideSwatch(slide, x, y, color, name) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w: 0.34, h: 0.24,
    rectRadius: 0.03,
    fill: { color },
    line: { color: C.border, width: 0.5 }
  })
  label(slide, name, x + 0.42, y - 0.01, 1.2, 0.16, { size: 7.8, color: C.muted, fontFace: 'Aptos' })
  label(slide, `#${color}`, x + 0.42, y + 0.15, 1.2, 0.14, { size: 7.5, color: C.faint, fontFace: 'Aptos' })
}

// 05 Editing Experience
{
  const s = pptx.addSlide()
  addBg(s)
  addKicker(s, 'EDITING EXPERIENCE')
  addTitle(s, '编辑/预览双模式：写作时即时反馈，阅读时回到排版结果。')
  roundRect(s, 0.72, 1.62, 7.0, 4.7, C.surface, C.border, 0.08)
  label(s, '会议纪要：产品评审', 1.02, 1.9, 3.8, 0.35, { size: 17, bold: true, color: C.ink })
  chip(s, '编辑', 6.05, 1.92, 0.72, C.accent, C.white)
  chip(s, '预览', 6.83, 1.92, 0.72, C.surface2, C.muted)
  label(s,
    '# 今日重点\n\n- 明确 MVP：本地笔记 + 搜索 + 主题\n- 技术栈：`Electron` + `React`\n- 下一步：补齐导入事件处理\n\n> 原则：快速记录优先，结构化之后再发生。',
    1.05, 2.65, 6.35, 2.55,
    { size: 13, color: C.body, fontFace: 'Microsoft YaHei' }
  )
  label(s, '最后修改：刚刚', 1.05, 5.82, 2.0, 0.16, { size: 8.5, color: C.faint })
  label(s, '82 字', 6.05, 5.82, 0.8, 0.16, { size: 8.5, color: C.faint, align: 'right' })
  label(s, '删除笔记', 6.87, 5.82, 0.65, 0.16, { size: 8.5, color: C.red, bold: true })

  const features = [
    ['500ms 延迟保存', '输入过程中减少频繁状态写入，停止输入后同步到全局状态。'],
    ['Markdown 高亮', '编辑模式用 overlay 高亮语法，textarea 保留原生输入体验。'],
    ['Markdown 预览', '预览模式通过 renderMarkdown 输出结构化 HTML。'],
    ['字数与时间反馈', 'StatusBar 提供轻量上下文，不打断写作。']
  ]
  features.forEach(([t, d], i) => bullet(s, t, d, 8.32, 1.82 + i * 0.92, i === 0 ? C.green : C.accent))
  addFooter(s, 5)
}

// 06 Architecture Overview
{
  const s = pptx.addSlide()
  addBg(s)
  addKicker(s, 'TECHNICAL ARCHITECTURE')
  addTitle(s, '架构分层：Electron 外壳、React 渲染层、领域纯函数三段式。')
  const layers = [
    ['Electron Main', '窗口生命周期 · 原生菜单 · 文件对话框 · IPC handler', C.dark, C.white],
    ['Preload Bridge', 'contextBridge 暴露受控 API：onMenuAction / exportNote', C.accent, C.white],
    ['React Renderer', 'Sidebar · Editor · TestPanel · Context/Reducer', C.blue, C.white],
    ['Domain Libraries', 'notes.ts · markdown.ts · formatters.ts · storage.ts', C.green, C.white],
    ['Browser Storage', 'localStorage 保存笔记数组与主题偏好', C.surface2, C.body]
  ]
  layers.forEach(([t, d, fill, text], i) => {
    const y = 1.62 + i * 0.92
    roundRect(s, 1.0, y, 10.95, 0.56, fill, fill, 0.05)
    label(s, t, 1.3, y + 0.09, 2.2, 0.2, { size: 11.2, bold: true, color: text })
    label(s, d, 3.45, y + 0.09, 8.1, 0.2, { size: 10.2, color: text === C.white ? 'F3F3F8' : C.body })
    if (i < layers.length - 1) label(s, '↓', 6.35, y + 0.58, 0.2, 0.24, { fontFace: 'Aptos', size: 15, color: C.faint, align: 'center' })
  })
  label(s, '设计收益：主进程只处理原生能力，渲染进程只处理 UI 与状态，领域逻辑保持可测试。', 1.08, 6.55, 9.8, 0.26, { size: 10.3, color: C.muted })
  addFooter(s, 6)
}

// 07 State & Data Flow
{
  const s = pptx.addSlide()
  addBg(s)
  addKicker(s, 'STATE & DATA FLOW')
  addTitle(s, 'useReducer + Context 让笔记状态集中、变化路径明确。')
  const steps = [
    ['用户操作', '新建、编辑、删除、搜索、选择'],
    ['Action', 'ADD_NOTE / UPDATE_NOTE / DELETE_NOTE / SELECT_NOTE'],
    ['notesReducer', '生成新的 NotesState'],
    ['React UI', 'Sidebar 与 Editor 重新渲染'],
    ['localStorage', 'state.notes 改变后自动持久化']
  ]
  steps.forEach(([t, d], i) => {
    const x = 0.72 + i * 2.52
    roundRect(s, x, 2.05, 2.05, 0.8, i === 2 ? C.accent : C.surface, i === 2 ? C.accent : C.border, 0.06)
    label(s, t, x + 0.12, 2.18, 1.8, 0.2, { size: 11.2, bold: true, color: i === 2 ? C.white : C.ink, align: 'center' })
    label(s, d, x + 0.12, 2.43, 1.8, 0.24, { size: 7.7, color: i === 2 ? 'FFF7D8' : C.muted, align: 'center' })
    if (i < steps.length - 1) arrow(s, x + 2.07, 2.28)
  })

  roundRect(s, 1.08, 4.05, 10.95, 1.15, C.surface, C.border, 0.06)
  label(s, 'NotesState', 1.42, 4.24, 1.5, 0.22, { size: 12, bold: true, color: C.accentDark })
  label(s, '{ notes: Note[], selectedId: string | null, searchQuery: string, showTestPanel: boolean }', 3.0, 4.22, 8.3, 0.24, { size: 10.3, color: C.body, fontFace: 'Consolas' })
  label(s, '状态结构保持扁平，便于组件读取，也便于测试构造输入。', 3.0, 4.63, 5.8, 0.2, { size: 9.2, color: C.muted })

  const notes = [
    ['自动加载', 'mount 时 loadNotes()，按 updatedAt 降序排序。'],
    ['自动保存', 'notes 数组变化时 saveNotes() 写入本地。'],
    ['当前限制', 'localStorage 适合轻量单机使用，后续可替换为文件/SQLite。']
  ]
  notes.forEach(([t, d], i) => bullet(s, t, d, 1.24 + i * 3.85, 5.85, i === 2 ? C.red : C.green))
  addFooter(s, 7)
}

// 08 Component Map
{
  const s = pptx.addSlide()
  addBg(s)
  addKicker(s, 'COMPONENT MODEL')
  addTitle(s, '组件树按工作区拆分，Hooks 承担状态和副作用编排。')
  const tree = [
    ['App', 5.35, 1.55, 2.4, C.dark, C.white],
    ['NotesProvider', 5.15, 2.28, 2.8, C.accent, C.white],
    ['Sidebar', 1.1, 3.1, 2.15, C.blue, C.white],
    ['Editor', 5.55, 3.1, 2.15, C.blue, C.white],
    ['TestPanel', 9.95, 3.1, 2.15, C.blue, C.white],
    ['SidebarHeader', 0.72, 4.08, 1.85, C.surface2, C.body],
    ['SearchInput', 2.72, 4.08, 1.85, C.surface2, C.body],
    ['NoteList', 4.72, 4.08, 1.85, C.surface2, C.body],
    ['TitleInput', 6.72, 4.08, 1.85, C.surface2, C.body],
    ['ContentArea', 8.72, 4.08, 1.85, C.surface2, C.body],
    ['StatusBar', 10.72, 4.08, 1.85, C.surface2, C.body]
  ]
  tree.forEach(([t, x, y, w, fill, color]) => {
    roundRect(s, x, y, w, 0.42, fill, fill === C.surface2 ? C.border : fill, 0.04)
    label(s, t, x, y + 0.07, w, 0.2, { size: 9.8, bold: true, color, align: 'center', fontFace: t.startsWith('use') ? 'Consolas' : 'Microsoft YaHei' })
  })
  ;[
    ['useNotes()', 'CRUD + selectedNote + filteredNotes'],
    ['useSearch()', 'searchQuery action'],
    ['useKeyboard()', 'Ctrl/Cmd+N 与 Escape'],
    ['useTheme()', 'data-theme + 主题持久化']
  ].forEach(([t, d], i) => {
    const x = 0.95 + i * 3.05
    roundRect(s, x, 5.65, 2.65, 0.68, C.surface, C.border, 0.05)
    label(s, t, x + 0.12, 5.78, 1.2, 0.18, { size: 9.5, bold: true, color: C.accentDark, fontFace: 'Consolas' })
    label(s, d, x + 0.12, 6.02, 2.35, 0.18, { size: 8.2, color: C.muted })
  })
  addFooter(s, 8)
}

// 09 Markdown & Native Integration
{
  const s = pptx.addSlide()
  addBg(s)
  addKicker(s, 'CORE CAPABILITIES')
  addTitle(s, '核心能力由自研 Markdown 引擎和 Electron 原生桥接组成。')
  roundRect(s, 0.75, 1.68, 5.75, 4.65, C.surface, C.border, 0.07)
  label(s, 'Markdown Pipeline', 1.08, 1.95, 2.2, 0.24, { size: 12.5, bold: true, color: C.ink })
  const mdSteps = ['Raw Text', 'Block Parse', 'Inline Parse', 'HTML Preview', 'Syntax Highlight']
  mdSteps.forEach((t, i) => {
    roundRect(s, 1.08, 2.55 + i * 0.55, 2.0, 0.34, i === 0 ? C.surface2 : C.bg, C.border, 0.04)
    label(s, t, 1.08, 2.61 + i * 0.55, 2.0, 0.14, { size: 8.5, color: C.body, align: 'center', fontFace: 'Aptos' })
    if (i < mdSteps.length - 1) label(s, '↓', 2.0, 2.9 + i * 0.55, 0.18, 0.14, { fontFace: 'Aptos', size: 10, color: C.faint, align: 'center' })
  })
  const syntax = ['标题', '粗体/斜体/删除线', '行内代码/代码块', '引用/列表/水平线', '链接/图片']
  syntax.forEach((t, i) => chip(s, t, 3.62, 2.55 + i * 0.42, 2.1, i % 2 ? C.bg : C.surface2, C.body))
  label(s, '亮点：markdown.ts 无外部运行时依赖，便于控制渲染范围与安全边界。', 1.08, 5.72, 4.6, 0.26, { size: 9.1, color: C.muted })

  roundRect(s, 6.86, 1.68, 5.75, 4.65, C.surface, C.border, 0.07)
  label(s, 'Electron Native Bridge', 7.18, 1.95, 2.8, 0.24, { size: 12.5, bold: true, color: C.ink })
  const ipc = [
    ['Main Process', 'BrowserWindow / Menu / dialog / fs/promises'],
    ['Preload', 'contextBridge.exposeInMainWorld("electronAPI")'],
    ['Renderer', 'onMenuAction(action, data) / exportNote(title, content)']
  ]
  ipc.forEach(([t, d], i) => {
    const y = 2.55 + i * 0.82
    roundRect(s, 7.18, y, 4.55, 0.48, i === 1 ? C.accent : C.dark, i === 1 ? C.accent : C.dark, 0.04)
    label(s, t, 7.36, y + 0.1, 1.25, 0.16, { size: 8.8, bold: true, color: C.white })
    label(s, d, 8.45, y + 0.1, 3.05, 0.16, { size: 7.7, color: 'F4F1E9', fontFace: 'Consolas' })
  })
  label(s, '当前状态：导出笔记已通过 IPC handler 闭环；导入菜单已在主进程发送事件，渲染进程可继续补齐处理。', 7.18, 5.25, 4.7, 0.38, { size: 9, color: C.muted })
  addFooter(s, 9)
}

// 10 Quality & Roadmap
{
  const s = pptx.addSlide()
  addBg(s, C.dark)
  addKicker(s, 'QUALITY & ROADMAP', true)
  addTitle(s, '质量内建：测试覆盖核心逻辑，演进路线保持克制。', true)
  const cols = [
    ['已覆盖', ['notes.ts：17 个核心逻辑用例', 'formatters.ts：时间与截断格式化', '组件测试：Sidebar / Editor / TestPanel', 'test-runner：内置测试执行器']],
    ['架构优势', ['领域函数可单测', 'UI 组件职责清晰', 'Electron 原生能力隔离在主进程', '本地优先，无后端依赖']],
    ['下一步', ['补齐导入文件 renderer 处理', '将 localStorage 演进为文件或 SQLite', '完善导出格式与错误提示', '增加端到端桌面流程测试']]
  ]
  cols.forEach(([title, items], i) => {
    const x = 0.78 + i * 4.15
    roundRect(s, x, 1.82, 3.55, 4.25, C.dark2, '2E2E42', 0.07)
    label(s, title, x + 0.28, 2.12, 2.5, 0.28, { size: 14, bold: true, color: i === 2 ? 'E2B328' : C.white })
    items.forEach((item, j) => {
      s.addShape(pptx.ShapeType.ellipse, {
        x: x + 0.32, y: 2.75 + j * 0.68, w: 0.08, h: 0.08,
        fill: { color: i === 2 ? 'E2B328' : '8B9D83' },
        line: { color: i === 2 ? 'E2B328' : '8B9D83' }
      })
      label(s, item, x + 0.52, 2.65 + j * 0.68, 2.55, 0.28, { size: 9.4, color: 'D8D8E0' })
    })
  })
  label(s, '总结：这是一款已经具备清晰 MVP 闭环的本地桌面笔记应用，当前架构适合继续沿着“可靠本地存储 + 更完整原生集成”演进。', 1.0, 6.48, 10.95, 0.3, { size: 10.2, color: 'C7C7D4', align: 'center' })
  addFooter(s, 10, true)
}

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })
await pptx.writeFile({ fileName: outputPath })
console.log(`Wrote ${outputPath}`)
console.log(`Slides: ${pptx._slides.length}`)
