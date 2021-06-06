import { useCallback } from "react";
import * as d3 from "d3";

const MAX_DISTANCE = 2000;
const MIN_DISTANCE = 300;

const useDrawConnections = ({ nodes, edges }: IUseConnectionsProps): { draw: (props: IChartDrawProps) => void } => {

    const draw = useCallback(({ chartRef, width, height, colors }: IChartDrawProps): void => {
        const svg = d3.select(chartRef.current)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("height", height)
            .attr("width", width);

        // const baseX = width / (edges.length / 2);
        // const connections = Array.from({ length: edges.length / 2 }).map((_, i: number) => {
        //     return {
        //         x1: baseX * i,
        //         x2: baseX * i,
        //         y1: 0,
        //         y2: 300,
        //         source: edges[i].source,
        //         target: edges[i].target
        //     }
        // });

        const simulation: any = d3.forceSimulation(nodes as any)
            .force("link", d3.forceLink().id((d: any) => d.id).distance(MIN_DISTANCE))
            // .force("charge", d3.forceManyBody()
            //     .strength((d: any, i) => i === 0 ? -MAX_DISTANCE : -(MAX_DISTANCE / 2))
            //     .distanceMin(MIN_DISTANCE)
            //     .distanceMax(MAX_DISTANCE)
            // )
            // .force("x", d3.forceX().x((d: any) => centers[d.cluster][0]).strength(0.05))
            // .force("y", d3.forceY().y((d: any) => centers[d.cluster][1]).strength(0.05))
            // .force("x", (d3.forceX((d,i) => i % 2 ? i*10 : i)).strength(0.15))
            .force("y", d3.forceY((d, i) => 1000).strength(0.15))
            .force("center", d3.forceCenter(width / 2, height / 2));

        if (simulation !== undefined) {
            simulation.force("link").links(edges);
        }
        //
        // simulation.stop();
        // simulation.tick(nodes.length);

        const link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(edges as any)
            .enter()
            .append("line")
            .attr("x1", (d: any) => d.source.x)
            .attr("y1", (d: any) => d.source.y)
            .attr("x2", (d: any) => d.target.x)
            .attr("y2", (d: any) => d.target.y)
            .attr("stroke", "red")
            // .attr("stroke-width", (d: any) => Math.sqrt(parseInt(d.weight)));
            .attr("stroke-width", (d: any) => Math.random() * 3);

        const node = svg.selectAll("g.nodes")
            .data(nodes as any)
            .enter()
            .append("g")
            .attr("class", "nodes");

        node.append("circle")
            .attr("cx", (d: any, i: number) => d.x)
            .attr("cy", (d: any, i: number) => d.y)
            .attr("r", 10);

        simulation.on("tick", () => {
            link
                .attr("x1", (d: any, i) => d.source.x + i * 10)
                .attr("y1", (d: any, i) => d.source.y)
                .attr("x2", (d: any, i) => d.target.x + i * 10)
                .attr("y2", (d: any, i) => d.target.y);

            node.selectAll("circle")
                .attr("cx", (d: any, i: number) => d.x + i * 10)
                .attr("cy", (d: any, i: number) => d.y)
                .attr("r", 10);
        });


    }, [ nodes, edges ]);

    return {
        draw,
    };
};

export default useDrawConnections;
