import React from 'react'
import { Container, Toolbar, makeStyles } from '@material-ui/core'
import { PaletteOptions } from '@material-ui/core/styles/createPalette'
import NavBar from 'components/layout/NavBar'
import Footer from 'components/layout/Footer'

interface Props {
  theme: PaletteOptions['type']
  toggleTheme: () => void
  children: any
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    paddingTop: theme.spacing(4),
  },
}))

const Layout: React.FC<Props> = ({ theme, toggleTheme, children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <NavBar
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <Toolbar />
      <Container className={classes.content}>
        {children}
      </Container>
      <Footer />
    </div>
  )
}

export default Layout
