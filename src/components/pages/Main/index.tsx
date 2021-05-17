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
                </Section>
                <Section>
                    <Network />
                </Section>
                <Section>
                    <Bubble />
                </Section>
            </>
        </ConditionalRender>
    );
};

export default MainPage;
