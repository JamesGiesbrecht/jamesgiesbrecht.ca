import { ReactNode, SyntheticEvent, useState } from 'react'
import ReactDOM from 'react-dom'
import { Snackbar, Alert, ThemeProvider, StyledEngineProvider, AlertProps } from '@mui/material'
import { useTheme } from '@mui/styles'

const useNotification = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [text, setText] = useState<ReactNode>()
  const [severity, setSeverity] = useState<AlertProps['severity']>()
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

  return (notificationText: ReactNode, notificationSeverity?: AlertProps['severity']) => {
    setText(notificationText)
    setSeverity(notificationSeverity)
    setOpen(true)
  }
}

export default useNotification
