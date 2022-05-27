import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 100 900;
    font-display: optional;
    src: url(/fonts/inter-var-latin.woff2) format('woff2');
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }

  body, button, textarea, input {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
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

  #root, body, html {
    height: 100%;
  }
  
  :root {
    --loader-color: ${({ theme }) => theme.text};
    --loading-color: ${({ theme }) => theme.loading};
    --night-mode-color: #C5CFDC;
    --light-mode-color: #F9B52A;
  }
`;
