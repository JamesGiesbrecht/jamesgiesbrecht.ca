import { FC, useState } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  CardActions,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { Close } from '@mui/icons-material'

interface Props {
  title: string
  children: any
  id: string
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

const InfoMessage: FC<Props> = ({ title, children, id }) => {
  const classes = useStyles()
  const localMessages = JSON.parse(localStorage.getItem('hiddenMessages') || '[]')
  const messageIsHidden = localMessages.includes(id)
  const [doNotShow, setDoNotShow] = useState<Boolean>(false)
  const [showMessage, setShowMessage] = useState<Boolean>(!messageIsHidden)

  const setLS = (hiddenMessages: Array<String>) =>
    localStorage.setItem('hiddenMessages', JSON.stringify(hiddenMessages))

  const handleClose = () => {
    setShowMessage(false)
    if (doNotShow && !messageIsHidden) {
      localMessages.push(id)
      setLS(localMessages)
    }
  }

  return showMessage ? (
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
  ) : null
}

export default InfoMessage
