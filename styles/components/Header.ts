import styled from 'styled-components';

export const Wrapper = styled.header`
  display: flex;
  gap: 1rem;
  align-items: center;
  text-align: center;

  @media screen and (max-width: 450px) {
    flex-direction: column;
  }

  h1 {
    font-family: 'Luckiest Guy';
    font-size: 3.5rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    color: ${({ theme }) => theme.colors.white};
    text-transform: uppercase;
    text-shadow: 0 4px 1px ${({ theme }) => theme.colors['black-secondary']};

    @media screen and (max-width: 425px) {
      font-size: 2.25rem;
    }
  }
`;
