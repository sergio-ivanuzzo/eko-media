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

export const StackedBarContainer = styled.div`
  width: 100%;
  flex: 3;
  margin: 0 10px;
  
  > * {
    margin-top: 10px;
    margin-bottom: 20px;
  }
`;
