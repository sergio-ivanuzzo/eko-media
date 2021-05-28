import { FormattedMessage } from "react-intl";
import React from "react";

import Bubble from "~/components/charts/Bubble";
import Network from "~/components/charts/Network";
import StackedBar from "~/components/charts/StackedBar";
import useData from "~/hooks/useData";

import ConditionalRender from "~/components/core/ConditionalRender";
import PoliticianBar from "~/components/partials/Content/PoliticianBar";

import { Section, StyledPlaceholder, SubSection } from "./styles";

const POLITICIAN_BAR_LIMIT = 3;

const MainPage = (): JSX.Element => {

    const { data } = useData();

    return (
        <ConditionalRender condition={!!Object.keys(data).length}>
            <>
                <Section>
                    <SubSection>
                        <PoliticianBar limit={POLITICIAN_BAR_LIMIT} />
                        <StackedBar />
                    </SubSection>
                    <Bubble />
                </Section>
                <Section>
                    <h2>
                        <FormattedMessage id="network.title" />
                    </h2>
                    <h3>
                        <FormattedMessage id="network.subtitle" />
                    </h3>
                    <Network />
                </Section>
            </>
            <StyledPlaceholder>
                <FormattedMessage id="placeholder.empty_data" />
            </StyledPlaceholder>
        </ConditionalRender>
    );
};

export default MainPage;
