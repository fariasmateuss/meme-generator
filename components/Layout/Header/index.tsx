import { LocaleSwitcher } from 'components/LocaleSwitcher';
import { ToggleTheme } from 'components/ToggleTheme';

import * as S from './styles';

export function Header() {
  return (
    <S.Wrapper>
      <LocaleSwitcher />
      <ToggleTheme />
    </S.Wrapper>
  );
}
