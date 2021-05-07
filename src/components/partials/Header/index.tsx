import React from "react";

import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import useData from "~/hooks/useData";

import { IHeaderProps } from "./types";
import { FilterContainer, HeaderContainer, MenuContainer, StyledDatepicker, StyledDropdown } from "./styles";

const Header = ({ sticky }: IHeaderProps): JSX.Element => {
    const { loadAll } = useData();

    return (
        <HeaderContainer sticky={sticky}>
            <MenuContainer>
                <Link to="/">
                    <FormattedMessage id="link.main" />
                </Link>
                <Link to="/feedback">
                    <FormattedMessage id="link.feedback" />
                </Link>
                <Link to="/about">
                    <FormattedMessage id="link.about" />
                </Link>
            </MenuContainer>
            <FilterContainer>
                <StyledDatepicker onDateChange={loadAll} />
                <StyledDropdown>Items</StyledDropdown>
                <StyledDropdown multiple>Items</StyledDropdown>
            </FilterContainer>
        </HeaderContainer>
    );
};

export default Header;
