import styled from 'styled-components';

export const Wrapper = styled.header`
  display: flex;
  align-items: center;
  margin-top: 1.9rem;
  text-align: center;

  @media screen and (max-width: 425px) {
    flex-direction: column;

    img {
      max-width: 80px;
      max-height: 80px;
    }
  }

  h1 {
    font-family: 'Luckiest Guy';
    font-size: 3.5rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    color: ${({ theme }) => theme.white};
    text-transform: uppercase;
    text-shadow: 0 4px 1px ${({ theme }) => theme['black-secondary']};
    margin-left: 0.5rem;

    @media screen and (max-width: 425px) {
      font-size: 2.25rem;
    }
  }
`;
