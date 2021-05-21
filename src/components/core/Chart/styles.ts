import styled from "styled-components";

const DEFAULT_CHART_HEIGHT = 800;

export const DEFAULT_TEXT_SIZE = 40;
export const MAX_TEXT_SIZE = 80;

export const ChartContainer = styled.div<IChartContainerProps>`
  width: 100%;
  height: ${({ height }) => height ? `${height}px;` : `${DEFAULT_CHART_HEIGHT}px`};
`;

export const SVG = styled.svg`

  font-family: "NeueHaasUnica", sans-serif;
  width: 100%;
  height: 100%;
  
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
  
  .links line {
    stroke: ${({ theme }) => `${theme.palette.gray.silver}`};
  }

  .nodes circle {
    fill: ${({ theme }) => `${theme.palette.orange.carrot}`};
    stroke: ${({ theme }) => `${theme.palette.white.base}`};
    stroke-width: 2px;
    
    &:hover {
      cursor: pointer;
    }
  }
    
  text {
    font-size: 14px;
    font-weight: bold;
  }
  
  .bubble {
    text {
      font-size: ${DEFAULT_TEXT_SIZE}px;
      font-weight: 400;
    }
  }
  
`;
