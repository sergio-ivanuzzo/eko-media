import { IItem } from "~/providers/DataProvider/types";

export interface IGraphEdgeItem extends IItem {
    source: number;
    target: string;
    weight: string;
    alpha: number;
    reference_count: number;
}

export interface IGraphNodeItem extends IItem {
    id: number;
    name: string;
}

export interface IGraphDataset extends IItem {
    nodes: IGraphNodeItem[];
    edges: IGraphEdgeItem[];
}
