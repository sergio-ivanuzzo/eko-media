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
    width: auto;
    border-radius: ${BORDER_RADIUS}px;
  }
`;
