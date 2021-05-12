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
      
      > label {
        margin-right: 20px;
      }
    }
    
    margin: 20px 0;
`;

export const StyledSelect = styled(Select)`
  width: 200px;
`;
export const StyledDatepicker = styled(Datepicker)`
  width: 200px;
`;
