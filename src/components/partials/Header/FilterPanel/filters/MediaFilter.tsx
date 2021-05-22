import { FormattedMessage } from "react-intl";
import React, { useMemo } from "react";

import { StyledSelect } from "~/components/partials/Header/FilterPanel/styles";
import useData from "~/hooks/useData";

import { FILTER_BY_CATEGORY_INDEXES, TYPES } from "~/common/constants";

const MediaFilter = (): JSX.Element => {
    const { setMedia, getDataset } = useData();

    const dataset = getDataset(TYPES.CATEGORY);

    const parsedMedia = useMemo(
        () => dataset.length
            ? Object.keys(dataset[0]).filter((key: string) => !FILTER_BY_CATEGORY_INDEXES.includes(key))
            : [],
        [ dataset ]
    );

    const handleSelect = (media: ISelectOption[]): void => {
        setMedia(media.map((item: ISelectOption) => item.key));
    };

    const options = useMemo(() => parsedMedia.map<ISelectOption>((media: string) => ({
        key: media,
        value: media
    })), [ parsedMedia ]);

    return (
        <div>
            <label>
                <FormattedMessage id="media_filter.label" />
            </label>
            <StyledSelect
                options={options}
                onSelect={handleSelect}
                multiple
                allowSelectAll
                tabIndex={6}
            />
        </div>
    );
}

export default MediaFilter;
