import styled from "styled-components";

import Chart from "~/components/core/Chart";

export const StyledChart = styled(Chart)`
  g.group, rect {
    transform: translate(200px, 0px);
  }
  
  g.axis {
    transform: translate(240px, 0px);
    
    text {
      font-size: 20px;
    }
    
    path {
      display: none;
    }
  }
`;
