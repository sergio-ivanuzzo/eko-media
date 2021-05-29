import styled from "styled-components";

import Chart from "~/components/core/Chart";

export const StyledChart = styled(Chart)`
  g.group, rect {
    transform: translate(200px, 0px);
  }
  
  g.axis {
    transform: translate(240px, 0px);
    
    path {
      display: none;
    }
  }
`;
