import styled, { css } from "styled-components";

import { NoActiveOutlineCSS } from "~/components/global.styles";

const MenuItemCss = css`
  padding: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.black.base};
  background: ${({ theme }) => theme.palette.white.base};
`;

export const MenuItem = styled.div<IActivableComponent>`
  ${MenuItemCss};
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray.border};
  box-shadow: 0 0 1px 0 ${({ theme }) => theme.palette.gray.silver};
  
  ${({ isActive, theme }) => isActive && `
    background: ${theme.palette.cyan.azure};
    color: ${theme.palette.white.base};
  `}
`;

export const TriggerContainer = styled.div`
  ${MenuItemCss};
  ${NoActiveOutlineCSS};
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.palette.gray.border};
`;

export const TriggerItem = styled.div<ITriggerItemProps>`
  display: flex;
  align-items: center;
  
  ${({ multiple, theme }) => multiple && `
    background: ${theme.palette.gray.silver};
  `};
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
`;
