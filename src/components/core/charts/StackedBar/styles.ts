import styled from "styled-components";

import { IChartContainerProps } from "~/components/core/charts/StackedBar/types";

export const BAR_HEIGHT = 27;

export const ChartContainer = styled.svg<IChartContainerProps>`
  width: 800px;
  height: ${({ itemsAmount }) => `${itemsAmount * BAR_HEIGHT}px;`};
  
  g.group {
    transform: translate(200px, 100px);
  }
  
  g.x-axis, g.y-axis {
    font-size: 14px;
  }
`;
