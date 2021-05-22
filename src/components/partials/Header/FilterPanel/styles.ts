import styled from "styled-components";

import Datepicker from "~/components/core/Datepicker";
import Select from "~/components/core/Select";

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
  
  label {
    white-space: nowrap;
  }
`;

export const StyledSelect = styled(Select)`
  margin: 0 20px;
`;
export const StyledDatepicker = styled(Datepicker).attrs(({ tabIndex }) => ({
    tabIndex: tabIndex || 0
}))`
  width: 200px;
`;
