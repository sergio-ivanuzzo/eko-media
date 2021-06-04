import styled from "styled-components";

import { SCROLL_CLASS } from "~/hooks/useScrollToChild";
import { NoActiveOutlineCSS, NoSelectCSS } from "~/components/global.styles";

export const DropdownContainer = styled.div`
  ${NoActiveOutlineCSS};
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  
  &:active, &:focus, &:focus-visible {
    filter: drop-shadow(5px 3px 5px ${({ theme }) => theme.palette.gray.silver});
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
  padding: 0 1px;
  flex-direction: column;
  white-space: nowrap;
  max-height: 300px;
  width: calc(100% - 2px);
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 0 0 10px 10px;
  ${NoSelectCSS};
`;

export const DropdownItem = styled.div`
  &.${SCROLL_CLASS} {
    background: ${({ theme }) => theme.palette.orange.carrot};
    color: ${({ theme }) => theme.palette.white.base};
  }
`;
