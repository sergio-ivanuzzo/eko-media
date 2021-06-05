import styled from "styled-components";

import Chart from "~/components/core/Chart";
import { MARGIN_LEFT, TRANSITION_Y } from "~/hooks/useChart/draw/useDrawStackedBar";

export const StyledChart = styled(Chart)`
  rect {
    &:hover {
      cursor: pointer;
    }
  }  
  
  .groups-container, g.axis {
    transform: translate(0px, ${TRANSITION_Y}px);
  }
  
  g.axis {
    transform: translate(${MARGIN_LEFT}px, ${TRANSITION_Y}px);
    
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
