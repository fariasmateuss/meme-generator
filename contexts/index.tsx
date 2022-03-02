import { PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';

const DynamicStylesProvider = dynamic(
  () => import('./styles').then(mod => mod.StylesProvider),
  {
    ssr: false,
  },
);

export function AppProvider({ children }: PropsWithChildren<unknown>) {
  return <DynamicStylesProvider>{children}</DynamicStylesProvider>;
}
