import React from "react";

import Chart from "~/components/core/Chart";
import useData from "~/hooks/useData";

import { TYPES } from "~/common/constants";

import { IGraphDataset } from "./types";
import useNetwork from "~/hooks/charts/useNetwork";

const TYPE = TYPES.NETWORK;

const Network = (): JSX.Element => {
    const { getDataset } = useData();

    const dataset = getDataset(TYPE, "all");
    const { nodes, edges } = dataset[0] as IGraphDataset;

    const { draw } = useNetwork({ nodes, edges });

    return <Chart draw={draw} />
};

export default Network;
