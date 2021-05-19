import styled from "styled-components";

import ArrowLeft from "~/components/icons/ArrowLeft";
import ArrowRight from "~/components/icons/ArrowRight";
import { IIconProps } from "~/components/icons/types";

export const ReferenceList = styled.div`
  overflow-y: auto;
  min-width: 300px;
`;

export const ReferenceItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  height: 80px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray.silver};
  white-space: nowrap;
`;

export const StyledArrowLeft = styled(ArrowLeft).attrs<IIconProps>({ width: "18px", height: "10px" })``;
export const StyledArrowRight = styled(ArrowRight).attrs<IIconProps>({ width: "18px", height: "10px" })``;
