import { FormattedMessage } from "react-intl";
import React from "react";

import Logo from "~/components/icons/Logo";
import { AppName, LogoContainer } from "./styles";

const LogoPanel = (): JSX.Element => {
    return (
        <LogoContainer>
            <Logo width={88} height={45} />
            <AppName>
                <FormattedMessage id="app.name" />
            </AppName>
        </LogoContainer>
    );
};

export default LogoPanel;
