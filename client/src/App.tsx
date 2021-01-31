import React from 'react'
import { CssBaseline } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Layout from 'components/Layout/Layout'
import About from 'components/About'
import useColorScheme from 'hooks/useColorScheme'
import Projects from 'components/Projects'
import Login from 'components/Login'
// import ScreenSize from 'components/ScreenSize'

/*
TODO: Add bio, contact section, multiple links for code button
*/

const App = () => {
  /* THEMING AND STYLES START */
  const [colorScheme, toggleColorScheme] = useColorScheme()
  const theme = createMuiTheme({
    palette: {
      type: colorScheme,
    },
    overrides: {
      MuiLink: {
        root: {
          color: colorScheme === 'dark' ? blue[300] : blue[900],
        },
      },
    },
  })
  /* THEMING AND STYLES END */

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <ScreenSize /> */}
      <Layout
        theme={colorScheme}
        toggleTheme={toggleColorScheme}
      >
        <Login />
        <About />
        <Projects />
      </Layout>
    </ThemeProvider>
  )
}

export default App
