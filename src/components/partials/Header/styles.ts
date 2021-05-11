import styled from "styled-components";

import { IHeaderProps } from "./types";

export const HeaderContainer = styled.div<IHeaderProps>`
    display: flex;
    flex-direction: column;
    width: 100%;
    
    ${({ sticky }: Partial<IHeaderProps>) => sticky && `
        display: fixed;
    `};
    border-bottom: 1px solid ${({ theme }) => `${theme.palette.gray.silver}`};
    
    // div container for logo and menu
    div:nth-child(1) {
      display: flex;
      width: 100%;
    }
`;
