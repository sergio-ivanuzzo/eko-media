import { createGlobalStyle, css } from "styled-components";

import "react-toastify/dist/ReactToastify.min.css";

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

export const NoSelectCSS = css`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const NoActiveOutlineCSS = css`
  &:active, &:focus, &:focus-visible {
    outline: none !important;
  }
`;
