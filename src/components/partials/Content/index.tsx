import React from "react";
import { Route, Switch } from "react-router-dom";

import AboutPage from "~/components/pages/About";
import ExpertsDetailsPage from "~/components/pages/ExpertsDetails";
import MainPage from "~/components/pages/Main";
import PoliticiansDetailsPage from "~/components/pages/PoliticiansDetails";
import TopicPage from "~/components/pages/Topic";

import { ContentContainer } from "./styles";
import ScrollToTop from "~/components/core/ScrollToTop";

const Content = (): JSX.Element => {
    return (
        <ContentContainer>
            <ScrollToTop>
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
            </ScrollToTop>
        </ContentContainer>
    );
};

export default Content;
