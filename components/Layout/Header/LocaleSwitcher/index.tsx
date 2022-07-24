import { ChangeEvent, useCallback } from 'react';
import { useRouter } from 'next/router';
import useSound from 'use-sound';

import menuOpenSound from 'public/sounds/menu-open.mp3';

import { CONTAINER_ANIMATION, ITEM_ANIMATION } from './animations';
import * as S from './styles';

export function LocaleSwitcher() {
  const router = useRouter();
  const { locale } = router;

  const changeLanguage = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const locale = event.target.value;
      router.push(router.pathname, router.asPath, { locale });
    },
    [],
  );

  const [play] = useSound(menuOpenSound);

  const handleClick = () => {
    play();
  };

  return (
    <S.AnimetedContainer
      variants={CONTAINER_ANIMATION}
      onChange={changeLanguage}
      onClick={handleClick}
      defaultValue={locale}
    >
      <S.AnimetedOption variants={ITEM_ANIMATION} value="en">
        EN
      </S.AnimetedOption>
      <S.AnimetedOption variants={ITEM_ANIMATION} value="pt">
        PT
      </S.AnimetedOption>
    </S.AnimetedContainer>
  );
}
