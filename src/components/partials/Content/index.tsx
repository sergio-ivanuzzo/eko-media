import React from "react";
import { Route, Switch } from "react-router-dom";

import { ContentContainer } from "~/components/core/Content/styles";
import MainPage from "~/components/pages/Main";

const Content = (): JSX.Element => {
    return (
        <ContentContainer>
            <Switch>
                <Route path="/">
                    <MainPage />
                </Route>
            </Switch>
        </ContentContainer>
    );
};

export default Content;
