import styled, { css } from 'styled-components';

export const Wrapper = styled.form`
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
