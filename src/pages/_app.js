import { ThemeProvider } from 'styled-components';

import { theme } from '../styles/theme';
import GlobalStyle from '../styles/globals';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default MyApp;
