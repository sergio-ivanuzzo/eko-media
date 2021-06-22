import styled from "styled-components";

import { CustomFontCSS } from "~/components/global.styles";

export const Heading = styled.h1<IFormattedTitleProps>`
  ${CustomFontCSS};
  
  ${({ inline }) => inline && "display: inline"};
  
  > span {
    color: ${({ theme }) => theme.palette.orange.carrot};
  }
`;
