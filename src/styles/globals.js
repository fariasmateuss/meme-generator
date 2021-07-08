import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${props => props.theme.background};
    color: ${props => props.theme.black};
    font: 400 1rem Roboto, sans-serif;
  }

  input,
  button {
    outline: 0;
  }

  button {
    cursor: pointer;
  }
`;
