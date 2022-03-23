import { useContext, createContext } from 'react';
import { ThemeDispatchContextData, ThemeStateContextData } from './types';

export const ThemeStateContext = createContext<
  ThemeStateContextData | undefined
>(undefined);

export const ThemeDispatchContext = createContext<
  ThemeDispatchContextData | undefined
>(undefined);

export const ThemeStateProvider = ThemeStateContext.Provider;
export const ThemeDispatchProvider = ThemeDispatchContext.Provider;

export function useThemeState() {
  const context = useContext(ThemeStateContext);

  if (!context) {
    throw new Error('useThemeState must be used within a ThemeProvider');
  }

  return context;
}

export function useThemeDispatch() {
  const context = useContext(ThemeDispatchContext);

  if (!context) {
    throw new Error('useThemeDispatch must be used within ThemeProvider');
  }

  return context;
}
