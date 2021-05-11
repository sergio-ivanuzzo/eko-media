import { IItem } from "~/providers/DataProvider/types";

export interface IChartContainerProps {
    height: number;
}

export interface ICategorizedItem extends IItem {
    category: string;
}
