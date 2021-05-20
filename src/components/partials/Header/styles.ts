import styled from "styled-components";

import { IHeaderProps } from "./types";

export const HeaderContainer = styled.div<IHeaderProps>`
    display: flex;
    flex-direction: column;
    width: 100%;
    background: ${({ theme }) => theme.palette.white.base};
    font-family: "NeueHaasUnica", sans-serif;
    
    ${({ sticky }: IHeaderProps) => sticky && `
        position: fixed;
        top: 0;
        width: 100%;
        margin-bottom: 50px;
        z-index: 2;
    `};
    border-bottom: 1px solid ${({ theme }) => `${theme.palette.gray.silver}`};
    
    // div container for logo and menu
    div:nth-child(1) {
      display: flex;
      width: 100%;
    }
`;
