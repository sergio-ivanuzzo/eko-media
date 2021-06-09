import styled from "styled-components";

import { CustomFontCSS, NoSelectCSS, getPrimaryAlign, getSecondaryAlign } from "~/components/global.styles";

export const PlaceholderContainer = styled.div<IPlaceholderProps>`
  ${CustomFontCSS};
  ${NoSelectCSS};
  width: 100%;
  height: 100%;
  display: flex;
  
  ${({ primaryAlign }) => getPrimaryAlign(primaryAlign)};
  ${({ secondaryAlign }) => getSecondaryAlign(secondaryAlign)};
  color: ${({ theme }) => theme.palette.gray.silver};
`;
