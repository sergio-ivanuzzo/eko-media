import styled from "styled-components";

import Dropdown from "~/components/core/Dropdown";
import brighten from "~/helpers/color/brighten";
import { DropdownItem, Frame } from "~/components/core/Dropdown/styles";

export const TriggerContainer = styled.div<{ disabled?: boolean }>`
  font-size: 18px;
  color: ${({ theme }) => theme.palette.black.base};
  background: ${({ theme }) => theme.palette.white.base};
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px;
  height: 38px;
  overflow: hidden;
  
  ${({ disabled, theme }) => disabled && `
    background: ${brighten(theme.palette.gray.silver, 75)};
    cursor: wait;
  `};
`;

export const DatePickerItem = styled(DropdownItem)<IActivableComponent>`
  text-align: center;
  padding: 14px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray.silver};
  background: ${({ theme }) => theme.palette.white.base};
  
  ${({ isActive, theme }) => isActive && `
    background: ${theme.palette.cyan.azure};
    color: ${theme.palette.white.base};
  `}
  
  &:hover {
    background: ${({ theme }) => theme.palette.cyan.azure};
    color: ${({ theme }) => theme.palette.white.base};
  }
`;

export const TriggerItem = styled.div`
  display: flex;
  align-items: center;
  text-transform: capitalize;
  
  svg {
    margin-top: -3px;
    margin-left: 5px;
  }
`;

export const StyledDropdown = styled(Dropdown)`
  ${Frame} {
    top: -8px;
  }
`;
