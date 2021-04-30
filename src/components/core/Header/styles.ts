import styled from "styled-components";

import Datepicker from "~/components/core/Datepicker";
import Dropdown from "~/components/core/Dropdown";

import { IHeaderProps } from "./types";

export const HeaderContainer = styled.div<IHeaderProps>`
    display: flex;
    width: 100%;
    
    ${({ sticky }: Partial<IHeaderProps>) => sticky && `
        display: fixed;
    `}
`;

export const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const StyledDropdown = styled(Dropdown)``;
export const StyledDatepicker = styled(Datepicker)``;