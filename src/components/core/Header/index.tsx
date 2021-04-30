import React, { useState } from "react";

import useData from "~/hooks/useData";

import { IHeaderProps } from "./types";
import { FilterContainer, HeaderContainer, StyledDatepicker, StyledDropdown } from "./styles";

const Header = ({ sticky }: IHeaderProps): JSX.Element => {
    const { data, loadAll } = useData();

    console.log(data);

    return (
        <HeaderContainer sticky={sticky}>
            <FilterContainer>
                <StyledDatepicker onDateChange={loadAll} />
                <StyledDropdown>Items</StyledDropdown>
                <StyledDropdown multiple>Items</StyledDropdown>
            </FilterContainer>
        </HeaderContainer>
    );
};

export default Header;
