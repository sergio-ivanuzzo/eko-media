import styled from "styled-components";

import { IChartContainerProps } from "~/components/charts/StackedBar/types";

export const BAR_HEIGHT = 32;

export const ChartContainer = styled.div<IChartContainerProps>`
  width: 100%;
  height: ${({ height }) => `${height}px;`};
`;

export const Svg = styled.svg`
  
  g {
    font-size: 14px;
  }
  
  g.axis {
    transform: translate(240px, 0px);
    
    path {
      display: none;
    }
  }
    
  g.group, rect {
    transform: translate(200px, 0px);
  }
`;
