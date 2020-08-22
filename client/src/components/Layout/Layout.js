import React from 'react'
import { Container, Toolbar, makeStyles } from '@material-ui/core'
import NavBar from './NavBar'
import Footer from './Footer'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  sections: {
    '& > *': {
      marginTop: '100px',
    },
  },
}))

const Layout = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <NavBar />
      <Toolbar />
      <Container>
        <div className={classes.sections}>
          {children}
        </div>
      </Container>
      <Footer />
    </div>
  )
}

export default Layout
