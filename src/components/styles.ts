import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "NeueHaasUnica";
    src: url(../../public/static/fonts/NeueHaasUnica-Regular.ttf);
  }
  
  svg {
    float: right;
  }
`;
