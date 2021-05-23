import { FormattedMessage } from "react-intl";
import React, { useMemo } from "react";

import useData from "~/hooks/useData";
import { FilterItemContainer, StyledSelect } from "~/components/partials/Header/FilterPanel/styles";

const MediaFilter = (): JSX.Element => {
    const { setMedia, allMedia } = useData();

    const handleSelect = (media: ISelectOption[]): void => {
        setMedia(media.map((item: ISelectOption) => item.key));
    };

    const options = useMemo(() => allMedia.map<ISelectOption>((media: string) => ({
        key: media,
        value: media
    })), [ allMedia ]);

    return (
        <FilterItemContainer>
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
        </FilterItemContainer>
    );
}

export default MediaFilter;
