import styled from "styled-components";

import { NoSelectCSS } from "~/components/global.styles";

export const Heading = styled.h1<IFormattedTitleProps>`
  ${NoSelectCSS};
  
  ${({ inline }) => inline && "display: inline"};
  
  > span {
    color: ${({ theme }) => theme.palette.orange.carrot};
  }
`;
