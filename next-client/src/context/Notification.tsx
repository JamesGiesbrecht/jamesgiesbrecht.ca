import { createContext, FC, ReactNode, SyntheticEvent, useContext, useMemo, useState } from 'react'
import { Snackbar, Alert, AlertProps } from '@mui/material'

interface NotificationContextType {
  notification: ReactNode
  createNotification: (
    notificationText: ReactNode,
    notificationSeverity?: AlertProps['severity'],
  ) => void
}

export const AuthContext = createContext<NotificationContextType>({
  notification: null,
  createNotification: () => {
    throw new Error('This component should be wrapper with a Notification Context Provider.')
  },
})

export const NotificationContextProvider: FC = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [text, setText] = useState<ReactNode>()
  const [severity, setSeverity] = useState<AlertProps['severity']>()

  const handleClose = (event: SyntheticEvent<Element, Event> | Event, reason?: string) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }

  const store = useMemo(
    () => ({
      notification: (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert variant="filled" onClose={handleClose} severity={severity}>
            {text}
          </Alert>
        </Snackbar>
      ),
      createNotification: (
        notificationText: ReactNode,
        notificationSeverity?: AlertProps['severity'],
      ) => {
        setText(notificationText)
        setSeverity(notificationSeverity)
        setOpen(true)
      },
    }),
    [open, severity, text],
  )

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
}

export const useNotification = () => useContext(AuthContext)
