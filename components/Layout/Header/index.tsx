import { LocaleSwitcher } from 'components/LocaleSwitcher';
import { ToggleTheme } from 'components/ToggleTheme';
import { useThemeDispatch, useThemeState } from 'contexts/theme/ThemeContext';

import * as S from 'styles/components/Layout/Header';

export function Header() {
  const { mode } = useThemeState();
  const { onSelectMode } = useThemeDispatch();

  return (
    <S.Wrapper>
      <LocaleSwitcher />
      <ToggleTheme toggleTheme={() => onSelectMode(mode)} />
    </S.Wrapper>
  );
}
