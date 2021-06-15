import { keyframes } from "styled-components";

export const ShakeAnimation = keyframes`
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
`;

export const FadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// to trick animationend event
export const NoopAnimation = keyframes`
  0% {}
  
  100% {}
`;
