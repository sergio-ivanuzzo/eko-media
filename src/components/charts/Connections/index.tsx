import React from "react";

import useData from "~/hooks/useData";
import useDrawConnections from "~/hooks/useChart/draw/useDrawConnections";

import { StyledChart } from "./styles";
import { TYPES } from "~/common/constants";

const TYPE = TYPES.CONNECTION;

const ConnectionChart = (): JSX.Element => {
    const { getDataset } = useData();

    const dataset = getDataset(TYPE, "all");
    const { nodes = [], edges = [] } = (dataset[0] || []) as IGraphDataset;

    const { draw } = useDrawConnections({ nodes, edges });
    return <StyledChart draw={draw} height={400} />;
};

export default ConnectionChart;
