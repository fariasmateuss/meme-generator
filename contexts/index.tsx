import { PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';

const DynamicStylesProvider = dynamic(
  () => import('./styles').then(mod => mod.StylesProvider),
  {
    ssr: false,
  },
);

const DynamicStylesContainer = dynamic(
  () => import('./styles/StylesProvider').then(mod => mod.StylesContainer),
  {
    ssr: false,
  },
);

export function AppProvider({ children }: PropsWithChildren<unknown>) {
  return (
    <DynamicStylesContainer>
      <DynamicStylesProvider>{children}</DynamicStylesProvider>
    </DynamicStylesContainer>
  );
}
