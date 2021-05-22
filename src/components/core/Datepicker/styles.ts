import styled from "styled-components";

export const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 220px;
`;

export const DatePickerItem = styled.div`
  text-align: center;
  padding: 5px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray.silver};
  background: ${({ theme }) => theme.palette.white.base};
`;

export const TriggerItem = styled.div`
  text-align: center;
  padding: 5px;
  text-transform: capitalize;
`;
