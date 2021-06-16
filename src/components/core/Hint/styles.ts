import styled from "styled-components";

import Dropdown from "~/components/core/Dropdown";
import { Frame } from "~/components/core/Dropdown/styles";

const BORDER_RADIUS = 10;

export const HintButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  display: inline-flex;
  justify-content: flex-end;
  
  &:hover {
    cursor: pointer;
  }
`;

export const HintText = styled.div<Partial<IHintProps>>`
  z-index: 5;
  background: ${({ theme, background }) => background || theme.palette.orange.carrot};
  border-radius: ${BORDER_RADIUS}px;
  padding: 10px;
  color: ${({ theme }) => theme.palette.white.base};
  
  a {
    margin-left: 5px;
    text-decoration: none;
    font-weight: bold;
    color: ${({ theme, color }) => color || theme.palette.white.base};
    
    &:hover {
      color: ${({ theme }) => theme.palette.green.salad};
    }
  }
`;

export const StyledDropdown = styled(Dropdown)<Partial<IHintProps>>`
  width: auto;
  display: inline-flex;
  
  ${Frame} {
    width: 300px;
    white-space: normal;
    overflow-y: auto;
    border-radius: ${BORDER_RADIUS}px;
    box-shadow: 0 0 3px 0 ${({ theme }) => theme.palette.gray.silver};
    background: ${({ theme, background }) => background || theme.palette.orange.carrot};
    
    ${({ toRight }) => toRight && "right: 0"};
  }
`;
