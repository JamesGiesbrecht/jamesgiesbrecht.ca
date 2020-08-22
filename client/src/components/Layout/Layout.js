import React from 'react'
import { Container, Toolbar, makeStyles } from '@material-ui/core'
import NavBar from './NavBar'
import Footer from './Footer'

const useStyles = makeStyles(() => ({
  sections: {
    '& > *': {
      marginTop: '100px',
    },
  },
}))

const Layout = ({ children }) => {
  const classes = useStyles()

  return (
    <>
      <NavBar />
      <Toolbar />
      <Container>
        <div className={classes.sections}>
          {children}
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default Layout
