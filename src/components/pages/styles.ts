import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import Hint from "~/components/core/Hint";
import Placeholder from "~/components/core/Placeholder";

import { FadeInAnimation } from "~/components/global.animations";
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
  
  animation: ${FadeInAnimation} 1.5s ease-out both;
`;

export const HeadingSection = styled.div<IHeadingSectionProps>`
  ${CustomFontCSS};
  display: flex;
  padding: 0 10px;
  ${({ noMargin }) => !noMargin && "margin-bottom: 50px"};
`;

export const SubSection = styled.div<IRowProps>`
  ${CustomFontCSS};
  ${NoSelectCSS};
  width: 100%;
  display: flex;
  ${({ primaryAlign }) => getPrimaryAlign(primaryAlign)};
  ${({ secondaryAlign }) => getSecondaryAlign(secondaryAlign)};
  ${({ wrap }) => wrap && `
    flex-wrap: wrap;
    
    > * {
      flex: 1 0 21%;
    }
  `};
  
  margin-bottom: 20px;
  
  > * {
    margin: 0 20px;
  }
`;

export const LeftColumn = styled.div<IColumnProps>`
  ${ColumnCSS};
  ${({ primaryAlign }) => getPrimaryAlign(primaryAlign)};
  ${({ secondaryAlign }) => getSecondaryAlign(secondaryAlign)};
  width: 400px;
  text-align: center;
  
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
  color: ${({ theme }) => theme.palette.cyan.link};
  font-weight: bold;
  font-size: 18px;
  white-space: nowrap;
  transition: all 0.25s ease-in-out;
    
  > *:first-child {
    margin-right: 10px;
  }
  
  > svg {
    position: relative;
    top: 0.221em;
    
    path {
      fill: ${({ theme }) => theme.palette.cyan.link};
    }
  }
  
  &:hover {
    color: ${({ theme }) => theme.palette.orange.carrot};
    
    svg > path {
      fill: ${({ theme }) => theme.palette.orange.carrot};
    }
  }
`;

export const BackLink = styled(StyledLink)`
  path {
    fill: ${({ theme }) => theme.palette.black.base};
    font-size: 50px;
  }
`;

export const HelperHint = styled(Hint)``;
