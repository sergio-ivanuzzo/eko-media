import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import React from "react";

import Logo from "~/components/icons/Logo";
import { AppName, LogoContainer } from "./styles";

const LogoPanel = (): JSX.Element => {
    return (
        <LogoContainer>
            <Link to="/" tabIndex={1}>
                <Logo width={88} height={45} />
            </Link>
            <AppName>
                <FormattedMessage id="app.name" />
            </AppName>
        </LogoContainer>
    );
};

export default LogoPanel;
