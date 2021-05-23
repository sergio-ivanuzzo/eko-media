import styled from "styled-components";

import Datepicker from "~/components/core/Datepicker";
import Select from "~/components/core/Select";

import { NoSelectCSS } from "~/components/global.styles";

export const FilterContainer = styled.div`
    display: flex;
    width: 100%;
    
    > * {
      flex: 1;
      display: flex;
      align-items: center;
    }
    
    margin: 20px 0;
`;

export const FilterItemContainer = styled.div`
  display: flex;
  align-items: center;
  
  &:hover {
    cursor: pointer;
  }
  
  label {
    white-space: nowrap;
    margin-right: 0.35em;
    font-size: 18px;
    ${NoSelectCSS};
  }
`;

export const StyledSelect = styled(Select).attrs(({ tabIndex }) => ({
    tabIndex: tabIndex || 0
}))`
  margin-right: 20px;
`;
export const StyledDatepicker = styled(Datepicker).attrs(({ tabIndex }) => ({
    tabIndex: tabIndex || 0
}))`
  width: 200px;
`;
