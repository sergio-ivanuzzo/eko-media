import { useCallback } from "react";
import * as d3 from "d3";

import theme from "~/common/theme";

const MIN_DISTANCE = 300;

const MARGIN_LEFT = 30;
const MARGIN_RIGHT = 30;

const ITEM_RADIUS = 200;
const ITEM_MARGIN = 50;
const TEXT_MARGIN = 50;

const { orange } = theme.palette;

const useDrawConnections = (
    { nodes: originNodes, edges: originEdges }: IUseConnectionsProps
): { draw: (props: IChartDrawProps) => void } => {

    const polarToCartesian = (centerX: number, centerY: number, rx: number, ry: number, angleInDegrees: number) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

        return {
            x: centerX + (rx * Math.cos(angleInRadians)),
            y: centerY + (ry * Math.sin(angleInRadians))
        };
    }

    const describeArc = (
        x: number,
        y: number,
        rx: number,
        ry: number,
        startAngle: number,
        endAngle: number
    ) => {
        const start = polarToCartesian(x, y, rx, ry, startAngle);
        const end = polarToCartesian(x, y, rx, ry, endAngle);

        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        return [
            "M", start.x, start.y,
            "A", rx, ry, 0, largeArcFlag, 0, end.x, end.y,
        ].join(" ");
    }

    const draw = useCallback(({ chartRef, width, height }: IChartDrawProps): void => {
        // we need copies to prevent override origin data on simulation.links
        // on each re-draw we will have copy of origin data and will possible to resize chart correctly
        const nodesCopy = JSON.parse(JSON.stringify(originNodes)) as IGraphNodeItem[];
        const edgesCopy = JSON.parse(JSON.stringify(originEdges)) as IGraphEdgeItem[];

        const pairAmount = edgesCopy.length / 2;

        const svg = d3.select(chartRef.current)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("height", height)
            .attr("width", width);

        // clear svg before draw new content
        svg.selectAll("svg > *").remove();

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

        const itemWidth = (width - (MARGIN_LEFT + MARGIN_RIGHT + ITEM_MARGIN * 2)) / pairAmount;
        const offsetX = ITEM_MARGIN * 2;
        const offsetY = ITEM_RADIUS / 2;
        const yCenter = height / 2;

        const centers = Array.from({ length: pairAmount }).map((_, i: number) => {
            return {
                top: [ itemWidth * (i + 1), yCenter ],
                bottom: [ itemWidth * (i + 1), yCenter + offsetY ]
            }
        });

        const nodes = nodesCopy.map((node, i) => {
            const index = Math.floor(i / 2);
            // since top and bottom x are the same
            const x = centers[index].top[0];
            const y = i % 2 === 0 ? centers[index].top[1] : centers[index].bottom[1];

            return {
                ...node,
                x,
                y,
                referencePercent: edgesCopy[i].reference_percent
            }
        });

        const simulation: any = d3.forceSimulation().nodes(nodes as any)
            .force("link", d3.forceLink().id((d: any) => d.id).distance(MIN_DISTANCE))
            .force("center", d3.forceCenter(width / 2, height / 2)).alpha(0.1).restart();

        simulation.force("link").links(edgesCopy);
        simulation.tick(nodes.length * 2);

        // disable animation
        // simulation.stop();

        const link = svg.append("g")
            .attr("class", "links")
            .selectAll("path")
            .data(edgesCopy as any)
            .enter()
            .append("path")
            .attr("d", (d: any, i: number) => {
                const startAngle = 30;
                const endAngle = 150;

                return describeArc(
                    ((i % 2 === 0) ? d.source.x - ITEM_MARGIN * 2 : d.source.x),
                    (i % 2 === 0 ? d.source.y : d.target.y) + offsetY,
                    ITEM_RADIUS - offsetX,
                    ITEM_RADIUS - offsetX,
                    i % 2 === 0 ? startAngle : endAngle,
                    i % 2 === 0 ? endAngle : startAngle,
                );
            })
            .attr("fill", "none")
            .attr("marker-end","url(#arrowhead)")
            .attr("stroke", orange.carrot)
            .attr("stroke-width", (d: any) => d.weight);

        link.exit().remove();

        const node = svg.selectAll("g.nodes")
            .data(nodes as any)
            .enter()
            .append("g")
            .attr("class", "nodes");

        node.exit().remove();

        const mediaText = node.append("text")
            .text((d: any) => d.name)
            .attr("dy", (d: any, i: number) => i % 2 === 0 ? "-0.5em" : "-4em")
            .attr("text-anchor", "middle")
            .attr("pointer-events", "none")
            .attr("x", (d: any) => d.x)
            .attr("y", (d: any, i) => i % 2 === 0 ? TEXT_MARGIN : height - TEXT_MARGIN);

        const percentageText = node.append("text")
            .text((d: any, i) => `${d.referencePercent}%`)
            .attr("dy", (d: any, i: number) => offsetY)
            .attr("text-anchor", "middle")
            .attr("pointer-events", "none");

        simulation.on("tick", () => {
            link.attr("d", (d: any, i: number) => {
                const startAngle = 30;
                const endAngle = 150;

                return describeArc(
                    ((i % 2 === 0) ? d.source.x - ITEM_MARGIN * 2 : d.source.x),
                    (i % 2 === 0 ? d.source.y : d.target.y) + offsetY,
                    ITEM_RADIUS - offsetX,
                    ITEM_RADIUS - offsetX,
                    i % 2 === 0 ? startAngle : endAngle,
                    i % 2 === 0 ? endAngle : startAngle,
                );
            });

            mediaText
                .attr("x", (d: any) => d.x)
                .attr("y", (d: any, i) => i % 2 === 0 ? TEXT_MARGIN : height - TEXT_MARGIN);

            percentageText
                .attr("x", (d: any, i: number) => i % 2 === 0 ? d.x - offsetX/2 : d.x + offsetX/2)
                .attr("y", (d: any, i: number) => offsetY / 2);
        });

    }, [ originNodes, originEdges ]);

    return {
        draw,
    };
};

export default useDrawConnections;
