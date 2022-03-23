import { theme } from 'styles/theme';

export type Theme = keyof typeof theme;

export type ThemeStateContextData = {
  mode: Theme;
};

export type ThemeDispatchContextData = {
  onSelectMode: (mode: Theme) => void;
};
