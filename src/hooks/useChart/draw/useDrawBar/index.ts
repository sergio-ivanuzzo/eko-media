import { useCallback } from "react";
import * as d3 from "d3";

import useChartColor from "~/hooks/useChart/color/useChartColor";

import { ChartTooltipCSS } from "~/components/core/Chart/styles";
import theme from "~/common/theme";

const { orange, white } = theme.palette;

const useDrawBar = ({ onClick = () => null, ...props }: IDrawBarProps): { draw: (props: IChartDrawProps) => void } => {

    const { data, yData } = props;

    const { getColor } = useChartColor();

    const hover = (node: any, isHovered: boolean) => node.classed("hovered", isHovered);

    const draw = useCallback(({ chartRef, width, height, colors, tooltip }: IChartDrawProps): void => {
        const svg = d3.select(chartRef.current)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("height", height)
            .attr("width", width);

        // clear svg before draw new content
        svg.selectAll("svg > *").remove();

        const xScale = d3.scaleLinear()
            .rangeRound([ 0, width ])
            .domain([ 0, d3.max(data, (d) => d.value as any) ]);

        const yScale: d3.ScaleBand<string> = d3.scaleBand()
            .range([ 0, height ])
            .padding(0.03)
            .domain(yData);

        const container = svg.append("g");

        const rect = container
            .selectAll("rect.bar")
            .data(data)
            .join("rect")
            .attr("class", (d: any, i: number) => `bar group-${i}`)
            .attr("fill", getColor({
                index: 0,
                colors
            }))
            .attr("x", (d: any) => xScale(d[0]))
            .attr("y", (d: any) => yScale(d.key) as any)
            .attr("width", (d: any) => xScale(d.value) ?? "2px")
            .attr("height", yScale.bandwidth());

        rect.on("mouseover", function () {
            hover(d3.select(this), true);
        });
        rect.on("mouseout", function () {
            hover(d3.select(this), false);
        });

        // draw text on bars
        const text = container
            .selectAll("text")
            .data(data)
            .join("text")
            .attr("class", (d: any, i: number) => `group-${i}`)
            // .attr("fill", "white")
            .attr("text-anchor", "start")
            .attr("x", () => xScale(0))
            .attr("y", (d: any) => yScale(d.key) as number + yScale.bandwidth() / 2)
            .attr("dy", "0.4em")
            .attr("dx", "1em")
            .attr("font-size", "2em")
            .text((d: any) => d.title || d.key);

        text.append("title").text((d: any) => d.title || d.key);

        rect.on("click", (e: MouseEvent, d: any) => onClick({ key: d.key, value: d.value }));
        text.on("click", (e: MouseEvent, d: any) => onClick({ key: d.key, value: d.value }));

        text.on("mouseover", function () {
            const currentItem = d3.select(this);
            const groupClass = currentItem.attr("class");
            const target = container.select(`rect.${groupClass}`)

            hover(target, true);
        });
        text.on("mouseout", function () {
            const currentItem = d3.select(this);
            const groupClass = currentItem.attr("class");
            const target = container.select(`rect.${groupClass}`)

            hover(target, false);
        });

        // draw tooltip
        container.selectAll("rect,text")
            .on("mouseover", () => tooltip.style("display", ""))
            .on("mouseout", () => tooltip.style("display", "none").style("left", "-9999px"))
            .on("mousemove", (event: MouseEvent, d: any) => {
                const text = d.tooltipText ?? "";

                if (text) {
                    // apply main tooltip css
                    (tooltip.node() as HTMLElement).style.cssText = ChartTooltipCSS
                        .map((item) => (item as string).trim()).filter((item) => item.length > 1)
                        .toString();

                    tooltip.html(text)
                        .style("text-align", "left")
                        .style("text-transform", "none")
                        .style("white-space", "nowrap")
                        .style("background", orange.carrot)
                        .style("color", white.base)
                        .style("left", `${event.pageX}px`)
                        .style("top", `${event.pageY + 30}px`).append("span");
                }

            });

    }, [ data, yData ]);

    return {
        draw
    }
};

export default useDrawBar;
