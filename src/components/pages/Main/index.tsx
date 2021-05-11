import React from "react";

import Network from "~/components/charts/Network";
import StackedBar from "~/components/charts/StackedBar";
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
            </>
        </ConditionalRender>
    );
};

export default MainPage;
