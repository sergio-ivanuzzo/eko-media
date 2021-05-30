import { Link } from "react-router-dom";
import styled from "styled-components";

import Placeholder from "~/components/core/Placeholder";

export const Section = styled.div`
  padding: 5px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray.silver};
  display: flex;
  flex-direction: column;
`;

export const SubSection = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  padding: 5px;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  
  width: 300px;
  
  > * {
    margin-bottom: 50px;
  }
`;

export const RightColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 2;
  padding: 5px;
`;

export const StyledPlaceholder = styled(Placeholder)`
  width: 100%;
  height: 70vh;
  
  font-size: 30px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.palette.orange.carrot};
  font-family: "NeueHaasUnica", sans-serif;
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
