import styled from "styled-components";

import ArrowLeft from "~/components/icons/ArrowLeft";
import ArrowRight from "~/components/icons/ArrowRight";
import { OverflowCSS } from "~/components/global.styles";

export const ReferenceList = styled.div`
  overflow-y: auto;
  min-width: 400px;
  box-shadow: 0 0 3px 0 ${({ theme }) => theme.palette.gray.silver};
  padding: 2px;
  border-radius: 5px;
`;

export const ReferenceItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 2em;
  height: 80px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray.silver};
  white-space: nowrap;
  margin: 0 5px;
  font-size: 14px;
`;

export const ArrowContainer = styled.div`
  width: 30px;
  text-align: center;
`;
export const StyledArrowLeft = styled(ArrowLeft).attrs<IIconProps>({ width: "18px", height: "10px" })``;
export const StyledArrowRight = styled(ArrowRight).attrs<IIconProps>({ width: "18px", height: "10px" })``;

export const ReferenceCount = styled.div`
  font-weight: bold;
`;

export const MediaName = styled.div`
  margin: 0 10px;
  width: 80px;
  ${OverflowCSS};
`;
