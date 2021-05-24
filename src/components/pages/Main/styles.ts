import styled from "styled-components";

export const Section = styled.div`
  padding: 5px;
  
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray.silver};
`;

export const SubSection = styled.div`
  display: flex;
`;
