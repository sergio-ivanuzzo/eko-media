import React from "react";
import { Route, Switch } from "react-router-dom";

import MainPage from "~/components/pages/Main";
import PoliticiansDetailsPage from "~/components/pages/PoliticiansDetails";

import { ContentContainer } from "./styles";
import TopicPage from "~/components/pages/Topic";

const Content = (): JSX.Element => {
    return (
        <ContentContainer>
            <Switch>
                <Route exact path="/">
                    <MainPage />
                </Route>
                <Route exact path="/politicians/details">
                    <PoliticiansDetailsPage />
                </Route>
                <Route exact path="/topic">
                    <TopicPage />
                </Route>
            </Switch>
        </ContentContainer>
    );
};

export default Content;
