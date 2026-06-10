import { contextBridge, ipcRenderer } from 'electron'

type MenuActionCallback = (action: string, data?: unknown) => void

const electronAPI = {
  onMenuAction: (callback: MenuActionCallback) => {
    ipcRenderer.on('menu-action', (_event, action: string, data?: unknown) => {
      callback(action, data)
    })
  },
  exportNote: (title: string, content: string) => {
    return ipcRenderer.invoke('export-note', { title, content })
  }
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
