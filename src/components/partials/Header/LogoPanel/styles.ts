import styled from "styled-components";

export const LogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 2;
`;

export const AppName = styled.div`
  color: ${({ theme }) => `${theme.palette.black.base}`};
  font-size: 40px;
  line-height: 40px;
  margin: 0 auto;
  white-space: nowrap;
`;
