import { ChangeEvent, useCallback } from 'react';
import { useRouter } from 'next/router';
import useSound from 'use-sound';

import menuOpenSound from 'public/sounds/menu-open.mp3';

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
    <S.Container
      onChange={changeLanguage}
      onClick={handleClick}
      defaultValue={locale}
    >
      <option value="en">EN</option>
      <option value="pt">PT</option>
    </S.Container>
  );
}
