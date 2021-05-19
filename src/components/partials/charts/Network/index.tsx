import React, { useCallback, useState } from "react";

import Chart from "~/components/core/Chart";
import ConditionalRender from "~/components/core/ConditionalRender";
import ReferenceBar from "~/components/partials/charts/Network/ReferenceBar";
import useData from "~/hooks/useData";
import useDrawNetwork from "~/hooks/useChart/draw/useDrawNetwork";

import { TYPES } from "~/common/constants";

import { NetworkChartContainer } from "~/components/partials/charts/Network/styles";
import { IGraphDataset, IGraphEdgeItem } from "./types";
import { IReferenceItem, ReferenceDirection } from "~/components/partials/charts/Network/ReferenceBar/types";

const TYPE = TYPES.NETWORK;

const Network = (): JSX.Element => {
    const [ isSelected, setSelected ] = useState(false);
    const [ references, setReferences ] = useState<IReferenceItem[]>([]);
    const { getDataset } = useData();

    const dataset = getDataset(TYPE, "all");
    const { nodes, edges } = dataset[0] as IGraphDataset;

    // we use this copies because d3 change array items by reference
    const nodesCopy = nodes.map((d) => Object.create(d));
    const edgesCopy = edges.map((d) => Object.create(d));

    const handleNodeClick = useCallback((selectedNodeId: number) => {
        const selectedNode = nodes.find((node) => node.id === selectedNodeId);

        if (selectedNode) {
            const references: IReferenceItem[] = edges
                .filter(({ source, target }) => [ source, target ].includes(selectedNodeId))
                .map<[IReferenceItem, IReferenceItem]>((edge: IGraphEdgeItem) => {
                    const forward = {
                        from: selectedNode.name,
                        to: "",
                        direction: ReferenceDirection.FORWARD,
                        referenceCount: 0
                    };

                    const back = {
                        from: "",
                        to: selectedNode.name,
                        direction: ReferenceDirection.BACK,
                        referenceCount: 0
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
