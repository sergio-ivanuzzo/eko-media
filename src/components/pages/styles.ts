import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import Placeholder from "~/components/core/Placeholder";

import { FadeOutAnimation } from "~/components/global.animations";
import { CustomFontCSS, NoSelectCSS, getPrimaryAlign, getSecondaryAlign } from "~/components/global.styles";

const ColumnCSS = css`
  ${CustomFontCSS};
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

export const Section = styled.div`
  ${CustomFontCSS};
  ${NoSelectCSS};
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray.silver};
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  opacity: 0;
  
  animation: ${FadeOutAnimation} 1.5s ease-out both;
`;

export const HeadingSection = styled.div`
  ${CustomFontCSS};
  display: flex;
  padding: 0 10px;
  margin-bottom: 50px;
`;

export const SubSection = styled.div<IRowProps>`
  ${CustomFontCSS};
  ${NoSelectCSS};
  display: flex;
  ${({ primaryAlign }) => getPrimaryAlign(primaryAlign)};
  ${({ secondaryAlign }) => getSecondaryAlign(secondaryAlign)};
  ${({ wrap }) => wrap && `
    flex-wrap: wrap;
    
    > * {
      flex: 1 0 21%;
    }
  `};
  
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
  ${CustomFontCSS};
  ${NoSelectCSS};
  text-decoration: none;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.palette.orange.carrot};
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
