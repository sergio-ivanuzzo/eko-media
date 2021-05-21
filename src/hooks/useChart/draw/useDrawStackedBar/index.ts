import { useCallback } from "react";
import * as d3 from "d3";

import useChartColor from "~/hooks/useChart/color/useChartColor";

const useDrawStackedBar = ({ data, xData, yData }: IUseStackedBarProps): { draw: (props: IChartDrawProps) => void }  => {

    const { getColor, getColorIndexByCategory } = useChartColor();

    const draw = useCallback(({ chartRef, width, height }: IChartDrawProps): void => {

        const series = d3.stack()
            .keys(xData)
            // normalization
            .offset(d3.stackOffsetExpand)(data as any);

        const svg: any = d3.select(chartRef.current)
            .attr("viewBox", `0 0 ${width} ${height}`);

        // clear svg before draw new content
        svg.selectAll("svg > *").remove();

        const xScale = d3.scaleLinear()
            .rangeRound([ 0, width ]).domain([ 0, 1.5 ]);

        const yScale: d3.ScaleBand<string> = d3.scaleBand()
            .range([ 0, height ])
            .padding(0.2)
            .domain(yData);

        // draw xAxis
        svg.append("g")
            .attr("class", "axis")
            .call(d3
                .axisTop(xScale)
                .tickSize(0)
                // x-axis will contains no text on scale
                .tickFormat(() => "")
            );

        // draw yAxis
        svg.append("g")
            .attr("class", "axis")
            .call(
                d3.axisLeft(yScale)
                    .tickFormat((d: string) => d)
                    .ticks(yData.length)
                    .tickSize(0)
                    .tickPadding(20)
            );

        svg.append("g")
            .selectAll("g")
            .data(series)
            .enter().append("g")
            .attr("fill", (d: any) => {
                const index = getColorIndexByCategory(d.key);
                return getColor(index);
            })
            .selectAll("rect")
            .data((d: any) => d)
            .join("rect")
            .attr("x", (d: any) => xScale(d[0]) + 30)
            .attr("y", (d: any, i: any) => yScale(d.data.key))
            .attr("width", (d: any, i: any) => xScale(d[1]) - xScale(d[0]))
            .attr("height", yScale.bandwidth())
    }, [ data, xData, yData ]);

    return {
        draw
    }
};

export default useDrawStackedBar;
