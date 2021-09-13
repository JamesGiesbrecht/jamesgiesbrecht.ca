import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import { AuthContextProvider } from 'context/Auth'
import { CssBaseline } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import Layout from 'components/layoutTemp/Layout'
import useColorScheme from 'hooks/useColorScheme'
import Home from 'components/Home'
import Login from 'components/Login'
import Posts from 'components/posts/Posts'
import Account from 'components/Account'
import PlexStatus from 'components/PlexStatus'
import Privacy from 'components/Privacy'
import ScrollToTop from 'components/utility/ScrollToTop'
// import ScreenSize from 'components/ScreenSize'

/*
TODO: Add bio, contact section, multiple links for code button
*/

const App = () => {
  /* THEMING AND STYLES START */
  const [colorScheme, toggleColorScheme] = useColorScheme()
  const theme = createTheme({
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
    <BrowserRouter>
      <ScrollToTop />
      <AuthContextProvider>
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
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
