import { motion } from 'framer-motion';
import styled from 'styled-components';

export const AnimetedContainer = styled(motion.select)`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.alto};
`;

export const AnimetedOption = styled(motion.option)`
  background: transparent;
`;
