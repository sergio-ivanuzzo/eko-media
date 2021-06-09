import styled from "styled-components";

import { CustomFontCSS, NoSelectCSS } from "~/components/global.styles";

export const Heading = styled.h1<IFormattedTitleProps>`
  ${NoSelectCSS};
  ${CustomFontCSS};
  
  ${({ inline }) => inline && "display: inline"};
  
  > span {
    color: ${({ theme }) => theme.palette.orange.carrot};
  }
`;
