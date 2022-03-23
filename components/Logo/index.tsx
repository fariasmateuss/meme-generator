import Image from 'next/image';

import { useThemeState } from 'contexts/theme/ThemeContext';
import { useI18nState } from 'contexts/i18n/I18Context';

export function Logo() {
  const { mode } = useThemeState();
  const { t } = useI18nState();

  return mode === 'light' ? (
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
