import React from "react";

import { FormattedMessage } from "react-intl";

import { AppName, Logo, LogoContainer } from "./styles";

const LogoPanel = (): JSX.Element => {
    return (
        <LogoContainer>
            <Logo src="/static/Frame.svg" />
            <AppName>
                <FormattedMessage id="app.name" />
            </AppName>
        </LogoContainer>
    );
};

export default LogoPanel;
