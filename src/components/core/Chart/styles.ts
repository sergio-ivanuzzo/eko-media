import styled from "styled-components";

import brighten from "~/helpers/color/brighten";

import { NoSelectCSS } from "~/components/global.styles";

const DEFAULT_CHART_HEIGHT = 800;

export const ChartContainer = styled.div<IChartContainerProps>`
  width: 100%;
  height: ${({ height }) => height ? `${height}px;` : `${DEFAULT_CHART_HEIGHT}px`};
`;

export const SVG = styled.svg`
  width: 100%;
  height: 100%;
  
  .legends {
    width: 100%;
  }
  
  .tooltip {
    rect {
      fill: ${({ theme }) => brighten(theme.palette.cyan.azure, 95)};
      height: 30px;
      filter: drop-shadow( 5px 5px 5px rgba(0, 0, 0, .7));
      border-radius: 10px;
    }
    
    text {
      fill: ${({ theme }) => theme.palette.black.base};
      font-size: 18px;
      font-weight: bold;
    }
  }
  
  text {
    ${NoSelectCSS};
    font-family: "NeueHaasUnica", sans-serif;
    font-size: 14px;
  } 
`;
