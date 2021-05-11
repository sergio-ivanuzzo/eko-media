import React from "react";

import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import { MenuContainer } from "./styles";

const MenuPanel = (): JSX.Element => {
    return (
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
    );
};

export default MenuPanel;
