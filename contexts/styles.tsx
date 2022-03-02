import { PropsWithChildren } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

import { ToggleTheme } from 'components/ToggleTheme';
import { usePersistedState } from 'hooks/usePersistedState';
import GlobalStyle from 'styles/global';

import dark from 'styles/theme/dark';
import light from 'styles/theme/light';

export function StylesProvider({ children }: PropsWithChildren<unknown>) {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light);

  const toggleTheme = () => {
    setTheme(theme.name === 'light' ? dark : light);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ToggleTheme toggleTheme={toggleTheme} />
      {children}
    </ThemeProvider>
  );
}
