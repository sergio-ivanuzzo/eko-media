import styled from "styled-components";

export const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DatePickerItem = styled.div`
  text-align: center;
  padding: 5px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray.silver};
  background: ${({ theme }) => theme.palette.white.base};
`;

export const TriggerItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  text-transform: capitalize;
`;
