import styled from 'styled-components';
import { motion } from 'framer-motion';

export const AnimetedContainer = styled(motion.div)`
  max-width: 100%;
  height: 8.625rem;
  display: flex;
  align-items: center;
  overflow-x: hidden;
  margin: 0.5rem 0;
`;

export const AnimetedCarousel = styled(motion.ul)`
  display: flex;
  cursor: grab;
`;

export const AnimetedSlide = styled(motion.li)`
  position: relative;
  margin-right: 0.5rem;

  .template {
    border-radius: 4px;
    pointer-events: none;
  }
`;
