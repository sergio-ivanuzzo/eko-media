import { useCallback } from "react";
import * as d3 from "d3";

import { IChartDrawProps } from "~/hooks/useChart/types";
import { IUseBubbleProps } from "~/hooks/charts/useBubble/types";
import theme from "~/common/theme";

const { orange, green, cyan, gray } = theme.palette;

const useBubble = ({ data }: IUseBubbleProps): { draw: (props: IChartDrawProps) => void } => {

    const draw = useCallback(({ chartRef, width, height }: IChartDrawProps): void => {
        const svg = d3.select(chartRef.current).attr("viewBox", `0 0 ${width} ${height}`);
        // clear svg before draw new content
        svg.selectAll("svg > *").remove();

        const color = d3.scaleOrdinal([ orange.carrot, gray.silver, green.jade, green.salad, cyan.azure ]);
        const simulation = d3.forceSimulation()
            .force("collide", d3.forceCollide((d: any) => d.radius + 8).iterations(16))
            .force("charge", d3.forceManyBody())
            .force("y", d3.forceY().y(height / 2))
            .force("x", d3.forceX().x(width / 2));

        const circles = svg.selectAll("circle")
            .data(data, (d: any) => d.word);

        const circlesEnter = circles.enter().append("circle")
            .attr("r", (d, i) => d.radius)
            .attr("cx", (d, i) => 175 + 25 * i + 2 * i ** 2)
            .attr("cy", (d, i) => 250)
            .style("fill", (d: any, i: number) => color(i.toString()))
            .style("stroke", (d: any, i: number) => color(i.toString()))
            .style("stroke-width", 10)
            .style("pointer-events", "all");

        simulation
            .nodes(data)
            .on("tick", () => {
                circles
                    .attr("cx", function(d){ return d.x; })
                    .attr("cy", function(d){ return d.y; });
            });
    }, [ data ]);

    return {
        draw
    }
};

export default useBubble;
