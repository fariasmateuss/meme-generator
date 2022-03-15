import { useContext, createContext } from 'react';
import { StylesDispatchContextData, StylesStateContextData } from './types';

export const StylesStateContext = createContext<
  StylesStateContextData | undefined
>(undefined);

export const StylesDispatchContext = createContext<
  StylesDispatchContextData | undefined
>(undefined);

export const StylesStateProvider = StylesStateContext.Provider;
export const StylesDispatchProvider = StylesDispatchContext.Provider;

export function useStylesState() {
  const context = useContext(StylesStateContext);

  if (!context) {
    throw new Error('useStylesState must be used within a StylesProvider');
  }

  return context;
}

export function useStylesDispatch() {
  const context = useContext(StylesDispatchContext);

  if (!context) {
    throw new Error('useStylesDispatch must be used within StylesProvider');
  }

  return context;
}
