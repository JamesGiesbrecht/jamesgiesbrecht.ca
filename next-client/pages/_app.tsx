import type { AppProps } from 'next/app'
import Head from 'next/head'
import { CssBaseline } from '@mui/material'
import { blue, cyan } from '@mui/material/colors'
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles'

import { AuthContextProvider } from 'context/Auth'
import Layout from 'components/layout/Layout'
import ScreenSize from 'components/ScreenSize'
import ScrollToTop from 'components/utility/ScrollToTop'
import useColorScheme from 'hooks/useColorScheme'

const MyApp = ({ Component, pageProps }: AppProps) => {
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
  return (
    <>
      <Head>
        <title>James Giesbrecht</title>
        <meta name="description" content="Home of James Giesbrecht on the Web" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </Head>

      <ScrollToTop />
      <AuthContextProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {process.env.REACT_APP_ENV === 'development' && <ScreenSize />}
            <Layout theme={colorScheme} toggleTheme={toggleColorScheme}>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </StyledEngineProvider>
      </AuthContextProvider>
    </>
  )
}

export default MyApp
