import { FC, ReactNode } from 'react'
import { Container, PaletteMode, Theme, Toolbar } from '@mui/material'
import { makeStyles } from '@mui/styles'

import Footer from 'components/layout/Footer'
import NavBar from 'components/layout/NavBar'

interface Props {
  theme: PaletteMode
  toggleTheme: () => void
  children: ReactNode
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative',
  },
  content: {
    paddingTop: theme.spacing(4),
  },
}))

const Layout: FC<Props> = ({ theme, toggleTheme, children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <Toolbar />
      <Container className={classes.content}>{children}</Container>
      <Footer />
    </div>
  )
}

export default Layout
