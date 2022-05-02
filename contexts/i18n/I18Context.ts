import { useContext, createContext } from 'react';

import { I18nStateContextData } from './types';

export const I18nStateContext = createContext<I18nStateContextData | undefined>(
  undefined,
);

export const I18nStateProvider = I18nStateContext.Provider;

export function useI18nState() {
  const context = useContext(I18nStateContext);

  if (!context) {
    throw new Error('useI18nState must be used within a I18nProvider');
  }

  return context;
}
