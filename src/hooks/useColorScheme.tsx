import { useEffect, useState } from 'react'
import { useMediaQuery, PaletteMode } from '@mui/material'
import localStorageKeys from 'consts/localStorageKeys'

const light = 'light'
const dark = 'dark'
const lsTheme = localStorageKeys.theme

const useColorScheme = (): [PaletteMode, () => void] => {
  const prefersDarkMode = useMediaQuery(`(prefers-color-scheme: ${dark})`)
  const [theme, setTheme] = useState<PaletteMode>(dark)

  const toggleTheme = () => {
    if (theme === light) {
      window.localStorage.setItem(lsTheme, dark)
      setTheme(dark)
    } else {
      window.localStorage.setItem(lsTheme, light)
      setTheme(light)
    }
  }

  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(window.localStorage, lsTheme)) {
      const localTheme: PaletteMode = window.localStorage.getItem(lsTheme) as PaletteMode
      if (localTheme && (localTheme === dark || localTheme === light)) setTheme(localTheme)
    } else if (prefersDarkMode) {
      setTheme(dark)
    } else {
      setTheme(light)
    }
  }, [prefersDarkMode])

  return [theme, toggleTheme]
}

export default useColorScheme
