import React from "react";
import { useIntl } from "react-intl";

import ExpertCard from "~/components/partials/Content/ExpertBar/ExpertCard";
import FormattedTitle from "~/components/core/FormattedTitle";
import PaginatedList from "~/components/core/PaginatedList";
import useData from "~/hooks/useData";

import { ExpertsBarContainer } from "./styles";
import { CATEGORIES_MAP, EXPERTS_PHOTOS_DIR, NON_MEDIA_KEYS, TYPES } from "~/common/constants";

const TYPE = TYPES.EXPERT;

const ExpertBar = ({ limit }: IExpertBarProps): JSX.Element => {
    const { getDataset, selectedCategory, allMedia } = useData();
    const dataset = getDataset(TYPE, selectedCategory) || [];
    const { formatMessage } = useIntl();

    const validMediaKeys = Object.keys(dataset[0] || {})
        .filter((key) => {
            return !NON_MEDIA_KEYS.includes(key) && allMedia.some(
                (mediaName) => key.includes(mediaName)
            )
        });

    let data: IExpertBarItem[] = dataset.map(({ expert_id, name, image_name, ...rest }) => {
        return {
            expertId: expert_id,
            name: name as string,
            commentsAmount: validMediaKeys.reduce((sum, key) => sum + Number(rest[key]) || 0, 0),
            avatarUrl: `${EXPERTS_PHOTOS_DIR}/${image_name}.png`
        }
    }).sort((current, next) => next.commentsAmount - current.commentsAmount);

    if (limit) {
        data = data.slice(0, limit);
    }

    return (
        <ExpertsBarContainer>
            <FormattedTitle
                placeholder={formatMessage({ id: "expert_bar.title" })}
                params={[ CATEGORIES_MAP[selectedCategory] ]} />
            <PaginatedList>
                {data.map((item: IExpertBarItem, index: number) => <ExpertCard key={index} {...item} />)}
            </PaginatedList>
        </ExpertsBarContainer>
    );
};

export default ExpertBar;
