import { useCallback } from "react";
import * as d3 from "d3";

import theme from "~/common/theme";

const MIN_DISTANCE = 300;

const MARGIN_LEFT = 30;
const MARGIN_RIGHT = 30;
const MARGIN_TOP = 100;
const MARGIN_BOTTOM = 100;

const ITEM_RADIUS = 200;
const ITEM_MARGIN = 50;
const ITEM_ARC_OFFSET = 100;

const { orange } = theme.palette;

const useDrawConnections = (
    { nodes: originNodes, edges }: IUseConnectionsProps
): { draw: (props: IChartDrawProps) => void } => {

    // https://stackoverflow.com/a/18473154/5397119
    // const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    //     const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    //
    //     return {
    //         x: centerX + (radius * Math.cos(angleInRadians)),
    //         y: centerY + (radius * Math.sin(angleInRadians))
    //     };
    // }
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

    // const describeArc = (
    //     x: number,
    //     y: number,
    //     radius: number,
    //     startAngle: number,
    //     endAngle: number
    // ) => {
    //     const start = polarToCartesian(x, y, radius, endAngle);
    //     const end = polarToCartesian(x, y, radius, startAngle);
    //
    //     const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    //
    //     return [
    //         "M", start.x, start.y,
    //         "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    //     ].join(" ");

    const pairAmount = edges.length / 2;

    const draw = useCallback(({ chartRef, width, height }: IChartDrawProps): void => {
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

        const itemWidth = (width - (MARGIN_LEFT + MARGIN_RIGHT)) / pairAmount;
        const offsetX = itemWidth / 2;
        const offsetY = ITEM_RADIUS / 2;
        const yCenter = height / 2;

        const centers = Array.from({ length: pairAmount }).map((_, i: number) => {
            return {
                top: [ itemWidth * (i + 1) - offsetX, yCenter - offsetY ],
                bottom: [ itemWidth * (i + 1) - offsetX, yCenter + offsetY ]
            }
        });

        const nodes = originNodes.map((node, i) => {
            const index = Math.floor(i / 2);
            const x = i % 2 === 0 ? centers[index].top[0]  : centers[index].bottom[0];
            const y = i % 2 === 0 ? centers[index].top[1] : centers[index].bottom[1];

            return {
                ...node,
                x,
                y,
            }
        });

        const simulation: any = d3.forceSimulation().nodes(nodes as any)
            .force("link", d3.forceLink().id((d: any) => d.id).distance(MIN_DISTANCE))
            // .force("charge", d3.forceManyBody().strength(-20))
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
            .selectAll("path")
            .data(edges as any)
            .enter()
            .append("path")
            .attr("d", (d: any, i: number) => {
                const startAngle = 30;
                const endAngle = 150;

                return describeArc(
                    (i % 2 === 0) ? d.source.x - ITEM_ARC_OFFSET : d.source.x + ITEM_ARC_OFFSET,
                    (i % 2 === 0 ? d.source.y : d.target.y) + offsetY,
                    ITEM_RADIUS - ITEM_MARGIN*2,
                    ITEM_RADIUS - ITEM_MARGIN*2,
                    i % 2 === 0 ? startAngle : endAngle,
                    i % 2 === 0 ? endAngle : startAngle,
                );
            })
            .attr("fill", "none")
            .attr("marker-end","url(#arrowhead)")
            .attr("stroke", orange.carrot)
            .attr("stroke-width", (d: any) => d.weight);

    // .attr("d", (d: any, i: number) => {
    //         const startAngle = 30;
    //         const endAngle = 150;
    //
    //         return describeArc(
    //             (i % 2 === 0) ? d.source.x - ITEM_CENTER / 2 : d.source.x + ITEM_CENTER / 2,
    //             (i % 2 === 0 ? d.source.y : d.target.y) + MARGIN_TOP,
    //             ITEM_CENTER,
    //             ITEM_CENTER,
    //             i % 2 === 0 ? startAngle : endAngle,
    //             i % 2 === 0 ? endAngle : startAngle,
    //         );
    //     })


        // const link = svg.append("g")
        //     .attr("class", "links")
        //     .selectAll("line")
        //     .data(edges as any)
        //     .enter().append("line")
        //     .attr("x1", (d: any) => d.source.x)
        //     .attr("y1", (d: any) => d.source.y)
        //     .attr("x2", (d: any) => d.source.x)
        //     .attr("y2", (d: any) => d.target.y)
        //     .attr("stroke", orange.carrot)
        //     .attr("stroke-width", (d: any) => d.weight);

        // const link = svg.append("g")
        //     .attr("class", "links")
        //     .selectAll("line")
        //     .data(edges as any)
        //     .enter()
        //     .append("path")
        //     .attr("d", (d: any, i: number) => {
        //         const radius = ITEM_CENTER;
        //         const startAngle = 30;
        //         const endAngle = 150;
        //         const offsetX = 60;
        //
        //         return describeArc(
        //             d.source.x,
        //             // (i % 2 === 0 ? d.source.x + ITEM_CENTER : d.source.x - ITEM_CENTER) - offsetX,
        //
        //             // i % 2 === 0 ? d.source.x - itemWidth / 4 - offsetX : d.source.x + itemWidth / 4 - offsetX,
        //             (i % 2 === 0 ? d.source.y : d.target.y),
        //             radius,
        //             i % 2 === 0 ? startAngle : endAngle,
        //             i % 2 === 0 ? endAngle : startAngle,
        //         );
        //     })
        //     .attr("fill", "none")
        //     .attr("marker-start","url(#arrowhead)")
        //     .attr("stroke", orange.carrot)
        //     .attr("stroke-width", (d: any) => d.weight);

        const node = svg.selectAll("g.nodes")
            .data(nodes as any)
            .enter()
            .append("g")
            .attr("class", "nodes");

        //
        // node.append("circle")
        //     .attr("cx", (d: any) => d.x)
        //     // .attr("cx", (d: any, i) => d.x + 30)
        //     .attr("cy", (d: any) => d.y)
        //     // .attr("cy", (d: any, i) => i % 2 === 0 ? d.y - NODE_RECT_HEIGHT / 2 : d.y + NODE_RECT_HEIGHT / 2)
        //     .attr("r", 15);

        // svg.selectAll("circle.test")
        //     .data(centers)
        //     .enter()
        //     .append("circle")
        //     .attr("class", "test")
        //     .attr("cx", (d: any, i) => centers[i].bottom[0])
        //     // .attr("cx", (d: any, i) => d.x + 30)
        //     .attr("cy", (d: any, i) => centers[i].bottom[1])
        //     // .attr("cy", (d: any, i) => i % 2 === 0 ? d.y - NODE_RECT_HEIGHT / 2 : d.y + NODE_RECT_HEIGHT / 2)
        //     .attr("r", 25);

        // node.append("rect")
        //     .attr("x", (d: any) => d.x - offsetX/2)
        //     .attr("y", (d: any, i) => d.y - offsetY/2 + (i % 2 === 0 ? 15 : -15))
        //     .attr("fill", "red")
        //     .attr("stroke", (d, i) => i % 2 === 0 ? "red" : "blue")
        //     .attr("stroke-width", 2)
        //     .attr("width", itemWidth / 2)
        //     .attr("height", 100);

        const text = node.append("text")
            .text((d: any) => d.name)
            // .attr("dy", "2em")
            // .attr("text-anchor", "middle")
            .attr("pointer-events", "none")
            .attr("x", (d: any, i) => {
                return (itemWidth/ 2) *i + offsetX;
            })
            .attr("y", (d: any, i) => {
                return offsetY;
            })
            // .attr("y", (d: any, i) => i % 2 === 0 ? d.y - 100 : d.y);

    }, [ originNodes, edges ]);

    return {
        draw,
    };
};

export default useDrawConnections;
