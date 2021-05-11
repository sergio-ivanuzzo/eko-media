import styled from "styled-components";

export const LogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AppName = styled.div`
  color: ${({ theme }) => `${theme.palette.black.base}`};
  font-size: 40px;
  line-height: 40px;
  margin: 0 auto;
`;

export const Logo = styled.img``;
