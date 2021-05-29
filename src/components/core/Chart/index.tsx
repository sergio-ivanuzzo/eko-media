import React from "react";

import useChart from "~/hooks/useChart";

import { ChartContainer, SVG } from "./styles";

const Chart = ({ draw, width, height, className = "", colors = [] }: IChartProps): JSX.Element => {
    const { chartRef, containerRef } = useChart({ draw, width, height, colors });

    return (
        <ChartContainer ref={containerRef} height={height} width={width}>
            <SVG ref={chartRef} className={className} />
        </ChartContainer>
    );
};

export default Chart;
