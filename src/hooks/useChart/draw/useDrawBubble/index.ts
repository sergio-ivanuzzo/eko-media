import { useCallback } from "react";
import * as d3 from "d3";

import brighten from "~/helpers/color/brighten";
import useChartColor from "~/hooks/useChart/color/useChartColor";
import useData from "~/hooks/useData";
import useNotifyError from "~/hooks/useNotifyError";

import { ChartTooltipCSS } from "~/components/core/Chart/styles";

export const MAX_BUBBLE_RADIUS = 150;

const DEFAULT_TEXT_SIZE = 20;
const MAX_TEXT_SIZE = 80;

const MIN_ZOOM = 1;
const MAX_ZOOM = 20;

const RADIUS_MULTIPLIER = 1.5;
const INDENT_BETWEEN_BUBBLES = 8;

const useDrawBubble = ({ data, selectedCategories }: IUseBubbleProps): { draw: (props: IChartDrawProps) => void } => {

    const { catchErrorsSync } = useNotifyError();
    const { getColor } = useChartColor();
    const { topCategories } = useData();

    const children = ({
        children: Array.from(
            d3.group(
                Array.from({ length: data.length }, (_, i) => {
                    const item = data[i];
                    return {
                        group: item.category,
                        value: -Math.log(Math.random()),
                        radius: item.radius
                    };
                }),
                (d) => d.group
            ),
            ([ , children ]) => ({ children })
        )
    });

    const getColorIndexByCategory = (category: string) => topCategories.findIndex(
        (topCategory) => topCategory.toLowerCase() === category.toLowerCase()
    );

    const draw = useCallback(({ chartRef, width: currentWidth, height, colors }: IChartDrawProps): void => {

        if (!data.length) {
            return;
        }

        const width = currentWidth * 1.2;

        const pack = () => d3.pack()
            .size([ width, height ])
            .padding(1)(d3.hierarchy(children).sum((d: any) => d.radius));

        const categoriesCount = selectedCategories.length;
        const clusters = new Array(categoriesCount);

        let centers: Array<[number, number]> = [];

        const centerX = width / 2;
        const centerY = height / 2;

        const paddingX = centerX / 1.8;
        const paddingY = centerY / 2;

        const offsetX = 150;

        // according to current requirements we can build 5 or 1 bubble chart
        if (categoriesCount === 1) {
            centers = [ [ width / 2, height / 2 ] ];
        } else {
            centers = [
                [ offsetX + paddingX, paddingY ],
                [ offsetX + width - paddingX, paddingY ],
                [ offsetX + centerX, centerY ],
                [ offsetX + paddingX, height - paddingY ],
                [ offsetX + width - paddingX, height - paddingY ]
            ];
        }

        const nodes = pack().leaves().map((leaf, index) => {

            const { category: currentCategory, word, wordCount, radius } = data[index];
            const clusterIndex = selectedCategories.findIndex(
                (category: string) => category.toLowerCase() === currentCategory.toLowerCase()
            );

            const y = Math.sin((clusterIndex / categoriesCount) * (Math.PI / 180));
            const x = Math.cos((clusterIndex / categoriesCount) * (Math.PI / 180));

            const item = {
                cluster: clusterIndex,
                x,
                y,
                word,
                wordCount,
                category: currentCategory
            };

            if (!clusters[clusterIndex] || (radius > clusters[clusterIndex].radius)) {
                clusters[clusterIndex] = item;
            }

            return {
                ...leaf,
                ...item
            }
        });

        const svg = d3.select(chartRef.current)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMaxYMid meet")
            .attr("height", height)
            .attr("width", width);

        // clear svg before draw new content
        svg.selectAll("svg > *").remove();

        const simulation = d3.forceSimulation(nodes)
            // .force("center", d3.forceCenter(width / 2, height / 2))
            .force("x", d3.forceX().x((d: any) => centers[d.cluster][0]).strength(0.05))
            .force("y", d3.forceY().y((d: any) => centers[d.cluster][1]).strength(0.05))
            .force("charge", d3.forceManyBody().strength(-10))
            .force("collision", d3.forceCollide().radius((d: any) => d.r * RADIUS_MULTIPLIER + INDENT_BETWEEN_BUBBLES));

        // disable animation
        // simulation.stop();
        simulation.tick(nodes.length);

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

                    if (textBBox.width - offset > circleBBox.width) {
                        d3.select(group).select("text").style("font-size", "0px");
                    }
                })
            });
        }

        node.attr("pointer-events", "all");

        svg.call(d3.zoom()
            .scaleExtent([ MIN_ZOOM, MAX_ZOOM ])
            .filter((event: WheelEvent) => event.shiftKey)
            .on("zoom", (event: d3.D3ZoomEvent<any, any>) => {
                const scale = event.transform.k;
                const textSize = DEFAULT_TEXT_SIZE * scale > MAX_TEXT_SIZE ? MAX_TEXT_SIZE / scale : DEFAULT_TEXT_SIZE;

                node.selectAll("circle,text").attr("transform", event.transform.toString());
                node.selectAll("text").style("font-size", `${textSize}px`);

                hideText();

             }) as any);

        node.append("circle")
            .attr("fill", (d: any) => {
                return catchErrorsSync(() => getColor({
                    index: categoriesCount === 1 ? 0 : getColorIndexByCategory(d.category),
                    params: { randomShade: true, randomOpacity: true },
                    colors
                }));
            })
            .attr("cx", (d: any) => d.x)
            .attr("cy", (d: any) => d.y)
            .attr("r", (d: any) => d.r * RADIUS_MULTIPLIER);

        node.append("text")
            .text((d) => d.word)
            .attr("dy", () => "0.3em")
            .attr("font-size", DEFAULT_TEXT_SIZE)
            .attr("text-anchor", "middle")
            .attr("x", (d: any) => d.x)
            .attr("y", (d: any) => d.y);

        simulation.on("tick", () => {
            node.selectAll("circle")
                .attr("cx", (d: any) => d.x)
                .attr("cy", (d: any) => d.y)
                .attr("r", (d: any) => d.r * RADIUS_MULTIPLIER);

            node.selectAll("text")
                .attr("x", (d: any) => d.x)
                .attr("y", (d: any) => d.y);
        });

        hideText();

        // draw tooltips
        const tooltipSelector = "#root > .chart-tooltip";
        const tooltip:  d3.Selection<HTMLDivElement, unknown, HTMLElement, any> = d3.select(tooltipSelector).node()
            ? d3.select(tooltipSelector)
            : d3.select("#root").append("div").attr("class", "chart-tooltip");

        node.selectAll("circle,text")
            .on("mouseover", () => tooltip.style("display", null))
            .on("mouseout", () => tooltip.style("display", "none").html(""))
            .on("mousemove", (event: MouseEvent, d: any) => {
                const text = d.wordCount;

                const color = getColor({
                    index: categoriesCount === 1 ? 0 : getColorIndexByCategory(d.category),
                    colors
                });

                // apply main tooltip css
                (tooltip.node() as HTMLElement).style.cssText = ChartTooltipCSS.toString();

                tooltip.html(`${text}`)
                    .style("background", brighten(color, 25))
                    .style("left", `${event.pageX}px`)
                    .style("top", `${event.pageY + 10}px`).append("span");
            });

    }, [ data ]);

    return {
        draw
    }
};

export default useDrawBubble;
