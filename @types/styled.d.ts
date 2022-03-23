/* eslint @typescript-eslint/no-empty-interface: "off" */
import 'styled-components';

import { light as defaultTheme } from 'styles/theme/colors';

export type Theme = typeof defaultTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
