import { FormattedMessage, useIntl } from "react-intl";
import React, { useEffect, useState } from "react";

import {
    BackLink, HeadingSection,
    LeftColumn,
    RightColumn,
    Section,
    StyledPlaceholder,
    StyledPlaceholderMini,
    SubSection
} from "~/components/pages/styles";

import ArrowLeft from "~/components/icons/ArrowLeft";
import ArticleBar from "~/components/charts/Bar/ArticleBar";
import ConditionalRender from "~/components/core/ConditionalRender";
import DownloadLink from "~/components/core/DownloadLink";
import FormattedTitle from "~/components/core/FormattedTitle";
import TopicMediaBar from "~/components/charts/Bar/TopicMediaBar";
import useData from "~/hooks/useData";

import { HeadingLevel } from "~/components/core/FormattedTitle/constants";
import { AlignItems, JustifyContent } from "~/components/global.constants";
import { CATEGORIES_MAP, ROOT_DIR, TYPES } from "~/common/constants";

import { StyledHint } from "./styles";

const TYPE = TYPES.TOPIC;

const TopicPage = (): JSX.Element => {
    const { isDataLoading, selectedCategory, getMonthAndYear, getDataset } = useData();
    const { formatMessage } = useIntl();

    const dataset = getDataset(TYPE, selectedCategory) || [];

    const [ topic, setTopic ] = useState<string>("");

    const { month, year } = getMonthAndYear();
    const fileName = `${TYPE}_${selectedCategory}_${month}_${year}.csv`;
    const dirPath = `../${ROOT_DIR}/${year}/${month}/${fileName}`;

    // reset topic on change category
    useEffect(() => {
        setTopic("");
    }, [ selectedCategory ]);

    return (
        <ConditionalRender condition={!isDataLoading}>
            <>
                <Section allowSelection>
                    <HeadingSection style={{ padding: 0 }}>
                        <BackLink to="/" tabIndex={7}>
                            <ArrowLeft width={100} height={25} />
                        </BackLink>
                        <div>
                            <FormattedTitle
                                placeholder={formatMessage({ id: "topic.title" })}
                                params={[ CATEGORIES_MAP[selectedCategory] ]}
                                level={HeadingLevel.H2}
                                inline
                            />
                            <StyledHint text={formatMessage({ id: "topic.hint" })} />
                        </div>
                    </HeadingSection>
                    <ConditionalRender condition={!!topic}>
                        <SubSection>
                            <LeftColumn />
                            <RightColumn primaryAlign={JustifyContent.START} secondaryAlign={AlignItems.START}>
                                <FormattedTitle
                                    placeholder={formatMessage({ id: "topic_media_bar.title" })}
                                    params={[ topic, CATEGORIES_MAP[selectedCategory] ]}
                                    level={HeadingLevel.H3}
                                />
                            </RightColumn>
                        </SubSection>
                    </ConditionalRender>
                    <ConditionalRender condition={!!topic}>
                        <>
                            <SubSection primaryAlign={JustifyContent.SPACE_BETWEEN} secondaryAlign={AlignItems.INHERIT}>
                                <LeftColumn primaryAlign={JustifyContent.SPACE_BETWEEN} secondaryAlign={AlignItems.START}>
                                    <ArticleBar onClick={({ key }) => setTopic(key)} />
                                </LeftColumn>
                                <RightColumn>
                                    <TopicMediaBar selectedTopic={topic} />
                                </RightColumn>
                            </SubSection>
                            <SubSection primaryAlign={JustifyContent.CENTER} secondaryAlign={AlignItems.CENTER}>
                                <DownloadLink filePath={dirPath} fileName={fileName} />
                            </SubSection>
                        </>
                        <SubSection
                            primaryAlign={JustifyContent.CENTER}
                            secondaryAlign={AlignItems.INHERIT}
                            style={{ minHeight: "50vh", marginBottom: "50px" }}
                        >
                            <ConditionalRender condition={!!dataset.length}>
                                <ArticleBar onClick={({ key }) => setTopic(key)} />
                                <StyledPlaceholderMini primaryAlign={JustifyContent.CENTER}>
                                    <FormattedMessage id="placeholder.category.empty_data" />
                                </StyledPlaceholderMini>
                            </ConditionalRender>
                        </SubSection>
                    </ConditionalRender>
                </Section>
            </>
            <StyledPlaceholder>
                <FormattedMessage id="placeholder.loading" />
            </StyledPlaceholder>
        </ConditionalRender>
    );
}

export default TopicPage;
