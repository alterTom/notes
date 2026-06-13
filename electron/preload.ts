import { contextBridge, ipcRenderer } from 'electron'
import type { Note } from '../src/lib/notes'

type MenuActionCallback = (action: string, data?: unknown) => void
type LoadNotesResult = { success: true; notes: Note[] } | { success: false; error?: string }
type SaveNotesResult = { success: boolean; error?: string }

const electronAPI = {
  onMenuAction: (callback: MenuActionCallback) => {
    ipcRenderer.on('menu-action', (_event, action: string, data?: unknown) => {
      callback(action, data)
    })
  },
  exportNote: (title: string, content: string) => {
    return ipcRenderer.invoke('export-note', { title, content })
  },
  loadNotes: (): Promise<LoadNotesResult> => {
    return ipcRenderer.invoke('notes:load')
  },
  saveNotes: (notes: Note[]): Promise<SaveNotesResult> => {
    return ipcRenderer.invoke('notes:save', notes)
  },
  saveNote: (note: Note): Promise<SaveNotesResult> => {
    return ipcRenderer.invoke('notes:save-one', note)
  }
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
