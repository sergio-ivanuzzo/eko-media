import styled from "styled-components";

import Dropdown from "~/components/core/Dropdown";

import { DIRECTION } from "~/components/core/Tooltip";
import { Frame } from "~/components/core/Dropdown/styles";

export const TooltipContainer = styled.div<Partial<ITooltipContainerProps>>`
  background: ${({ theme, color }) => color || theme.palette.green.salad};
  border-radius: 10px;
  
  position: relative;
  border: 1px solid #bebebe;
  display: inline-block;
  padding: 5px;
  
  &:after {
    border: solid transparent;
    content: " ";
    position: absolute;
    pointer-events: none;
    ${({ direction, theme, color }) => direction === DIRECTION.TO_TOP && `
      top: 100%;
      left: 50%;
      border-color: rgba(255, 255, 255, 0);
      border-top-color: ${color || theme.palette.green.salad};
      border-width: 10px;
      margin-left: -10px;
    `}
    ${({ direction, theme, color }) => direction === DIRECTION.TO_BOTTOM && `
      top: -50%;
      left: 50%;
      border-color: rgba(255, 255, 255, 0);
      border-bottom-color: ${color || theme.palette.green.salad};
      border-width: 10px;
      margin-left: -10px;
    `}
  }
`;

export const StyledDropdown = styled(Dropdown)`
  ${Frame} {
    width: fit-content;
    overflow: visible;
  }
`;
