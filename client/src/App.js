import React from 'react'
import { CssBaseline } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Layout from './components/Layout/Layout'
import useColorScheme from './hooks/useColorScheme'
import logo from './logo.svg'
import './App.css'

const App = () => {
  /* THEMING AND STYLES START */
  const [colorScheme, toggleColorScheme] = useColorScheme()
  const theme = React.useMemo(() => createMuiTheme({
    palette: {
      type: colorScheme,
    },
  }),
  [colorScheme])

  /* THEMING AND STYLES END */

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout
        theme={colorScheme}
        toggleTheme={toggleColorScheme}
      >
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Welcome to jamesgiesbrecht.ca</p>
            <button onClick={toggleColorScheme}>Theme</button>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </Layout>
    </ThemeProvider>
  )
}

export default App
