import { PropsWithChildren, useCallback, useEffect, useMemo } from 'react';

import { THEME_STORAGE_KEY } from 'constants/localStorage';
import { usePersistedState } from 'hooks/usePersistedState';

import { ThemeDispatchProvider, ThemeStateProvider } from './ThemeContext';
import { Theme } from './types';

export function ThemeContainer({ children }: PropsWithChildren<unknown>) {
  const [mode, setMode] = usePersistedState<Theme>(THEME_STORAGE_KEY, 'light');

  const onSelectMode = useCallback((mode: Theme) => {
    setMode(mode === 'light' ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: light)')
      .addEventListener('change', e =>
        onSelectMode(e.matches ? 'dark' : 'light'),
      );

    onSelectMode(
      window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'dark'
        : 'light',
    );
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
