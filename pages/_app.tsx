import { ThemeProvider } from 'styled-components';

import { theme } from 'styles/theme';
import GlobalStyles from 'styles/global';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default MyApp;
