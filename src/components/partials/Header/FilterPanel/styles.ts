import styled from "styled-components";

import Datepicker from "~/components/core/Datepicker";
import Select from "~/components/core/Select";

import { Frame } from "~/components/core/Dropdown/styles";
import { NoSelectCSS } from "~/components/global.styles";

export const FilterContainer = styled.div`
    display: flex;
    width: 100%;
    
    > * {
      flex: 1;
      display: flex;
      align-items: center;
    }
    
    margin: 10px 0;
    
    > *:not(:last-child) {
      margin-right: 20px;
    }
`;

export const FilterItemContainer = styled.div`
  display: flex;
  align-items: center;
  
  &:hover {
    cursor: pointer;
  }
  
  label {
    white-space: nowrap;
    margin-right: 1em;
    font-size: 18px;
    ${NoSelectCSS};
  }
`;

export const StyledSelect = styled(Select).attrs(({ tabIndex, height }) => ({
    tabIndex: tabIndex || 0,
    height,
}))`
  ${Frame} {
    ${({ height }) => height && `
        max-height: ${height}px;
    `};
  }
`;
export const StyledDatepicker = styled(Datepicker).attrs(({ tabIndex }) => ({
    tabIndex: tabIndex || 0
}))`
  width: 200px;
`;
