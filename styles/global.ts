import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: 'Roboto',sans-serif;
    font-size: 1rem;
    font-weight: 400;
  }

  input,
  button {
    outline: 0;
  }

  button {
    border: 0;
    outline: 0;
    cursor: pointer;
  }

  ul {
    list-style-type: none;
  }

  :root {
    --loader-color: ${({ theme }) => theme.text};
    --loading-color: ${({ theme }) => theme.loading};
    --night-mode-color: #C5CFDC;
    --light-mode-color: #F9B52A;
  }
`;
