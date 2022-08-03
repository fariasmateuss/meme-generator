import { motion } from 'framer-motion';
import Image from 'next/image';

import { useThemeState } from 'contexts/theme/ThemeContext';
import { useI18nState } from 'contexts/i18n/I18Context';

import { LOGO_ANIMATION } from './animations';

export function Logo() {
  const { mode } = useThemeState();
  const { t } = useI18nState();

  const isDarkMode = mode === 'dark';

  return (
    <motion.div variants={LOGO_ANIMATION} initial="unMounted" animate="mounted">
      {isDarkMode ? (
        <Image
          src="/static/dark-logo.svg"
          alt={t.heading.meme_generator_description}
          aria-label={t.heading.meme_generator_description}
          width={383}
          height={155}
          objectFit="contain"
          placeholder="blur"
          blurDataURL="/static/dark-logo.svg"
          priority
        />
      ) : (
        <Image
          src="/static/light-logo.svg"
          alt={t.heading.meme_generator_description}
          area-label={t.heading.meme_generator_description}
          width={383}
          height={155}
          objectFit="contain"
          placeholder="blur"
          blurDataURL="/static/light-logo.svg"
          priority
        />
      )}
    </motion.div>
  );
}
