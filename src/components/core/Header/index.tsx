import React, { useState } from "react";

import useData from "~/hooks/useData/index";

import { HeaderContainer, FilterContainer, StyledDropdown, StyledDatepicker } from "./styles";
import { IHeaderProps } from "./types";

const Header = ({ sticky }: IHeaderProps): React.ReactNode => {
    const [date, setDate] = useState<Date>(new Date());
    const { data, load, filter } = useData(date);

    console.log(data);

    return (
        <HeaderContainer sticky={sticky}>
            <FilterContainer>
                <StyledDatepicker onDateChange={setDate} />
                <StyledDropdown>Items</StyledDropdown>
                <StyledDropdown multiple>Items</StyledDropdown>
            </FilterContainer>
        </HeaderContainer>
    );
};

export default Header;
