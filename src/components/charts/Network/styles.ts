import styled from "styled-components";

export const ChartContainer = styled.svg`
    height: ${({ height }) => `${height}px;`};
    width: ${({ width }) => `${width}px;`};
    
    .links line {
      stroke: ${({ theme }) => `${theme.palette.gray.silver}`};
    }

    .nodes circle {
      fill: ${({ theme }) => `${theme.palette.orange.carrot}`};
      stroke: white;
      stroke-width: 2px;
      
      &:hover {
        cursor: pointer;
      }
    }
    
    text {
      font-family: sans-serif;
      font-size: 14px;
      font-weight: bold;
    }
`;
