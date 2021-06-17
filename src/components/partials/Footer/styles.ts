import styled from "styled-components";

import brighten from "~/helpers/color/brighten";

export const FooterContainer = styled.div`
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
  margin: 20px auto;
  
  > * {
    margin: 25px;
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
  margin-top: 75px;
  color: ${({ theme }) => brighten(theme.palette.gray.silver, 50)};
`
