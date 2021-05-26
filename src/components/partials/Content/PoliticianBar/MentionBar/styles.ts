import styled from "styled-components";

export const MentionBarContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  
  > div {
    position: absolute;
    height: 15px;
    border-radius: 10px;
  }
`;

export const PositiveBar = styled.div<ISingleBarProps>`
  width: ${({ value }) => `${value}%`};
  background: ${({ theme }) => theme.palette.green.salad};
  z-index: 3;
`;

export const NeutralBar = styled.div<ISingleBarProps>`
  width: ${({ value }) => `${value}%`};
  background: ${({ theme }) => theme.palette.gray.silver};
  z-index: 2;
`;

export const NegativeBar = styled.div<ISingleBarProps>`
  width: ${({ value }) => `${value}%`};
  background: ${({ theme }) => theme.palette.orange.carrot};
  z-index: 1;
`;
