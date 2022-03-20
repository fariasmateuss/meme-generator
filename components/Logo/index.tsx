import Image from 'next/image';

import { useStylesState } from 'contexts/styles/StylesContext';
import { useI18nState } from 'contexts/i18n/I18Context';

export function Logo() {
  const { theme } = useStylesState();
  const { t } = useI18nState();

  return theme === 'light' ? (
    <Image
      src="/static/light-logo.svg"
      alt={t.heading.meme_generator_description}
      aria-label={t.heading.meme_generator_description}
      width={383}
      height={155}
      objectFit="contain"
      priority
    />
  ) : (
    <Image
      src="/static/dark-logo.svg"
      alt={t.heading.meme_generator_description}
      area-label={t.heading.meme_generator_description}
      width={383}
      height={155}
      objectFit="contain"
      priority
    />
  );
}
