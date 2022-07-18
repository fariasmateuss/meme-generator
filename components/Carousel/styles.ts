import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled(motion.div)`
  max-width: 100%;
  display: flex;
  align-items: center;
  overflow-x: hidden;
`;

export const Carousel = styled(motion.ul)`
  display: flex;
  cursor: grab;
`;

export const Slide = styled(motion.li)`
  position: relative;
  margin-right: 0.5rem;

  .template {
    border-radius: 4px;
    pointer-events: none;
  }
`;
