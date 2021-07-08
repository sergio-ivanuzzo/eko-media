import { FormattedMessage } from "react-intl";
import React from "react";

import useData from "~/hooks/useData";

import { FilterItemContainer, StyledDatepicker } from "~/components/partials/Header/FilterPanel/styles";

const DateFilter = (): JSX.Element => {
    const { loadAll, isDataLoading } = useData();

    return (
        <FilterItemContainer>
            <label>
                <FormattedMessage id="datepicker.label" />
            </label>
            <StyledDatepicker onDateChange={loadAll} tabIndex={4} disabled={isDataLoading} />
        </FilterItemContainer>
    );
};

export default DateFilter;
