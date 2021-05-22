import styled from "styled-components";

export const DropdownContainer = styled.div`
  width: 200px;
`;

export const TriggerContainer = styled.div``;

export const FrameContainer = styled.div`
  position: relative;
  width: 220px;
`;

export const Frame = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  max-height: 300px;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 0 3px 0 ${({ theme }) => theme.palette.gray.silver};
`;
