import React from "react";

import { HeaderContainer, FilterContainer, StyledDropdown, StyledDatepicker } from "./styles";
import { IHeaderProps } from "./types";

const Header = ({ sticky }: IHeaderProps): React.ReactNode => {
    return (
        <HeaderContainer sticky={sticky}>
            <FilterContainer>
                <StyledDatepicker onDateChange={() => null} />
                <StyledDropdown>Items</StyledDropdown>
                <StyledDropdown multiple>Items</StyledDropdown>
            </FilterContainer>
        </HeaderContainer>
    );
};

export default Header;
