import React from 'react'
import { Container, Toolbar, makeStyles } from '@material-ui/core'
import { PaletteOptions } from '@material-ui/core/styles/createPalette'
import NavBar from 'components/Layout/NavBar'
import Footer from 'components/Layout/Footer'

interface Props {
  theme: PaletteOptions['type']
  toggleTheme: () => void
  children: React.ReactNode
}

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

const Layout: React.FC<Props> = ({ theme, toggleTheme, children }) => {
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
