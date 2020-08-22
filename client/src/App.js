import React from 'react'
import { CssBaseline } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Layout from './components/Layout/Layout'
import About from './components/About'
import useColorScheme from './hooks/useColorScheme'

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
        <About />

        In aliquam molestie justo quis iaculis. Duis tristique sem nec tristique ultrices. Cras eu feugiat lorem, faucibus venenatis mauris. Cras finibus ligula mauris, eu imperdiet sapien egestas id. Nulla efficitur leo congue, tincidunt lacus et, laoreet ante. Maecenas efficitur sit amet velit at ultrices. Nullam mattis bibendum consequat. Ut gravida suscipit ante, luctus feugiat mauris mattis sed. Quisque eu molestie velit. Nulla elementum felis vel ligula iaculis pharetra. Nulla facilisi. Aliquam leo arcu, mollis eget leo ac, elementum lobortis mauris. Praesent nibh felis, ultricies vel mi in, iaculis tempor orci. Suspendisse potenti. Mauris congue ligula nulla, quis fermentum ligula ullamcorper in. Sed porta ultrices felis vehicula hendrerit.

        Praesent lobortis magna non faucibus egestas. Vivamus sollicitudin elit dui, id consectetur felis finibus vitae. Aliquam ullamcorper posuere efficitur. Nulla sodales vulputate mattis. Nulla vehicula lacus sit amet consectetur auctor. Fusce id accumsan sapien. Nunc rhoncus ornare lorem, sit amet hendrerit lacus posuere eu. Cras sed purus a sem tristique eleifend. Fusce justo leo, finibus ac lobortis vel, consectetur sit amet libero. Vivamus vitae neque maximus, egestas arcu in, eleifend orci.

        Suspendisse consequat velit at odio maximus luctus. Sed posuere bibendum mi euismod interdum. Aliquam id scelerisque odio, eu tempor erat. Curabitur posuere euismod ligula, quis porta justo sollicitudin at. Nunc posuere interdum ipsum, et ornare ipsum posuere id. Nullam venenatis neque arcu, nec maximus lacus congue ac. Cras fermentum eget purus vel tempus. Aliquam in nunc scelerisque, auctor mi ac, sagittis massa. Aenean semper urna vitae augue molestie posuere.

        Vivamus cursus nulla quis nulla lacinia scelerisque. Aenean nec gravida metus, id sodales elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur tincidunt, nibh sit amet pulvinar placerat, odio nulla ultrices urna, in molestie felis ipsum eget est. Aliquam consectetur, massa et fringilla feugiat, odio metus condimentum tortor, id consequat risus ligula vel ante. Ut elit orci, finibus nec elit eget, feugiat semper ligula. Aenean nec rhoncus purus, vitae tempus enim. Quisque quis auctor urna. Donec quis laoreet ipsum. Aenean blandit massa vel tellus condimentum, sed vehicula magna ullamcorper.

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ipsum enim, consequat ac enim viverra, faucibus egestas nibh. Vivamus dui erat, sodales quis nulla eu, rhoncus vehicula ex. Curabitur in neque ut odio iaculis vulputate vitae vel velit. Vestibulum eleifend feugiat sem, sit amet bibendum urna convallis ac. Etiam non finibus libero. Praesent placerat arcu neque, non vulputate arcu tempor eu. Maecenas rutrum iaculis massa at congue. Curabitur a sapien ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis leo elit, molestie cursus ullamcorper nec, sodales eget erat. Duis quis molestie nisl, sed scelerisque magna.

        In aliquam molestie justo quis iaculis. Duis tristique sem nec tristique ultrices. Cras eu feugiat lorem, faucibus venenatis mauris. Cras finibus ligula mauris, eu imperdiet sapien egestas id. Nulla efficitur leo congue, tincidunt lacus et, laoreet ante. Maecenas efficitur sit amet velit at ultrices. Nullam mattis bibendum consequat. Ut gravida suscipit ante, luctus feugiat mauris mattis sed. Quisque eu molestie velit. Nulla elementum felis vel ligula iaculis pharetra. Nulla facilisi. Aliquam leo arcu, mollis eget leo ac, elementum lobortis mauris. Praesent nibh felis, ultricies vel mi in, iaculis tempor orci. Suspendisse potenti. Mauris congue ligula nulla, quis fermentum ligula ullamcorper in. Sed porta ultrices felis vehicula hendrerit.

        Praesent lobortis magna non faucibus egestas. Vivamus sollicitudin elit dui, id consectetur felis finibus vitae. Aliquam ullamcorper posuere efficitur. Nulla sodales vulputate mattis. Nulla vehicula lacus sit amet consectetur auctor. Fusce id accumsan sapien. Nunc rhoncus ornare lorem, sit amet hendrerit lacus posuere eu. Cras sed purus a sem tristique eleifend. Fusce justo leo, finibus ac lobortis vel, consectetur sit amet libero. Vivamus vitae neque maximus, egestas arcu in, eleifend orci.

        Suspendisse consequat velit at odio maximus luctus. Sed posuere bibendum mi euismod interdum. Aliquam id scelerisque odio, eu tempor erat. Curabitur posuere euismod ligula, quis porta justo sollicitudin at. Nunc posuere interdum ipsum, et ornare ipsum posuere id. Nullam venenatis neque arcu, nec maximus lacus congue ac. Cras fermentum eget purus vel tempus. Aliquam in nunc scelerisque, auctor mi ac, sagittis massa. Aenean semper urna vitae augue molestie posuere.

        Vivamus cursus nulla quis nulla lacinia scelerisque. Aenean nec gravida metus, id sodales elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur tincidunt, nibh sit amet pulvinar placerat, odio nulla ultrices urna, in molestie felis ipsum eget est. Aliquam consectetur, massa et fringilla feugiat, odio metus condimentum tortor, id consequat risus ligula vel ante. Ut elit orci, finibus nec elit eget, feugiat semper ligula. Aenean nec rhoncus purus, vitae tempus enim. Quisque quis auctor urna. Donec quis laoreet ipsum. Aenean blandit massa vel tellus condimentum, sed vehicula magna ullamcorper.

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ipsum enim, consequat ac enim viverra, faucibus egestas nibh. Vivamus dui erat, sodales quis nulla eu, rhoncus vehicula ex. Curabitur in neque ut odio iaculis vulputate vitae vel velit. Vestibulum eleifend feugiat sem, sit amet bibendum urna convallis ac. Etiam non finibus libero. Praesent placerat arcu neque, non vulputate arcu tempor eu. Maecenas rutrum iaculis massa at congue. Curabitur a sapien ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis leo elit, molestie cursus ullamcorper nec, sodales eget erat. Duis quis molestie nisl, sed scelerisque magna.

        In aliquam molestie justo quis iaculis. Duis tristique sem nec tristique ultrices. Cras eu feugiat lorem, faucibus venenatis mauris. Cras finibus ligula mauris, eu imperdiet sapien egestas id. Nulla efficitur leo congue, tincidunt lacus et, laoreet ante. Maecenas efficitur sit amet velit at ultrices. Nullam mattis bibendum consequat. Ut gravida suscipit ante, luctus feugiat mauris mattis sed. Quisque eu molestie velit. Nulla elementum felis vel ligula iaculis pharetra. Nulla facilisi. Aliquam leo arcu, mollis eget leo ac, elementum lobortis mauris. Praesent nibh felis, ultricies vel mi in, iaculis tempor orci. Suspendisse potenti. Mauris congue ligula nulla, quis fermentum ligula ullamcorper in. Sed porta ultrices felis vehicula hendrerit.

        Praesent lobortis magna non faucibus egestas. Vivamus sollicitudin elit dui, id consectetur felis finibus vitae. Aliquam ullamcorper posuere efficitur. Nulla sodales vulputate mattis. Nulla vehicula lacus sit amet consectetur auctor. Fusce id accumsan sapien. Nunc rhoncus ornare lorem, sit amet hendrerit lacus posuere eu. Cras sed purus a sem tristique eleifend. Fusce justo leo, finibus ac lobortis vel, consectetur sit amet libero. Vivamus vitae neque maximus, egestas arcu in, eleifend orci.

        Suspendisse consequat velit at odio maximus luctus. Sed posuere bibendum mi euismod interdum. Aliquam id scelerisque odio, eu tempor erat. Curabitur posuere euismod ligula, quis porta justo sollicitudin at. Nunc posuere interdum ipsum, et ornare ipsum posuere id. Nullam venenatis neque arcu, nec maximus lacus congue ac. Cras fermentum eget purus vel tempus. Aliquam in nunc scelerisque, auctor mi ac, sagittis massa. Aenean semper urna vitae augue molestie posuere.

        Vivamus cursus nulla quis nulla lacinia scelerisque. Aenean nec gravida metus, id sodales elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur tincidunt, nibh sit amet pulvinar placerat, odio nulla ultrices urna, in molestie felis ipsum eget est. Aliquam consectetur, massa et fringilla feugiat, odio metus condimentum tortor, id consequat risus ligula vel ante. Ut elit orci, finibus nec elit eget, feugiat semper ligula. Aenean nec rhoncus purus, vitae tempus enim. Quisque quis auctor urna. Donec quis laoreet ipsum. Aenean blandit massa vel tellus condimentum, sed vehicula magna ullamcorper.
      </Layout>
    </ThemeProvider>
  )
}

export default App
