import { PropsWithChildren, useCallback, useMemo } from 'react';

import { THEME_STORAGE_KEY } from 'constants/localStorage';
import { usePersistedState } from 'hooks/usePersistedState';

import { StylesDispatchProvider, StylesStateProvider } from './StylesContext';

export function StylesContainer({ children }: PropsWithChildren<unknown>) {
  const [theme, setTheme] = usePersistedState(THEME_STORAGE_KEY, 'light');

  const switchTheme = useCallback(
    theme => setTheme(theme === 'light' ? 'dark' : 'light'),
    [],
  );

  const stylesState = useMemo(() => ({ theme }), [theme]);

  const stylesDispatch = useMemo(() => ({ switchTheme }), [switchTheme]);

  return (
    <StylesStateProvider value={stylesState}>
      <StylesDispatchProvider value={stylesDispatch}>
        {children}
      </StylesDispatchProvider>
    </StylesStateProvider>
  );
}
