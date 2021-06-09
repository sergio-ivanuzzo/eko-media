import React from "react";
import { useIntl } from "react-intl";

import ArrowLeft from "~/components/icons/ArrowLeft";
import ConditionalRender from "~/components/core/ConditionalRender";
import ExpertCard from "~/components/partials/Content/ExpertBar/ExpertCard";
import FormattedTitle from "~/components/core/FormattedTitle";
import useData from "~/hooks/useData";

import { HeadingLevel } from "~/components/core/FormattedTitle/constants";
import { BackLink, HeadingSection, Section, SubSection } from "~/components/pages/styles";
import { CATEGORIES_MAP, EXPERTS_PHOTOS_DIR, NON_MEDIA_KEYS, TYPES } from "~/common/constants";

const TYPE = TYPES.EXPERT;

const ExpertsDetailsPage = (): JSX.Element => {
    const { isDataLoaded, selectedCategory, getDataset, allMedia } = useData();
    const { formatMessage } = useIntl();

    const dataset = getDataset(TYPE, selectedCategory) || [];

    const validMediaKeys = Object.keys(dataset[0] || {})
        .filter((key) => {
            return !NON_MEDIA_KEYS.includes(key) && allMedia.some(
                (mediaName) => key.includes(mediaName)
            );
        });

    const data: IExpertBarItem[] = dataset.map(({ expert_id, name, image_name, ...rest }) => {
        return {
            expertId: expert_id,
            name: name as string,
            commentsAmount: validMediaKeys.reduce((sum, key) => sum + Number(rest[key]) || 0, 0),
            avatarUrl: `${EXPERTS_PHOTOS_DIR}/${image_name}.png`,
        }
    }).sort((current, next) => next.commentsAmount - current.commentsAmount);

    return (
        <ConditionalRender condition={isDataLoaded}>
            <>
                <Section>
                    <HeadingSection>
                        <BackLink to="/" tabIndex={7}>
                            <ArrowLeft width={100} height={25} />
                        </BackLink>
                        <FormattedTitle
                            placeholder={formatMessage({ id: "expert_bar.title" })}
                            params={[ CATEGORIES_MAP[selectedCategory] ]} level={HeadingLevel.H2} />
                    </HeadingSection>
                    <SubSection wrap>
                        {data.map((item: IExpertBarItem, index: number) => <ExpertCard key={index} {...item} />)}
                    </SubSection>
                </Section>
            </>
        </ConditionalRender>
    );
};

export default ExpertsDetailsPage;
