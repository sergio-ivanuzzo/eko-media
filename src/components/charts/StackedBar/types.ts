import { IData, IItem } from "~/providers/DataProvider/types";

export interface IStackedBarProps<T extends IItem> {
    data: IData<T>;
}

export interface IChartContainerProps {
    height: number;
    width: number;
}

export interface ICategorizedItem extends IItem {
    category: string;
}
