import styled from "styled-components";

import Dropdown from "~/components/core/Dropdown";

import { DIRECTION } from "~/components/core/Tooltip";
import { Frame } from "~/components/core/Dropdown/styles";

export const TooltipContainer = styled.div<Partial<ITooltipContainerProps>>`
  background: ${({ theme, backgroundColor }) => backgroundColor || theme.palette.green.salad};
  color: ${({ color }) => color};
  border-radius: 10px;
  
  position: relative;
  border: 1px solid ${({ theme, backgroundColor }) => backgroundColor || theme.palette.gray.silver};
  display: inline-block;
  padding: 5px;
  
  &:after {
    border: solid transparent;
    content: " ";
    position: absolute;
    pointer-events: none;
    ${({ direction, theme, backgroundColor }) => direction === DIRECTION.TO_TOP && `
      top: 20px;
      left: 50%;
      border-color: rgba(255, 255, 255, 0);
      border-top-color: ${backgroundColor || theme.palette.green.salad};
      border-width: 10px;
      margin-left: -10px;
    `}
    ${({ direction, theme, backgroundColor }) => direction === DIRECTION.TO_BOTTOM && `
      top: -20px;
      left: 50%;
      border-color: rgba(255, 255, 255, 0);
      border-bottom-color: ${backgroundColor || theme.palette.green.salad};
      border-width: 10px;
      margin-left: -10px;
    `}
  }
`;

export const StyledDropdown = styled(Dropdown)<Partial<ITooltipContainerProps>>`
  ${Frame} {
    width: min-content;
    white-space: pre-line;
    text-align: center;
    overflow: visible;
    text-transform: capitalize;
    
    left: ${({ offsetX }) => `${offsetX}px`};
    top: ${({ offsetY }) => `${offsetY}px`};
  }
`;
