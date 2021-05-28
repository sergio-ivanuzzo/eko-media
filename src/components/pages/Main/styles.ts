import styled from "styled-components";

import Placeholder from "~/components/core/Placeholder";

export const Section = styled.div`
  padding: 5px;
  
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray.silver};
`;

export const SubSection = styled.div`
  display: flex;
`;

export const StyledPlaceholder = styled(Placeholder)`
  width: 100%;
  height: 70vh;
  
  font-size: 30px;
`;
