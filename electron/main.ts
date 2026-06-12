import { app, BrowserWindow, Menu, dialog, ipcMain, type MenuItemConstructorOptions } from 'electron'
import { join } from 'path'
import { readFile, writeFile } from 'fs/promises'

const isDev = !app.isPackaged

let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 720,
    minWidth: 700,
    minHeight: 400,
    title: '笔记',
    webPreferences: {
      preload: join(__dirname, '../preload/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  })

  // Restore window bounds
  try {
    const boundsKey = 'notes_app_window_bounds_v1'
    const raw = mainWindow.webContents.session.defaultSession
    // Keep simple: store bounds in a userData file
  } catch { /* ignore */ }

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  buildMenu()
}

function buildMenu(): void {
  const template: MenuItemConstructorOptions[] = [
    {
      label: '文件',
      submenu: [
        {
          label: '新建笔记',
          accelerator: 'CmdOrCtrl+N',
          click: () => mainWindow?.webContents.send('menu-action', 'new-note')
        },
        {
          label: '导入文件...',
          click: async () => {
            const result = await dialog.showOpenDialog(mainWindow!, {
              title: '导入文件',
              filters: [
                { name: '文本文件', extensions: ['txt', 'md', 'markdown'] },
                { name: '所有文件', extensions: ['*'] }
              ],
              properties: ['openFile']
            })
            if (result.canceled || result.filePaths.length === 0) return
            try {
              const content = await readFile(result.filePaths[0], 'utf-8')
              const fileName = result.filePaths[0].split(/[\\/]/).pop() || '导入笔记'
              const nameWithoutExt = fileName.replace(/\.[^.]+$/, '')
              mainWindow?.webContents.send('menu-action', 'import-file', {
                title: nameWithoutExt,
                content
              })
            } catch (err) {
              dialog.showErrorBox('导入失败', `无法读取文件: ${err}`)
            }
          }
        },
        {
          label: '导出当前笔记...',
          accelerator: 'CmdOrCtrl+Shift+E',
          click: () => mainWindow?.webContents.send('menu-action', 'export-note')
        },
        { type: 'separator' },
        {
          label: '退出',
          accelerator: 'Alt+F4',
          click: () => app.quit()
        }
      ]
    },
    {
      label: '编辑',
      submenu: [
        { label: '撤销', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
        { label: '重做', accelerator: 'CmdOrCtrl+Shift+Z', role: 'redo' },
        { type: 'separator' },
        { label: '剪切', accelerator: 'CmdOrCtrl+X', role: 'cut' },
        { label: '复制', accelerator: 'CmdOrCtrl+C', role: 'copy' },
        { label: '粘贴', accelerator: 'CmdOrCtrl+V', role: 'paste' },
        { label: '全选', accelerator: 'CmdOrCtrl+A', role: 'selectAll' }
      ]
    },
    {
      label: '视图',
      submenu: [
        {
          label: '切换主题',
          accelerator: 'CmdOrCtrl+T',
          click: () => mainWindow?.webContents.send('menu-action', 'toggle-theme')
        },
        { type: 'separator' },
        { label: '开发者工具', accelerator: 'F12', role: 'toggleDevTools' }
      ]
    },
    {
      label: '帮助',
      submenu: [
        {
          label: '关于',
          click: () => {
            dialog.showMessageBox(mainWindow!, {
              type: 'info',
              title: '关于 笔记',
              message: '笔记',
              detail: '版本 1.0.0\n\n一个简洁的桌面笔记应用。'
            })
          }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

// IPC handlers
ipcMain.handle('export-note', async (_event, { title, content }: { title: string; content: string }) => {
  const result = await dialog.showSaveDialog(mainWindow!, {
    title: '导出笔记',
    defaultPath: `${title || '笔记'}.txt`,
    filters: [
      { name: '文本文件', extensions: ['txt'] },
      { name: 'Markdown', extensions: ['md'] },
      { name: '所有文件', extensions: ['*'] }
    ]
  })
  if (result.canceled || !result.filePath) return { success: false }
  try {
    await writeFile(result.filePath, `${title}\n\n${content}`, 'utf-8')
    return { success: true }
  } catch (err) {
    return { success: false, error: String(err) }
  }
})

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
