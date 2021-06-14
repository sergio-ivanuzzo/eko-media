import { useCallback } from "react";
import * as d3 from "d3";

import limitNumber from "~/helpers/limitNumber";

import { ChartTooltipCSS } from "~/components/core/Chart/styles";
import theme from "~/common/theme";

import { MEDIA_LOGOS_DIR } from "~/common/constants";

// edges size
const MAX_DISTANCE = 2000;
const MIN_DISTANCE = 300;
// node size
const RADIUS = 10;

// multipliers to use for scaling
const RADIUS_MULTIPLIER = 1.3;
const MAX_RADIUS = RADIUS * RADIUS_MULTIPLIER;

// offset from node
const TEXT_X_OFFSET = 15;
const TEXT_Y_OFFSET = 5;

const MIN_FADE = 0.1;
const MAX_FADE = 1;

const { orange, green, cyan, black } = theme.palette;

const useDrawNetwork = (
    { nodes, edges, handleNodeClick, isSelected, setSelected }: IUseNetworkProps
): { draw: (props: IChartDrawProps) => void } => {

    const highlight = useCallback((
        node: d3.Selection<SVGGElement, unknown, SVGSVGElement | null, unknown>
    ) => (
        selectedNode: any,
        linkedNodeColor: string,
        selectedNodeColor: string,
        selectedNodeTextColor: string,
        selectedNodeRadius: number,
    ) => {
        // all items current node is target for
        const sources = edges
            .filter((edge: any) => edge.target === selectedNode)
            .map((edge: any) => edge.source.index);

        // targets for selected node
        const targets = edges
            .filter((edge: any) => edge.source === selectedNode)
            .map((edge: any) => edge.target.index);

        node.selectAll("circle")
            .style("fill", (node: any) => {
                if (sources.concat(targets).includes(node.index)) {
                    return linkedNodeColor;
                } else if (node.index === selectedNode.index) {
                    return selectedNodeColor;
                } else {
                    return orange.carrot;
                }
            })
            .style("r", (node: any) => {
                if (node.index === selectedNode.index) {
                    return selectedNodeRadius;
                } else {
                    return RADIUS;
                }
            });

        node.selectAll("text").transition().duration(500).style("fill", (node: any) => {
            if (node.index === selectedNode.index) {
                return selectedNodeTextColor;
            } else {
                return black.base;
            }
        })
    }, [ nodes, edges, isSelected ]);

    const fade = useCallback((
        link:  d3.Selection<SVGLineElement, unknown, SVGGElement, unknown>
    ) => (
        selectedNode: any,
        notSelectedOpacity?: number,
        selectedOpacity?: number,
    ) => {
        link.transition().duration(500).style("stroke-opacity", (o: any) => (
                (o.source === selectedNode || o.target === selectedNode)
                    ? selectedOpacity || o.alpha
                    : notSelectedOpacity || o.alpha
            )
        );
    }, [ nodes, edges, isSelected ]);

    const draw = useCallback(({ width: currentWidth, height: currentHeight, ...props }: IChartDrawProps): void => {
        const { chartRef, tooltip } = props;
        // prevent re-draw if node is selected
        if (isSelected) {
            return;
        }

        const width = currentWidth / 1.5;
        const height = currentHeight / 1.4;

        const limitDraggableX = (x: number) => limitNumber(x, MAX_RADIUS, width - MAX_RADIUS);
        const limitDraggableY = (y: number) => limitNumber(y, MAX_RADIUS, height - MAX_RADIUS);

        const svg = d3.select(chartRef.current)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("height", currentHeight)
            .attr("width", currentWidth);

        // clear svg before draw new content
        svg.selectAll("svg > *").remove();

        const simulation: any = d3.forceSimulation(nodes as any)
            .force("link", d3.forceLink().id((d: any) => d.id).distance(MIN_DISTANCE))
            .force("charge", d3.forceManyBody()
                .strength((d: any, i) => i === 0 ? -MAX_DISTANCE : -(MAX_DISTANCE / 2))
                .distanceMin(MIN_DISTANCE)
                .distanceMax(MAX_DISTANCE)
            )
            .force("x", d3.forceX(width / 2).strength(0.00015))
            .force("y", d3.forceY(height / 2).strength(0.15))
            .force("center", d3.forceCenter(width / 2, height / 2));

        if (simulation !== undefined) {
            simulation.force("link").links(edges);
        }

        // disable animation
        simulation.stop();
        simulation.tick(nodes.length);

        const link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(edges as any)
            .enter().append("line")
            .attr("x1", (d: any) => d.source.x)
            .attr("y1", (d: any) => d.source.y)
            .attr("x2", (d: any) => d.target.x)
            .attr("y2", (d: any) => d.target.y)
            .attr("stroke-width", (d: any) => Math.sqrt(parseInt(d.weight)))
            .attr("stroke-opacity", (d: any) => d.alpha)

        const node = svg.selectAll("g.nodes")
            .data(nodes as any)
            .enter()
            .append("g")
            .attr("class", "nodes");

        node.call((d3.drag() as any)
            .on("start", (e: DragEvent & { active: number }, d: any) => {
                if (!e.active) {
                    simulation.alphaTarget(0.3).restart();
                }
                d.fx = limitDraggableX(d.x);
                d.fy = limitDraggableY(d.y);
            })
            .on("drag", (e: DragEvent, d: any) => {
                d.fx = limitDraggableX(e.x);
                d.fy = limitDraggableY(e.y);
            })
            .on("end", (e: DragEvent & { active: number }) => {
                if (!e.active) {
                    simulation.alphaTarget(0);
                }
            }));

        node.append("circle")
            .attr("cx", (d: any) => limitDraggableX(d.x))
            .attr("cy", (d: any) => limitDraggableY(d.y))
            .attr("r", RADIUS);

        node.append("text")
            .text((d: any) => d.name)
            .attr("class", "node-text")
            .attr("x", (d: any) => limitDraggableX(d.x + TEXT_X_OFFSET))
            .attr("y", (d: any) => limitDraggableY(d.y + TEXT_Y_OFFSET))
            .attr("fill", black.base);

        simulation.on("tick", () => {
            link
                .attr("x1", (d: any) => limitDraggableX(d.source.x))
                .attr("y1", (d: any) => limitDraggableY(d.source.y))
                .attr("x2", (d: any) => limitDraggableX(d.target.x))
                .attr("y2", (d: any) => limitDraggableY(d.target.y));

            node.selectAll("circle")
                .attr("cx", (d: any) => limitDraggableX(d.x))
                .attr("cy", (d: any) => limitDraggableY(d.y))
                .attr("r", RADIUS);

            node.selectAll("text")
                .attr("x", (d: any) => limitDraggableX(d.x + TEXT_X_OFFSET))
                .attr("y", (d: any) => limitDraggableY(d.y + TEXT_Y_OFFSET));
        })

        const doFade = fade(link);
        const doHighlight = highlight(node);

        const mouseOverFade = (event: MouseEvent, d: any) => {
            if (!isSelected) {
                doFade(d, MIN_FADE, MAX_FADE);
                doHighlight(d, green.jade, cyan.azure, cyan.azure, RADIUS * RADIUS_MULTIPLIER);
            }
        };

        const mouseOutFade = (event: MouseEvent, d: any) => {
            if (!isSelected) {
                doFade(d);
                doHighlight(d, orange.carrot, orange.carrot, black.base, RADIUS);
            }
        };

        node.on("mouseover.fade", mouseOverFade).on("mouseout.fade", mouseOutFade);

        node.on("click", (event: MouseEvent, d: any) => {
            // unregister events to prevent fade/highlight override
            node.on("mouseover.fade", null).on("mouseout.fade", null);

            setSelected(true);
            handleNodeClick(d.id);
            doFade(d, MIN_FADE, MAX_FADE);
            doHighlight(d, green.jade, cyan.azure, cyan.azure, RADIUS * RADIUS_MULTIPLIER);
        });

        // unselect nodes when click outside of it (somewhere on svg)
        svg.on("click", (event: MouseEvent) => {
            const element = event.target as HTMLElement;
            if (![ "circle", "text" ].includes(element.tagName.toLowerCase())) {
                setSelected(true);
                setSelected(false);
            }
        });

        // draw tooltip
        node
            .on("mouseover", () => tooltip.style("display", ""))
            .on("mouseout", () => tooltip.style("display", "none"))
            .on("mousemove", (event: MouseEvent, d: any) => {
                // const currentNode = d3.select(event.currentTarget as any).node();
                // const parentClass = d3.select(currentNode.parentNode).attr("class");
                // const groupIndex = Number(parentClass.replace( /^\D+/g, ""));
                //
                // const text = d.data.values[groupIndex];

                const imageSrc = `${MEDIA_LOGOS_DIR}/${d.name}.png`;

                // apply main tooltip css
                (tooltip.node() as HTMLElement).style.cssText = ChartTooltipCSS.toString();

                tooltip.html(`<img src="${imageSrc}" width="100px" alt="">`)
                    .style("background", "transparent")
                    .style("left", `${event.pageX - 30}px`)
                    .style("top", `${event.pageY - 130}px`);

            });

    }, [ nodes, edges, isSelected ]);

    return {
        draw
    }
};

export default useDrawNetwork;
