import styled from "styled-components";

import Chart from "~/components/core/Chart";
import { NoSelectCSS } from "~/components/global.styles";

export const StyledChart = styled(Chart)`
  .bubble {
    text {
      ${NoSelectCSS};
      font-size: 30px;
      font-weight: 400;
    }
  }
`;
