import { PropsWithChildren } from 'react';

import { StylesProvider } from './styles';

export function AppProvider({ children }: PropsWithChildren<unknown>) {
  return <StylesProvider>{children}</StylesProvider>;
}
