import { useCallback } from "react";
import * as d3 from "d3";

import { IChartDrawProps } from "~/hooks/useChart/types";
import { IUseNetworkProps } from "~/hooks/useChart/draw/useDrawNetwork/types";
import theme from "~/common/theme";

const MAX_DISTANCE = 2000;
const MIN_DISTANCE = 300;
const RADIUS = 10;

const { orange, green, cyan, black } = theme.palette;

const useDrawNetwork = ({ nodes, edges }: IUseNetworkProps): { draw: (props: IChartDrawProps) => void } => {

    const highlight = useCallback((node: any) => (color: string, selectedNode: any) => {
        // all items current node is target for
        const sources = edges.filter((edge: any) => edge.target === selectedNode).map((edge: any) => edge.source.index);
        // targets for selected node
        const targets = edges.filter((edge: any) => edge.source === selectedNode).map((edge: any) => edge.target.index);

        node.selectAll("circle")
            .style("fill", (node: any) => {
                if (sources.concat(targets).includes(node.index)) {
                    return color;
                } else if (node.index === selectedNode.index) {
                    return cyan.azure;
                } else {
                    return orange.carrot;
                }
            })
            .style("r", (node: any) => {
                if (node.index === selectedNode.index) {
                    return RADIUS * 1.3;
                } else {
                    return RADIUS;
                }
            });

        node.selectAll("text").style("fill", (node: any) => {
            if (node.index === selectedNode.index) {
                return cyan.azure;
            } else {
                return black.base;
            }
        })
    }, []);

    const fade = (link: any) => (opacity: number, selectedNode: any) => {
        link.style("stroke-opacity", (o: any) => (
            (o.source === selectedNode || o.target === selectedNode) ? 1 : opacity)
        );
    }
    
    const draw = useCallback(({ chartRef, width, height }: IChartDrawProps): void => {

        const svg = d3.select(chartRef.current).attr("viewBox", `0 0 ${width} ${height}`);
        // clear svg before draw new content
        svg.selectAll("svg > *").remove();

        const simulation: any = d3.forceSimulation(nodes as any)
            .force("link", d3.forceLink().id((d: any) => d.id).distance(MIN_DISTANCE))
            .force("charge", d3.forceManyBody()
                .strength((d: any, i) => i == 0 ? -MAX_DISTANCE : -(MAX_DISTANCE / 2))
                .distanceMin(MIN_DISTANCE)
                .distanceMax(MAX_DISTANCE)
            )
            .force("center", d3.forceCenter(width / 2, height / 2))
            .stop();

        if (simulation !== undefined) {
            simulation.force("link").links(edges);
        }

        for (let i = 0; i < MIN_DISTANCE; ++i) {
            simulation.tick();
        }

        const link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(edges as any)
            .enter().append("line")
            .attr("x1", (d: any) => d.source.x)
            .attr("y1", (d: any) => d.source.y)
            .attr("x2", (d: any) => d.target.x)
            .attr("y2", (d: any) => d.target.y)
            .attr("stroke-width", (d: any) => Math.sqrt(parseInt(d.weight)));

        const node = svg.selectAll("g.nodes")
            .data(nodes as any)
            .enter()
            .append("g")
            .attr("class", "nodes");

        node.append("circle")
            .attr("cx", (d: any) => d.x)
            .attr("cy", (d: any) => d.y)
            .attr("r", RADIUS);

        node.append("text")
            .text((d: any) => d.name)
            .attr("x", (d: any) => d.x + 15)
            .attr("y", (d: any) => d.y + 5)
            .attr("fill", black.base);

        const doFade = fade(link);
        const doHighlight = highlight(node);

        node.on("mouseover.fade", (event: MouseEvent, d: any) => {
            doFade(0.1, d);
            doHighlight(green.jade, d)
        }).on("mouseout.fade", (d) => {
            doFade(1, d);
            doHighlight(orange.carrot, d)
        });

    }, [ nodes, edges ]);

    return {
        draw
    }
};

export default useDrawNetwork;
