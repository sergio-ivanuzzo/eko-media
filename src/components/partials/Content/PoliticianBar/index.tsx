import React from "react";

import { TYPES } from "~/common/constants";
import useData from "~/hooks/useData";

const TYPE = TYPES.POLITICIAN;

const PoliticianBar = (): JSX.Element => {
    const { getDataset, selectedCategory } = useData();
    const dataset = getDataset(TYPE, selectedCategory);

    return (
        <div>Test</div>
    );
};

export default PoliticianBar;
