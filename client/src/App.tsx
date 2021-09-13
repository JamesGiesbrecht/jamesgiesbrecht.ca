import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import { AuthContextProvider } from 'context/Auth'
import { CssBaseline } from '@mui/material'
import { blue } from '@mui/material/colors'
import { createTheme, ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles'
import Layout from 'components/layout/Layout'
import useColorScheme from 'hooks/useColorScheme'
import Home from 'components/Home'
import Login from 'components/Login'
import Posts from 'components/posts/Posts'
import Account from 'components/Account'
import PlexStatus from 'components/PlexStatus'
import Privacy from 'components/Privacy'
import ScrollToTop from 'components/utility/ScrollToTop'

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

// import ScreenSize from 'components/ScreenSize'

/*
TODO: Add bio, contact section, multiple links for code button
*/

const App = () => {
  /* THEMING AND STYLES START */
  const [colorScheme, toggleColorScheme] = useColorScheme()
  const theme = createTheme({
    palette: {
      mode: colorScheme,
    },
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            color: colorScheme === 'dark' ? blue[300] : blue[900],
          },
        },
      },
    },
  })
  /* THEMING AND STYLES END */

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthContextProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* <ScreenSize /> */}
            <Layout theme={colorScheme} toggleTheme={toggleColorScheme}>
              <Switch>
                <Route path="/plex">
                  <PlexStatus />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/posts">
                  <Posts />
                </Route>
                <Route path="/account">
                  <Account />
                </Route>
                <Route path="/privacy">
                  <Privacy />
                </Route>
                <Route exact path="/">
                  <Home />
                </Route>
                <Redirect push to="/" />
              </Switch>
            </Layout>
          </ThemeProvider>
        </StyledEngineProvider>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
