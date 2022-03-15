import Switch from 'react-switch';
import { shade } from 'polished';

import { colors } from 'styles/theme';
import { useStylesState } from 'contexts/styles/StylesContext';

import { ToggleThemeProps } from './types';

export function ToggleTheme({ toggleTheme }: ToggleThemeProps) {
  const { theme } = useStylesState();

  return (
    <Switch
      onChange={toggleTheme}
      checked={theme === 'dark'}
      checkedIcon={false}
      uncheckedIcon={false}
      height={10}
      width={40}
      handleDiameter={20}
      offColor={shade(0.15, colors.light.alto)}
      onColor={colors.light.alto}
    />
  );
}
