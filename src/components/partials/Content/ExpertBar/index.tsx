import React from "react";

import ExpertCard from "~/components/partials/Content/ExpertBar/ExpertCard";
import PaginatedList from "~/components/core/PaginatedList";
import useData from "~/hooks/useData";

import { EXPERTS_PHOTOS_DIR, NON_MEDIA_KEYS, TYPES } from "~/common/constants";

const TYPE = TYPES.EXPERT;

const ExpertBar = ({ limit }: IExpertBarProps): JSX.Element => {
    const { getDataset, selectedCategory, allMedia } = useData();
    const dataset = getDataset(TYPE, selectedCategory) || [];

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
        <PaginatedList>
            {data.map((item: IExpertBarItem, index: number) => <ExpertCard key={index} {...item} />)}
        </PaginatedList>
    );
};

export default ExpertBar;
