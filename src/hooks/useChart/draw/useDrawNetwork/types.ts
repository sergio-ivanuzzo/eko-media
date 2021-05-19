import { Dispatch, SetStateAction } from "react";
import { IGraphEdgeItem, IGraphNodeItem } from "~/components/partials/charts/Network/types";

export interface IUseNetworkProps {
    nodes: IGraphNodeItem[];
    edges: IGraphEdgeItem[];
    handleNodeClick: (selectedNodeId: number) => void;
    isSelected: boolean;
    setSelected: Dispatch<SetStateAction<boolean>>;
}

export interface IHighlightProps {
    selectedNode: any;
    linkedNodeColor: string;
    selectedNodeColor: string;
    selectedNodeTextColor: string;
    selectedNodeRadius: number;
    checkSelected?: boolean;
}

export interface IFadeProps {
    selectedNode: any;
    notSelectedOpacity?: number;
    selectedOpacity?: number;
    checkSelected?: boolean;
}
