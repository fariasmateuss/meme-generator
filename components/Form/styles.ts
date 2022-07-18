import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const Wrapper = styled.form`
  h2 {
    font-size: 1.35rem;
    margin: 0.5rem 0 0.5rem;
    color: ${({ theme }) => theme.heading};

    ${media.lessThan('small')`
      font-size: 1.25rem;
    `}
  }

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
