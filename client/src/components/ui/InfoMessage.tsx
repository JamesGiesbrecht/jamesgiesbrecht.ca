import { FC, ReactNode, useState } from 'react'
import { Close } from '@mui/icons-material'
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  CardActions,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import { makeStyles } from '@mui/styles'

interface Props {
  title: string
  id: string
  children: ReactNode
}

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(4),
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  doNotShow: {
    marginLeft: 'auto',
  },
}))

const InfoMessage: FC<Props> = ({ title, id, children }) => {
  const classes = useStyles()
  const localMessages = JSON.parse(localStorage.getItem('hiddenMessages') || '[]')
  const messageIsHidden = localMessages.includes(id)
  const [doNotShow, setDoNotShow] = useState<boolean>(false)
  const [showMessage, setShowMessage] = useState<boolean>(!messageIsHidden)

  const setLS = (hiddenMessages: string[]) =>
    localStorage.setItem('hiddenMessages', JSON.stringify(hiddenMessages))

  const handleClose = () => {
    setShowMessage(false)
    if (doNotShow && !messageIsHidden) {
      localMessages.push(id)
      setLS(localMessages)
    }
  }

  if (!showMessage) return null

  return (
    <Card raised className={classes.card}>
      <CardHeader
        title={title}
        action={
          <IconButton onClick={handleClose} size="large">
            <Close />
          </IconButton>
        }
      />
      <CardContent>{children}</CardContent>
      <CardActions>
        <FormControlLabel
          className={classes.doNotShow}
          value={doNotShow}
          control={
            <Checkbox
              value={doNotShow}
              onChange={(e) => setDoNotShow(e.target.checked)}
              color="primary"
            />
          }
          label="Do not show again"
          labelPlacement="start"
        />
      </CardActions>
    </Card>
  )
}

export default InfoMessage
