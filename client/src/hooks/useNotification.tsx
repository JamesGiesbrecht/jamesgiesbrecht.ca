import { SyntheticEvent, useState } from 'react'
import ReactDOM from 'react-dom'
import { Snackbar, Alert } from '@mui/material'
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles'
import { useTheme } from '@mui/styles'

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const useNotification = (): any => {
  const [open, setOpen] = useState<boolean>(false)
  const [text, setText] = useState<any>()
  const [severity, setSeverity] = useState<any>()
  const theme = useTheme()
  const notificationDiv = document.getElementById('notification')

  const handleClose = (event: SyntheticEvent<Element, Event>, reason?: string) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }

  const notification = (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert variant="filled" onClose={handleClose} severity={severity}>
            {text}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </StyledEngineProvider>
  )

  ReactDOM.render(notification, notificationDiv)

  return (notificationText: any, notificationSeverity?: any) => {
    setText(notificationText)
    setSeverity(notificationSeverity)
    setOpen(true)
  }
}

export default useNotification
