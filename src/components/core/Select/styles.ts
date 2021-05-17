import styled, { css } from "styled-components";

import { ITriggerItemProps } from "~/components/core/Select/types";

const MenuItemCss = css`
  padding: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.black.base};
  max-width: 200px;
  background: ${({ theme }) => theme.palette.white.base};
`;

export const MenuItem = styled.div`
  ${MenuItemCss};
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray.border};
  box-shadow: 0 0 1px 0 ${({ theme }) => theme.palette.gray.silver};
`;

export const Trigger = styled.div`
  ${MenuItemCss};
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.palette.gray.border};
`;

export const TriggerItem = styled.div<ITriggerItemProps>`
  ${({ multiple, theme }) => multiple && `
    background: ${theme.palette.gray.silver};
  `};
`;
