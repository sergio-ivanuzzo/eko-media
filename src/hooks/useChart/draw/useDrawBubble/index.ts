import { useCallback } from "react";
import * as d3 from "d3";

import { IChartDrawProps } from "~/hooks/useChart/types";
import { IUseBubbleProps } from "~/hooks/useChart/draw/useDrawBubble/types";
import theme from "~/common/theme";

const { orange, green, cyan, gray } = theme.palette;

const useDrawBubble = ({ data, topCategories }: IUseBubbleProps): { draw: (props: IChartDrawProps) => void } => {

    const n = data.length;
    const m = topCategories.length;
    const clusters = new Array(topCategories.length);

    const cluster = (nodes) => {

        let strength = 0.1;

        function force (alpha) {

            // scale + curve alpha value
            alpha *= strength * alpha;

            nodes.forEach(function(d) {
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

        force.initialize = function (_) {
            nodes = _;
        }

        force.strength = (_) => {
            strength = _ == null ? strength : _;
            return force;
        };

        return force;

    }

    const draw = useCallback(({ chartRef, width, height }: IChartDrawProps): void => {

        const nodes = d3.range(n).map(function(index) {
            const { category: currentCategory, word, wordCount, radius } = data[index];
            const clusterIndex = topCategories.findIndex((category: string) => category.toLowerCase() === currentCategory.toLowerCase());
            // const r = Math.sqrt((clusterIndex + 1) / m * -Math.log(Math.random())) * maxRadius;

            const d = {
                    cluster: clusterIndex,
                    radius,
                    x: Math.cos(clusterIndex / m * 2 * Math.PI) * 200 + width / 2 + Math.random(),
                    y: Math.sin(clusterIndex / m * 2 * Math.PI) * 200 + height / 2 + Math.random(),
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

        const color: any = d3.scaleOrdinal()
            .domain(new Array(topCategories.length))
            .range([ orange.carrot, gray.silver, green.jade, green.salad, cyan.azure ]);

        const simulation = d3.forceSimulation(nodes)
            // .velocityDecay(0.2)
            .force("center", d3.forceCenter(width/2, height/2))
            // .force("x", d3.forceX(width / 2))
            // .force("y", d3.forceY(height / 2))
            .force("cluster", cluster(nodes).strength(0.005))
            .force("charge", d3.forceManyBody().strength(5))
            .force("collision", d3.forceCollide().radius((d) => d.radius));
            // .force("collide", collide);


        const node = svg.selectAll("g.bubble")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "bubble");

        node.append("circle")
            .attr("fill", (d: any) => color(d.cluster))
            .attr("cx", (d: any) => d.x * 10)
            .attr("cy", (d: any) => d.y * 5)
            .attr("r", (d: any) => d.radius * 100);

        node.transition()
            .delay((d: any, i: any) => Math.random() * 500)
            .duration(750)
            .attrTween("r", (d: any) => {
                const i = d3.interpolate(0, d.radius);
                return (t: any) => d.r = i(t);
            });
        node.append("title").text((d) => `${d.category}: ${d.word}`);
        node.append("text")
            .selectAll("tspan")
            .data((d) => d.word.split(/(?=[A-Z][a-z])|\s+/g))
            .join("tspan")
            // .attr("dy", ".2em")
            .attr("x", (d) => d.x + 15)
            .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
            .text((d) => d.word)
            .style("stroke", "black");

        simulation.on("tick", () => {
            node.attr("x", (d) => d.x)
            node.attr("y", (d) => d.y)
            
            node.selectAll("circle")
                .attr("cx", (d: any) => d.x)
                .attr("cy", (d: any) => d.y)
                .attr("r", (d: any) => d.radius);
        });
    }, [ data ]);

    return {
        draw
    }
};

export default useDrawBubble;
