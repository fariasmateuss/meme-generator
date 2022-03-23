import Switch from 'react-switch';

import { theme } from 'styles/theme';
import { useThemeState } from 'contexts/theme/ThemeContext';
import { ToggleThemeProps } from './types';

export function ToggleTheme({ toggleTheme }: ToggleThemeProps) {
  const { mode } = useThemeState();

  return (
    <Switch
      onChange={toggleTheme}
      checked={mode === 'dark'}
      checkedIcon={false}
      uncheckedIcon={false}
      height={10}
      width={40}
      handleDiameter={20}
      offColor={theme.light.alto}
      onColor={theme.light.alto}
    />
  );
}
