import { DEFAULT_TRANSITION } from 'constants/transitions';

export const CONTAINER_ANIMATION = {
  unMounted: { y: -20, opacity: 0 },
  mounted: {
    y: 0,
    opacity: 1,
    transition: {
      ...DEFAULT_TRANSITION,
      mass: 0.8,
    },
  },
};
