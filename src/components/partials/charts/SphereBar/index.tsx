import React from "react";

import Chart from "~/components/core/Chart";
import useDrawBar from "~/hooks/useChart/draw/useDrawBar";

import { TYPES } from "~/common/constants";
import useData from "~/hooks/useData";

const TYPE = TYPES.SPHERE;

const SphereBar = (): JSX.Element => {
    const { getDataset } = useData();

    const dataset = getDataset(TYPE, "all");

    const { draw } = useDrawBar();

    return (
        <Chart draw={draw} />
    )
};

export default SphereBar;
