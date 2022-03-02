import { ChangeEvent } from 'react';
import { useRouter } from 'next/router';

import * as S from 'styles/components/LocaleSwitcher';

export function LocalSwitcher() {
  const router = useRouter();
  const { locale } = router;

  const changeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    const locale = event.target.value;
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <S.Wrapper>
      <S.Select onChange={changeLanguage} defaultValue={locale}>
        <option value="en">EN</option>
        <option value="pt">PT</option>
      </S.Select>
    </S.Wrapper>
  );
}
