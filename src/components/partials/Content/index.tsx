import React from "react";
import { Route, Switch } from "react-router-dom";

import MainPage from "~/components/pages/Main";

import { ContentContainer } from "./styles";

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
