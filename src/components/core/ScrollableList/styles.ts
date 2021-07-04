import styled from "styled-components";

export const ScrollableListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 980px;
  overflow-y: auto;
  
  > * {
    margin: 10px 0;
  }
`;
