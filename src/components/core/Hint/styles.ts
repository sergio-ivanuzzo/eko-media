import styled from "styled-components";

import Dropdown from "~/components/core/Dropdown";
import { Frame } from "~/components/core/Dropdown/styles";

const BORDER_RADIUS = 10;

export const HintButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  display: inline;
  
  &:hover {
    cursor: pointer;
  }
`;

export const HintText = styled.div`
  z-index: 5;
  background: ${({ theme }) => theme.palette.orange.carrot};
  border-radius: ${BORDER_RADIUS}px;
  padding: 10px;
  color: ${({ theme }) => theme.palette.white.base};
`;

export const StyledDropdown = styled(Dropdown)`
  width: auto;
  display: inline-flex;
  
  ${Frame} {
    width: 300px;
    white-space: normal;
    overflow-y: auto;
    border-radius: ${BORDER_RADIUS}px;
    box-shadow: 0 0 3px 0 ${({ theme }) => theme.palette.gray.silver};
    background: ${({ theme }) => theme.palette.orange.carrot};
  }
`;
