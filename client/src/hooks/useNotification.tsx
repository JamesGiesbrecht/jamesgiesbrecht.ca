import { SyntheticEvent, useState } from 'react'
import ReactDOM from 'react-dom'
import { Snackbar, Alert, ThemeProvider, StyledEngineProvider } from '@mui/material'
import { useTheme } from '@mui/styles'

// FIXME
const useNotification = (): any => {
  const [open, setOpen] = useState<boolean>(false)
  // FIXME
  const [text, setText] = useState<any>()
  // FIXME
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

  // FIXME
  return (notificationText: any, notificationSeverity?: any) => {
    setText(notificationText)
    setSeverity(notificationSeverity)
    setOpen(true)
  }
}

export default useNotification
