import React from "react";

import useData from "~/hooks/useData";

import { StyledDatepicker } from "~/components/partials/Header/FilterPanel/styles";

const DateFilter = (): JSX.Element => {
    const { loadAll } = useData();

    return <StyledDatepicker onDateChange={loadAll} tabIndex={4} />;
};

export default DateFilter;
