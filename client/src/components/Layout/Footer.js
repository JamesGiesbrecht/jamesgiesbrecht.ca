import React from 'react'
import { Container, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}))

const Footer = () => {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Container maxWidth="md">
        <Typography variant="body1">Footer</Typography>
      </Container>
    </footer>
  )
}

export default Footer
