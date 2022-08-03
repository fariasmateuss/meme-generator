import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

import { ContainerProps } from './types';

const variants = {
  auto: css`
    width: auto;
  `,

  full: css`
    width: 100%;
  `,

  transparent: css`
    background: transparent;
  `,
};

export const AnimatedContainer = styled(motion.div)<ContainerProps>`
  ${({ theme, variant, background }) => css`
    max-width: 35rem;
    padding: 1.25rem;
    border-radius: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 15px 1px;
    margin: 0.5rem 0 1.9rem;
    background: ${background || theme.modal};

    ${variant && variants[variant]};
  `}
`;
