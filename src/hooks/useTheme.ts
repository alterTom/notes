import { useState, useCallback, useEffect } from 'react'
import { loadTheme, saveTheme } from '../lib/storage'

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => loadTheme())

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    saveTheme(theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }, [])

  return { theme, toggleTheme }
}
