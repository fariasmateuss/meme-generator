import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const Wrapper = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  ${media.lessThan('medium')`
    margin: 0 0.75rem;
  `}
`;

export const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Heading = styled(motion.h2)`
  font-size: 1.35rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.heading};

  @media screen and (max-width: 425px) {
    font-size: 1.25rem;
  }
`;

export const Input = styled(motion.input)`
  width: 100%;
  height: 2.5rem;
  border-radius: 0.5rem;
  padding: 0 15px;
  margin-bottom: 0.62rem;
  font-size: 0.875rem;

  ${({ theme }) => css`
    background: ${theme.input.background};
    border: 1px solid ${theme.input.borderColor};
    color: ${theme.input.color};
  `}
`;
