import styled from "styled-components";

import { CustomFontCSS, NoActiveOutlineCSS, NoSelectCSS } from "~/components/global.styles";

export const MenuContainer = styled.div`
    display: flex;
    white-space: nowrap;
    align-items: center;
    flex-wrap: wrap;
    ${NoSelectCSS};
    
    > a {
      ${NoActiveOutlineCSS};
      ${CustomFontCSS};
      margin: 0 10px;
      text-decoration: none;
      font-size: 16px;
      font-weight: 500;
      color: ${({ theme }) => theme.palette.black.base};
      transition: all 0.25s ease-in-out;
      
      &:hover {
        color: ${({ theme }) => theme.palette.orange.carrot};
      }
      
      &:active, &:focus, &:focus-visible {
        box-shadow: 0 0 2px 0 ${({ theme }) => theme.palette.cyan.azure};
      }
    }
`;
