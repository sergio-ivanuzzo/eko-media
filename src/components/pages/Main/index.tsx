import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import ArrowChart from "~/components/charts/Arrow";
import ArrowRight from "~/components/icons/ArrowRight";
import Bubble from "~/components/charts/Bubble";
import ConditionalRender from "~/components/core/ConditionalRender";
import DownloadLink from "~/components/core/DownloadLink";
import ExpertBar from "~/components/partials/Content/ExpertBar";
import FormattedTitle from "~/components/core/FormattedTitle";
import Hint from "~/components/core/Hint";
import Network from "~/components/charts/Network";
import PoliticianBar from "~/components/partials/Content/PoliticianBar";
import Share from "~/components/icons/Share";
import SphereBar from "~/components/charts/Bar/SphereBar";
import StackedBar from "~/components/charts/StackedBar";
import formatString from "~/helpers/formatString";
import scrollWithOffset from "~/helpers/scrollWithOffset";
import useData from "~/hooks/useData";

import { HeadingLevel } from "~/components/core/FormattedTitle/constants";
import { MARGIN_LEFT } from "~/hooks/useChart/draw/useDrawStackedBar";
import { AlignItems, JustifyContent } from "~/components/global.constants";
import { CATEGORIES_MAP, ROOT_DIR, TYPES } from "~/common/constants";
import {
    HeadingSection,
    LeftColumn,
    RightColumn,
    Section, StyledHashLink,
    StyledLink,
    StyledPlaceholder,
    SubSection
} from "~/components/pages/styles";

const POLITICIAN_BAR_LIMIT = 5;
const EXPERT_BAR_LIMIT = 3;

const MainPage = (): JSX.Element => {

    const { selectedCategory, isDataLoading, getMonthAndYear, isDataEmpty } = useData();
    const { formatMessage } = useIntl();

    const { month, year } = getMonthAndYear();

    const networkFileName = `${TYPES.NETWORK}_${selectedCategory}_${month}_${year}.json`;
    const connectionFileName = `${TYPES.CONNECTION}_${selectedCategory}_${month}_${year}.json`;
    const stackedBarFileName = `${TYPES.CATEGORY}_${selectedCategory}_${month}_${year}.csv`;
    const bubbleFileName = `${TYPES.WORD_CLOUD}_${selectedCategory}_${month}_${year}.csv`;

    const getDirPath = (fileName: string) => {
        return `${ROOT_DIR}/${year}/${month}/${fileName}`;
    }

    return (
        <>
            <ConditionalRender condition={!isDataLoading}>
                <ConditionalRender condition={!isDataEmpty}>
                    <>
                        <Section allowSelection>
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
                                        <div style={{ textAlign: "center" }}>
                                            <StyledLink to="/politicians/details" tabIndex={7}>
                                                <span>
                                                    <FormattedMessage id="link.details" />
                                                </span>
                                                <ArrowRight width={18} height={14} />
                                            </StyledLink>
                                        </div>
                                    </div>

                                    <div>
                                        <div style={{ textAlign: "left", marginBottom: "20px" }}>
                                            <FormattedTitle
                                                placeholder={formatMessage({ id: "sphere_bar.title" })}
                                                params={[ CATEGORIES_MAP[selectedCategory] ]}
                                                inline
                                            />
                                        </div>
                                        <SphereBar />
                                    </div>
                                    <div>
                                        <div>
                                            <FormattedTitle
                                                placeholder={formatMessage({ id: "expert_bar.title" })}
                                                params={[ CATEGORIES_MAP[selectedCategory] ]} inline
                                            />
                                            <Hint
                                                text={formatMessage({ id: "sphere_bar.hint" })}
                                                linkUrl={"/about#experts"}
                                                linkText={formatMessage({ id: "sphere_bar.hint.urlText" })}
                                            />
                                        </div>
                                        <ExpertBar limit={EXPERT_BAR_LIMIT} />
                                        <div style={{ textAlign: "center" }}>
                                            <StyledLink to="/experts/details" tabIndex={7}>
                                                <span>
                                                    <FormattedMessage id="link.details" />
                                                </span>
                                                <ArrowRight width={18} height={14} />
                                            </StyledLink>
                                        </div>
                                    </div>
                                </LeftColumn>
                                <RightColumn secondaryAlign={AlignItems.START}>
                                    <SubSection primaryAlign={JustifyContent.START} secondaryAlign={AlignItems.END}>
                                        <div style={{ marginLeft: `${MARGIN_LEFT}px` }} id="stacked_bar">
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
                                            <StyledHashLink to={"/#stacked_bar"} scroll={(el) => scrollWithOffset(el, 20)}>
                                                <Share width={24} />
                                            </StyledHashLink>
                                        </div>

                                        <StyledLink to="/topic" tabIndex={7}>
                                            <span>
                                                <FormattedMessage id="link.details.info" />
                                            </span>
                                            <ArrowRight width={18} height={14} />
                                        </StyledLink>
                                    </SubSection>

                                    <StackedBar />
                                    <SubSection primaryAlign={JustifyContent.CENTER} secondaryAlign={AlignItems.CENTER}>
                                        <DownloadLink
                                            filePath={getDirPath(stackedBarFileName)}
                                            fileName={stackedBarFileName}
                                        />
                                    </SubSection>
                                    <div style={{ marginLeft: `${MARGIN_LEFT}px`, marginTop: "100px" }} id="bubble">
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
                                        <StyledHashLink to={"/#bubble"} scroll={(el) => scrollWithOffset(el, 20)}>
                                            <Share width={24} />
                                        </StyledHashLink>
                                    </div>
                                    <Bubble />
                                    <SubSection primaryAlign={JustifyContent.CENTER} secondaryAlign={AlignItems.CENTER}>
                                        <DownloadLink
                                            filePath={getDirPath(bubbleFileName)}
                                            fileName={bubbleFileName}
                                        />
                                    </SubSection>
                                </RightColumn>
                            </SubSection>
                        </Section>
                        <Section allowSelection>
                            <HeadingSection noMargin>
                                <FormattedTitle
                                    placeholder={formatMessage({ id: "network.title" })}
                                    level={HeadingLevel.H2}
                                />
                            </HeadingSection>
                            <HeadingSection>
                                <div id="network">
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
                                    <StyledHashLink to={"/#network"} scroll={(el) => scrollWithOffset(el, 20)}>
                                        <Share width={24} />
                                    </StyledHashLink>
                                </div>
                            </HeadingSection>
                            <Network />
                            <SubSection primaryAlign={JustifyContent.CENTER} secondaryAlign={AlignItems.CENTER}>
                                <DownloadLink filePath={getDirPath(networkFileName)} fileName={networkFileName} />
                            </SubSection>
                            <div style={{ marginTop: "100px" }}>
                                <div style={{ padding: "0 25px" }} id="arrow">
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
                                    <StyledHashLink to={"/#arrow"} scroll={(el) => scrollWithOffset(el, 20)}>
                                        <Share width={24} />
                                    </StyledHashLink>
                                </div>
                                <ArrowChart />
                                <SubSection primaryAlign={JustifyContent.CENTER} secondaryAlign={AlignItems.CENTER}>
                                    <DownloadLink
                                        filePath={getDirPath(connectionFileName)}
                                        fileName={connectionFileName}
                                    />
                                </SubSection>
                            </div>
                        </Section>
                    </>
                    <StyledPlaceholder primaryAlign={JustifyContent.CENTER}>
                        <FormattedMessage id="placeholder.empty_data" />
                    </StyledPlaceholder>
                </ConditionalRender>
                <StyledPlaceholder primaryAlign={JustifyContent.CENTER}>
                    <FormattedMessage id="placeholder.loading" />
                </StyledPlaceholder>
            </ConditionalRender>
        </>
    );
};

export default MainPage;
