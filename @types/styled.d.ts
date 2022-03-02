import 'styled-components';

import light from 'styles/theme/light';
import dark from 'styles/theme/dark';

export type Theme = typeof light & typeof dark;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
