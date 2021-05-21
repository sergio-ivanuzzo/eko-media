import { FormattedMessage } from "react-intl";
import React, { useMemo } from "react";

import { StyledSelect } from "~/components/partials/Header/FilterPanel/styles";
import useData from "~/hooks/useData";

import { CATEGORIES_MAP } from "~/common/constants";

const CategoryFilter = (): JSX.Element => {
    const { topCategories, setCategory } = useData();

    const handleSelect = (category: ISelectOption[]): void => {
        setCategory(category[0].key);
    };

    const options = useMemo(() => topCategories
        .map<ISelectOption>((category: string) => ({
            key: Object.keys(CATEGORIES_MAP).find((key) => CATEGORIES_MAP[key] === category) ?? "",
            value: category
        })), [ topCategories ]);

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
