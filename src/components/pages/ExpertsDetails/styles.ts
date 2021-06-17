import styled from "styled-components";

import { OverflowCSS } from "~/components/global.styles";

export const ExpertInfoContainer = styled.div`
  display: flex;
  padding: 5px;
  height: 200px;
  
  > :first-child {
    flex: 2;
  }
  
  > :last-child :nth-child(odd) {
    font-weight: bold;
  }
  
  > :last-child {
    > * {
      width: 300px;
      ${OverflowCSS};
    }
  }
`;

export const ExpertInfo = styled.div`
  > div {
    overflow-y: hidden;
  }
`;
