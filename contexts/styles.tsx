import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from 'styles/theme';
import GlobalStyle from 'styles/global';

export function StylesProvider({ children }: PropsWithChildren<unknown>) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
