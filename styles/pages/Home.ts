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

export const Card = styled.div`
  width: min(35rem, 100%);
  padding: 1.25rem;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 15px 1px;
  margin: 0.5rem 0 1.9rem;
  background: ${({ theme }) => theme.modal};

  .generated {
    width: min(35rem, 100%);
    height: auto;
  }

  h2 {
    font-size: 1.35rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.heading};

    @media screen and (max-width: 425px) {
      font-size: 1.25rem;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Carousel = styled(motion.div)`
  max-width: 100%;
  height: 10rem;
  display: flex;
  align-items: center;
  overflow-x: hidden;
`;

export const Slide = styled(motion.ul)`
  display: flex;
  cursor: grab;
`;

export const InnerItem = styled(motion.li)`
  position: relative;
  margin-right: 0.5rem;

  .template {
    border-radius: 4px;
    pointer-events: none;
  }
`;

export const Form = styled.form`
  input {
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
  }
`;
