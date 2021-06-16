import React from "react";

import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import { MenuContainer } from "./styles";

const MenuPanel = (): JSX.Element => {
    return (
        <MenuContainer>
            <Link to="/" tabIndex={1}>
                <FormattedMessage id="link.main" />
            </Link>
            <Link to={{ pathname: "https://forms.gle/cFnnQG6NzMtZoftW8" }} target="_blank" tabIndex={2}>
                <FormattedMessage id="link.feedback" />
            </Link>
            <Link to="/about" tabIndex={3}>
                <FormattedMessage id="link.about" />
            </Link>
        </MenuContainer>
    );
};

export default MenuPanel;
