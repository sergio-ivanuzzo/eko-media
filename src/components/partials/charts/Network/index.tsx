import React, { useCallback, useState } from "react";

import Chart from "~/components/core/Chart";
import ConditionalRender from "~/components/core/ConditionalRender";
import ReferenceBar from "~/components/partials/charts/Network/ReferenceBar";
import useData from "~/hooks/useData";
import useDrawNetwork from "~/hooks/useChart/draw/useDrawNetwork";

import { TYPES } from "~/common/constants";

import { NetworkChartContainer } from "~/components/partials/charts/Network/styles";

const TYPE = TYPES.NETWORK;

const Network = (): JSX.Element => {
    const [ isSelected, setSelected ] = useState(false);
    const [ references, setReferences ] = useState<IReferenceItem[]>([]);
    const { getDataset } = useData();

    const dataset = getDataset(TYPE, "all");
    const { nodes, edges } = dataset[0] as IGraphDataset;

    // we use this copies because d3 change array items by reference
    // be careful, edges inside draw function are a bit different from edges here bc of that
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

    const { draw } = useDrawNetwork({
        nodes: nodesCopy,
        edges: edgesCopy,
        handleNodeClick,
        isSelected,
        setSelected
    });

    return (
        <NetworkChartContainer>
            <ConditionalRender condition={isSelected}>
                <ReferenceBar items={references} />
            </ConditionalRender>
            <Chart draw={draw} height={800} />
        </NetworkChartContainer>
    )
};

export default Network;
