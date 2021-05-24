import styled from "styled-components";

import Chart from "~/components/core/Chart";

export const NetworkChartContainer = styled.div`
  display: flex;
  max-height: 800px;
  
  > *:nth-child(2) {
    flex: 3;
  }
`;

export const StyledChart = styled(Chart)`
  height: 100%;
  
  .links line {
    stroke: ${({ theme }) => `${theme.palette.gray.silver}`};
  }

  // network chart
  .nodes circle {
    fill: ${({ theme }) => `${theme.palette.orange.carrot}`};
    stroke: ${({ theme }) => `${theme.palette.white.base}`};
    stroke-width: 2px;
    
    &:hover {
      cursor: pointer;
    }
  }
    
  text {
    //font-size: 14px;
    //font-weight: bold;
    &.node-text {
      font-weight: bold;
    }
  }
`;
