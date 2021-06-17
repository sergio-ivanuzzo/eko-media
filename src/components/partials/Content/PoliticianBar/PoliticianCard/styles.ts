import styled, { css } from "styled-components";

import Card from "~/components/core/Card";

const SelectedItemCSS = css`
  opacity: 1;
`;

const NotSelectedItemCSS = css`
  opacity: 0.3;
`;

export const StyledCard = styled(Card)<Partial<IPoliticianCardProps>>`
  ${({ selectable, selected }) => !selectable || (selectable && selected) ? SelectedItemCSS : NotSelectedItemCSS};
  ${({ selectable }) => selectable && `
    &:hover {
      cursor: pointer;
    }
  `};
`;

export const MentionBarContainer = styled.div`
  width: 250px;
`;
