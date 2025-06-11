import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
  }

  #root {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
`;