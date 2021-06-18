import { FormattedMessage } from "react-intl";
import React from "react";

import ConditionalRender from "~/components/core/ConditionalRender";
import ExpertCard from "~/components/partials/Content/ExpertBar/ExpertCard";
import PaginatedList from "~/components/core/PaginatedList";
import useData from "~/hooks/useData";

import { JustifyContent } from "~/components/global.constants";
import { StyledPlaceholder } from "~/components/partials/Content/styles";
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

    let data: IExpertBarItem[] = dataset
        .map(({ expert_id, name, image_name, ...rest }) => {
            return {
                expertId: expert_id,
                name: name as string,
                commentsAmount: validMediaKeys.reduce((sum, key) => sum + Number(rest[key]) || 0, 0),
                avatarUrl: `${EXPERTS_PHOTOS_DIR}/${image_name}.png`
            }
        })
        .filter((item) => !!item.commentsAmount)
        .sort((current, next) => next.commentsAmount - current.commentsAmount);

    if (limit) {
        data = data.slice(0, limit);
    }

    return (
        <ConditionalRender condition={!!data.length}>
            <PaginatedList>
                {data.map((item: IExpertBarItem, index: number) => <ExpertCard key={index} {...item} width={300} />)}
            </PaginatedList>
            <div style={{ marginBottom: "20px" }}>
                <StyledPlaceholder primaryAlign={JustifyContent.CENTER}>
                    <FormattedMessage id="placeholder.category_media.empty_data" />
                </StyledPlaceholder>
            </div>
        </ConditionalRender>
    );
};

export default ExpertBar;
