import { useEffect, useState } from 'react'
import { useMediaQuery, PaletteMode } from '@mui/material'

const useColorScheme = (): [PaletteMode, () => void] => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [theme, setTheme] = useState<PaletteMode>('dark')

  const toggleTheme = () => {
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark')
      setTheme('dark')
    } else {
      window.localStorage.setItem('theme', 'light')
      setTheme('light')
    }
  }

  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(window.localStorage, 'theme')) {
      const localTheme: PaletteMode = window.localStorage.getItem('theme') as PaletteMode
      if (localTheme && (localTheme === 'dark' || localTheme === 'light')) setTheme(localTheme)
    } else if (prefersDarkMode) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [prefersDarkMode])

  return [theme, toggleTheme]
}

export default useColorScheme