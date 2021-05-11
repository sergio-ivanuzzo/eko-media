import React from "react";

import { StyledSelect } from "~/components/partials/Header/FilterPanel/styles";
import useData from "~/hooks/useData";

import { TSelectOption } from "~/components/core/Select/types";

const MediaFilter = (): JSX.Element => {
    const { setMedia, selectedMedia } = useData();

    const handleSelect = (media: TSelectOption[]): void => {
        setMedia(media as string[]);
    };

    return (
        <StyledSelect
            value={selectedMedia}
            options={selectedMedia as TSelectOption[]}
            onSelect={handleSelect}
            multiple />
    );
}

export default MediaFilter;
