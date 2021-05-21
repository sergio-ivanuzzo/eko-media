declare interface IUseNetworkProps {
    nodes: IGraphNodeItem[];
    edges: IGraphEdgeItem[];
    handleNodeClick: (selectedNodeId: number) => void;
    isSelected: boolean;
    setSelected: Dispatch<SetStateAction<boolean>>;
}

declare interface IHighlightProps {
    selectedNode: any;
    linkedNodeColor: string;
    selectedNodeColor: string;
    selectedNodeTextColor: string;
    selectedNodeRadius: number;
    checkSelected?: boolean;
}

declare interface IFadeProps {
    selectedNode: any;
    notSelectedOpacity?: number;
    selectedOpacity?: number;
    checkSelected?: boolean;
}
