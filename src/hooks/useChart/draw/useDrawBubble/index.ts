import { useCallback } from "react";
import * as d3 from "d3";

import random from "~/helpers/random";

import { IChartDrawProps } from "~/hooks/useChart/types";
import { IUseBubbleProps } from "~/hooks/useChart/draw/useDrawBubble/types";
import theme from "~/common/theme";

const { orange, green, cyan, gray } = theme.palette;

export const MAX_BUBBLE_RADIUS = 200;

const useDrawBubble = ({ data, topCategories }: IUseBubbleProps): { draw: (props: IChartDrawProps) => void } => {

    const topCategoriesCount = topCategories.length;
    const clusters = new Array(topCategories.length);

    const cluster = (nodes: any) => {

        let strength = 0.1;

        function force (alpha: any) {

            // scale + curve alpha value
            alpha *= strength * alpha;

            nodes.forEach(function(d: any) {
                const index = topCategories.findIndex(
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

    const color: any = d3.scaleOrdinal()
        .domain(new Array(topCategories.length))
        .range([ orange.carrot, gray.silver, green.jade, green.salad, cyan.azure ]);

    const setColor = (clusterIndex: number): string => {
        const minOpacity = 0.5;
        const maxOpacity = 1.1;
        const randomOpacity = random(minOpacity, maxOpacity);

        const rgb = d3.rgb(color(clusterIndex));
        const colorWithOpacity = d3.rgb(rgb.r, rgb.g, rgb.b, randomOpacity);
        const darker = (alpha: number) => colorWithOpacity.darker(alpha);
        const brighter = (alpha: number) => colorWithOpacity.brighter(alpha);

        const minAlpha = 0.1;
        const maxAlpha = 0.8;
        const randomAlpha = random(minAlpha, maxAlpha);

        const allFunctions = [ darker, brighter, () => colorWithOpacity ];
        const randomFunc = allFunctions[Math.random() * allFunctions.length | 0]

        return randomFunc(randomAlpha).toString();
    }

    const draw = useCallback(({ chartRef, width, height }: IChartDrawProps): void => {

        const nodes = d3.range(data.length).map(function(index) {
            const { category: currentCategory, word, wordCount, radius } = data[index];
            const clusterIndex = topCategories.findIndex((category: string) => category.toLowerCase() === currentCategory.toLowerCase());
            // const r = Math.sqrt((clusterIndex + 1) / m * -Math.log(Math.random())) * maxRadius;

            const d = {
                    cluster: clusterIndex,
                    radius,
                    x: Math.cos(clusterIndex / topCategoriesCount * 2 * Math.PI)
                        * MAX_BUBBLE_RADIUS * 2 + width / 2 + Math.random(),
                    y: Math.sin(clusterIndex / topCategoriesCount * 2 * Math.PI)
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
            .force("collision", d3.forceCollide().radius((d: any) => d.radius + 5));


        const node = svg.selectAll("g.bubble")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "bubble");

        node.attr("pointer-events", "all");
        node.call(d3.zoom().scaleExtent([ 1, 10 ]).on("zoom", (...rest) => {
            console.log("zoom:", rest);
        }));

        node.append("circle")
            .attr("fill", (d: any) => setColor(d.cluster))
            .attr("cx", (d: any) => d.x)
            .attr("cy", (d: any) => d.y)
            .attr("r", (d: any) => d.radius);

        node.append("title").text((d) => `${d.category}: ${d.word}`);

        node.append("text")
            .text((d) => d.word)
            .attr("y", (d) => d.y)
            .attr("x", (d) => d.x)
            .attr("text-anchor", "middle");

        simulation.on("tick", () => {
            node.attr("x", (d) => d.x)
            node.attr("y", (d) => d.y)
            
            node.selectAll("circle")
                .attr("cx", (d: any) => d.x)
                .attr("cy", (d: any) => d.y)
                .attr("r", (d: any) => d.radius);

            node.selectAll("text")
                .attr("x", (d) => d.x)
                .attr("y", (d) => d.y)
        });

    }, [ data ]);

    return {
        draw
    }
};

export default useDrawBubble;
