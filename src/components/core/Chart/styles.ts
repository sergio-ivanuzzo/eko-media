import styled, { css } from "styled-components";

import { FadeInAnimation } from "~/components/global.animations";
import { CustomFontCSS, NoSelectCSS } from "~/components/global.styles";

const DEFAULT_CHART_HEIGHT = 800;

export const ChartTooltipCSS = css`
  ${NoSelectCSS};
  position: absolute;
  display: inline-block;
  border-radius: 10px;
  padding: 5px 10px;
  text-transform: capitalize;
  width: min-content;
  white-space: pre-line;
  text-align: center;
  // seems like animation with filter works incorrectly in safari
  //filter: drop-shadow( 5px 5px 5px rgba(0, 0, 0, .7));
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, .7);
  z-index: 10;
`;

export const ChartContainer = styled.div<IChartContainerProps>`
  width: 100%;
  height: ${({ height }) => height ? `${height}px;` : `${DEFAULT_CHART_HEIGHT}px`};
  //animation: ${FadeInAnimation} 1.5s ease-out both;
  //padding-bottom: 100%; // aspect ratio
`;

export const SVG = styled.svg`
  width: 100%;
  height: 100%;
  //position: relative;
  
  .legends {
    width: 100%;
  }
  
  text {
    ${CustomFontCSS};
    ${NoSelectCSS};
    font-size: 14px;
  } 
`;

export const ChartHint = styled.div`
  ${CustomFontCSS};
  font-size: 14px;
  text-align: center;
  color: ${({ theme }) => theme.palette.gray.silver};
  width: 100%;
  
  span {
      &:hover {
        cursor: help;
        color: ${({ theme }) => theme.palette.black.base};
      }
  }
`;

export const LegendsContainer = styled.div<ILegendsContainerProps>`
  display: flex;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;  
      
  ${({ offset }) => offset && `
    width: calc(100% - ${offset}px);
    margin-left: ${offset}px;
  `};
  
  > * {
    margin: 10px 10px 10px 0;
  }
  
  .legend {
    display: flex;
    align-items: center;
    
    > * {
      margin-right: 10px;
    }
  }
  
  .marker {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
`;
