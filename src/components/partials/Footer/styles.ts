import styled from "styled-components";

import brighten from "~/helpers/color/brighten";

import { CustomFontCSS } from "~/components/global.styles";

export const FooterContainer = styled.div`
  ${CustomFontCSS};
  display: flex;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.palette.gray.silver};
  height: auto;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const SocialContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  
  > * {
    margin: 5px;
  }
`;

export const SocialButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  
  &:hover {
    cursor: pointer;
    filter: contrast(var(--value, 2)) saturate(var(--value, 10));
    transition: filter 0.5s linear;
  }
`;

export const Copyright = styled.div`
  ${CustomFontCSS};
  color: ${({ theme }) => brighten(theme.palette.gray.silver, 25)};
  
  &:hover {
    color: ${({ theme }) => theme.palette.gray.silver};
    transition: filter 0.5s linear;
  }
`

export const LastUpdatedContainer = styled.div`
  ${CustomFontCSS};
  width: 100%;
  text-align: left;
  margin-top: 10px;
  
  > :first-child {
    margin-top: 10px;
    margin-left: 125px;
    font-weight: bold;
    margin-right: 10px;
  }
  
  > * {
    white-space: nowrap;
  }
`;
