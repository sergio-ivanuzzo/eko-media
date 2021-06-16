import styled from "styled-components";

export const FileLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 20px;
  color: ${({ theme }) => theme.palette.orange.carrot};
  > * {
    margin: 0 15px;
  }
`;
