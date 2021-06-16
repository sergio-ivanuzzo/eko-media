import React from "react";
import { Route, Switch } from "react-router-dom";

import AboutPage from "~/components/pages/About";
import ExpertsDetailsPage from "~/components/pages/ExpertsDetails";
import MainPage from "~/components/pages/Main";
import PoliticiansDetailsPage from "~/components/pages/PoliticiansDetails";
import TopicPage from "~/components/pages/Topic";

import { ContentContainer } from "./styles";

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
                <Route exact path="/experts/details">
                    <ExpertsDetailsPage />
                </Route>
                <Route exact path="/about">
                    <AboutPage />
                </Route>
            </Switch>
        </ContentContainer>
    );
};

export default Content;
