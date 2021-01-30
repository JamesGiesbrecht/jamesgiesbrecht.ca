import { useEffect, useState } from 'react'
import { useMediaQuery } from '@material-ui/core'
import { PaletteOptions } from '@material-ui/core/styles/createPalette'

const useColorScheme = ():[PaletteOptions['type'], () => void] => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [theme, setTheme] = useState<PaletteOptions['type']>('dark')

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
      const localTheme: PaletteOptions['type'] = window.localStorage.getItem('theme') as PaletteOptions['type']
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
