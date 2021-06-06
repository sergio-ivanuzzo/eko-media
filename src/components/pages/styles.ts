import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import Placeholder from "~/components/core/Placeholder";
import { getPrimaryAlign, getSecondaryAlign } from "~/components/global.styles";

const ColumnCSS = css`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

export const Section = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray.silver};
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export const HeadingSection = styled.div`
  display: flex;
  padding: 0 10px;
  margin-bottom: 50px;
`;

export const SubSection = styled.div<IRowProps>`
  display: flex;
  ${({ primaryAlign }) => getPrimaryAlign(primaryAlign)};
  ${({ secondaryAlign }) => getSecondaryAlign(secondaryAlign)};
  padding: 0 10px;
  
  > * {
    margin: 0 50px;
  }
`;

export const LeftColumn = styled.div<IColumnProps>`
  ${ColumnCSS};
  ${({ primaryAlign }) => getPrimaryAlign(primaryAlign)};
  ${({ secondaryAlign }) => getSecondaryAlign(secondaryAlign)};
  width: 300px;
  
  > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const RightColumn = styled.div<IColumnProps>`
  ${ColumnCSS};
  ${({ primaryAlign }) => getPrimaryAlign(primaryAlign)};
  ${({ secondaryAlign }) => getSecondaryAlign(secondaryAlign)};
  width: 100%;
`;

export const StyledPlaceholder = styled(Placeholder)`
  width: 100%;
  height: 70vh;
  font-size: 30px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.palette.orange.carrot};
  font-family: "NeueHaasUnica", sans-serif;
  font-weight: 500;
  font-size: 18px;
  justify-content: center;
  
  > *:first-child {
    margin-right: 10px;
  }
  
  > svg {
    margin-top: 3px;
  }
`;

export const BackLink = styled(StyledLink)`
  path {
    fill: ${({ theme }) => theme.palette.black.base};
    font-size: 50px;
  }
`;
