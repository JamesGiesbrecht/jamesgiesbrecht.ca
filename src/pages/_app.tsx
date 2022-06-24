import { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SnackbarProvider } from 'notistack'

import Layout from 'components/layout/Layout'
import ScreenSize from 'components/utility/ScreenSize'
import { AuthContextProvider } from 'context/Auth'
import useColorScheme from 'hooks/useColorScheme'
import createEmotionCache from 'styles/createEmotionCache'
import getTheme from 'styles/theme'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp = ({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) => {
  const [colorScheme, toggleColorScheme] = useColorScheme()
  const theme = getTheme(colorScheme)

  // Workaround to fix bug in React
  // https://github.com/facebook/react/issues/24304#issuecomment-1092563688
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const MySnackbarProvider = SnackbarProvider as any
  const MyComponent = Component as any
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>James Giesbrecht</title>
        <meta name="description" content="Home of James Giesbrecht on the Web" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <AuthContextProvider>
        <ThemeProvider theme={theme}>
          <MySnackbarProvider>
            <CssBaseline />
            {process.env.NEXT_PUBLIC_ENV === 'development' && <ScreenSize />}
            <Layout theme={colorScheme} toggleTheme={toggleColorScheme}>
              <MyComponent {...pageProps} />
            </Layout>
          </MySnackbarProvider>
        </ThemeProvider>
      </AuthContextProvider>
    </CacheProvider>
  )
}

export default MyApp
