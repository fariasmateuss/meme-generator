import { PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import dynamic from 'next/dynamic';

import { I18nContainer } from './i18n/I18nProvider';
import { ToastsProvider } from './toasts/ToastsProvider';

const DynamicStylesProvider = dynamic(
  () => import('./styles').then(mod => mod.StylesProvider),
  {
    ssr: false,
  },
);

const DynamicThemeProvider = dynamic(
  () => import('./theme/ThemeProvider').then(mod => mod.ThemeProvider),
  {
    ssr: false,
  },
);

export function AppProvider({ children }: PropsWithChildren<unknown>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <DynamicThemeProvider>
      <DynamicStylesProvider>
        <ToastsProvider>
          <QueryClientProvider client={queryClient}>
            <I18nContainer>{children}</I18nContainer>
          </QueryClientProvider>
        </ToastsProvider>
      </DynamicStylesProvider>
    </DynamicThemeProvider>
  );
}
