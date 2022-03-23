import { PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import dynamic from 'next/dynamic';

import { I18nContainer } from './i18n/I18nProvider';

const DynamicStylesProvider = dynamic(
  () => import('./styles').then(mod => mod.StylesProvider),
  {
    ssr: false,
  },
);

const DynamicStylesContainer = dynamic(
  () => import('./theme/ThemeProvider').then(mod => mod.ThemeContainer),
  {
    ssr: false,
  },
);

export function AppProvider({ children }: PropsWithChildren<unknown>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <DynamicStylesContainer>
      <DynamicStylesProvider>
        <QueryClientProvider client={queryClient}>
          <I18nContainer>{children}</I18nContainer>
        </QueryClientProvider>
      </DynamicStylesProvider>
    </DynamicStylesContainer>
  );
}
