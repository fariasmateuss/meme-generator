import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;

  img {
    width: 5.5rem;
    height: auto;
    border-radius: 20px;
  }

  div {
    margin-left: 1rem;

    h1 {
      font-family: Bangers;
      font-size: 2.5rem;
      color: ${props => props.theme.colors.black};
    }
  }
`;
