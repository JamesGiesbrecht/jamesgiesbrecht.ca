import type { AppProps } from 'next/app'
import Head from 'next/head'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import { AuthContextProvider } from 'context/Auth'
import Layout from 'components/layout/Layout'
import ScreenSize from 'components/utility/ScreenSize'
import useColorScheme from 'hooks/useColorScheme'
import { EmotionCache } from '@emotion/cache'
import createEmotionCache from 'styles/createEmotionCache'
import getTheme from 'styles/theme'
import { CacheProvider } from '@emotion/react'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp = ({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) => {
  const [colorScheme, toggleColorScheme] = useColorScheme()
  const theme = getTheme(colorScheme)

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
          <CssBaseline />
          {process.env.NEXT_PUBLIC_ENV === 'development' && <ScreenSize />}
          <Layout theme={colorScheme} toggleTheme={toggleColorScheme}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </AuthContextProvider>
    </CacheProvider>
  )
}

export default MyApp
