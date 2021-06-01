import { useCallback } from "react";
import * as d3 from "d3";

import useChartColor from "~/hooks/useChart/color/useChartColor";

export const BAR_HEIGHT = 32;
export const MARGIN_LEFT = 230;
export const MARGIN_BOTTOM = 50;
export const MARGIN_TOP = 50;

const MIN_ZOOM = 1;
const MAX_ZOOM = 15;

const LEGEND_WIDTH = 20;
export const LEGEND_HEIGHT = 20;
const LEGEND_MARGIN = 30;

export const TRANSITION_Y = MARGIN_TOP + LEGEND_HEIGHT;

const TEXT_MARGIN_LEFT = 30;

const useDrawStackedBar = ({ data, xData, yData }: IUseStackedBarProps): { draw: (props: IChartDrawProps) => void } => {

    const { getColor } = useChartColor();

    const draw = useCallback(({ chartRef, width, height, colors }: IChartDrawProps): void => {

        let series = d3.stack()
            .keys(xData)
            // normalization
            .offset(d3.stackOffsetExpand)(data as any);

        if (xData.length === 1) {
            series = d3.stack().keys(xData)(data as any);
        }

        const svg: any = d3.select(chartRef.current)
            .attr("preserveAspectRatio", "xMaxYMin meet")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("width", width)
            .attr("height", height);

        // clear svg before draw new content
        svg.selectAll("svg > *").remove();

        const xMax = d3.max(series, (d) => d3.max(d, (d) => d[1])) as number;

        const xScale = d3.scaleLinear()
            .rangeRound([ MARGIN_LEFT, width ])
            .domain([ 0, xMax ])
            .clamp(true);

        const yScale: d3.ScaleBand<string> = d3.scaleBand()
            .range([ 0, height - TRANSITION_Y ])
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

        const groupsContainer = svg.append("g")
            .attr("class", "groups-container")//.attr("pointer-events", "all");

        const group = groupsContainer
            .selectAll("g")
            .data(series)
            .enter().append("g")
            .attr("fill", (d: any, index: number) => getColor({ index, colors }))
            .attr("class", (d: any, i: number) => `group-${i}`);

        const segment = group.selectAll("rect").data((d: any) => d);
        segment.join("rect")
            .attr("class", "segment")
            .attr("x", (d: any) => xScale(d[0]))
            .attr("y", (d: any) => yScale(d.data.key))
            .attr("width", (d: any, i: any) => xScale(d[1]) - xScale(d[0]))
            .attr("height", yScale.bandwidth());

        const text = group.selectAll("text.label").data((d: any) => d);
        text.join("text")
            .text((d: any, i: any, n: any) => {
                const parent = d3.select(n[i]).node().parentNode;
                const parentClass = d3.select(parent).attr("class");
                const groupIndex = Number(parentClass.replace( /^\D+/g, ""));
                const value = d.data.values[groupIndex];
                const total = d.data.total;
                const percentage = Math.floor(100 * value / total);

                return xData.length === 1 ? value : `${percentage}%`;
            })
            .attr("class", (d: any, i: any, n: any) => {
                const parent = d3.select(n[i]).node().parentNode;
                const parentClass = d3.select(parent).attr("class");
                const groupIndex = Number(parentClass.replace( /^\D+/g, ""));

                return `label label-group-${groupIndex}`;
            })
            .attr("dy", () => "1.3em")
            .attr("x", (d: any) => xScale(d[0]) + TEXT_MARGIN_LEFT)
            .attr("y", (d: any) => yScale(d.data.key))
            .attr("width", (d: any, i: any) => xScale(d[1]) - xScale(d[0]))
            .attr("height", yScale.bandwidth());

        const legends = svg.append("g")
            .attr("class", "legends")
            .attr("transform", `translate(${MARGIN_LEFT}, ${MARGIN_TOP})`);

        let offset = LEGEND_MARGIN;

        legends.selectAll("g.legend")
            .data(xData)
            .enter()
            .append("g")
            .attr("class", "legend")
            .each((category: string, index: number, n: any) => {
                const item = d3.select(n[index]).node();

                const text = d3.select(item).append("text")
                    .attr("dy", "-0.35em")
                    .attr("transform", `translate(${LEGEND_WIDTH / 2 + LEGEND_MARGIN}, ${LEGEND_HEIGHT / 2})`)
                    .text(category);

                const textBBox = text.node()?.getBBox();

                d3.select(item).append("circle")
                    .attr("r", LEGEND_WIDTH / 2)
                    .attr("fill", getColor({ index, colors }));

                d3.select(item).attr("transform", `translate(${offset}, 0)`);

                offset += (textBBox?.width || 0) + LEGEND_WIDTH + LEGEND_MARGIN * 2;
            })

        const zoom = d3.zoom()
            .scaleExtent([ MIN_ZOOM, MAX_ZOOM ])
            .translateExtent([ [ 0, 0 ], [ width, height ] ])
            .extent([ [ 0, 0 ], [ width, height ] ])
            // allow zoom if condition true
            .filter((event: WheelEvent) => event.shiftKey && xData.length !== 1)
            .on("zoom", (event: d3.D3ZoomEvent<any, any>) => {

                const transform = event.transform;

                // https://stackoverflow.com/a/67761701/5397119
                const newScaleX = transform.rescaleX(xScale).clamp(true);
                xAxis.scale(newScaleX)
                svg.select("g.axis-x").call(xAxis);

                const target = event.sourceEvent.target;
                const currentGroup = d3.select(target.parentNode).attr("class");

                svg.selectAll("rect.segment")
                    .attr("x", (d: any) => newScaleX(d[0]))
                    .attr("width", (d: any) => newScaleX(d[1]) - newScaleX(d[0]))
                    .each((d: any, index: number, n: any) => {
                        const parent = d3.select(n[index].parentNode);
                        const group = parent.attr("class");

                        if (currentGroup !== group) {
                            parent.selectAll("text.label")
                                .each((d: any, i: number, n: any) => {
                                    const textNode = d3.select(n[i]).node();
                                    d3.select(textNode)
                                        .attr("x", (d: any) => newScaleX(d[0]))
                                        .attr("transform", `translate(${TEXT_MARGIN_LEFT}, 0)`)
                                });
                        }
                    });
            })

        svg.call(zoom);

        // disable drag
        svg.on("mousedown.zoom", null);
        svg.on("dblclick.zoom", null);

    }, [ data ]);

    return {
        draw
    }
};

export default useDrawStackedBar;
