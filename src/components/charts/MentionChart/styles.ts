import styled from "styled-components";

import Chart from "~/components/core/Chart";
import { MARGIN_LEFT } from "~/hooks/useChart/draw/useDrawStackedBar";

export const StyledChart = styled(Chart)`
  g.group, rect {
    //transform: translate(200px, 0px);
  }
  
  g.axis {
    transform: translate(${MARGIN_LEFT}px, 0px);
    
    path {
      display: none;
    }
  }
  
  text.label {
    fill: black;
    font-family: "NeueHaasUnica", sans-serif;
    font-weight: bold;
  }
`;
