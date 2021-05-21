import { FormattedMessage } from "react-intl";
import React from "react";

import Bubble from "~/components/partials/charts/Bubble";
import Network from "~/components/partials/charts/Network";
import StackedBar from "~/components/partials/charts/StackedBar";
import useData from "~/hooks/useData";

import ConditionalRender from "~/components/core/ConditionalRender";
import { Section } from "~/components/pages/Main/styles";

const MainPage = (): JSX.Element => {

    const { data } = useData();

    return (
        <ConditionalRender condition={!!Object.keys(data).length}>
            <>
                <Section>
                    <StackedBar />
                    <Bubble />
                </Section>
                <Section>
                    <h2><FormattedMessage id="network.title" /></h2>
                    <h3><FormattedMessage id="network.subtitle" /></h3>
                    <Network />
                </Section>
            </>
        </ConditionalRender>
    );
};

export default MainPage;
