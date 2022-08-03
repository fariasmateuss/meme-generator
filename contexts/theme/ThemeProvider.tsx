import { PropsWithChildren, useCallback, useEffect, useMemo } from 'react';

import { THEME_STORAGE_KEY } from 'constants/localStorage';
import { usePersistedState } from 'hooks/usePersistedState';

import { ThemeDispatchProvider, ThemeStateProvider } from './ThemeContext';
import { Theme } from './types';

const QUERY = '(prefers-color-scheme: light)';

export function ThemeProvider({ children }: PropsWithChildren<unknown>) {
  const [mode, setMode] = usePersistedState<Theme>(THEME_STORAGE_KEY, 'light');

  const onSelectMode = useCallback((mode: Theme) => {
    const currentMode = mode === 'light';

    setMode(currentMode ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    const listener = (event: MediaQueryListEvent) => {
      onSelectMode(event.matches ? 'dark' : 'light');
    };

    mediaQueryList.addEventListener('change', listener);

    onSelectMode(mediaQueryList.matches ? 'dark' : 'light');
  }, []);

  const themeState = useMemo(() => ({ mode }), [mode]);

  const themeDispatch = useMemo(() => ({ onSelectMode }), [onSelectMode]);

  return (
    <ThemeStateProvider value={themeState}>
      <ThemeDispatchProvider value={themeDispatch}>
        {children}
      </ThemeDispatchProvider>
    </ThemeStateProvider>
  );
}
