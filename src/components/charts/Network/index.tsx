import { FormattedMessage } from "react-intl";
import React, { useCallback, useState } from "react";

import ConditionalRender from "~/components/core/ConditionalRender";
import ReferenceBar from "~/components/charts/Network/ReferenceBar";
import useData from "~/hooks/useData";
import useDrawNetwork from "~/hooks/useChart/draw/useDrawNetwork";

import { ReferenceDirection } from "~/components/charts/Network/constants";
import { TYPES } from "~/common/constants";

import { ChartHint } from "~/components/core/Chart/styles";
import { NetworkChartContainer, StyledChart } from "./styles";

const TYPE = TYPES.NETWORK;

const Network = (): JSX.Element => {
    const [ isSelected, setSelected ] = useState(false);
    const [ references, setReferences ] = useState<IReferenceItem[]>([]);
    const { getDataset } = useData();

    const dataset = getDataset(TYPE, "all");
    const { nodes = [], edges = [] } = (dataset[0] || []) as IGraphDataset;

    // we use this copies because d3 change array items by reference
    // be careful, "edges" inside draw function are a bit different from "edgesCopy" here bc of that
    const nodesCopy = nodes.map((d) => Object.create(d));
    const edgesCopy = edges.map((d) => Object.create(d));

    const handleNodeClick = useCallback((selectedNodeId: number) => {
        const selectedNode = nodes.find((node) => node.id === selectedNodeId);

        if (selectedNode) {
            const sources = edges
                .filter((edge: any) => edge.target === selectedNodeId)
                .map(({ source: id, target, reference_count: referenceCount }) => ({
                    id,
                    target,
                    referenceCount
                }));

            const targets = edges
                .filter((edge: any) => edge.source === selectedNodeId)
                .map(({ target: id, source, reference_count: referenceCount }) => ({
                    id,
                    source,
                    referenceCount
                }));

            const referencedMedia: Array<IGraphNodeItem> = nodes
                .filter((node) => {
                    return targets
                        .map(({ id }) => id)
                        .concat(sources.map(({ id }) => id))
                        .map((id) => id)
                        .includes(node.id)
                });

            const references: IReferenceItem[] = referencedMedia
                .map<[IReferenceItem, IReferenceItem]>((media) => {
                    const forward = {
                        from: selectedNode.name,
                        to: media.name,
                        direction: ReferenceDirection.FORWARD,
                        referenceCount: targets.find(
                            ({ id, source }) => id === media.id && source === selectedNodeId
                        )?.referenceCount || 0
                    };

                    const back = {
                        from: selectedNode.name,
                        to: media.name,
                        direction: ReferenceDirection.BACK,
                        referenceCount: sources.find(
                            ({ id, target }) => id === media.id && target === selectedNodeId
                        )?.referenceCount || 0
                    };

                    return [ forward, back ];
                })
                .flat();

            setReferences(references);
        }
    }, [ nodes, edges ]);

    // this states handled from Reference Bar
    const [ selectedNodeName, setSelectedNodeName ] = useState<string | undefined>();
    const [ hoveredNodeName, setHoveredNodeName ] = useState<string | undefined>();
    const [ connection, setConnection ] = useState<[string, string]>();

    const { draw } = useDrawNetwork({
        nodes: nodesCopy,
        edges: edgesCopy,
        handleNodeClick,
        isSelected,
        setSelected,
        selectedNodeName,
        setSelectedNodeName,
        hoveredNodeName,
        setHoveredNodeName,
        connection,
        setConnection,
    });

    return (
        <>
            <NetworkChartContainer>
                <ConditionalRender condition={isSelected}>
                    <ReferenceBar
                        items={references}
                        setSelectedNodeName={setSelectedNodeName}
                        setHoveredNodeName={setHoveredNodeName}
                        setConnection={(from, to) => setConnection([ from, to ])}
                    />
                </ConditionalRender>
                <StyledChart draw={draw} />
            </NetworkChartContainer>
            <ConditionalRender condition={!!(nodesCopy.length && edgesCopy.length)}>
                <>
                    <ChartHint>
                        <span>
                            <FormattedMessage id="draggable_chart.no_shift.hint" />
                        </span>
                    </ChartHint>
                    <ChartHint>
                        <span>
                            <FormattedMessage id="clickable_chart.nodes.hint" />
                        </span>
                    </ChartHint>
                </>
            </ConditionalRender>
        </>
    )
};

export default Network;
