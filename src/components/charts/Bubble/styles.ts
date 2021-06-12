import styled from "styled-components";

import Chart from "~/components/core/Chart";

import { NoSelectCSS } from "~/components/global.styles";
import { NoopAnimation } from "~/components/global.animations";

export const StyledChart = styled(Chart)`
  .bubble {
    text {
      ${NoSelectCSS};
      font-size: 20px;
      font-weight: 400;
    }
    
    circle {
      transition: all 0.25s linear;
    }
    
    .transition {
      //animation: shake 0.57s cubic-bezier(.36,.07,.19,.97) both;
      //animation: grow .5s linear both;

      filter: 
        contrast(var(--value, 2)) 
        invert(var(--value, 100%)) 
        opacity(var(--value, 25%)) 
        drop-shadow(5px 3px 5px ${({ theme }) => theme.palette.gray.silver}) 
        saturate(var(--value, 5));
    }
    
    .animate {
      animation: ${NoopAnimation} 0.5s linear both;
    }

    
    &:hover {
      cursor: pointer;
    }
  }
`;
