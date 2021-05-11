import styled from "styled-components";

export const MenuItem = styled.div`
  padding: 10px;
  border-radius: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.black.base};
`;

export const Trigger = styled(MenuItem)``;
