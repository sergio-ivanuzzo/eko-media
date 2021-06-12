import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import ArrowRight from "~/components/icons/ArrowRight";
import Bubble from "~/components/charts/Bubble";
import ConditionalRender from "~/components/core/ConditionalRender";
import ConnectionChart from "~/components/charts/Connections";
import ExpertBar from "~/components/partials/Content/ExpertBar";
import FormattedTitle from "~/components/core/FormattedTitle";
import Hint from "~/components/core/Hint";
import Network from "~/components/charts/Network";
import PoliticianBar from "~/components/partials/Content/PoliticianBar";
import SphereBar from "~/components/charts/Bar/SphereBar";
import StackedBar from "~/components/charts/StackedBar";
import formatString from "~/helpers/formatString";
import useData from "~/hooks/useData";

import { CATEGORIES_MAP } from "~/common/constants";
import { AlignItems, JustifyContent } from "~/components/global.constants";
import {
    LeftColumn,
    RightColumn,
    Section,
    StyledLink,
    StyledPlaceholder,
    SubSection
} from "~/components/pages/styles";

const POLITICIAN_BAR_LIMIT = 3;
const EXPERT_BAR_LIMIT = 3;

const MainPage = (): JSX.Element => {

    const { selectedCategory, isDataLoaded } = useData();
    const { formatMessage } = useIntl();

    return (
        <ConditionalRender condition={isDataLoaded}>
            <>
                <Section>
                    <SubSection primaryAlign={JustifyContent.SPACE_BETWEEN} secondaryAlign={AlignItems.INHERIT}>
                        <LeftColumn primaryAlign={JustifyContent.SPACE_BETWEEN} secondaryAlign={AlignItems.START}>
                            <div>
                                <div>
                                    <FormattedTitle
                                        placeholder={formatMessage({ id: "politician_bar.title" })}
                                        params={[ CATEGORIES_MAP[selectedCategory] ]}
                                        inline
                                    />
                                    <Hint />
                                </div>

                                <PoliticianBar limit={POLITICIAN_BAR_LIMIT} />
                                <div>
                                    <StyledLink to="/politicians/details" tabIndex={7}>
                                        <span>
                                            <FormattedMessage id="link.details" />
                                        </span>
                                        <ArrowRight width={18} height={14} />
                                    </StyledLink>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <FormattedTitle
                                        placeholder={formatMessage({ id: "sphere_bar.title" })}
                                        params={[ CATEGORIES_MAP[selectedCategory] ]}
                                        inline
                                    />
                                    <Hint />
                                </div>
                                <SphereBar />
                            </div>
                        </LeftColumn>
                        <RightColumn>
                            <SubSection primaryAlign={JustifyContent.SPACE_BETWEEN} secondaryAlign={AlignItems.START}>
                                <div>
                                    <ConditionalRender condition={selectedCategory === "all"}>
                                        <FormattedTitle
                                            placeholder={formatMessage({ id: "stacked_bar.title.all" })}
                                            params={[ formatString({
                                                initial: formatMessage({ id: "topX" }),
                                                params: [ "5" ]
                                            }) ]}
                                            inline
                                        />
                                        <FormattedTitle
                                            placeholder={formatMessage({ id: "stacked_bar.title.category" })}
                                            params={[ CATEGORIES_MAP[selectedCategory] ]}
                                            inline
                                        />
                                    </ConditionalRender>
                                    <Hint />
                                </div>

                                <StyledLink to="/topic" tabIndex={7}>
                                    <span>
                                        <FormattedMessage id="link.details" />
                                    </span>
                                    <ArrowRight width={18} height={14} />
                                </StyledLink>
                            </SubSection>

                            <StackedBar />
                        </RightColumn>
                    </SubSection>
                    <SubSection primaryAlign={JustifyContent.SPACE_BETWEEN} secondaryAlign={AlignItems.START}>
                        <LeftColumn>
                            <div>
                                <FormattedTitle
                                    placeholder={formatMessage({ id: "expert_bar.title" })}
                                    params={[ CATEGORIES_MAP[selectedCategory] ]} />
                                <ExpertBar limit={EXPERT_BAR_LIMIT} />
                                <div>
                                    <StyledLink to="/experts/details" tabIndex={7}>
                                        <span>
                                            <FormattedMessage id="link.details" />
                                        </span>
                                        <ArrowRight width={18} height={14} />
                                    </StyledLink>
                                </div>
                            </div>
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
                    <ConnectionChart />
                </Section>
            </>
            <StyledPlaceholder primaryAlign={JustifyContent.CENTER}>
                <FormattedMessage id="placeholder.empty_data" />
            </StyledPlaceholder>
        </ConditionalRender>
    );
};

export default MainPage;
