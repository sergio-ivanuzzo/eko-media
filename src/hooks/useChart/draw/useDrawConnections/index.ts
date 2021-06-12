import { useCallback } from "react";
import * as d3 from "d3";

import getRange from "~/helpers/getRange";

import theme from "~/common/theme";

const MIN_DISTANCE = 300;

// node size
const RADIUS = 10;

const OFFSET_X = 50;
const OFFSET_Y = 50;

const MARGIN_LEFT = 30;
const MARGIN_RIGHT = 30;
const MARGIN_TOP = 30;
const MARGIN_BOTTOM = 30;

const { orange } = theme.palette;

const useDrawConnections = (
    { nodes: originNodes, edges }: IUseConnectionsProps
): { draw: (props: IChartDrawProps) => void } => {

    // https://stackoverflow.com/a/18473154/5397119
    const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
        const angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    const describeArc = (
        startX: number,
        startY: number,
        endX: number,
        endY: number,
        radius: number,
        startAngle: number,
        endAngle: number
    ) => {

        const start = polarToCartesian(startX, startY, radius, endAngle);
        const end = polarToCartesian(endX, endY, radius, startAngle);

        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        const d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        ].join(" ");

        return d;
    }

    const draw = useCallback(({ chartRef, width, height }: IChartDrawProps): void => {
        const svg = d3.select(chartRef.current)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("height", height)
            .attr("width", width);

        const pairAmount = edges.length / 2;
        const itemWidth = (width - MARGIN_LEFT - MARGIN_RIGHT) / pairAmount;
        const connections = Array.from({ length: pairAmount }).map((_, i: number) => {
            return {
                top: [ MARGIN_LEFT + itemWidth * i, MARGIN_TOP ],
                bottom: [ MARGIN_LEFT + itemWidth * i, 300 - MARGIN_BOTTOM ]
            }
        });

        const nodes = originNodes.map((node, i) => {
            const index = Math.floor(i / 2);
            const x = i % 2 === 0 ? connections[index].top[0] : connections[index].bottom[0];
            const y = i % 2 === 0 ? connections[index].top[1] : connections[index].bottom[1];

            return {
                ...node,
                x,
                y,
            }
        });

        const simulation: any = d3.forceSimulation().nodes(nodes as any).velocityDecay(0.1)
            .force("link", d3.forceLink().id((d: any) => d.id).distance(MIN_DISTANCE))
            .force("charge", d3.forceManyBody())
            // .force("x", d3.forceX(width / 2).strength(0.00015))
            // .force("y", d3.forceY(height / 2).strength(0.15))
            .force("center", d3.forceCenter(width / 2, height / 2));

        if (simulation !== undefined) {
            simulation.force("link").links(edges);
        }

        // disable animation
        simulation.stop();
        simulation.tick(nodes.length);

        const link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(edges as any)
            .enter()
            .append("path")
            .attr("d", (d: any) => describeArc(d.source.x, d.source.y, d.target.x, d.target.y, 1, 30, 150))
            .attr("fill", "none")
            .attr("stroke", orange.carrot)
            .attr("stroke-width", (d: any) => d.weight);

        const node = svg.selectAll("g.nodes")
            .data(nodes as any)
            .enter()
            .append("g")
            .attr("class", "nodes");

        const rectWidth = 150;
        const rectHeight = 150;

        node.append("rect")
            .attr("x", (d: any) => d.x - rectWidth / 2)
            .attr("y", (d: any) => d.y - rectHeight / 2)
            // .attr("cx", (d: any) => d.x)
            // .attr("cy", (d: any) => d.y)
            .attr("fill", "white")
            .attr("width", rectWidth)
            .attr("height", rectHeight);
            // .attr("rx", 100)
            // .attr("ry", 40)
            // .attr("fill", "white")
            // .attr("r", RADIUS * 5);

        node.append("text")
            .text((d: any) => d.name)
            .attr("dy", () => "0.3em")
            .attr("font-size", 18)
            .attr("text-anchor", "middle")
            .attr("pointer-events", "none")
            .attr("x", (d: any) => d.x)
            .attr("y", (d: any) => d.y);

    }, [ originNodes, edges ]);

    return {
        draw,
    };
};

export default useDrawConnections;
