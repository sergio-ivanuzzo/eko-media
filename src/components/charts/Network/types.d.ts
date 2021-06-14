declare interface IGraphEdgeItem extends IItem {
    source: number;
    target: number;
    weight: string;
    alpha: number;
    // network file contains this field
    reference_count?: number;
    // connections file contains this field
    reference_percent?: number;
}

declare interface IGraphNodeItem extends IItem {
    id: number;
    name: string;
}

declare interface IGraphDataset extends IItem {
    nodes: IGraphNodeItem[];
    edges: IGraphEdgeItem[];
}
