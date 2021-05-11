import React from "react";

import { StyledSelect } from "~/components/partials/Header/FilterPanel/styles";
import useData from "~/hooks/useData";

import { TSelectOption } from "~/components/core/Select/types";

const CategoryFilter = (): JSX.Element => {
    const { topCategories, setCategory, selectedCategory } = useData();

    const handleSelect = (category: TSelectOption[]): void => {
        setCategory(category[0] as string);
    };

    return (
        <StyledSelect
            value={[ selectedCategory ]}
            options={topCategories as TSelectOption[]}
            onSelect={handleSelect} />
    );
}

export default CategoryFilter;
