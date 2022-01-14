import { CssBaseline } from '@mui/material'
import { blue, cyan } from '@mui/material/colors'
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'

import routes from 'consts/routes'
import { AuthContextProvider } from 'context/Auth'
import Layout from 'components/layout/Layout'
import ScreenSize from 'components/ScreenSize'
import ScrollToTop from 'components/utility/ScrollToTop'
import useColorScheme from 'hooks/useColorScheme'

/*
TODO: Add bio, contact section, multiple links for code button
*/

const App = () => {
  console.log('Testing in prod... 🤭')
  /* THEMING AND STYLES START */
  const [colorScheme, toggleColorScheme] = useColorScheme()
  const theme = createTheme({
    palette: {
      mode: colorScheme,
      primary: cyan,
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

  const appRoutes = Object.keys(routes).map((routeName) => {
    const route = routes[routeName]
    const { Component, path, props } = route
    return (
      <Route key={path} path={path} {...props}>
        <Component />
      </Route>
    )
  })

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthContextProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {process.env.REACT_APP_ENV === 'development' && <ScreenSize />}
            <Layout theme={colorScheme} toggleTheme={toggleColorScheme}>
              <Switch>
                {appRoutes}
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
