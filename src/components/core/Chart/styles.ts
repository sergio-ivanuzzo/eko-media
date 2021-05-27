import styled from "styled-components";

import { NoSelectCSS } from "~/components/global.styles";

const DEFAULT_CHART_HEIGHT = 800;

export const ChartContainer = styled.div<IChartContainerProps>`
  width: 100%;
  height: ${({ height }) => height ? `${height}px;` : `${DEFAULT_CHART_HEIGHT}px`};
`;

export const SVG = styled.svg`
  width: 100%;
  height: 100%;
  
  text {
    ${NoSelectCSS};
    font-family: "NeueHaasUnica", sans-serif;
    font-size: 14px;
  } 
`;
