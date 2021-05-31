import styled from "styled-components";

import Chart from "~/components/core/Chart";

export const StyledChart = styled(Chart)`
  rect {
    &.hovered {
      fill: ${({ theme }) => theme.palette.orange.carrot};
    }
    
    &:hover {
      cursor: pointer;
    }
  }
  
  text {
    font-size: 18px;
    
    &:hover {
      cursor: pointer;
    }
  }
`;
