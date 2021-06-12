import styled, { css } from "styled-components";

import { FadeOutAnimation } from "~/components/global.animations";
import { CustomFontCSS, NoSelectCSS } from "~/components/global.styles";

const DEFAULT_CHART_HEIGHT = 800;

export const ChartTooltipCSS = css`
  position: absolute;
  display: inline-block;
  border-radius: 10px;
  padding: 5px 10px;
  text-transform: capitalize;
  width: min-content;
  white-space: pre-line;
  text-align: center;
  filter: drop-shadow( 5px 5px 5px rgba(0, 0, 0, .7));
  z-index: 10;
`;

export const ChartContainer = styled.div<IChartContainerProps>`
  width: 100%;
  height: ${({ height }) => height ? `${height}px;` : `${DEFAULT_CHART_HEIGHT}px`};
  animation: ${FadeOutAnimation} 1.5s ease-out both;
`;

export const SVG = styled.svg`
  width: 100%;
  height: 100%;
  position: relative;
  
  .legends {
    width: 100%;
  }
  
  text {
    ${CustomFontCSS};
    ${NoSelectCSS};
    font-size: 14px;
  } 
`;
