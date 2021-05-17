import { FormattedMessage } from "react-intl";
import React, { useMemo } from "react";

import { StyledSelect } from "~/components/partials/Header/FilterPanel/styles";
import useData from "~/hooks/useData";

import { ISelectOption } from "~/components/core/Select/types";

const CategoryFilter = (): JSX.Element => {
    const { allCategories, setCategory } = useData();


    const handleSelect = (category: string[]): void => {
        setCategory(category[0] as string);
    };

    const options = useMemo(() => allCategories.map<ISelectOption>((category: string) => ({
        key: category,
        value: category
    })), [ allCategories ]);

    return (
        <div>
            <label>
                <FormattedMessage id="category_filter.label" />
            </label>
            <StyledSelect
                options={options}
                onSelect={handleSelect}
                allowSelectAll
            />
        </div>
    );
}

export default CategoryFilter;
