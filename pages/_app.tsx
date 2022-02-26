import { AppProps } from 'next/app';

import { AppProvider } from 'contexts';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
