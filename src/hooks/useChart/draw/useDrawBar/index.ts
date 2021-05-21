import { useCallback } from "react";
import * as d3 from "d3";

import useChartColor from "~/hooks/useChart/color/useChartColor";

const useDrawBar = ({ data, xData, yData }: IDrawBarProps): { draw: (props: IChartDrawProps) => void } => {

    const { getColor, getColorIndexByCategory } = useChartColor();

    const draw = useCallback(({ chartRef, width, height }: IChartDrawProps): void => {
        const svg = d3.select(chartRef.current).attr("viewBox", `0 0 ${width} ${height}`).attr("height", height).attr("width", width);
        // clear svg before draw new content
        svg.selectAll("svg > *").remove();

        const xScale = d3.scaleLinear()
            .rangeRound([ 0, width * 2 ])
            .domain([ 0, d3.max(data, (d) => d.value as any) ]);

        const yScale: d3.ScaleBand<string> = d3.scaleBand()
            .range([ 0, height / 2 ])
            .domain(yData);

        svg.append("g")
            .attr("fill", getColor(1))
            .selectAll("rect.bar")
            .data(data)
            .join("rect")
            .attr("class", "bar")
            .attr("x", (d: any) => xScale(d[0]))
            .attr("y", (d: any) => yScale(d.key) as any)
            .attr("width", (d: any) => xScale(d.value) * 2)
            .attr("height", yScale.bandwidth());

        // draw text on bars
        svg.append("g")
            .attr("fill", "white")
            .attr("text-anchor", "start")
            .selectAll("text")
            .data(data)
            .join("text")
            .attr("x", (d: any) => xScale(0))
            .attr("y", (d: any) => yScale(d.key) as any + yScale.bandwidth() / 2)
            .attr("dy", "0.35em")
            .attr("dx", "8em")
            .attr("font-size", "2em")
            .text((d: any) => d.key);

    }, [ data, xData, yData ]);

    return {
        draw
    }
};

export default useDrawBar;
