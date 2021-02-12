import React from 'react'
import { Box, Card, Typography, makeStyles } from '@material-ui/core'

interface Props {
  title: string,
  content: string,
  name: string,
  date: Date,
  className?: string,
}

const useStyles = makeStyles((theme) => ({
  post: {
    padding: theme.spacing(2),
  },
  user: {
    marginRight: theme.spacing(1),
  },
}))

const Post: React.FC<Props> = ({ title, content, name, date, className }) => {
  const classes = useStyles()
  const dateFormatted = `${date.toLocaleString('default', { month: 'short' })}  ${date.getDay()}, ${date.getHours()}:${date.getMinutes()}`

  return (
    <Card className={[classes.post, className].join(' ')}>
      <Typography variant="h5">{title}</Typography>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle2" color="textSecondary">{dateFormatted}</Typography>
        <Typography className={classes.user} variant="subtitle1" color="textSecondary">{name}</Typography>
      </Box>
      <Typography>{content}</Typography>
    </Card>
  )
}

export default Post
