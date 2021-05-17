import { useCallback } from "react";
import * as d3 from "d3";

import { IChartDrawProps } from "~/hooks/useChart/types";
import { IUseBubbleProps } from "~/hooks/useChart/draw/useDrawBubble/types";
import useChartColor from "~/hooks/useChart/color/useChartColor";
import { DEFAULT_TEXT_SIZE, MAX_TEXT_SIZE } from "~/components/core/Chart/styles";

export const MAX_BUBBLE_RADIUS = 200;

const MIN_ZOOM = 1;
const MAX_ZOOM = 20;

const useDrawBubble = ({ data, filteredCategories }: IUseBubbleProps): { draw: (props: IChartDrawProps) => void } => {

    const categoriesCount = filteredCategories.length;
    const clusters = new Array(categoriesCount);

    const { getColor } = useChartColor();

    const cluster = (nodes: any) => {

        let strength = 0.1;

        function force (alpha: any) {

            // scale + curve alpha value
            alpha *= strength * alpha;

            nodes.forEach(function(d: any) {
                const index = filteredCategories.findIndex(
                    (category: string) => category.toLowerCase() === d.category.toLowerCase()
                );
                const cluster = clusters[index];
                if (cluster === d || !cluster) {
                    return;
                }

                let x = d.x - cluster.x;
                let y = d.y - cluster.y;
                let l = Math.sqrt(x * x + y * y);
                const r = d.radius + cluster.radius;

                if (l != r) {
                    l = (l - r) / l * alpha;
                    d.x -= x *= l;
                    d.y -= y *= l;
                    cluster.x += x;
                    cluster.y += y;
                }
            });

        }

        force.initialize = function (_: any) {
            nodes = _;
        }

        force.strength = (_: any) => {
            strength = _ == null ? strength : _;
            return force;
        };

        return force;

    }

    const draw = useCallback(({ chartRef, width, height }: IChartDrawProps): void => {

        let centers: Array<[number, number]> | [number, number] = [];

        if (filteredCategories.length === 1) {
            centers = [ width / 2, height / 2 ];
        } else {
            // according to current requirements we can build 5 or 1 bubble chart
            centers = [
                [ 0, 0 ],
                [ width, 0 ],
                [ width / 2, height / 2 ],
                [ 0, height ],
                [ width, height ]
            ];
        }

        console.log(centers);

        const nodes = d3.range(data.length).map(function(index) {
            const { category: currentCategory, word, wordCount, radius } = data[index];
            const clusterIndex = filteredCategories.findIndex(
                (category: string) => category.toLowerCase() === currentCategory.toLowerCase()
            );
            // const r = Math.sqrt((clusterIndex + 1) / m * -Math.log(Math.random())) * maxRadius;

            const d = {
                    cluster: clusterIndex,
                    radius,
                    x: Math.cos(clusterIndex / categoriesCount * 2 * Math.PI)
                        * MAX_BUBBLE_RADIUS * 2 + width / 2 + Math.random(),
                    y: Math.sin(clusterIndex / categoriesCount * 2 * Math.PI)
                        * MAX_BUBBLE_RADIUS * 2 + height / 2 + Math.random(),
                    word,
                    wordCount,
                    category: currentCategory
                };

            if (!clusters[clusterIndex] || (radius > clusters[clusterIndex].radius)) {
                clusters[clusterIndex] = d;
            }

            return d;
        });

        const svg = d3.select(chartRef.current).attr("viewBox", `0 0 ${width} ${height}`);

        // clear svg before draw new content
        svg.selectAll("svg > *").remove();

        const simulation = d3.forceSimulation(nodes)
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("x", d3.forceX(width / 2).strength(0.005))
            .force("y", d3.forceY(0).strength(0.005))
            .force("cluster", cluster(nodes).strength(0.05))
            .force("charge", d3.forceManyBody().strength(50))
            .force("collision", d3.forceCollide().radius((d: any) => d.radius + 2));


        const node = svg.selectAll("g.bubble")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "bubble");

        node.attr("pointer-events", "all");
        svg.call(d3.zoom().scaleExtent([ MIN_ZOOM, MAX_ZOOM ]).on("zoom", (event: d3.D3ZoomEvent<any, any>) => {
            const scale = event.transform.k;
            const textSize = DEFAULT_TEXT_SIZE * scale > MAX_TEXT_SIZE ? MAX_TEXT_SIZE / scale : DEFAULT_TEXT_SIZE;

            node.selectAll("circle,text").attr("transform", event.transform.toString());
            node.selectAll("text").style("font-size", `${textSize}px`);
         }) as any);

        node.append("circle")
            .attr("fill", (d: any) => getColor(d.cluster, { randomShade: true, randomOpacity: true }))
            .attr("cx", (d: any) => d.x)
            .attr("cy", (d: any) => d.y)
            .attr("r", (d: any) => d.radius);

        node.append("title").text((d) => `${d.category}: ${d.word}`);

        node.append("text")
            .text((d) => d.word)
            .attr("dy", () => "0.3em")
            .attr("text-anchor", "middle");

        simulation.on("tick", () => {
            node.attr("x", (d) => d.x)
            node.attr("y", (d) => d.y)
            
            node.selectAll("circle")
                .attr("cx", (d: any) => d.x)
                .attr("cy", (d: any) => d.y)
                .attr("r", (d: any) => d.radius);

            node.selectAll("text")
                .attr("text-anchor", "middle")
                .attr("x", (d: any) => d.x)
                .attr("y", (d: any) => d.y);
        });

    }, [ data ]);

    return {
        draw
    }
};

export default useDrawBubble;
