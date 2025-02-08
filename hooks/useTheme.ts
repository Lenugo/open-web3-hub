import { useEffect, useState } from "react"

type Theme = 'dark' | 'light'

const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      return storedTheme as Theme
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'dark'
}

const applyTheme = (theme: Theme) => {
  if (typeof window !== 'undefined') {
    const root = document.documentElement
    const body = document.body
    
    // todo: Remove both themes from both elements
    root.classList.remove('dark', 'light')
    body.classList.remove('dark', 'light')
    
    // todo: Add new theme to both elements
    root.classList.add(theme)
    body.classList.add(theme)
  }
}

export function useTheme() {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(getInitialTheme())

  useEffect(() => {
    applyTheme(selectedTheme)
    
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)')

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light'
        applyTheme(newTheme)
        setSelectedTheme(newTheme)
      }
    }

    systemPreference.addEventListener('change', handleSystemThemeChange)

    return () => {
      systemPreference.removeEventListener('change', handleSystemThemeChange)
    }
  }, [selectedTheme])

  const toggleTheme = () => {
    const newTheme = selectedTheme === 'light' ? 'dark' : 'light'
    applyTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    setSelectedTheme(newTheme)
  }

  return { selectedTheme, toggleTheme }
}