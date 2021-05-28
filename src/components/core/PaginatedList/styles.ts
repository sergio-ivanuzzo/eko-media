import styled from "styled-components";

export const PaginatedListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NavigationButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  width: 100%;
  justify-content: center;
  
  > svg {
    width: 44px;
  }
`;
