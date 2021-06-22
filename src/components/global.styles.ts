import { FlattenSimpleInterpolation, createGlobalStyle, css } from "styled-components";

import { AlignItems, JustifyContent } from "~/components/global.constants";
import "react-toastify/dist/ReactToastify.min.css";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "NeueHaasUnica";
    src: url(../../static/fonts/NeueHaasUnica-Regular.ttf);
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

export const DisabledCSS = css`
  &:disabled {
    color: ${({ theme }) => theme.palette.gray.silver};
    
    * {
      color: ${({ theme }) => theme.palette.gray.silver};
    }
    
    &:hover {
      cursor: default;
    }
  }
`;

export const CustomFontCSS = css`
  font-family: "NeueHaasUnica", sans-serif;
  line-height: 18px;
`;

const PrimaryStartCSS = css`
  justify-content: flex-start;
`;

const PrimaryCenterCSS = css`
  justify-content: center;
`;

const PrimaryEndCSS = css`
  justify-content: flex-end;
`;

const PrimarySpaceAroundCSS = css`
  justify-content: space-around;
`;

const PrimarySpaceBetweenCSS = css`
  justify-content: space-between;
`;

const SecondaryStartCSS = css`
  align-items: flex-start;
`;

const SecondaryCenterCSS = css`
  align-items: center;
`;

const SecondaryEndCSS = css`
  align-items: flex-end;
`;

const SecondaryInheritCSS = css`
  align-items: inherit;
`;

export const getPrimaryAlign = (align?: JustifyContent): FlattenSimpleInterpolation => {
    switch (align) {
        case JustifyContent.START: {
            return PrimaryStartCSS;
        }
        case JustifyContent.CENTER: {
            return PrimaryCenterCSS;
        }
        case JustifyContent.END: {
            return PrimaryEndCSS;
        }
        case JustifyContent.SPACE_AROUND: {
            return PrimarySpaceAroundCSS;
        }
        case JustifyContent.SPACE_BETWEEN: {
            return PrimarySpaceBetweenCSS;
        }
        default: {
            return PrimaryStartCSS;
        }
    }
}

export const getSecondaryAlign = (align?: AlignItems): FlattenSimpleInterpolation => {
    switch (align) {
        case AlignItems.START: {
            return SecondaryStartCSS;
        }
        case AlignItems.CENTER: {
            return SecondaryCenterCSS;
        }
        case AlignItems.END: {
            return SecondaryEndCSS;
        }
        case AlignItems.INHERIT: {
            return SecondaryInheritCSS;
        }
        default: {
            return SecondaryCenterCSS;
        }
    }
}
