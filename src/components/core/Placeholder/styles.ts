import styled from "styled-components";

import { NoSelectCSS, getPrimaryAlign, getSecondaryAlign } from "~/components/global.styles";

export const PlaceholderContainer = styled.div<IPlaceholderProps>`
  width: 100%;
  height: 100%;
  display: flex;
  font-family: "NeueHaasUnica", sans-serif;
  
  ${({ primaryAlign }) => getPrimaryAlign(primaryAlign)};
  ${({ secondaryAlign }) => getSecondaryAlign(secondaryAlign)};
  color: ${({ theme }) => theme.palette.gray.silver};
  ${NoSelectCSS};
`;
