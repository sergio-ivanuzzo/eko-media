import React from "react";

import CategoryFilter from "~/components/partials/Header/FilterPanel/filters/CategoryFilter";
import DateFilter from "~/components/partials/Header/FilterPanel/filters/DateFilter";
import MediaFilter from "~/components/partials/Header/FilterPanel/filters/MediaFilter";

import { FilterContainer } from "./styles";

const FilterPanel = (): JSX.Element => {
    return (
        <FilterContainer>
            <DateFilter />
            <CategoryFilter />
            <MediaFilter />
        </FilterContainer>
    );
};

export default FilterPanel;
