import styled from "styled-components";

import { NoSelectCSS } from "~/components/global.styles";

export const LogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 2;
`;

export const AppName = styled.div`
  ${NoSelectCSS};
  color: ${({ theme }) => `${theme.palette.black.base}`};
  font-size: 40px;
  line-height: 40px;
  margin: 0 auto;
  white-space: nowrap;
`;
