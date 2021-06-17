import styled from "styled-components";

import { CustomFontCSS } from "~/components/global.styles";

export const HeaderContainer = styled.div<IHeaderProps>`
  ${CustomFontCSS};
  display: flex;
  flex-direction: column;
  //width: auto;
  background: ${({ theme }) => theme.palette.white.base};
  //padding: 10px;
  //padding: 10px 100px 20px 100px;
  padding: 10px 125px 20px 125px;
    
  ${({ sticky }: IHeaderProps) => sticky && `
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      z-index: 5;
      background: white;
  `};
  border-bottom: 2px solid ${({ theme }) => `${theme.palette.gray.silver}`};
`;

export const HeaderRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
