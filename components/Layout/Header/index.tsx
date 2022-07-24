import { LocaleSwitcher } from './LocaleSwitcher';
import { ToggleTheme } from './ToggleTheme';

import { CONTAINER_ANIMATION } from './animations';
import * as S from './styles';

export function Header() {
  return (
    <S.AnimatedContainer
      variants={CONTAINER_ANIMATION}
      initial="unMounted"
      animate="mounted"
    >
      <LocaleSwitcher />
      <ToggleTheme />
    </S.AnimatedContainer>
  );
}
