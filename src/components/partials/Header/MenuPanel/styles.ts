import styled from "styled-components";

export const MenuContainer = styled.div`
    display: flex;
    white-space: nowrap;
    align-items: center;
    
    > a {
      font-family: "NeueHaasUnica", sans-serif;
      margin: 0 10px;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      color: ${({ theme }) => theme.palette.black.base};
      
      &:hover {
        color: ${({ theme }) => theme.palette.orange.carrot};
      }
    }
`;
