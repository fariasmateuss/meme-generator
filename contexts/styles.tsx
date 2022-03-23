import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from 'styles/global';
import { theme } from 'styles/theme';
import { useThemeState } from './theme/ThemeContext';

export function StylesProvider({ children }: PropsWithChildren<unknown>) {
  const { mode } = useThemeState();
  const costumTheme = theme[mode];

  return (
    <ThemeProvider theme={costumTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
