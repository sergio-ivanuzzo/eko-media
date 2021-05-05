import styled from "styled-components";

import { IChartContainerProps } from "~/components/core/charts/StackedBar/types";

export const BAR_HEIGHT = 32;

export const ChartContainer = styled.svg<IChartContainerProps>`
  height: ${({ height }) => `${height}px;`};
  width: ${({ width }) => `${width}px;`};
  
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
