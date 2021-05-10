import React, { useCallback, useEffect, useRef } from "react";
import * as d3 from "d3";

import useData from "~/hooks/useData";

import { TYPES } from "~/common/constants";

import { ChartContainer } from "./styles";
import { IGraphDataset } from "~/components/charts/Network/types";
import theme from "~/common/theme";

const MAX_DISTANCE = 2000;
const MIN_DISTANCE = 200;
const RADIUS = 10;
const TYPE = TYPES.NETWORK;

const { orange, green, cyan } = theme.palette;

const Network = (): JSX.Element => {
    const { getDataset } = useData();
    const ref = useRef<SVGSVGElement>(null);

    const dataset = getDataset(TYPE, "all");
    // console.log("dataset:", dataset);
    const { nodes, edges } = dataset[0] as IGraphDataset;

    const width = 900;
    const height = 600;

    const linked = edges.reduce((result: { [key: string]: number }, edge) => {
        const { source, target  } = edge;
        result[`${source},${target}`] = 1;
        return result;
    }, {});

    const isConnected = (source: number, target: number) => {
        return source === target || Object.keys(linked)
            .some((key: string) => key.includes(`${source}`) || key.includes(`${target}`));
    }

    const highlight = (node: any) => (color: string, selectedNode: any) => {
        // all items current node is target for
        const sources = edges.filter((edge) => edge.target === selectedNode).map((edge) => edge.source.index);
        // targets for selected node
        const targets = edges.filter((edge) => edge.source === selectedNode).map((edge) => edge.target.index);

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
                return "black";
            }
        })
    };

    const fade = (link: any) => (opacity: number, selectedNode: any) => {
        link.style("stroke-opacity", (o) => ((o.source === selectedNode || o.target === selectedNode) ? 1 : opacity));
    }

    const draw = useCallback((): void => {
        const svg = d3.select("svg");
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const simulation: any = d3.forceSimulation(nodes as any)
            .force("link", d3.forceLink().id((d: any) => d.id).distance(MIN_DISTANCE))
            .force("charge", d3.forceManyBody()
                .strength(
                    (d: any, i) => i == 0
                        ? -MAX_DISTANCE
                        : -(MAX_DISTANCE / 2)).distanceMin(MIN_DISTANCE).distanceMax(MAX_DISTANCE)
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
            .attr("r", RADIUS)
            .attr("fill", (d: any) => color(d.name));

        node.append("text")
            .text((d: any) => d.name)
            .attr("x", (d: any) => d.x + 15)
            .attr("y", (d: any) => d.y + 5)
            .attr("fill", "black");

        const doFade = fade(link);
        const doHighlight = highlight(node);

        node.on("mouseover.fade", (event, d) => {
            doFade(0.1, d);
            doHighlight(green.jade, d)
        }).on("mouseout.fade", (d) => {
            doFade(1, d);
            doHighlight(orange.carrot, d)
        });

    }, [ dataset ]);

    useEffect(() => {
        draw();
    }, [ dataset ]);

    return <ChartContainer ref={ref} height={height} width={width} />;
};

export default Network;
