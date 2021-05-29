import styled from "styled-components";

import { NoSelectCSS } from "~/components/global.styles";

export const Heading = styled.h1`
  ${NoSelectCSS};
  font-family: var(--heading-font-family);
  font-style: normal;
  color: var(--color-black);
  
  > span {
    color: ${({ theme }) => theme.palette.orange.carrot};
  }
`;
