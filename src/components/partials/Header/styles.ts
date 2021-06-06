import styled from "styled-components";

export const HeaderContainer = styled.div<IHeaderProps>`
    display: flex;
    flex-direction: column;
    //width: auto;
    background: ${({ theme }) => theme.palette.white.base};
    font-family: "NeueHaasUnica", sans-serif;
    padding: 10px;
    
    ${({ sticky }: IHeaderProps) => sticky && `
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        z-index: 5;
        background: white;
    `};
    // border-bottom: 2px solid ${({ theme }) => `${theme.palette.gray.silver}`};
    box-shadow: 0 0 3px 0 ${({ theme }) => `${theme.palette.gray.silver}`};
`;

export const HeaderRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
