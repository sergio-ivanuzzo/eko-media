import styled from "styled-components";

import { CustomFontCSS, NoSelectCSS } from "~/components/global.styles";

export const CardContainer = styled.div<ICardContainerProps>`
  ${CustomFontCSS};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => `${width}px`};
  
  img {
    ${NoSelectCSS};
  }
  
  > * {
    margin: 5px;
  }
`;

export const Name = styled.div`
  ${CustomFontCSS};
  text-transform: capitalize;
  font-size: 18px;
  text-align: center;
  white-space: nowrap;
`;

export const CardText = styled.div`
  white-space: nowrap;
`;
