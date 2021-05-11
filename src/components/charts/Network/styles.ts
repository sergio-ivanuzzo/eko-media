import styled from "styled-components";

export const ChartContainer = styled.div`
  width: 100%;
  height: 800px;
`;

export const Svg = styled.svg`
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
      font-family: sans-serif;
      font-size: 14px;
      font-weight: bold;
    }
`;
