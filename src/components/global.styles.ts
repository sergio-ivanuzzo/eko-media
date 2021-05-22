import { createGlobalStyle, css } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "NeueHaasUnica";
    src: url(../../public/static/fonts/NeueHaasUnica-Regular.ttf);
  }
`;

export const OverflowCSS = css`
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
