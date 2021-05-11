import React from "react";

import FilterPanel from "~/components/partials/Header/FilterPanel";
import LogoPanel from "~/components/partials/Header/LogoPanel";
import MenuPanel from "~/components/partials/Header/MenuPanel";

import { HeaderContainer } from "./styles";
import { IHeaderProps } from "./types";

const Header = ({ sticky }: IHeaderProps): JSX.Element => {
    return (
        <HeaderContainer sticky={sticky}>
            <div>
                <LogoPanel />
                <MenuPanel />
            </div>
            <FilterPanel />
        </HeaderContainer>
    );
};

export default Header;
