import type { Note } from '../lib/notes'

export interface ElectronAPI {
  onMenuAction: (callback: (action: string, data?: unknown) => void) => void
  exportNote: (title: string, content: string) => Promise<{ success: boolean; error?: string }>
  loadNotes: () => Promise<{ success: true; notes: Note[] } | { success: false; error?: string }>
  saveNotes: (notes: Note[]) => Promise<{ success: boolean; error?: string }>
  _listenersSetup?: boolean
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI
  }
}
