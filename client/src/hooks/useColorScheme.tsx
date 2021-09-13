import { useEffect, useState } from 'react'
import { useMediaQuery } from '@mui/material'
import { PaletteOptions } from '@mui/material/styles'

const useColorScheme = (): [PaletteOptions['mode'], () => void] => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [theme, setTheme] = useState<PaletteOptions['mode']>('dark')

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
      const localTheme: PaletteOptions['mode'] = window.localStorage.getItem(
        'theme',
      ) as PaletteOptions['mode']
      if (localTheme) setTheme(localTheme)
    } else if (prefersDarkMode) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [prefersDarkMode])

  return [theme, toggleTheme]
}

export default useColorScheme
