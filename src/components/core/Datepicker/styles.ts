import styled from "styled-components";

import { DropdownItem } from "~/components/core/Dropdown/styles";

export const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
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
`;
