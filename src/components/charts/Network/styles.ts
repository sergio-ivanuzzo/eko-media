import styled from "styled-components";

export const ChartContainer = styled.svg`
    height: ${({ height }) => `${height}px;`};
    width: ${({ width }) => `${width}px;`};
    
    .links line {
      stroke: #999;
      stroke-opacity: 0.6;
    }

    .nodes circle {
      stroke: #fff;
      stroke-width: 1.5px;
    }
    
    text {
      font-family: sans-serif;
      font-size: 14px;
      font-weight: bold;
      color: red;
    }
`;
