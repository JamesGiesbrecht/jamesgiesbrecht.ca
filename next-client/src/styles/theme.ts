import { PaletteMode } from '@mui/material'
import { blue, cyan } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const getTheme = (colorScheme?: PaletteMode) =>
  createTheme({
    palette: {
      mode: colorScheme,
      primary: cyan,
    },
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            color: colorScheme === 'dark' ? blue[300] : blue[900],
          },
        },
      },
    },
  })

export default getTheme
