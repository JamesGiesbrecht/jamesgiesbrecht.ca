import { FC } from 'react'
import { Container, Toolbar, makeStyles } from '@material-ui/core'
import { PaletteOptions } from '@material-ui/core/styles/createPalette'
import NavBar from 'components/layoutTemp/NavBar'
import Footer from 'components/layoutTemp/Footer'

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
