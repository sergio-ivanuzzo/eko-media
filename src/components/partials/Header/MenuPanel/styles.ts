import styled from "styled-components";

import { NoActiveOutlineCSS, NoSelectCSS } from "~/components/global.styles";

export const MenuContainer = styled.div`
    display: flex;
    white-space: nowrap;
    align-items: center;
    flex-wrap: wrap;
    ${NoSelectCSS};
    
    > a {
      ${NoActiveOutlineCSS};
      font-family: "NeueHaasUnica", sans-serif;
      margin: 0 10px;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      color: ${({ theme }) => theme.palette.black.base};
      
      &:hover {
        color: ${({ theme }) => theme.palette.orange.carrot};
      }
      
      &:active, &:focus, &:focus-visible {
        box-shadow: 0 0 2px 0 ${({ theme }) => theme.palette.cyan.azure};
      }
    }
`;
