import { FC, ReactNode } from 'react'
import { Container, Toolbar } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { PaletteOptions } from '@mui/material/styles'
import NavBar from 'components/layout/NavBar'
import Footer from 'components/layout/Footer'

interface Props {
  theme: PaletteOptions['mode']
  toggleTheme: () => void
  children: ReactNode
}

const useStyles = makeStyles((theme) => ({
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
