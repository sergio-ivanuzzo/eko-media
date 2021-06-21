import { FormattedMessage, useIntl } from "react-intl";
import React, { useEffect, useState } from "react";

import {
    BackLink, HeadingSection,
    LeftColumn,
    RightColumn,
    Section,
    StyledPlaceholder,
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

const TYPE = TYPES.TOPIC;

const TopicPage = (): JSX.Element => {
    const { isDataLoaded, selectedCategory, getMonthAndYear } = useData();
    const { formatMessage } = useIntl();

    const [ topic, setTopic ] = useState<string>("");

    const { month, year } = getMonthAndYear();
    const fileName = `${TYPE}_${selectedCategory}_${month}_${year}.csv`;
    const dirPath = `${ROOT_DIR}/${year}/${month}/${fileName}`;

    // reset topic on change category
    useEffect(() => {
        setTopic("");
    }, [ selectedCategory ]);

    return (
        <ConditionalRender condition={isDataLoaded}>
            <>
                <Section>
                    <HeadingSection style={{ padding: 0 }}>
                        <BackLink to="/" tabIndex={7}>
                            <ArrowLeft width={100} height={25} />
                        </BackLink>
                        <FormattedTitle
                            placeholder={formatMessage({ id: "topic.title" })}
                            params={[ CATEGORIES_MAP[selectedCategory] ]} level={HeadingLevel.H2} />
                    </HeadingSection>
                    <SubSection>
                        <LeftColumn />
                        <RightColumn primaryAlign={JustifyContent.START} secondaryAlign={AlignItems.START}>
                            <ConditionalRender condition={!!topic}>
                                <FormattedTitle
                                    placeholder={formatMessage({ id: "topic_media_bar.title" })}
                                    params={[ topic, CATEGORIES_MAP[selectedCategory] ]}
                                    level={HeadingLevel.H3}
                                />
                            </ConditionalRender>
                        </RightColumn>
                    </SubSection>
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
                </Section>
            </>
            <StyledPlaceholder>
                <FormattedMessage id="placeholder.empty_data" />
            </StyledPlaceholder>
        </ConditionalRender>
    );
}

export default TopicPage;
