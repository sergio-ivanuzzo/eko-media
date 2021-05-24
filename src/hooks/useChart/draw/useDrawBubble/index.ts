import { useCallback } from "react";
import * as d3 from "d3";

import useChartColor from "~/hooks/useChart/color/useChartColor";

export const MAX_BUBBLE_RADIUS = 150;

const DEFAULT_TEXT_SIZE = 40;
const MAX_TEXT_SIZE = 80;

const MIN_ZOOM = 1;
const MAX_ZOOM = 10;

const useDrawBubble = ({ data, selectedCategories }: IUseBubbleProps): { draw: (props: IChartDrawProps) => void } => {

    const { getColor, getColorIndexByCategory } = useChartColor();

    const draw = useCallback(({ chartRef, width, height }: IChartDrawProps): void => {

        const categoriesCount = selectedCategories.length;
        const clusters = new Array(categoriesCount);

        let centers: Array<[number, number]> = [];

        if (selectedCategories.length === 1) {
            centers = [ [ width / 2, height / 2 ] ];
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

        const nodes = d3.range(data.length).map(function(index) {
            const { category: currentCategory, word, wordCount, radius } = data[index];
            const clusterIndex = selectedCategories.findIndex(
                (category: string) => category.toLowerCase() === currentCategory.toLowerCase()
            );

            const y = Math.sin((clusterIndex / categoriesCount) * (Math.PI / 180)) * width;
            const x = Math.cos((clusterIndex / categoriesCount) * (Math.PI / 180)) * height;

            const d = {
                    cluster: clusterIndex,
                    radius,
                    x,
                    y,
                    word,
                    wordCount,
                    category: currentCategory
                };

            if (!clusters[clusterIndex] || (radius > clusters[clusterIndex].radius)) {
                clusters[clusterIndex] = d;
            }

            return d;
        });

        const svg = d3.select(chartRef.current)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("height", height)
            .attr("width", width);

        // clear svg before draw new content
        svg.selectAll("svg > *").remove();

        const simulation = d3.forceSimulation(nodes)
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("x", d3.forceX().x((d: any) => centers[d.cluster][1]).strength(0.5))
            .force("y", d3.forceY().y((d: any) => centers[d.cluster][0]).strength(0.5))
            .force("collision", d3.forceCollide().radius((d: any) => d.radius + d.radius / 3));

        // disable animation
        simulation.stop();
        simulation.tick(nodes.length * 2);

        const node = svg.selectAll("g.bubble")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "bubble");

        const hideText = () => {
            const offset = 1;
            node.call((selection) => {
                selection.each((d, i, n) => {
                    const group = n[i];
                    const textNode = d3.select(group).select("text").node() as SVGSVGElement;
                    const circleNode = d3.select(group).select("circle").node() as SVGSVGElement;

                    const textBBox = textNode.getBBox();
                    const circleBBox = circleNode.getBBox();

                    if (textBBox.width > circleBBox.width - offset) {
                        d3.select(group).select("text").style("font-size", "0px");
                    }
                })
            });
        }

        node.attr("pointer-events", "all");

        svg.call(d3.zoom().scaleExtent([ MIN_ZOOM, MAX_ZOOM ]).on("zoom", (event: d3.D3ZoomEvent<any, any>) => {
            const scale = event.transform.k;
            const textSize = DEFAULT_TEXT_SIZE * scale > MAX_TEXT_SIZE ? MAX_TEXT_SIZE / scale : DEFAULT_TEXT_SIZE;

            node.selectAll("circle,text").attr("transform", event.transform.toString());
            node.selectAll("text").style("font-size", `${textSize}px`);

            hideText();

         }) as any);

        node.append("circle")
            .attr("fill", (d: any) => {
                const index = getColorIndexByCategory(d.category);
                return getColor(index, { randomShade: true, randomOpacity: true });
            })
            .attr("cx", (d: any) => d.x)
            .attr("cy", (d: any) => d.y)
            .attr("r", (d: any) => d.radius);

        node.append("title").text((d) => `${d.category}: ${d.word}`);

        node.append("text")
            .text((d) => d.word)
            .attr("dy", () => "0.3em")
            .attr("font-size", DEFAULT_TEXT_SIZE)
            .attr("text-anchor", "middle")
            .attr("x", (d: any) => d.x)
            .attr("y", (d: any) => d.y);

        hideText();

    }, [ data ]);

    return {
        draw
    }
};

export default useDrawBubble;
