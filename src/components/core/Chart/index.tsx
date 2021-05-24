import React from "react";

import useChart from "~/hooks/useChart";

import { ChartContainer, SVG } from "./styles";

const Chart = ({ draw, width, height, className = "" }: IChartProps): JSX.Element => {
    const { chartRef, containerRef } = useChart({ draw, width, height });
    return (
        <ChartContainer ref={containerRef} height={height} width={width}>
            <SVG ref={chartRef}
                 height={height}
                 width={width}
                 preserveAspectRatio="xMinYMin meet" className={className}
            />
        </ChartContainer>
    );
};

export default Chart;
