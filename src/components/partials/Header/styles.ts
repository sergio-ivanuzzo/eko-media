import styled from "styled-components";

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
`;

export const HeaderRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
