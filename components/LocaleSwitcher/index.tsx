import { ChangeEvent, useCallback } from 'react';
import { useRouter } from 'next/router';

import * as S from 'styles/components/LocaleSwitcher';

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

  return (
    <S.Select onChange={changeLanguage} defaultValue={locale}>
      <option value="en">EN</option>
      <option value="pt">PT</option>
    </S.Select>
  );
}
