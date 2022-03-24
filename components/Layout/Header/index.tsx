import { LocaleSwitcher } from 'components/LocaleSwitcher';
import { ToggleTheme } from 'components/ToggleTheme';

import * as S from 'styles/components/Layout/Header';

export function Header() {
  return (
    <S.Wrapper>
      <LocaleSwitcher />
      <ToggleTheme />
    </S.Wrapper>
  );
}
