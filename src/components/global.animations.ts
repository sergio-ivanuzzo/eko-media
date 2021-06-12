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

export const FadeOutAnimation = keyframes`
  0% {
    opacity: 0;
  }
  
  10% {
    opacity: 0.2;
  }
        
  30% {
    opacity: 0.4;
  }
      
  50% {
    opacity: 0.6;
  }
    
  70% {
    opacity: 0.8;
  }
      
  100% {
    opacity: 1;
  }
`;

// to trick animationend event
export const NoopAnimation = keyframes`
  //0% {}
  //
  //100% {}
`;
