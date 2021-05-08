import React, { useCallback, useEffect, useRef } from "react";
import * as d3 from "d3";

import useData from "~/hooks/useData";

import { IItem } from "~/providers/DataProvider/types";
import { TYPES } from "~/common/constants";

import { ChartContainer } from "./styles";

const type = TYPES.NETWORK;

const Network = (): JSX.Element => {
    const { getDataset } = useData();
    const ref = useRef<SVGSVGElement>(null);

    const dataset: IItem[] = getDataset(type, "all") ;
    const { nodes, edges } = dataset[0];

    const width = 900;
    const height = 600;

    const draw = useCallback((): void => {
        const svg = d3.select("svg");
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(200))
            .force("charge", d3.forceManyBody().strength(function (d, i) {
                const a = i == 0 ? -2000 : -1000;
                return a;
            }).distanceMin(200).distanceMax(1000))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .stop();

        if (simulation !== undefined) {
            simulation.force("link").links(edges);
        }

        for (let i = 0; i < 300; ++i) {
            simulation.tick();
        }

        const link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(edges)
            .enter().append("line")
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; })
            .attr("stroke-width", function(d) { return Math.sqrt(parseInt(d.weight)); });

        const node = svg.selectAll("g")
            .data(nodes as any)
            .enter()
            .append("g")
            .attr("class", "nodes");

         node.append("circle")
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("r", 10)
            .attr("fill", function(d) { return color(d.name); });

        node.append("text")
            .text((d) => d.name)
            .attr("x", (d) => d.x + 15)
            .attr("y", (d) => d.y + 5)
            .attr("fill", "black");

        link.on("mouseover", function(event, d) {
            const connectedNodes = node.selectAll("circle")
                .filter((e) => e.name == d.source.name || e.name == d.target.name)
                .attr("fill", "red");

        }).on("mouseout", function(event, d) {
            const connectedNodes = node
                .filter((e) => e.name == d.source.name || e.name == d.target.name)
                .attr("fill", (d) => color(d.name));
        });

    }, [ dataset ]);

    useEffect(() => {
        draw();
    }, [ dataset ]);

    return <ChartContainer ref={ref} height={height} width={width} />;
};

export default Network;
