import { FormattedMessage, useIntl } from "react-intl";
import React, { useState } from "react";

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
import FormattedTitle from "~/components/core/FormattedTitle";
import TopicMediaBar from "~/components/charts/Bar/TopicMediaBar";
import useData from "~/hooks/useData";

import { CATEGORIES_MAP } from "~/common/constants";
import { HeadingLevel } from "~/components/core/FormattedTitle/constants";
import { JustifyContent } from "~/components/global.constants";

const TopicPage = (): JSX.Element => {
    const { data, selectedCategory } = useData();
    const { formatMessage } = useIntl();

    const [ topic, setTopic ] = useState<string>("");

    return (
        <ConditionalRender condition={!!Object.keys(data).length}>
            <>
                <Section>
                    <HeadingSection>
                        <BackLink to="/" tabIndex={7}>
                            <ArrowLeft width={100} height={25} />
                        </BackLink>
                        <FormattedTitle
                            placeholder={formatMessage({ id: "politician_bar.title" })}
                            params={[ CATEGORIES_MAP[selectedCategory] ]} level={HeadingLevel.H2} />
                    </HeadingSection>
                    <SubSection>
                        <LeftColumn />
                        <RightColumn primaryAlign={JustifyContent.START}>
                            <ConditionalRender condition={!!topic}>
                                <FormattedTitle
                                    placeholder={formatMessage({ id: "topic_media_bar.title" })}
                                    params={[ topic ]} level={HeadingLevel.H3} />
                            </ConditionalRender>
                        </RightColumn>
                    </SubSection>
                    <SubSection>
                        <LeftColumn>
                            <ArticleBar onClick={({ key }) => setTopic(key)} />
                        </LeftColumn>
                        <RightColumn>
                            <TopicMediaBar selectedTopic={topic} />
                        </RightColumn>
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
