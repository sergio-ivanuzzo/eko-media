import styled, { FlattenSimpleInterpolation, css } from "styled-components";

import { PlaceholderTextAlign } from "~/components/core/Placeholder/constants";

const AlignLeftCSS = css`
  align-items: center;
  justify-content: flex-start;
`;

const AlignCenterCSS = css`
  align-items: center;
  justify-content: center;
`;

const AlignRightCSS = css`
  align-items: center;
  justify-content: flex-end;
`;

const getCssForAlign = (align: PlaceholderTextAlign): FlattenSimpleInterpolation => {
    switch (align) {
        case PlaceholderTextAlign.LEFT: {
            return AlignLeftCSS;
        }
        case PlaceholderTextAlign.CENTER: {
            return AlignCenterCSS;
        }
        case PlaceholderTextAlign.RIGHT: {
            return AlignRightCSS;
        }
        default: {
            return AlignLeftCSS;
        }
    }
}

export const PlaceholderContainer = styled.div<Partial<IPlaceholderProps>>`
  width: 100%;
  height: 100%;
  display: flex;
  
  ${({ align }) => getCssForAlign(align)};
  color: ${({ theme }) => theme.palette.gray.silver};
`;