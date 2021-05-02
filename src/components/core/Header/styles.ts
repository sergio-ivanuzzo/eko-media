import styled from "styled-components";

import Datepicker from "~/components/core/Datepicker";
import Dropdown from "~/components/core/Dropdown";

import { IHeaderProps } from "./types";

export const HeaderContainer = styled.div<IHeaderProps>`
    display: flex;
    flex-direction: column;
    width: 100%;
    
    ${({ sticky }: Partial<IHeaderProps>) => sticky && `
        display: fixed;
    `};
    border-bottom: 1px solid ${({ theme }) => `${theme.palette.gray.silver}`};
`;

export const MenuContainer = styled.div`
    display: flex;
`;

export const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const StyledDropdown = styled(Dropdown)``;
export const StyledDatepicker = styled(Datepicker)``;
