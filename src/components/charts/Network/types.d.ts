declare interface IGraphEdgeItem extends IItem {
    source: number;
    target: number;
    weight: string;
    alpha: number;
    reference_count: number;
}

declare interface IGraphNodeItem extends IItem {
    id: number;
    name: string;
}

declare interface IGraphDataset extends IItem {
    nodes: IGraphNodeItem[];
    edges: IGraphEdgeItem[];
}
