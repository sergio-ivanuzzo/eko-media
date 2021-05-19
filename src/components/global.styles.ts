import { createGlobalStyle, css } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "NeueHaasUnica";
    src: url(../../public/static/fonts/NeueHaasUnica-Regular.ttf);
  }
  
  svg {
    float: right;
  }
`;

export const OverflowCSS = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
