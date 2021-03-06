import styled from "styled-components";

import Chart from "~/components/core/Chart";
import { FadeInAnimation } from "~/components/global.animations";

export const StyledChart = styled(Chart)`
  text {
    font-weight: bold;
    font-size: 18px;
    opacity: 0;
    animation: ${FadeInAnimation} 1.5s ease-out both;
  }
  path {
    transition: all 0.15s linear;
    animation: ${FadeInAnimation} 0.5s ease-out both;
  }
`;
