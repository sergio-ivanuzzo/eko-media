import styled from "styled-components";

import { CustomFontCSS, NoSelectCSS } from "~/components/global.styles";

export const CardContainer = styled.div`
  ${CustomFontCSS};
  ${NoSelectCSS};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 300px;
  
  > * {
    margin: 5px;
  }
`;

export const Name = styled.div`
  ${CustomFontCSS};
  ${NoSelectCSS};
  text-transform: capitalize;
  font-size: 18px;
  text-align: center;
`;
