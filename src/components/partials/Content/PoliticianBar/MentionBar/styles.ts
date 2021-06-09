import styled from "styled-components";

export const MentionBarContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  
  > div {
    position: absolute;
    height: 15px;
    border-radius: 10px;
        
    &:hover {
      cursor: pointer;
    }
  }
`;

export const PositiveContainer = styled.div<ISingleBarProps>`
  width: ${({ value }) => `${value}%`};
  height: 100%;
  background: ${({ theme }) => theme.palette.green.salad};
  z-index: 3;
`;

export const NeutralContainer = styled.div<ISingleBarProps>`
  width: ${({ value }) => `${value}%`};
  height: 100%;
  background: ${({ theme }) => theme.palette.gray.silver};
  z-index: 2;
`;

export const NegativeContainer = styled.div<ISingleBarProps>`
  width: ${({ value }) => `${value}%`};
  height: 100%;
  background: ${({ theme }) => theme.palette.orange.carrot};
  z-index: 1;
`;

export const PositiveBar = styled.div<ISingleBarProps>`
  height: 15px;
  width: 100%;
  background: ${({ theme }) => theme.palette.green.salad};
  border-radius: 10px;
`;

export const NeutralBar = styled.div<ISingleBarProps>`
  height: 15px;
  width: 100%;
  background: ${({ theme }) => theme.palette.gray.silver};
  border-radius: 10px;
`;

export const NegativeBar = styled.div<ISingleBarProps>`
  height: 15px;
  width: 100%;
  background: ${({ theme }) => theme.palette.orange.carrot};
  border-radius: 10px;
`;
