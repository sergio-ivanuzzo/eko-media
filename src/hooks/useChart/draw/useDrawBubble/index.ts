import { useCallback } from "react";
import { useIntl } from "react-intl";
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
const HOVER_MULTIPLIER = 1.15;
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

    const { formatMessage } = useIntl();
    const legendsText = formatMessage({ id: "bubble.legends_text" });
    const tooltipText = formatMessage({ id: "bubble.tooltip_text.total" })

    const groupedData = d3.group(data, (d) => d.category);

    const totals = selectedCategories.reduce((acc: { [key: string]: number}, category) => {
        acc[category] = (groupedData.get(category) || []).reduce((sum, item) => sum + item.wordCount, 0);
        return acc;
    }, {});

    const draw = useCallback(({ chartRef, width: currentWidth, height, colors, tooltip }: IChartDrawProps): void => {

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
            .force("x", d3.forceX().x((d: any) => centers[d.cluster][0]).strength(0.05))
            .force("y", d3.forceY().y((d: any) => centers[d.cluster][1]).strength(0.05))
            .force("charge", d3.forceManyBody().strength(-10))
            .force("collision", d3.forceCollide().radius((d: any) => d.r * RADIUS_MULTIPLIER + INDENT_BETWEEN_BUBBLES));

        // disable animation
        simulation.stop();
        simulation.tick(nodes.length * 2);

        const node = svg.selectAll("g.bubble")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "bubble")
            .attr("pointer-events", "all");

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
            // .attr("pointer-events", "none")
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

        // animate bubble hover
        node.on("mouseover.hover", (event: MouseEvent) => {
            const { target } = event;
            const selectedBubble = d3.select((target as SVGSVGElement).parentElement).select("circle");

            selectedBubble
                .classed("with-transition", true)
                .classed("no-transition", false)
                .transition().duration(250)
                .attr("r", (d: any) => d.r * RADIUS_MULTIPLIER * HOVER_MULTIPLIER);
        });

        node.on("mouseout.hover", (event: MouseEvent) => {
            const { target } = event;
            const selectedBubble = d3.select((target as SVGSVGElement).parentElement).select("circle");

            selectedBubble
                .classed("with-transition", false)
                .classed("no-transition", true)
                .transition().duration(500)
                .attr("r", (d: any) => d.r * RADIUS_MULTIPLIER);
        });

        // draw tooltip
        node
            .on("mouseover", () => tooltip.style("display", ""))
            .on("mouseout", () => tooltip.style("display", "none").style("left", "-9999px"))
            .on("mousemove", (event: MouseEvent, d: any) => {
                const text = `${tooltipText} ${d.wordCount}`;

                const color = getColor({
                    index: categoriesCount === 1 ? 0 : getColorIndexByCategory(d.category),
                    colors
                });

                // apply main tooltip css
                (tooltip.node() as HTMLElement).style.cssText = ChartTooltipCSS.toString();

                tooltip.html(`${text}`)
                    .style("text-transform", "none")
                    .style("background", brighten(color, 25))
                    .style("left", `${event.pageX - 85}px`)
                    .style("top", `${event.pageY - 100}px`);
            });

        // draw legends
        const svgElement = chartRef.current;
        const svgParent = svgElement?.parentElement;

        if (svgParent) {
            const legends = d3.select(svgParent.parentElement).select(".legends");

            legends.selectAll(".legend")
                .data(selectedCategories)
                .enter()
                .append("div")
                .attr("class", "legend")
                .each((category: string, index: number, n: any) => {
                    const item = d3.select(n[index]);
                    item
                        .append("div")
                        .attr("class", "marker")
                        .style("background", getColor({ index, colors }));

                    item.append("div").attr("class", "text").html(category);
                    item.select(".text").append("div").html(`${legendsText} ${totals[category]}`);
                });
        }

    }, [ data ]);

    return {
        draw
    }
};

export default useDrawBubble;
