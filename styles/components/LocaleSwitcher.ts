import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 1rem;
  left: 2rem;
`;

export const Select = styled.select`
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  border: none;
`;
