import styled from "styled-components";

import { NoActiveOutlineCSS, NoSelectCSS } from "~/components/global.styles";

export const DropdownContainer = styled.div`
  ${NoActiveOutlineCSS};
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  
  &:active, &:focus, &:focus-visible {
    box-shadow: 0 0 2px 0 ${({ theme }) => theme.palette.cyan.azure};
  }
`;

export const TriggerContainer = styled.div`
  ${NoSelectCSS};
  ${NoActiveOutlineCSS};
`;

export const FrameContainer = styled.div`
  position: relative;
  width: 100%;
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
  ${NoSelectCSS};
`;
