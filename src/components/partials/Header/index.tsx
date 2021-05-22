import React from "react";

import FilterPanel from "~/components/partials/Header/FilterPanel";
import LogoPanel from "~/components/partials/Header/LogoPanel";
import MenuPanel from "~/components/partials/Header/MenuPanel";

import { HeaderContainer, HeaderRow } from "./styles";

const Header = ({ sticky }: IHeaderProps): JSX.Element => {
    return (
        <HeaderContainer sticky={sticky}>
            <HeaderRow>
                <LogoPanel />
                <MenuPanel />
            </HeaderRow>
            <FilterPanel />
        </HeaderContainer>
    );
};

export default Header;
