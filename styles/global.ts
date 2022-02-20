import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.black};

    font-family: 'Roboto',sans-serif;
    font-size: 1rem;
    font-weight: 400;
  }

  input,
  button {
    outline: 0;
  }

  button {
    cursor: pointer;
  }
`;
