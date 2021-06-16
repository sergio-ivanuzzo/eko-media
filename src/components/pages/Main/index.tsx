import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import ArrowChart from "~/components/charts/Arrow";
import ArrowRight from "~/components/icons/ArrowRight";
import Bubble from "~/components/charts/Bubble";
import ConditionalRender from "~/components/core/ConditionalRender";
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
import { HeadingLevel } from "~/components/core/FormattedTitle/constants";
import { AlignItems, JustifyContent } from "~/components/global.constants";
import {
    LeftColumn,
    RightColumn,
    Section,
    StyledLink,
    StyledPlaceholder,
    SubSection
} from "~/components/pages/styles";

import theme from "~/common/theme";

const POLITICIAN_BAR_LIMIT = 3;
const EXPERT_BAR_LIMIT = 3;

const { gray, green, white, cyan } = theme.palette;

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
                                    <Hint
                                        text={formatMessage({ id: "politician_bar.hint" })}
                                        linkUrl={"/about#politicians"}
                                        linkText={formatMessage({ id: "politician_bar.hint.urlText" })}
                                    />
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
                                    <Hint
                                        text={formatMessage({ id: "sphere_bar.hint" })}
                                        linkUrl={"/about#experts"}
                                        linkText={formatMessage({ id: "sphere_bar.hint.urlText" })}
                                    />
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
                                    <Hint
                                        text={formatMessage({ id: "stacked_bar.hint" })}
                                        linkUrl={"/about#categories"}
                                        linkText={formatMessage({ id: "stacked_bar.hint.urlText" })}
                                    />
                                </div>

                                <StyledLink to="/topic" tabIndex={7}>
                                    <span>
                                        <FormattedMessage id="link.details" />
                                    </span>
                                    <ArrowRight width={18} height={14} />
                                </StyledLink>

                                <Hint
                                    text={formatMessage({ id: "zoomable_chart.hint" })}
                                    background={cyan.azure}
                                    color={cyan.azure}
                                    toRight
                                />
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
                            <div>
                                <FormattedTitle
                                    placeholder={formatMessage({ id: "bubble.title" })}
                                    level={HeadingLevel.H3}
                                    inline
                                />
                                <Hint
                                    text={formatMessage({ id: "bubble.hint" })}
                                    linkUrl={"/about#word-cloud"}
                                    linkText={formatMessage({ id: "bubble.hint.urlText" })}
                                />
                            </div>
                            <Bubble />
                        </RightColumn>
                    </SubSection>
                </Section>
                <Section>
                    <FormattedTitle
                        placeholder={formatMessage({ id: "network.title" })}
                        level={HeadingLevel.H2}
                    />
                    <div>
                        <FormattedTitle
                            placeholder={formatMessage({ id: "network.subtitle" })}
                            level={HeadingLevel.H3}
                            inline
                        />
                        <Hint
                            text={formatMessage({ id: "network.hint" })}
                            linkUrl={"/about#network"}
                            linkText={formatMessage({ id: "network.hint.urlText" })}
                        />
                    </div>
                    <Network />
                    <div>
                        <FormattedTitle
                            placeholder={formatMessage({ id: "arrow_chart.title" })}
                            level={HeadingLevel.H3}
                            inline
                        />
                        <Hint
                            text={formatMessage({ id: "arrow_chart.hint" })}
                            linkUrl={"/about#connections"}
                            linkText={formatMessage({ id: "arrow_chart.hint.urlText" })}
                        />
                    </div>
                    <ArrowChart />
                </Section>
            </>
            <StyledPlaceholder primaryAlign={JustifyContent.CENTER}>
                <FormattedMessage id="placeholder.empty_data" />
            </StyledPlaceholder>
        </ConditionalRender>
    );
};

export default MainPage;
