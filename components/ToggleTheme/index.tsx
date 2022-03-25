import { useCallback, useMemo } from 'react';
import useSound from 'use-sound';
import { MdLightMode, MdModeNight } from 'react-icons/md';
import { IconContext } from 'react-icons';

import { useThemeDispatch, useThemeState } from 'contexts/theme/ThemeContext';
import switchOnSound from 'public/sounds/switch-on.mp3';
import switchOffSound from 'public/sounds/switch-off.mp3';

import * as S from 'styles/components/ToggleTheme';

export function ToggleTheme() {
  const { mode } = useThemeState();
  const { onSelectMode } = useThemeDispatch();

  const isDarkMode = mode === 'dark';
  const [play] = useSound(isDarkMode ? switchOnSound : switchOffSound);
  const iconTitle = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode';
  const iconColor = isDarkMode
    ? 'var(--night-mode-color)'
    : 'var(--light-mode-color)';

  const handleClick = useCallback(() => {
    onSelectMode(mode);
    play();
  }, [mode, play]);

  const iconContextProviderValue = useMemo(
    () => ({
      color: iconColor,
      size: '24',
    }),
    [iconColor],
  );

  return (
    <S.Button onClick={handleClick} aria-label={iconTitle}>
      <IconContext.Provider value={iconContextProviderValue}>
        {isDarkMode ? <MdModeNight /> : <MdLightMode />}
      </IconContext.Provider>
    </S.Button>
  );
}
