import { PropsWithChildren, useMemo } from 'react';
import { useRouter } from 'next/router';

import en from 'locales/en/common.json';
import pt from 'locales/pt/common.json';
import { I18nStateProvider } from './I18Context';

export function I18nContainer({ children }: PropsWithChildren<unknown>) {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : pt;

  const i18nState = useMemo(() => ({ t }), [t]);

  return <I18nStateProvider value={i18nState}>{children}</I18nStateProvider>;
}
