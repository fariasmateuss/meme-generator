import { DEFAULT_TRANSITION } from 'constants/transitions';

export const LOGO_ANIMATION = {
  unMounted: { x: -50, opacity: 0 },
  mounted: {
    x: 0,
    opacity: 1,
    transition: { delay: 1, ...DEFAULT_TRANSITION },
  },
};
