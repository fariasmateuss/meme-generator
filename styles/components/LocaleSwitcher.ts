import styled, { css } from 'styled-components';

export const Select = styled.select`
  background-color: transparent;
  border: none;
  ${({ theme }) =>
    css`
      color: ${theme.alto};
    `};

  option {
    background-color: transparent;
  }
`;
