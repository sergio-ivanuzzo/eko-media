import { useCallback, useRef } from "react";
import * as d3 from "d3";

import limitNumber from "~/helpers/limitNumber";
import useCanvas from "~/hooks/useCanvas";
import usePreviousState from "~/hooks/usePreviousState";

import { ChartTooltipCSS } from "~/components/core/Chart/styles";
import theme from "~/common/theme";

import { MEDIA_LOGOS_DIR } from "~/common/constants";

const BASE_RADIUS = 12;
const RADIUS_MULTIPLIER = 1.3;
const MAX_RADIUS = BASE_RADIUS * RADIUS_MULTIPLIER;

export const DEFAULT_TEXT_SIZE = 18; // px
// offset from node
const TEXT_X_OFFSET = 15;
const TEXT_Y_OFFSET = 5;

const MIN_FADE = 0.1;
const MAX_FADE = 1;

const { orange, green, cyan, black } = theme.palette;

const CUSTOM_EVENT_CLICK_NODE_NAME = "custom.click_node_name";
const CUSTOM_EVENT_HOVER_NODE_NAME = "custom.hover_node_name";

const useDrawNetwork = (
    { nodes, edges, handleNodeClick, isSelected, setSelected, ...props }: IUseNetworkProps
): { draw: (props: IChartDrawProps) => void } => {
    const {
        selectedNodeName,
        setSelectedNodeName,
        hoveredNodeName,
        setHoveredNodeName,
        connection = [],
        setConnection,
    } = props;

    const [ prevClickedNodeName ] = usePreviousState(selectedNodeName);
    const [ prevHoveredNodeName ] = usePreviousState(hoveredNodeName);

    const highlight = useCallback((
        node: d3.Selection<SVGGElement, unknown, SVGSVGElement | null, unknown>,
        fallbackRadius: number,
    ) => (
        selectedNode: any,
        linkedNodeColor: string,
        selectedNodeColor: string,
        selectedNodeTextColor: string,
        selectedNodeRadius: number,
        endNode?: any,
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
                if (endNode) {
                    if (node.index === selectedNode.index || node.index === endNode.index) {
                        return selectedNodeColor;
                    } else {
                        return linkedNodeColor;
                    }
                }

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
                    return fallbackRadius;
                }
            });

        node.selectAll("text").transition().duration(500).style("fill", (node: any) => {
            if (endNode) {
                if (node.index === selectedNode.index || node.index === endNode.index) {
                    return selectedNodeTextColor;
                } else {
                    return black.base;
                }
            } else {
                if (node.index === selectedNode.index) {
                    return selectedNodeTextColor;
                } else {
                    return black.base;
                }
            }
        })
    }, [ nodes, edges, isSelected ]);

    const fade = useCallback((
        link:  d3.Selection<SVGLineElement, unknown, SVGGElement, unknown>
    ) => (
        selectedNode: any,
        notSelectedOpacity?: number,
        selectedOpacity?: number,
        endNode?: any,
    ) => {
        link.transition().duration(500).style("stroke-opacity", (o: any) => {
            if (endNode) {
                return (
                    (o.source === selectedNode && o.target === endNode)
                        ? selectedOpacity || o.alpha
                        : notSelectedOpacity || o.alpha
                );
            } else {
                return (
                    (o.source === selectedNode || o.target === selectedNode)
                        ? selectedOpacity || o.alpha
                        : notSelectedOpacity || o.alpha
                );
            }
        });

        link.classed("highlighted", (o: any) => endNode && o.source === selectedNode && o.target === endNode);
    }, [ nodes, edges, isSelected ]);

    const tempFunctionsRef = useRef({
        doFade: [],
        doHighlight: [],
    });

    const clickNodeNameHandler = useCallback((event: Event) => {
        const { selectedNodeName, prevNodeName, isSelected } = (event as CustomEvent).detail || {};
        const {
            doFade = () => null,
            doHighlight = () => null
        } = tempFunctionsRef.current;

        if (isSelected) {
            if (prevNodeName !== selectedNodeName) {
                if (selectedNodeName) {
                    const selectedNode = nodes.find((node: any) => node.name === selectedNodeName) || { id: -1 };

                    handleNodeClick(selectedNode.id);
                    (doFade as CallableFunction)(selectedNode, MIN_FADE, MAX_FADE);
                    (doHighlight as CallableFunction)(
                        selectedNode, green.jade, cyan.azure, cyan.azure, BASE_RADIUS * RADIUS_MULTIPLIER
                    );
                }
            }
        } else {
            document.removeEventListener(CUSTOM_EVENT_CLICK_NODE_NAME, clickNodeNameHandler);
        }
    }, [ tempFunctionsRef, selectedNodeName, nodes, edges ]);

    const hoverNodeNameHandler = useCallback((event: Event) => {
        const { selectedNodeName, connection, isSelected } = (event as CustomEvent).detail || {};
        const {
            doFade = () => null,
            doHighlight = () => null
        } = tempFunctionsRef.current;

        if (isSelected) {
            const nodeName = selectedNodeName;
            const [ source, target ] = connection;

            if (source && target) {
                const sourceNode = nodes.find((node: any) => node.name === source) || { id: -1 };
                const targetNode = nodes.find((node: any) => node.name === target) || { id: -1 };

                (doFade as CallableFunction)(sourceNode, MIN_FADE, MAX_FADE, targetNode);
                (doHighlight as CallableFunction)(
                    sourceNode, green.jade, cyan.azure, cyan.azure, BASE_RADIUS * RADIUS_MULTIPLIER, targetNode
                );
            } else if (nodeName) {
                const selectedNode = nodes.find((node: any) => node.name === nodeName) || { id: -1 };

                (doFade as CallableFunction)(selectedNode, MIN_FADE, MAX_FADE);
                (doHighlight as CallableFunction)(
                    selectedNode, green.jade, cyan.azure, cyan.azure, BASE_RADIUS * RADIUS_MULTIPLIER
                );
            }
        } else {
            document.removeEventListener(CUSTOM_EVENT_HOVER_NODE_NAME, hoverNodeNameHandler);
        }
    }, [ tempFunctionsRef, prevHoveredNodeName, connection, nodes, edges ]);

    const { getTextWidth } = useCanvas();

    const draw = useCallback(({ width, height, ...props }: IChartDrawProps): void => {
        const { chartRef, tooltip } = props;

        document.dispatchEvent(
            new CustomEvent(
                CUSTOM_EVENT_CLICK_NODE_NAME, {
                    detail: {
                        selectedNodeName,
                        prevNodeName: prevClickedNodeName,
                        isSelected,
                    },
                },
            )
        );

        document.dispatchEvent(
            new CustomEvent(
                CUSTOM_EVENT_HOVER_NODE_NAME, {
                    detail: {
                        selectedNodeName,
                        hoveredNodeName,
                        connection,
                        prevNodeName: prevHoveredNodeName,
                        isSelected,
                    },
                },
            )
        );

        // prevent re-draw
        if (isSelected) {
            return;
        }

        const limitDraggableX = (x: number) => limitNumber(x, MAX_RADIUS, width - MAX_RADIUS);
        const limitDraggableY = (y: number) => limitNumber(y, MAX_RADIUS, height - MAX_RADIUS);

        const svg = d3.select(chartRef.current)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("height", height)
            .attr("width", width);

        // clear svg before draw new content
        svg.selectAll("svg > *").remove();

        // links size
        const minDistance = width / 3.125;
        const maxDistance = width;
        // node radius
        // const radius = Math.min(BASE_RADIUS, width / 150);
        const radius = BASE_RADIUS;

        const simulation: any = d3.forceSimulation(nodes as any)
            .force("link", d3.forceLink().id((d: any) => d.id).distance(minDistance))
            .force("charge", d3.forceManyBody()
                .strength((d: any, i) => i === 0 ? -maxDistance : -(maxDistance / 2))
                .distanceMin(minDistance)
                .distanceMax(maxDistance)
            )
            .force("x", d3.forceX(width / 2).strength(0.015))
            .force("y", d3.forceY(height / 2).strength(0.15))
            .force("center", d3.forceCenter(width / 2, height / 2));

        if (simulation !== undefined) {
            simulation.force("link").links(edges);
        }

        simulation.tick(Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())));

        // disable animation
        // simulation.stop();
        // simulation.tick(nodes.length);
         // See https://github.com/d3/d3-force/blob/master/README.md#simulation_tick

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
                tooltip.style("display", "none");
            })
            .on("end", (e: DragEvent & { active: number }) => {
                if (!e.active) {
                    simulation.alphaTarget(0);
                }
            }));

        node.append("circle")
            .attr("cx", (d: any) => limitDraggableX(d.x))
            .attr("cy", (d: any) => limitDraggableY(d.y))
            .attr("r", radius);

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
                .attr("r", radius);

            node.selectAll("text")
                .attr("x", (d: any) => {
                    const textSize = getTextWidth(nodes[d.index].name, `bold ${DEFAULT_TEXT_SIZE}px NeueHaasUnica`);
                    return limitNumber(d.x + TEXT_X_OFFSET, TEXT_X_OFFSET, width - (textSize + TEXT_X_OFFSET));
                })
                .attr("y", (d: any) => limitDraggableY(d.y + TEXT_Y_OFFSET));
        });

        const doFade = fade(link);
        const doHighlight = highlight(node, radius);

        const mouseOverFade = (event: MouseEvent, d: any) => {
            if (!isSelected) {
                doFade(d, MIN_FADE, MAX_FADE);
                doHighlight(d, green.jade, cyan.azure, cyan.azure, radius * RADIUS_MULTIPLIER);
            }
        };

        const mouseOutFade = (event: MouseEvent, d: any) => {
            if (!isSelected) {
                doFade(d);
                doHighlight(d, orange.carrot, orange.carrot, black.base, radius);
            }
        };

        node.on("mouseover.fade", mouseOverFade).on("mouseout.fade", mouseOutFade);

        node.on("click", (event: MouseEvent, d: any) => {
            // unregister events to prevent fade/highlight override
            node.on("mouseover.fade", null).on("mouseout.fade", null);

            setSelected(true);
            setSelectedNodeName(d.name);

            handleNodeClick(d.id);
            doFade(d, MIN_FADE, MAX_FADE);
            doHighlight(d, green.jade, cyan.azure, cyan.azure, radius * RADIUS_MULTIPLIER);
        });

        // unselect nodes when click outside of it (somewhere on svg)
        svg.on("click", (event: MouseEvent) => {
            const element = event.target as HTMLElement;
            if (![ "circle", "text" ].includes(element.tagName.toLowerCase())) {
                setSelectedNodeName("");
                setHoveredNodeName("");
                setSelected(true);
                setSelected(false);
            }
        });

        // draw tooltip
        node
            .on("mouseover", () => tooltip.style("display", ""))
            .on("mouseout", () => tooltip.style("display", "none"))
            .on("mousemove", (event: MouseEvent, d: any) => {

                const imageSrc = `${MEDIA_LOGOS_DIR}/${d.name}.png`;

                // apply main tooltip css
                (tooltip.node() as HTMLElement).style.cssText = ChartTooltipCSS
                    .map((item) => (item as string).trim()).filter((item) => item.length > 1)
                    .toString();

                tooltip.html(`<img src="${imageSrc}" width="100px" alt="">`)
                    .style("background", "transparent")
                    .style("left", `${event.pageX - 30}px`)
                    .style("top", `${event.pageY - 150}px`);

            });

        tempFunctionsRef.current = {
            doFade: doFade as any,
            doHighlight: doHighlight as any,
        };

        document.addEventListener(CUSTOM_EVENT_CLICK_NODE_NAME, clickNodeNameHandler);
        document.addEventListener(CUSTOM_EVENT_HOVER_NODE_NAME, hoverNodeNameHandler);

    }, [ nodes, edges, isSelected, selectedNodeName, prevClickedNodeName, hoveredNodeName ]);

    return {
        draw
    }
};

export default useDrawNetwork;
