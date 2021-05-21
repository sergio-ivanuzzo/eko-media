import { useCallback } from "react";
import * as d3 from "d3";

import useChartColor from "~/hooks/useChart/color/useChartColor";

const useDrawBar = ({ data, xData, yData }: IDrawBarProps): { draw: (props: IChartDrawProps) => void } => {

    const { getColor, getColorIndexByCategory } = useChartColor();

    const draw = useCallback(({ chartRef, width, height }: IChartDrawProps): void => {
        const svg = d3.select(chartRef.current).attr("viewBox", `0 0 ${width} ${height}`);
        // clear svg before draw new content
        svg.selectAll("svg > *").remove();

        // const xScale = d3.scaleLinear()
        //     .rangeRound([ 0, width ]).domain([ 0, d3.max(data, (d) => d["Всі"]) ]);
        //
        // const yScale: d3.ScaleBand<string> = d3.scaleBand()
        //     .range([ 0, height ])
        //     .padding(0.2)
        //     .domain(yData);
        //
        // // draw xAxis
        // svg.append("g")
        //     .attr("class", "axis")
        //     .call(d3
        //         .axisBottom(xScale)
        //         .tickSize(0)
        //         // x-axis will contains no text on scale
        //         .tickFormat(() => "")
        //     );
        //
        // // draw yAxis
        // svg.append("g")
        //     .attr("class", "axis")
        //     .call(
        //         d3.axisLeft(yScale)
        //             .tickFormat((d: string) => d)
        //             .ticks(yData.length)
        //             .tickSize(0)
        //             .tickPadding(20)
        //     );
        //
        // svg.selectAll("rect.bar")
        //     .data(data)
        //     .enter().append("rect")
        //     .attr("fill", (d: any) => {
        //         const index = getColorIndexByCategory(d.key);
        //         return getColor(index);
        //     })
        //     .join("rect")
        //     .attr("x", (d: any, i) => xScale(d["Всі"]))
        //     .attr("y", (d: any) => {
        //         console.log("d:", d)
        //         return yScale(d.key)
        //     })
        //     .attr("width", (d: any, i: any) => xScale(d[1]) - xScale(d[0]))
        //     .attr("height", yScale.bandwidth())

    }, []);

    return {
        draw
    }
};

export default useDrawBar;
