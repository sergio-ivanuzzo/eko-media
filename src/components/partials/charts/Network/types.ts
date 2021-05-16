import { IItem } from "~/providers/DataProvider/types";

export interface IGraphDataset extends IItem {
    nodes: { id: number, name: string }[];
    edges: { source: number, target: string, weight: string, alpha: number }[];
}
