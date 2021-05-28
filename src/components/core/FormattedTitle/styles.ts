import styled from "styled-components";

import { NoSelectCSS } from "~/components/global.styles";

export const Title = styled.h3`
  ${NoSelectCSS};
  > span {
    color: ${({ theme }) => theme.palette.orange.carrot};
  }
`;
