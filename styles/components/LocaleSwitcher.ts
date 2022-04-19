import styled, { css } from 'styled-components';

export const Select = styled.select`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.alto};

  option {
    background-color: transparent;
  }
`;
