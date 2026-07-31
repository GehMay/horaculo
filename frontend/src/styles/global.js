import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #006341;
    --primary-hover: #39A935;
    --bg-color: #f4f6f8;
    --surface-color: #ffffff;
    --text-primary: #1a1a1a;
    --text-secondary: #555555;
    --border-radius: 8px;
    --transition: 0.3s ease;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
    background-color: var(--bg-color);
    color: var(--text-primary);
    line-height: 1.5;
    font-weight: 400;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    font-weight: 500;
    color: var(--primary-color);
    text-decoration: inherit;
    transition: color var(--transition);
  }
  a:hover {
    color: var(--primary-hover);
  }
`;
