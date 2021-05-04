import styled from "styled-components";

import { IChartContainerProps } from "~/components/core/charts/StackedBar/types";

export const BAR_HEIGHT = 27;

export const ChartContainer = styled.svg<IChartContainerProps>`
  width: 800px;
  height: ${({ height }) => `${height}px;`};
  
  g.root {
    transform: translate(200px, 100px);
  }
  
  g.tick {
    font-size: 14px;
  }
`;
