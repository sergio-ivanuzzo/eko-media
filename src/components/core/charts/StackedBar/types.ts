import { IData, IItem } from "~/providers/DataProvider/types";

export interface IStackedBarProps {
    data: IData;
}

export interface IChartContainerProps {
    height: number;
}

export interface ICategorizedItem extends IItem {
    category: string;
}
