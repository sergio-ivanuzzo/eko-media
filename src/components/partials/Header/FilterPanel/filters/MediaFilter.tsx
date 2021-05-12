import { FormattedMessage } from "react-intl";
import React, { useMemo } from "react";

import { StyledSelect } from "~/components/partials/Header/FilterPanel/styles";
import useData from "~/hooks/useData";

import { TSelectOption } from "~/components/core/Select/types";
import { FILTER_BY_CATEGORY_INDEXES, TYPES } from "~/common/constants";

const MediaFilter = (): JSX.Element => {
    const { setMedia, selectedMedia, getDataset } = useData();

    const dataset = getDataset(TYPES.CATEGORY);

    const parsedMedia = useMemo(
        () => dataset.length
            ? Object.keys(dataset[0]).filter((key: string) => !FILTER_BY_CATEGORY_INDEXES.includes(key))
            : [],
        [ dataset ]
    );

    const handleSelect = (media: TSelectOption[]): void => {
        setMedia(media as string[]);
    };

    return (
        <div>
            <label>
                <FormattedMessage id="media_filter.label" />
            </label>
            <StyledSelect
                value={selectedMedia}
                options={parsedMedia as TSelectOption[]}
                onSelect={handleSelect}
                multiple
            />
        </div>
    );
}

export default MediaFilter;
