import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';

import { colors } from 'styles/theme';
import GlobalStyle from 'styles/global';

import { useStylesState } from './styles/StylesContext';

export function StylesProvider({ children }: PropsWithChildren<unknown>) {
  const { theme } = useStylesState();

  return (
    <ThemeProvider theme={colors[theme]}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
