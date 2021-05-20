import React from "react";

import useChart from "~/hooks/useChart";

import { IChartProps } from "~/components/core/Chart/types";
import { ChartContainer, SVG } from "./styles";

const Chart = ({ draw, width, height }: IChartProps): JSX.Element => {
    const { chartRef, containerRef } = useChart({ draw, width, height });
    return (
        <ChartContainer ref={containerRef} height={height}>
            <SVG ref={chartRef} height={height} preserveAspectRatio="xMidYMin meet" />
        </ChartContainer>
    );
};

export default Chart;
