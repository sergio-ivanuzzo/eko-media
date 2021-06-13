import { useCallback } from "react";
import * as d3 from "d3";

import theme from "~/common/theme";

const MIN_DISTANCE = 300;

const MARGIN_LEFT = 30;
const MARGIN_RIGHT = 30;
const MARGIN_TOP = 30;
const MARGIN_BOTTOM = 30;

const NODE_RECT_WIDTH = 100;
const NODE_RECT_HEIGHT = 150;

const { orange } = theme.palette;

const useDrawConnections = (
    { nodes: originNodes, edges }: IUseConnectionsProps
): { draw: (props: IChartDrawProps) => void } => {

    // https://stackoverflow.com/a/18473154/5397119
    const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    const describeArc = (
        x: number,
        y: number,
        radius: number,
        startAngle: number,
        endAngle: number
    ) => {
        const start = polarToCartesian(x, y, radius, endAngle);
        const end = polarToCartesian(x, y, radius, startAngle);

        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        return [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        ].join(" ");
    }

    const draw = useCallback(({ chartRef, width, height }: IChartDrawProps): void => {
        const svg = d3.select(chartRef.current)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("height", height)
            .attr("width", width);

        const marker = svg.append("defs").append("marker");
        marker
            .attr("id", "arrowhead")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 6)
            .attr("refY", 0)
            .attr("markerWidth", 3)
            .attr("markerHeight", 3)
            .attr("orient", "auto-start-reverse")
            .attr("markerUnits", "strokeWidth")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")

        marker
            .append("path")
            .attr("d", "M 0,-5 L 10 ,0 L 0,5")
            .attr("fill", orange.carrot);

        const pairAmount = edges.length / 2;
        const itemWidth = (width - MARGIN_LEFT - MARGIN_RIGHT) / pairAmount;
        const connections = Array.from({ length: pairAmount }).map((_, i: number) => {
            return {
                top: [ MARGIN_LEFT + itemWidth * i, MARGIN_TOP ],
                bottom: [ MARGIN_LEFT + itemWidth * i, height - MARGIN_BOTTOM ]
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

        const simulation: any = d3.forceSimulation().nodes(nodes as any)
            .force("link", d3.forceLink().id((d: any) => d.id).distance(MIN_DISTANCE))
            // .force("charge", d3.forceManyBody())
            // .force("x", d3.forceX(width / 2).strength(0.0015))
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
            .attr("d", (d: any, i: number) => {
                const radius = 120;
                const startAngle = 30;
                const endAngle = 150;

                return describeArc(
                    i % 2 === 0 ? d.source.x - NODE_RECT_WIDTH : d.source.x + NODE_RECT_WIDTH,
                    (i % 2 === 0 ? d.source.y : d.target.y) + NODE_RECT_HEIGHT,
                    radius,
                    i % 2 === 0 ? endAngle : startAngle,
                    i % 2 === 0 ? startAngle : endAngle,
                );
            })
            .attr("fill", "none")
            .attr("transform", "translate(100, 100) scaleX(25)")
            .attr("marker-start","url(#arrowhead)")
            .attr("stroke", orange.carrot)
            .attr("stroke-width", (d: any) => d.weight);

        const node = svg.selectAll("g.nodes")
            .data(nodes as any)
            .enter()
            .append("g")
            .attr("class", "nodes");

        node.append("rect")
            .attr("x", (d: any) => d.x - NODE_RECT_WIDTH / 2)
            .attr("y", (d: any) => d.y - NODE_RECT_HEIGHT / 2)
            // .attr("fill", "none")
            .attr("width", NODE_RECT_WIDTH)
            .attr("height", NODE_RECT_HEIGHT);

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
