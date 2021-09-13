import { SyntheticEvent, useState } from 'react'
import ReactDOM from 'react-dom'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { ThemeProvider } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/styles'

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
    <ThemeProvider theme={theme}>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity={severity}>
          {text}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  )

  ReactDOM.render(notification, notificationDiv)

  return (notificationText: any, notificationSeverity?: any) => {
    setText(notificationText)
    setSeverity(notificationSeverity)
    setOpen(true)
  }
}

export default useNotification
