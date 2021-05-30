import { useCallback } from "react";
import * as d3 from "d3";

import useChartColor from "~/hooks/useChart/color/useChartColor";

export const BAR_HEIGHT = 27;
export const MARGIN_LEFT = 230;

const useDrawStackedBar = ({ data, xData, yData }: IUseStackedBarProps): { draw: (props: IChartDrawProps) => void } => {

    const { getColor } = useChartColor();

    const draw = useCallback(({ chartRef, width, height, colors }: IChartDrawProps): void => {

        const series = d3.stack()
            .keys(xData)
            // normalization
            .offset(d3.stackOffsetExpand)(data as any);

        const svg: any = d3.select(chartRef.current)
            .attr("preserveAspectRatio", "xMaxYMin meet")
            .attr("viewBox", `0 0 ${width} ${height}`)
            // .attr("transform", "translate(200, 0)")
            .attr("width", width)
            .attr("height", height);

        // clear svg before draw new content
        svg.selectAll("svg > *").remove();

        // const maxX = d3.max(data, (d: any) => d.total);
        const xMax = d3.max(series, (d) => d3.max(d, (d) => d[1])) as number;

        const xScale = d3.scaleLinear()
            .rangeRound([ MARGIN_LEFT, width ])
            .domain([ 0, xMax ]);

        const yScale: d3.ScaleBand<string> = d3.scaleBand()
            .range([ 0, height ])
            .padding(0.2)
            .domain(yData);

        // draw xAxis
        const xAxis = d3
            .axisBottom(xScale)
            .tickSize(0)
            // x-axis will contains no text on scale
            .tickFormat(() => "");

        const gX = svg.append("g")
            .attr("class", "axis axis-x")
            .call(xAxis);

        // draw yAxis
        const yAxis = d3.axisLeft(yScale)
            .tickFormat((d: string) => d)
            .ticks(yData.length)
            .tickSize(0)
            .tickPadding(20);

        const gY = svg.append("g")
            .attr("class", "axis axis-y")
            .call(yAxis);

        const groupsContainer = svg.append("g").attr("class", "groups-container");

        const group = groupsContainer
            .selectAll("g")
            .data(series)
            .enter().append("g")
            .attr("fill", (d: any, index: number) => {
                return getColor({ index, colors });
            })
            .attr("class", (d: any, i: number) => `group-${i}`);

        let segment = group.selectAll("rect").data((d: any) => d);
        segment = segment.enter().append("rect").merge(segment);
        segment.attr("class", "segment")
            .attr("x", (d: any) => xScale(d[0]))
            .attr("y", (d: any) => yScale(d.data.key))
            .attr("width", (d: any, i: any) => xScale(d[1]) - xScale(d[0]))
            .attr("height", yScale.bandwidth())

        segment.exit().remove();

        const zoom = d3.zoom()
            .scaleExtent([ 1, 10 ])
            .translateExtent([ [ 0, 0 ], [ width, height ] ])
            .on("zoom", (event: d3.D3ZoomEvent<any, any>) => {

                const transform = event.transform;

                const newScaleX = transform.rescaleX(xScale).clamp(true);
                xAxis.scale(newScaleX)
                svg.select("g.axis-x").call(xAxis);

                svg.selectAll("rect.segment")
                    .attr("x", (d: any) => newScaleX(d[0]))
                    .attr("width", (d: any) => newScaleX(d[1]) - newScaleX(d[0]));
            })

        svg.call(zoom);

        // disable drag
        svg.on("mousedown.zoom", null)
    }, [ data ]);

    return {
        draw
    }
};

export default useDrawStackedBar;
