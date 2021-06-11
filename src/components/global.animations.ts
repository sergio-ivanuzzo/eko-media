import { css } from "styled-components";

export const ShakeAnimationCSS = css`
  @keyframes shake {
    10%, 90% {
      transform: translate3d(-1px, 1px, 0);
    }
        
    20%, 80% {
      transform: translate3d(2px, -1px, 0);
    }
      
    30%, 50%, 70% {
      transform: translate3d(-4px, -4px, 0);
    }
      
    40%, 60% {
      transform: translate3d(4px, 4px, 0);
    }
  }
`;
