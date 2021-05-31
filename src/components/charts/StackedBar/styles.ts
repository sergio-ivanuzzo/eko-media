import styled from "styled-components";

import Chart from "~/components/core/Chart";
import { MARGIN_LEFT, MARGIN_TOP } from "~/hooks/useChart/draw/useDrawStackedBar";

export const StyledChart = styled(Chart)`
  g.group, rect {
    //transform: translate(200px, 0px);
  }
  
  .groups-container, g.axis {
    transform: translate(0px, ${MARGIN_TOP * 2}px);
  }
  
  g.axis {
    transform: translate(${MARGIN_LEFT}px, ${MARGIN_TOP * 2}px);
    
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
