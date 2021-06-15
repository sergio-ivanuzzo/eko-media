import { useCallback } from "react";
import * as d3 from "d3";

import useChartColor from "~/hooks/useChart/color/useChartColor";

import { ChartTooltipCSS } from "~/components/core/Chart/styles";
import brighten from "~/helpers/color/brighten";

export const BAR_HEIGHT = 32;
export const MARGIN_LEFT = 230;
export const MARGIN_TOP = 50;
export const LEGEND_HEIGHT = 20;
export const TRANSITION_Y = MARGIN_TOP + LEGEND_HEIGHT;

const MIN_ZOOM = 1;
const MAX_ZOOM = 15;

// const LEGEND_WIDTH = 20;
// const LEGEND_MARGIN = 30;

const TEXT_MARGIN_LEFT = 10;

const useDrawStackedBar = ({ data, xData, yData }: IUseStackedBarProps): { draw: (props: IChartDrawProps) => void } => {

    const { getColor } = useChartColor();

    const draw = useCallback(({ chartRef, width, height, colors, tooltip }: IChartDrawProps): void => {

        let series = d3.stack()
            .keys(xData)
            // normalization
            .offset(d3.stackOffsetExpand)(data as any);

        if (xData.length === 1) {
            series = d3.stack().keys(xData)(data as any);
        }

        const svg: any = d3.select(chartRef.current)
            .attr("preserveAspectRatio", "xMinYMin meet")
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
            .range([ 0, height ])
            .padding(0.2)
            .domain(yData);

        // draw xAxis
        const xAxis = d3
            .axisBottom(xScale)
            .tickSize(0)
            // x-axis will contains no text on scale
            .tickFormat(() => "");

        // gX
        svg.append("g")
            .attr("class", "axis axis-x")
            .call(xAxis);

        // draw yAxis
        const yAxis = d3.axisLeft(yScale)
            .tickFormat((d: string) => d)
            .ticks(yData.length)
            .tickSize(0)
            .tickPadding(20);

        // gY
        svg.append("g")
            .attr("class", "axis axis-y")
            .call(yAxis);

        const groupsContainer = svg.append("g").attr("class", "groups-container");

        const group = groupsContainer
            .selectAll("g")
            .data(series)
            .enter().append("g")
            .attr("fill", (d: any, index: number) => getColor({ index, colors }))
            .attr("class", (d: any, i: number) => `group-${i}`);

        const segment = group.selectAll("rect").data((d: any) => d);
        segment.join("rect")
            // check for zero-width segments
            .attr("fill", (d: any) => {
                if (!d.data.values.some((value: number) => !!value)) {
                    return "gray";
                }
            })
            .attr("class", "segment")
            // check for zero-width segments
            .attr("x", (d: any) => {
                if (!d.data.values.some((value: number) => !!value)) {
                    return MARGIN_LEFT;
                }

                return xScale(d[0]);
            })
            .attr("y", (d: any) => yScale(d.data.key))
            // check for zero-width segments
            .attr("width", (d: any) => xScale(d[1]) - xScale(d[0]) || "100%")
            .attr("height", yScale.bandwidth());

        // add text on segments
        const text = group.selectAll("text.label").data((d: any) => d);
        text.join("text")
            .text((d: any, i: any, n: any) => {
                const parent = d3.select(n[i]).node().parentNode;
                const parentClass = d3.select(parent).attr("class");
                const groupIndex = Number(parentClass.replace( /^\D+/g, ""));
                const value = d.data.values[groupIndex];
                const total = d.data.total;
                const percentage = (100 * value / total || 0).toFixed(1);

                return xData.length === 1 ? value : `${percentage}%`;
            })
            .attr("class", (d: any, i: any, n: any) => {
                const parent = d3.select(n[i]).node().parentNode;
                const parentClass = d3.select(parent).attr("class");
                const groupIndex = Number(parentClass.replace( /^\D+/g, ""));

                return `label label-group-${groupIndex}`;
            })
            // check for zero-width segments
            .attr("stroke", (d: any) => {
                if (!d.data.values.some((value: number) => !!value)) {
                    return "white";
                }
            })
            .attr("dy", () => "1.3em")
            .attr("x", (d: any) => xScale(d[0]) + TEXT_MARGIN_LEFT)
            .attr("y", (d: any) => yScale(d.data.key))
            .attr("width", (d: any) => xScale(d[1]) - xScale(d[0]))
            .attr("height", yScale.bandwidth());

        // draw legends
        const svgElement = chartRef.current;
        const svgParent = svgElement?.parentElement;

        if (svgParent) {
            const legends = d3.select(svgParent.parentElement).select(".legends");

            legends.selectAll(".legend")
                .data(xData)
                .enter()
                .append("div")
                .attr("class", "legend")
                .each((category: string, index: number, n: any) => {
                    const item = d3.select(n[index]);
                    item
                        .append("div")
                        .attr("class", "marker")
                        .style("background", getColor({ index, colors }));

                    item.append("div").html(category);
                });
        }

        // draw tooltip
        group.selectAll("rect,text")
            .on("mouseover", () => tooltip.style("display", null))
            .on("mouseout", () => tooltip.style("display", "none"))
            .on("mousemove", (event: MouseEvent, d: any) => {
                const currentNode = d3.select(event.currentTarget as any).node();
                const parentClass = d3.select(currentNode.parentNode).attr("class");
                const groupIndex = Number(parentClass.replace( /^\D+/g, ""));

                const text = d.data.values[groupIndex];

                // apply main tooltip css
                (tooltip.node() as HTMLElement).style.cssText = ChartTooltipCSS.toString();

                tooltip.html(`${xData[groupIndex]} ${text}`)
                    .style("background", brighten(d3.select(currentNode.parentNode).attr("fill"), 25))
                    .style("left", `${event.pageX}px`)
                    .style("top", `${event.pageY + 10}px`).append("span");

            });

        // add zoom for chart (horizontal scale)
        const zoom = d3.zoom()
            .scaleExtent([ MIN_ZOOM, MAX_ZOOM ])
            .translateExtent([ [ 0, 0 ], [ width, height ] ])
            .extent([ [ 0, 0 ], [ width, height ] ])
            // allow zoom if condition true
            .filter((event: WheelEvent) => event.shiftKey && xData.length !== 1 && event.offsetX > MARGIN_LEFT)
            .on("zoom", (event: d3.D3ZoomEvent<any, any>) => {

                const transform = event.transform;

                // https://stackoverflow.com/a/67761701/5397119
                const newScaleX = transform.rescaleX(xScale).clamp(true);
                xAxis.scale(newScaleX)
                svg.select("g.axis-x").call(xAxis);

                svg.selectAll("rect.segment")
                    // not zoom bars with zero width
                    .filter((d: any) => d[0] || d[1])
                    .attr("x", (d: any) => newScaleX(d[0]))
                    .attr("width", (d: any) => newScaleX(d[1]) - newScaleX(d[0]))
                    .each((d: any, index: number, n: any) => {
                        const parent = d3.select(n[index].parentNode);

                        parent.selectAll("text.label")
                            .each((d: any, i: number, n: any) => {
                                const textNode = d3.select(n[i]).node();
                                d3.select(textNode)
                                    .attr("x", (d: any) => newScaleX(d[0]))
                                    .attr("transform", `translate(${TEXT_MARGIN_LEFT}, 0)`)
                            });
                    });
            })

        svg.call(zoom);

        // disable drag for zoomed
        svg.on("mousedown.zoom", null);
        svg.on("dblclick.zoom", null);

    }, [ data ]);

    return {
        draw
    }
};

export default useDrawStackedBar;
