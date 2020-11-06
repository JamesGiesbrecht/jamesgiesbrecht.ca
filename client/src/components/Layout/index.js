import React from 'react'
import { Container, Toolbar, makeStyles } from '@material-ui/core'
import NavBar from './NavBar'
import Footer from './Footer'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  sections: {
    '& > *': {
      marginTop: theme.spacing(13),
    },
  },
}))

const Layout = ({ children, theme, toggleTheme }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <NavBar
        theme={theme}
        toggleTheme={toggleTheme}
      />
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
