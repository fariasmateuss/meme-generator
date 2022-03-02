import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { shade } from 'polished';
import Switch from 'react-switch';

import * as S from 'styles/components/ToggleTheme';

type ToggleThemeProps = {
  toggleTheme(): void;
};

export function ToggleTheme({ toggleTheme }: ToggleThemeProps) {
  const { alto, name } = useContext(ThemeContext);

  return (
    <S.Wrapper>
      <Switch
        onChange={toggleTheme}
        checked={name === 'dark'}
        checkedIcon={false}
        uncheckedIcon={false}
        height={10}
        width={40}
        handleDiameter={20}
        offColor={shade(0.15, alto)}
        onColor={alto}
      />
    </S.Wrapper>
  );
}
