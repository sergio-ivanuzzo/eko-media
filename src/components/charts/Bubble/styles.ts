import styled from "styled-components";

import Chart from "~/components/core/Chart";

import { NoSelectCSS } from "~/components/global.styles";

export const StyledChart = styled(Chart)`
  .bubble {
    text {
      ${NoSelectCSS};
      font-size: 20px;
      font-weight: 400;
      
      &.single-cluster {
        font-size: 40px;
      }
    }
    
    .with-transition {
      filter: 
        contrast(var(--value, 2)) 
        invert(var(--value, 100%)) 
        opacity(var(--value, 25%)) 
        drop-shadow(5px 3px 5px ${({ theme }) => theme.palette.gray.silver}) 
        saturate(var(--value, 5));
        
      transition: filter 0.25s linear;
    }
    
    .no-transition {
      transition: filter 1.25s linear;
    }
    
    &:hover {
      cursor: pointer;
    }
  }
`;
