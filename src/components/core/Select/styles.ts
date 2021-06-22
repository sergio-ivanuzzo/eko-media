import styled, { css } from "styled-components";

import Dropdown from "~/components/core/Dropdown";
import { DropdownItem, Frame } from "~/components/core/Dropdown/styles";

const BASE_FONT_SIZE = 14;

const TRIGGER_PADDING = 4;

const MenuItemCss = css`
  font-size: ${BASE_FONT_SIZE}px;
  color: ${({ theme }) => theme.palette.black.base};
  background: ${({ theme }) => theme.palette.white.base};
`;

export const MenuItem = styled(DropdownItem)<IActivableComponent>`
  ${MenuItemCss};
  padding: 14px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray.border};
  box-shadow: 0 0 1px 0 ${({ theme }) => theme.palette.gray.silver};
  
  ${({ isActive, theme }) => isActive && `
    background: ${theme.palette.cyan.azure};
    color: ${theme.palette.white.base};
  `}
  
  &:hover {
    background: ${({ theme }) => theme.palette.cyan.azure};
    color: ${({ theme }) => theme.palette.white.base};
  }
`;

export const TriggerContainer = styled.div`
  ${MenuItemCss};
  padding: ${TRIGGER_PADDING}px;
  display: flex;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.palette.gray.border};
  height: 38px;
  justify-content: space-between;
  font-size: 18px;
  
  > div:first-child {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    // to detect offsetTop (see Select component)
    position: relative;
  }
  
  > div:last-child {
    display: flex;
    align-items: center;
    width: auto;
    white-space: nowrap;
    justify-content: space-between;
    
    > span {
      margin-right: 10px;
      font-size: 18px;
      font-weight: bold;
    }
  }
`;

export const Badge = styled.div`
  border-radius: 50%;
  color: ${({ theme }) => theme.palette.black.base};
  border: 1px solid ${({ theme }) => theme.palette.orange.carrot};
  padding: 8px;
  width: ${BASE_FONT_SIZE}px;
  height: ${BASE_FONT_SIZE}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export const BadgeContainer = styled.div`
  display: flex;
  white-space: nowrap;
  align-items: center;
  
  > *:first-child {
    margin-right: 5px;
  }
`;

export const TriggerItem = styled.div<ITriggerItemProps>`
  display: flex;
  align-items: center;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  
  ${({ multiple, theme }) => multiple && `
    background: ${theme.palette.gray.silver};
  `};
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  
  > * {
    margin-top: 2px;
  }
  
  &:hover {
    svg {
      cursor: pointer;
    }
    svg > path {
      stroke: ${({ theme }) => theme.palette.orange.carrot};
      fill: ${({ theme }) => theme.palette.orange.carrot};
    }
  }
  
  svg {
    width: 11px;
  }
`;

export const StyledDropdown = styled(Dropdown)`
  ${Frame} {
    top: -${TRIGGER_PADDING + 2}px;
  }
`;

export const IconContainer = styled.div`
  margin: 0 10px;
  height: 100%;
  display: flex;
  align-items: center;
  > * {
    margin-top: 2px;
  }
`;
