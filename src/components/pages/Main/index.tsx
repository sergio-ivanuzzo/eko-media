import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import ArrowRight from "~/components/icons/ArrowRight";
import Bubble from "~/components/charts/Bubble";
import ConditionalRender from "~/components/core/ConditionalRender";
import ExpertBar from "~/components/partials/Content/ExpertBar";
import FormattedTitle from "~/components/core/FormattedTitle";
import Network from "~/components/charts/Network";
import PoliticianBar from "~/components/partials/Content/PoliticianBar";
import SphereBar from "~/components/charts/SphereBar";
import StackedBar from "~/components/charts/StackedBar";
import useData from "~/hooks/useData";

import { CATEGORIES_MAP } from "~/common/constants";
import {
    LeftColumn,
    RightColumn,
    Section,
    StyledLink,
    StyledPlaceholder,
    SubSection
} from "./styles";

const POLITICIAN_BAR_LIMIT = 3;
const EXPERT_BAR_LIMIT = 3;

const MainPage = (): JSX.Element => {

    const { data, selectedCategory } = useData();
    const { formatMessage } = useIntl();

    return (
        <ConditionalRender condition={!!Object.keys(data).length}>
            <>
                <Section>
                    <SubSection>
                        <LeftColumn>
                            <PoliticianBar limit={POLITICIAN_BAR_LIMIT} />
                            <StyledLink to="/politicians/details" tabIndex={7}>
                                <span>
                                    <FormattedMessage id="link.details" />
                                </span>
                                <ArrowRight width={18} height={14} />
                            </StyledLink>
                            <SphereBar />
                        </LeftColumn>
                        <RightColumn>
                            <ConditionalRender condition={selectedCategory === "all"}>
                                <FormattedTitle
                                    placeholder={formatMessage({ id: "stacked_bar.title.all" })}
                                    params={[ formatMessage({ id: "top5" }) ]} />
                                <FormattedTitle
                                    placeholder={formatMessage({ id: "stacked_bar.title.category" })}
                                    params={[ CATEGORIES_MAP[selectedCategory] ]} />
                            </ConditionalRender>
                            <StackedBar />
                        </RightColumn>
                    </SubSection>
                    <SubSection>
                        <LeftColumn>
                            <ExpertBar limit={EXPERT_BAR_LIMIT} />
                        </LeftColumn>
                        <RightColumn>
                            <h3>
                                <FormattedMessage id="bubble.title" />
                            </h3>
                            <Bubble />
                        </RightColumn>
                    </SubSection>
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
