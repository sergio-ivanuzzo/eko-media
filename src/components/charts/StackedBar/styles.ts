import styled from "styled-components";

import Chart from "~/components/core/Chart";

import { CustomFontCSS } from "~/components/global.styles";
import { MARGIN_LEFT } from "~/hooks/useChart/draw/useDrawStackedBar";
import Placeholder from "~/components/core/Placeholder";

export const StyledChart = styled(Chart)`
  rect {
    &:hover {
      cursor: pointer;
    }
  }  
  
  g.axis {
    transform: translate(${MARGIN_LEFT}px, 0px);
    
    path {
      display: none;
    }
  }
  
  text.label {
    ${CustomFontCSS};
    fill: black;
    font-weight: bold;
  }
`;

export const StyledPlaceholder = styled(Placeholder)`
  margin-left: ${MARGIN_LEFT}px;
`;

