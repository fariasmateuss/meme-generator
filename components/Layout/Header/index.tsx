import Image from 'next/image';

import { LocaleSwitcher } from 'components/LocaleSwitcher';
import { ToggleTheme } from 'components/ToggleTheme';
import {
  useStylesDispatch,
  useStylesState,
} from 'contexts/styles/StylesContext';

import * as S from 'styles/components/Layout/Header';

export function Header() {
  const { theme } = useStylesState();
  const { switchTheme } = useStylesDispatch();

  return (
    <S.Wrapper>
      <LocaleSwitcher />
      <ToggleTheme toggleTheme={() => switchTheme(theme)} />
    </S.Wrapper>
  );
}
