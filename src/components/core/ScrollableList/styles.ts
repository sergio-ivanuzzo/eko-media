import styled from "styled-components";

export const ScrollableListContainer = styled.div<Partial<IScrollableListProps>>`
  display: flex;
  flex-direction: column;
  ${({ limit }) => !limit && `
    height: 980px;
    overflow-y: auto;
  `};
  
  > * {
    margin: 10px 0;
  }
`;
